# Zustand Store — Complete Examples

Read this when you need to write or refactor a Zustand store.

---

## Complete Store Example (Billing)

```ts
import { create } from 'zustand'
import { billingService } from '@/lib/billing/billing-service'
import { recomputeView, extractAvailableFilters } from '@/lib/billing/filter-utils'

interface BillingState {
  allRows: GuardianBillingRow[]
  filteredRows: GuardianBillingRow[]
  kpis: BillingKpis
  filters: FilterParams
  availableFilters: AvailableFilters
  selectedMonth: string
  isLoading: boolean
  error: string | null
}

interface BillingGetters {
  getFilteredRows: () => GuardianBillingRow[]
  getInvoiceById: (id: string) => Invoice | null
}

interface BillingMutations {
  setSearchFilter: (search: string) => void
  setStatusFilter: (status: string) => void
  setSelectedMonth: (month: string) => void
  resetFilters: () => void
  clearError: () => void
}

interface BillingActions {
  getGuardianBillingForMonth: () => Promise<void>
  cancelInvoice: (input: CancelInput) => Promise<void>
  generateBoletos: (input: GenerateInput) => Promise<void>
}

export const useBillingStore = create<BillingState & BillingGetters & BillingMutations & BillingActions>(
  (set, get) => ({
    // --- STATE ---
    allRows: [],
    filteredRows: [],
    kpis: initialKpis,
    filters: defaultFilters,
    availableFilters: emptyFilters,
    selectedMonth: getCurrentMonth(),
    isLoading: false,
    error: null,

    // --- GETTERS (read-only, no side effects) ---
    getFilteredRows: () => get().filteredRows,
    getInvoiceById: (id) => get().allRows.find((r) => r.invoiceId === id) ?? null,

    // --- MUTATIONS (sync, change state, no API) ---
    setSearchFilter: (search) => {
      const newFilters = { ...get().filters, search }
      set({ filters: newFilters, ...recomputeView(get().allRows, newFilters) })
    },
    setStatusFilter: (status) => {
      const newFilters = { ...get().filters, status }
      set({ filters: newFilters, ...recomputeView(get().allRows, newFilters) })
    },
    setSelectedMonth: (month) => set({ selectedMonth: month }),
    resetFilters: () => {
      set({ filters: defaultFilters, ...recomputeView(get().allRows, defaultFilters) })
    },
    clearError: () => set({ error: null }),

    // --- ACTIONS (async, call services, orchestrate) ---
    getGuardianBillingForMonth: async () => {
      set({ isLoading: true, error: null })
      try {
        const [rows, kpis] = await Promise.all([
          billingService.getGuardianRows(get().selectedMonth),
          billingService.getGuardianKpis(get().selectedMonth),
        ])
        set({
          allRows: rows,
          kpis,
          availableFilters: extractAvailableFilters(rows),
          ...recomputeView(rows, get().filters),
        })
      } catch {
        set({ error: 'Erro ao carregar cobrança' })
      } finally {
        set({ isLoading: false })
      }
    },

    cancelInvoice: async (input) => {
      set({ isLoading: true, error: null })
      try {
        await billingService.cancelInvoice(input)
        await get().getGuardianBillingForMonth()
      } catch {
        set({ error: 'Erro ao cancelar fatura' })
      } finally {
        set({ isLoading: false })
      }
    },

    generateBoletos: async (input) => {
      set({ isLoading: true, error: null })
      try {
        const result = await billingService.generateBoletos(input)
        await get().getGuardianBillingForMonth()
        return result
      } catch {
        set({ error: 'Erro ao gerar boletos' })
      } finally {
        set({ isLoading: false })
      }
    },
  })
)
```

---

## DRY Pattern — withLoading helper

When multiple actions share the same loading/error pattern, extract it:

```ts
// utils/storeHelpers.ts
async function withLoading<T>(
  set: (state: Partial<{ isLoading: boolean; error: string | null }>) => void,
  action: () => Promise<T>,
  errorMessage: string
): Promise<T | undefined> {
  set({ isLoading: true, error: null })
  try {
    return await action()
  } catch {
    set({ error: errorMessage })
  } finally {
    set({ isLoading: false })
  }
}

// In the store
cancelInvoice: (input) => withLoading(set,
  async () => {
    await billingService.cancelInvoice(input)
    await get().getGuardianBillingForMonth()
  },
  'Erro ao cancelar fatura'
)
```

---

## Splitting a Large Store

When a store exceeds 500 lines, split by sub-domain:

```ts
// store/billingQueryStore.ts — getters + fetch actions
export const useBillingQueryStore = create<QueryState & QueryActions>((set, get) => ({
  allRows: [],
  kpis: initialKpis,
  getGuardianBillingForMonth: async () => { ... },
}))

// store/billingMutationStore.ts — mutations + mutation actions
export const useBillingMutationStore = create<MutationState & MutationActions>((set, get) => ({
  cancelInvoice: async (input) => {
    await billingService.cancelInvoice(input)
    // Cross-store refresh:
    useBillingQueryStore.getState().getGuardianBillingForMonth()
  },
}))

// store/billingFilterStore.ts — filter state + mutations
export const useBillingFilterStore = create<FilterState & FilterMutations>((set, get) => ({
  filters: defaultFilters,
  setSearchFilter: (search) => {
    const allRows = useBillingQueryStore.getState().allRows
    const newFilters = { ...get().filters, search }
    set({ filters: newFilters, ...recomputeView(allRows, newFilters) })
  },
}))
```

---

## Service Example — Class Pattern

```ts
// lib/billing/billing-service.ts

class BillingService {
  // --- PUBLIC ---
  async getGuardianRows(month: string): Promise<GuardianBillingRow[]> {
    const guardians = await prisma.guardian.findMany({ where: { ... } })
    return guardians.map((g) => this.mapGuardianToRow(g, month))
  }

  async cancelInvoice(input: unknown): Promise<CancelResult> {
    const parsed = this.validateInput(cancelSchema, input)
    if (!parsed.success) return { success: false, error: parsed.error }

    const invoice = await prisma.invoice.findUnique({ where: { id: parsed.data.invoiceId } })
    if (!this.canTransition(invoice.status, 'CANCELLED')) {
      return { success: false, error: `Cannot cancel invoice with status ${invoice.status}` }
    }

    if (invoice.coraInvoiceId) {
      await this.cancelAtCora(invoice.coraInvoiceId)
    }

    await prisma.invoice.delete({ where: { id: invoice.id } })
    return { success: true, data: undefined }
  }

  // --- PRIVATE ---
  private validateInput<T>(schema: ZodSchema<T>, input: unknown): ParseResult<T> {
    const result = schema.safeParse(input)
    if (!result.success) return { success: false, error: result.error.message }
    return { success: true, data: result.data }
  }

  private mapGuardianToRow(guardian: Guardian, month: string): GuardianBillingRow {
    return {
      guardianId: guardian.id,
      guardianName: guardian.name,
      // ... mapping logic
    }
  }

  private canTransition(current: string, next: string): boolean {
    const transitions: Record<string, string[]> = {
      DRAFT: ['INVOICED', 'CANCELLED'],
      INVOICED: ['PAID', 'OVERDUE', 'CANCELLED'],
      OVERDUE: ['PAID', 'CANCELLED'],
      // PAID and CANCELLED are terminal states
    }
    return transitions[current]?.includes(next) ?? false
  }

  private async cancelAtCora(coraInvoiceId: string): Promise<void> {
    try {
      await coraApi.delete(`/invoices/${coraInvoiceId}`)
    } catch (err) {
      if (err.response?.status === 404) return  // already cancelled, treat as success
      throw err
    }
  }
}

const billingService = new BillingService()
export { billingService, BillingService }
```

---

## Reuse Table Template

Before refactoring, always fill this table:

```
| Existing pattern             | Location                       | Reuse as                              |
|-----------------------------|---------------------------------|---------------------------------------|
| computeBillingMetricsCents()| src/lib/dashboard/metrics.ts    | Same pure-function pattern for KPIs   |
| CoraError.toUserMessage()   | src/lib/cora/errors.ts          | Pattern for handleEmailError          |
| sendEmail()                 | src/lib/email/resend.ts         | EmailService wraps with logging       |
| prisma singleton            | src/lib/db.ts                   | All services import from here         |
| formatBrl/formatDateBR      | src/lib/format.ts               | Reuse in hooks and templates          |
```
