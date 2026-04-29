---
name: ix-frontend
description: >
  Padrões obrigatórios de arquitetura frontend da Impact X — Next.js, TypeScript, Zustand, Axios.
  Ativa SEMPRE que o agent for escrever, refatorar, ou revisar qualquer código frontend: componentes,
  hooks, stores, services, utils, actions, pages, testes. Também ativa quando mencionar: "cria componente",
  "refatora", "clean code", "zustand", "store", "service", "hook", "filter", "DRY", "500 linhas",
  "boas práticas", "architecture", "layer", "TDD", "single responsibility", "state management",
  "dumb component", "pure function", ou qualquer decisão sobre onde colocar código no frontend.
  Esta skill é a fonte de verdade — sobrescreve qualquer padrão que o agent "ache" que é correto.
  Leia ANTES de escrever qualquer linha de código frontend.
---

# IX Frontend Architecture — Agent Rules

This file is the source of truth for all frontend code written by agents.
Read this BEFORE writing any component, hook, store, service, or utility.
Follow every rule. No exceptions. No shortcuts.

**Pré-requisito**: ix-core (stack, projetos). Frequently chained with ix-engineering (system design, PRD).
**Pré-requisito código**: ix-code-guidelines (naming, TDD, DRY, commits, PRs). Regras de código transversais vivem lá.
**Pré-requisito visual**: frontend-design (estética, tipografia, cor, motion). Chamar SEMPRE que criando componentes visuais novos.

---

## Stack

Next.js (App Router) · TypeScript · Tailwind · Zustand · Axios · Zod · Vitest

---

## Visual Quality

Para produtos **Impact X**: invocar `ix-brand` (cores `#11C76F`, tokens CSS, tipografia Plus Jakarta Sans, componentes). Nunca hardcodar cor/fonte — sempre `var(--ix-green)` etc.

Para projetos **externos** sem identidade IX: invocar `frontend-design` (estética genérica de qualidade).

This skill (ix-frontend) covers **architecture**; ix-brand/frontend-design cover **aesthetics**.

---

## Architecture — Mandatory Layer Flow

```
Page / Component        → UI only, dumb, no logic
    ↓ calls
Hook                    → bridge, formats data for UI, delegates actions
    ↓ calls
Zustand Store (actions) → centralized state, calls services, handles loading/error
    ↓ calls
Service                 → business logic, validation, mapping, stateless
    ↓ calls
API Layer (lib/api.ts)  → single axios instance, interceptors
    ↓ HTTP
Backend / Next.js API Routes
```

Never skip a layer. Never call a lower layer from a higher one directly.
The reason is separation of concerns — each layer has a single job. When layers are skipped, responsibilities bleed across boundaries and the code becomes untestable and hard to refactor.

---

## Rule: File Size Limit — 500 Lines Max (Application Code)

Any application code file exceeding 500 lines must be split. This isn't arbitrary — files beyond this size reliably indicate mixed responsibilities, which makes them harder to test, review, and maintain.

This rule applies to: components, hooks, stores, services, utils, actions, pages, tests.
This rule does NOT apply to: skill files, documentation, config files.

### How to split by layer

| Layer | Split strategy |
|---|---|
| Component | Extract sub-components (`InvoiceTable` → `InvoiceRow`, `InvoiceHeader`, `InvoiceFilters`) |
| Hook | Extract domain-specific hooks (`useBilling` → `useBillingFilters`, `useBillingMutations`) |
| Store | Split by sub-domain (`billingStore` → `billingQueryStore`, `billingMutationStore`). Stores can import each other via `getState()`. |
| Service | Extract sub-services or utility modules (`billingService` → `billingService` + `metricsService` + `billing-validators.ts`) |
| Utils | One file per concern (`filter-utils.ts`, `sort-utils.ts`, `pagination-utils.ts`) — never a god-utils file |

### Decision flow
```
File > 500 lines?
  → YES → Identify responsibilities inside the file
         → Each responsibility becomes its own file
         → Each new file follows single-responsibility
         → Original file becomes an orchestrator or gets deleted
  → NO  → Keep as is
```

Before writing code, check the target file's line count. If adding your code would push it past 500 lines, split FIRST, then add.

---

## Rule 0 — Before You Write Code

1. **Identify which layer** the code belongs to. If unclear, stop and ask.
2. Follow ix-code-guidelines (naming, TDD, DRY, 500-line limit).

---

## Layer 1 — Component (Dumb / Presentational)

### What it does
Renders UI. That's it.

### Why it matters
When components contain no logic, they're trivially testable, reusable across features, and safe to modify without breaking business rules. The moment a component fetches data or transforms it, you've coupled the UI to the data layer and lost these properties.

### Rules
- Never import `fetch`, `axios`, a service, or the API layer.
- Never access Zustand store directly — only through hooks.
- Never transform, normalize, or validate data. Receive it ready.
- Local state is only for UI concerns: `isOpen`, `activeTab`, `isHovered`.
- Application data (products, users, invoices) is never in local state.
- Props must be typed with an explicit interface.
- UI text facing the user: **pt-BR**. Code and comments: **English**.

### File pattern
```
src/components/[ComponentName]/[ComponentName].tsx
src/components/[ComponentName]/index.ts  ← barrel export
```

### Example — correct
```tsx
interface InvoiceCardProps {
  guardianName: string
  formattedAmount: string  // already "R$ 1.290,00"
  status: string
  onCancel: () => void
}

export function InvoiceCard({ guardianName, formattedAmount, status, onCancel }: InvoiceCardProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)  // ← UI state, OK

  return (
    <div>
      <p>{guardianName}</p>
      <p>{formattedAmount}</p>
      <button onClick={() => setIsConfirmOpen(true)}>Cancelar</button>
      {isConfirmOpen && <ConfirmDialog onConfirm={onCancel} />}
    </div>
  )
}
```

### Example — WRONG
```tsx
// VIOLATION: fetching in component, formatting in component, store accessed directly
export function InvoiceCard({ invoiceId }) {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch(`/api/invoices/${invoiceId}`).then(r => r.json()).then(setData)  // ❌
  }, [])
  const formatted = new Intl.NumberFormat('pt-BR').format(data?.amount)   // ❌
}
```

### Quick check — is your component dumb?
- Does it import `fetch`, `axios`, or a service? → Move it to a store action.
- Does it format/transform data? → Move it to a hook.
- Does it hold application data in `useState`? → Move it to the store.
- Does it hold UI-only state like `isOpen`? → That's fine, keep it.

### DRY in components — extract before repeating

If the same pattern appears in 2+ components, extract it immediately. Duplication in components compounds fast because they're the most numerous files in a codebase.

| Repeated pattern | Extract to |
|---|---|
| Same UI block (card, row, badge) | Sub-component |
| Same state logic (toggle, debounce, pagination) | Custom hook in `hooks/` |
| Same data transformation | Utility function in `utils/` |
| Same event handler pattern | Custom hook or helper |

```tsx
// WRONG — same toggle pattern in 3 components
function ComponentA() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(prev => !prev)  // ❌ duplicated
}

// CORRECT — extracted to a hook
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(prev => !prev), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  return { value, toggle, setTrue, setFalse }
}
```

Before creating a new component, search the codebase for similar UI patterns. Compose existing sub-components before creating new ones.

---

## Layer 2 — Hooks (Bridge)

### What it does
Connects components to the store. Formats and derives data for the UI. Exposes store actions with a clean API.

### Why it matters
Hooks are the translation layer. They prevent components from knowing about store internals and prevent stores from knowing about UI formatting. Without this layer, changing how you display a currency means touching the store, and changing how the store structures data means touching every component.

### Rules
- Never call `fetch`, `axios`, or the API layer.
- Never contain business logic — that belongs in services.
- One hook per feature domain: `useBilling`, `useAuth`, `useStudents`.
- Return only what the component needs — don't over-expose store internals.

### File pattern
```
src/hooks/use[Domain].ts
```

### Example
```ts
export function useBilling() {
  const {
    filteredRows, kpis, isLoading, error,
    getGuardianBillingForMonth, setSearchFilter, setStatusFilter
  } = useBillingStore()

  // Format for UI here — component receives it clean
  const formattedKpis = {
    totalBilled: formatBrl(kpis.totalBilled),
    totalPaid: formatBrl(kpis.totalPaid),
    paidPercentage: `${((kpis.totalPaid / kpis.totalBilled) * 100).toFixed(1)}%`,
  }

  return { filteredRows, kpis: formattedKpis, isLoading, error, getGuardianBillingForMonth, setSearchFilter, setStatusFilter }
}
```

---

## Layer 3 — Zustand Store (State + Getters + Mutations + Actions)

### What it does
Centralizes all application data. Manages the data lifecycle through 3 operation types: getters, mutations, actions. Is the only layer that calls services.

### Why this structure matters
Separating getters/mutations/actions makes the data flow predictable. You can look at any store operation and immediately know: does this change state? Does it call the network? Is it sync or async? This predictability is what makes complex stores maintainable.

### Rules
- One store per business domain. Prioritize **data flow** over grouping by feature.
- Separate interfaces: `State`, `Getters`, `Mutations`, `Actions`. Combine with `&`.
- Store holds `allRows` (raw server data). Filtering/sorting/pagination is local.
- Filter setters never trigger a new network request — recompute from `allRows`.
- If a store exceeds 500 lines, split by sub-domain (e.g. `billingQueryStore` + `billingMutationStore`). Stores can reference each other via `getState()`.
- Use singleton export: `const useXStore = create<XState & XGetters & XMutations & XActions>(...)`.

### File pattern
```
src/store/[domain]Store.ts
```

### Store anatomy — 3 operation types

```ts
// GETTERS — read-only, derive data, never change state
interface BillingGetters {
  getFilteredRows: () => GuardianBillingRow[]
  getKpisSummary: () => BillingKpis
  getInvoiceById: (id: string) => Invoice | null
}

// MUTATIONS — synchronous, change state directly, no side effects
interface BillingMutations {
  setSearchFilter: (search: string) => void
  setStatusFilter: (status: string) => void
  setSelectedMonth: (month: string) => void
  resetFilters: () => void
  clearError: () => void
}

// ACTIONS — async, call services/API, orchestrate mutations
interface BillingActions {
  getGuardianBillingForMonth: () => Promise<void>
  cancelInvoice: (input: CancelInput) => Promise<void>
  generateBoletos: (input: GenerateInput) => Promise<void>
}
```

### Key distinction

| Type | Reads state? | Changes state? | Calls API/service? | Async? |
|---|---|---|---|---|
| **Getter** | YES | NO | NO | NO |
| **Mutation** | YES | YES | NO | NO |
| **Action** | YES | YES (via set) | YES | YES |

### Critical pattern — mutation (local recompute, no network)
```ts
// CORRECT — local recompute from allRows
setSearchFilter: (search) => {
  const newFilters = { ...get().filters, search }
  const result = recomputeView(get().allRows, newFilters)  // pure function
  set({ filters: newFilters, ...result })
}

// WRONG — triggers network call on every keystroke
setSearchFilter: (search) => {
  set({ filters: { ...get().filters, search } })
  get().fetchData()  // ❌ network on every filter change
}
```

### Critical pattern — action (API call → re-fetch)
```ts
// Action calls service, then re-fetches fresh data
cancelInvoice: async (input) => {
  set({ isLoading: true, error: null })
  try {
    await billingService.cancelInvoice(input)
    await get().getGuardianBillingForMonth()  // re-fetch fresh data
  } catch (err) {
    set({ error: 'Erro ao cancelar fatura' })
  } finally {
    set({ isLoading: false })
  }
}
```

### Complete store example
```ts
import { create } from 'zustand'
import { billingService } from '@/lib/billing/billing-service'
import { recomputeView, extractAvailableFilters } from '@/lib/billing/filter-utils'

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
  })
)
```

### DRY pattern — withLoading helper

When multiple actions share the same loading/error boilerplate, extract it:

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

// In the store — clean and DRY
cancelInvoice: (input) => withLoading(set,
  async () => {
    await billingService.cancelInvoice(input)
    await get().getGuardianBillingForMonth()
  },
  'Erro ao cancelar fatura'
)
```

### Splitting a large store (>500 lines)

```ts
// store/billingQueryStore.ts — state + getters + fetch actions
export const useBillingQueryStore = create<QueryState & QueryActions>((set, get) => ({
  allRows: [],
  kpis: initialKpis,
  getGuardianBillingForMonth: async () => { ... },
}))

// store/billingMutationStore.ts — mutation actions
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

## Layer 4 — Services (Business Logic)

### What it does
Encapsulates all business logic for one domain. Validates inputs (Zod), maps API responses, enforces rules. Stateless — no side effects beyond API calls.

### Why services exist as a separate layer
Business rules change independently of UI and independently of state management. When validation logic lives in a store action, you can't reuse it from a different store or a server action. When it lives in a service, any consumer can call it.

### Rules
- One service per business unit: `billingService`, `emailService`, `metricsService`.
- **Public functions** — the API surface. Other files call these.
- **Private functions** — prefixed with `_` or non-exported. Helpers, validators, mappers.
- Every public function does one thing. Its name is its documentation.
- Use class pattern with singleton export for complex services.
- Use object literal export for simple services.
- Input validation with Zod at the service boundary.
- Errors: return `Result` types for expected failures, throw for unexpected ones.

### File pattern
```
src/lib/[domain]/[domain]-service.ts
src/lib/[domain]/__tests__/[domain]-service.test.ts
```

### Class pattern (complex services)
```ts
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

### Object literal pattern (simple services)
```ts
function _normalizeProduct(raw: RawProduct): Product { ... }
function _validateProductId(id: string): boolean { ... }

async function getAll(): Promise<Product[]> {
  const response = await api.get<RawProduct[]>('/products')
  return response.data.map(_normalizeProduct)
}

async function getById(id: string): Promise<Product> {
  if (!_validateProductId(id)) throw new Error('Invalid product ID')
  const response = await api.get<RawProduct>(`/products/${id}`)
  return _normalizeProduct(response.data)
}

export const productService = { getAll, getById }
```

### Private function naming categories

| Category | Pattern | Example |
|---|---|---|
| Validation | `validate[What]` | `validateGuardianForBoleto()` |
| Mapping | `map[Source]To[Target]` | `mapInvoiceToRow()` |
| Business rules | `can[Action]` / `is[Condition]` | `canTransition()` |
| Error handling | `handle[Context]Error` | `handleEmailError()` |
| Data building | `build[What]` | `buildCoraServices()` |
| Processing | `process[What]` | `processExistingInvoice()` |
| Persistence | `persist[What][Outcome]` | `persistInvoiceSuccess()` |

---

## Layer 5 — API Layer

### Rules
- Single axios instance in `src/lib/api.ts`.
- Never import `axios` directly anywhere else — always use the `api` instance.
- Interceptors handle: auth token injection, global error handling, refresh token.
- Base URL from `process.env.NEXT_PUBLIC_API_URL`.

### API instance example
```ts
import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})

// Auth token injection
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) window.location.href = '/login'
    return Promise.reject(error)
  }
)
```

### Server-side vs client-side

| Context | Tool | Why |
|---|---|---|
| Server Component / Route Handler | Native `fetch` | Next.js injects caching (SSG/SSR/ISR) into native fetch |
| Client Component (via store) | Axios `api` instance | Interceptors, typed responses, consistent error handling |

Server-side cache options:
- `cache: 'no-store'` → SSR (fresh every request)
- `next: { revalidate: N }` → ISR (revalidate every N seconds)
- Default → SSG (build time)

---

## Layer 6 — Pure Utility Functions

### What it does
Stateless, side-effect-free functions: filtering, sorting, pagination, formatting.

### Why they're separate
Pure functions are the easiest code to test, reuse, and reason about. Extracting them from stores and hooks means the logic can be unit-tested without mocking any store or component.

### Rules
- Must be pure: same input → same output, no side effects.
- One file per concern: `filter-utils.ts`, `formatters.ts`, `sort-utils.ts`.
- Each function is independently testable.
- Used by hooks (for formatting) and stores (for recomputing views).

### File pattern
```
src/lib/[domain]/filter-utils.ts
src/lib/format.ts
src/utils/[concern].ts
```

### Example — filter-utils extracted from the store
```ts
export function filterGuardianRows(rows: GuardianBillingRow[], filters: FilterParams): GuardianBillingRow[]
export function sortGuardianRows(rows: GuardianBillingRow[], sortBy: string, sortOrder: 'asc' | 'desc'): GuardianBillingRow[]
export function paginateRows<T>(rows: T[], page: number, pageSize: number): T[]
export function extractAvailableFilters(rows: GuardianBillingRow[]): AvailableFilters
export function recomputeView(allRows: GuardianBillingRow[], filters: FullFilters): ViewResult
```

---

## Next.js Actions Layer (Server Actions / Route Handlers)

### What it does
Thin wrapper between the client store and server-side services.

### Rules
- Marked with `'use server'`.
- Never contains business logic — delegates to services.
- One action per operation. Name matches the service method.
- Returns typed results — no raw Prisma/DB types leaked to the client.

### File pattern
```
src/app/(dashboard)/[feature]/actions.ts
```

### Example
```ts
'use server'

import { billingService } from '@/lib/billing/billing-service'

export async function getGuardianRows(month: string) {
  return billingService.getGuardianRows(month)
}

export async function getGuardianKpis(month: string) {
  return billingService.getGuardianKpis(month)
}
```

---

## Testing, Naming, Error Handling, Commits, PRs

See **ix-code-guidelines** for all cross-cutting rules:
- TDD (RED → GREEN → REFACTOR), test naming, execution order
- Naming conventions (PascalCase, camelCase, kebab-case, UPPER_SNAKE)
- Error handling (Result types, error categories, fire-and-forget)
- Language rules (code=EN, UI=pt-BR)
- Refactoring (reuse table, God Function decomposition)
- Commits (Conventional Commits) and PR checklist

### Frontend-specific testing additions
- Services get the most tests — they contain the logic.
- Pure utility functions get exhaustive tests — they're cheap to test.
- Stores get integration tests if complex.
- Components get visual/interaction tests only if warranted.

---

## Quick Reference — Decision Table

| Question | Answer |
|---|---|
| Where do I make API calls? | Store action → service → `lib/api.ts` |
| Where does application data live? | Zustand store |
| Where do I format data for UI? | Hook |
| Where do I put business rules? | Service (private functions) |
| Where do I validate inputs? | Service boundary (Zod) |
| Where does filtering/sorting happen? | Pure utility functions called by store mutations |
| Do filter changes trigger network? | No — local recompute from `allRows` |
| Do mutations trigger network? | No — mutations are sync, local only |
| Do actions trigger network? | Yes — actions call services, then update state |
| After a mutation action (create/update/delete)? | Re-fetch from server via action |
| Can a component access the store? | No — only through hooks |
| Can a hook call an API? | No — calls store action |
| Can a service hold state? | No — stateless |
| File has 500+ lines? | Split it — each file = single responsibility |
| Same pattern in 2+ places? | Extract to hook or util |
| Store getter changes state? | Never — getters are read-only |
| Server-side fetch? | Native `fetch` with Next.js cache |
| Client-side fetch? | Axios via `lib/api.ts` |
| Where do tests live? | `__tests__/` next to source |
| Test first or code first? | Test first. Always. |

---

## PR Checklist (frontend-specific additions to ix-code-guidelines)

- [ ] No API calls in components or hooks
- [ ] No business logic in components or hooks
- [ ] Application data centralized in Zustand store
- [ ] Store getters are read-only
- [ ] Store mutations are sync (no API calls)
- [ ] Store actions are async (call services, update state)
- [ ] Filter setters recompute locally — no network
