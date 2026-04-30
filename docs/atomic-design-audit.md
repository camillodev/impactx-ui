# Atomic Design Audit — `@impactx/ds-education`

> Read-only audit. Goal: classify the current DS surface under Atomic Design,
> identify dogfooding gaps in the showcases, and surface molecules that should
> pre-exist as exported components (per Rafa: "moléculas devem pré-existir,
> não só padrões documentados").

Repo snapshot: `packages/ds-education/src/` (22 base components +
10 education-domain components) and `apps/web/src/app/components/` (20 showcases).

---

## Section 1 — Taxonomy: `packages/ds-education/src/components/`

### Atoms (10) — single-element primitives, no internal composition of other DS atoms

| Component       | File                         | Justification (1 line)                                               |
|-----------------|------------------------------|----------------------------------------------------------------------|
| `Button`        | `button.tsx`                 | Single interactive element, variants/sizes only — pure atom.         |
| `IconButton`    | `icon-button.tsx`            | Square/circle icon trigger, no composition — atom.                   |
| `Badge`         | `badge.tsx`                  | Visual label primitive — atom.                                       |
| `Avatar`        | `avatar.tsx`                 | Image + fallback initials, single visual unit — atom.                |
| `Separator`     | `separator.tsx`              | Visual divider primitive — atom.                                     |
| `ProgressBar`   | `progress-bar.tsx`           | Single bar w/ value — atom.                                          |
| `IconButton`    | (above)                      | (already listed)                                                     |
| `Tooltip`       | `tooltip.tsx`                | Radix wrapper, single overlay primitive — atom.                      |
| `Breadcrumb`    | `breadcrumb.tsx`             | Compound (`Breadcrumb.List/Item/Link/Separator`) but each atomic; the namespace itself is closer to a *molecule of links*. **Flagged ambiguous** — listed here because each subpart is an atom and the wrapper has no logic. |
| `Chip`          | `chip.tsx`                   | Chip + `SegmentedControl` (chip-group). Chip alone is atom; `SegmentedControl` is a molecule. **Flagged**: file mixes atom + molecule. |
| `Card`          | `card.tsx`                   | Container w/ `CardHeader/Title/Content` slots; pure layout primitive (no behavior). **Atom of layout**, though some authors classify multi-slot containers as molecules. **Flagged ambiguous.** |
| `Input`         | `input.tsx`                  | Internally bundles label + input + error + helper text + leading/trailing icon. **This is already a FormField molecule in atom's clothing.** **Flagged**: see Section 4. |

**Notes / ambiguities flagged**

- `Input` should not be classified as an atom — the file already implements the
  `FormField` molecule. The "atom" `<input>` element is wrapped inside.
- `Breadcrumb` ships compound parts; treat the *Breadcrumb namespace* as a molecule
  if you want strict purity, atoms otherwise. Current usage treats parts as atoms.
- `Chip` and `SegmentedControl` co-live in one file. `SegmentedControl` is a
  molecule (composition of `Chip`-likes + state). Splitting the file would clarify.
- `Card` is borderline: a layout primitive with named slots. Treating it as an
  atom is convenient because every showcase composes inside it.

### Molecules (8) — composed of atoms, single coherent purpose

| Component         | File                  | Justification                                                                 |
|-------------------|-----------------------|-------------------------------------------------------------------------------|
| `Modal`           | `modal.tsx` (658 LOC) | Compound: `Modal.Header/Body/Footer/Action/Cancel/Banner/Carousel/Split/...`. Many built-in shapes. **Borderline organism** — flagged. |
| `Toast`           | `toast.tsx`           | Notification bubble (success/info/warn/error) — molecule.                     |
| `Tabs`            | `tabs.tsx`            | Tablist + triggers + panels w/ shared state — molecule.                       |
| `Pagination`      | `pagination.tsx`      | Buttons + numeric range + prev/next — molecule.                               |
| `Stat`            | `stat.tsx`            | Label + value + delta — composition of typography atoms — molecule.            |
| `HelpFAB`         | `help-fab.tsx`        | Floating action button + tooltip/menu — molecule (single purpose).            |
| `CommandPalette`  | `command-palette.tsx` | Modal + search input + filterable list — **borderline organism** flagged.     |
| `SegmentedControl`| (in `chip.tsx`)       | Chip group with single-selected state — molecule.                              |

**Notes / ambiguities flagged**

- `Modal` (658 LOC, 19 sub-parts) acts more like a *modal kit* (organism). It
  exposes Default + Welcome + Split + Carousel + InfoList shapes. Could be split
  into `Modal` (molecule) + `WelcomeModal`, `SplitModal`, `CarouselModal`
  (organisms or pre-baked molecules — see Section 4 `ConfirmModal`).
- `CommandPalette` already aggregates input + list + keyboard shortcuts —
  arguably an organism. Listed as molecule because its purpose is single
  ("global launcher").

### Organisms (4) — multi-molecule composition with non-trivial logic

| Component        | File                  | Justification                                                                 |
|------------------|-----------------------|-------------------------------------------------------------------------------|
| `DataTable`      | `data-table.tsx`      | Sortable table + density + loading/empty states — multi-molecule.             |
| `BannerCTA`      | `banner-cta.tsx`      | Heading + description + Button + illustration slot — borderline molecule. **Flagged**: closer to molecule by Atomic-Design strictness. |
| `Chart`          | `chart.tsx` (373 LOC) | DonutChart / BarChart / LineChart / AreaChart wrappers around ECharts — organism (encapsulates a full subsystem). |
| `AssessmentCard` | `assessment-card.tsx` | Domain-flavored card with 5 status states + actions — organism in `components/` but should likely live in `components-education/`. **Flagged**: misplaced. |

**Notes / ambiguities flagged**

- `BannerCTA` is closer to a molecule (text + cta) than an organism. Today's
  index page lists it under Molecules — keep that classification, move out of
  organisms group here.
- `AssessmentCard` is the only file in `components/` whose name and contents are
  domain-specific (Education). The other 9 education-flavored components live
  in `components-education/`. Recommend moving for consistency.

### Summary count
- Atoms: **10** (Button, IconButton, Badge, Avatar, Separator, ProgressBar,
  Tooltip, Breadcrumb, Chip, Card)
- Molecules: **8** (Modal, Toast, Tabs, Pagination, Stat, HelpFAB,
  CommandPalette, SegmentedControl) — counting `Input` as a molecule (FormField)
  raises this to **9**
- Organisms: **4** (DataTable, BannerCTA*, Chart, AssessmentCard) — strict
  reading drops BannerCTA, leaving **3**

\* contested; see notes.

---

## Section 2 — `components-education/` (10 domain organisms)

These live under `packages/ds-education/src/components-education/` and are
domain-specific to the Education X vertical. All are organisms (compose
multiple atoms/molecules into a domain-meaningful chunk).

| Component             | File                            | 1-line description                                                         |
|-----------------------|---------------------------------|----------------------------------------------------------------------------|
| `AssessmentHeader`    | `assessment-header.tsx`         | Header bar of an assessment page: title + meta + status + actions.         |
| `AssessmentListItem`  | `assessment-list-item.tsx`      | Row in an assessment list — title, status pill, score, chevron.            |
| `BigCard`             | `big-card.tsx`                  | Hero/marketing card variant with extra padding and emphasis treatment.     |
| `CampoCard`           | `campo-card.tsx` (170 LOC)      | "Campo" (subject area) card with score, trend, subject icon, actions.      |
| `CategoryCard`        | `category-card.tsx`             | Category-tile card used on dashboards/landing surfaces.                    |
| `CTABanner`           | `cta-banner.tsx`                | Domain CTA banner (distinct from `BannerCTA` atom-level — parallel naming, **flagged**). |
| `DonutScore`          | `donut-score.tsx`               | SVG donut score visual (legacy donut, still in active use).                |
| `HeroBanner`          | `hero-banner.tsx`               | Hero banner for school/dashboard top of page.                              |
| `QuestionRow`         | `question-row.tsx`              | Single question row in an assessment review (number, status, action).     |
| `SubjectStatCard`     | `subject-stat-card.tsx`         | Per-subject stats card (matérias × score).                                 |

**Naming collision flagged**: `BannerCTA` (in `components/`) vs. `CTABanner` (in
`components-education/`). Two near-identical names with different responsibilities
will confuse devs. Recommend rename: domain → `EducationCTABanner` or merge.

---

## Section 3 — Showcases dogfooding audit

Path: `apps/web/src/app/components/<slug>/page.tsx`. Inspected the 20 pages.

| Showcase            | Imports `@impactx/ds-education`? | Uses raw HTML for layout (`<main>`, `<h1>`, `<h2>`, `<div>`)? | Uses DS for page chrome (Card/Tabs/Badge)? |
|---------------------|----------------------------------|---------------------------------------------------------------|--------------------------------------------|
| `assessment-card`   | yes (subject)                    | yes                                                            | no                                         |
| `avatar`            | yes (subject)                    | yes                                                            | no                                         |
| `badge`             | yes (subject)                    | yes                                                            | no                                         |
| `banner-cta`        | yes (subject)                    | yes                                                            | no                                         |
| `breadcrumb`        | yes (subject)                    | yes                                                            | no                                         |
| `button`            | yes (subject)                    | yes                                                            | no                                         |
| `card`              | yes (subject + decorative)       | yes (h1/h2/main)                                               | partial — Card used as demo, not chrome    |
| `charts`            | yes (subject)                    | yes                                                            | no                                         |
| `chip`              | yes (subject)                    | yes                                                            | no                                         |
| `data-table`        | yes (subject + Badge/IconButton/Pagination) | yes                                                | no — composes DataTable + Pagination + Badge inline (gap) |
| `donut`             | yes (subject)                    | yes                                                            | no                                         |
| `icon-button`       | yes (subject)                    | yes                                                            | no                                         |
| `input`             | yes (subject)                    | yes                                                            | no                                         |
| `modal`             | yes (subject)                    | yes                                                            | no                                         |
| `pagination`        | yes (subject)                    | yes                                                            | no                                         |
| `stat`              | yes (subject)                    | yes                                                            | no                                         |
| `tabs`              | yes (subject)                    | yes                                                            | no                                         |
| `toast`             | yes (subject)                    | yes                                                            | no                                         |
| `tooltip`           | yes (subject)                    | yes                                                            | no                                         |
| `/components` index | no — only `next/link` + lucide   | yes (extensive `<div>` grid + raw heading)                     | no — should be a grid of `Card` components |

**Pattern observed**

Every showcase follows this template:

```tsx
<main className="min-h-screen bg-[var(--color-bg)] px-10 py-12 font-sans">
  <h1 className="text-2xl font-semibold ...">{ComponentName}</h1>
  <p className="text-sm text-[var(--color-text-muted)] mb-10">{description}</p>
  <section className="mb-12">
    <h2 className="text-xs font-semibold uppercase tracking-widest ...">Variant group</h2>
    <div className="rounded-xl p-6 bg-[var(--color-surface)] border ...">
      ...component demo...
    </div>
  </section>
</main>
```

This template **is the dogfooding gap**. It hand-rolls page chrome (heading,
section, demo card) using raw HTML + Tailwind classes. None of the showcases
use the DS itself for page-level structure.

### Top 3 worst dogfooding offenders

1. **`/components` index page** — pure HTML/Tailwind grid, hand-rolls a card
   component inline (`<Link className="rounded-2xl p-6 ...">`) when `Card`
   already exists in the DS. Bypasses the DS for the very page that advertises
   the DS.
2. **`data-table`** — composes `DataTable` + `Pagination` + `Badge` +
   `IconButton` inline at every showcase; this is the textbook molecule that
   *should pre-exist* as `DataExplorer` (Rafa's example).
3. **All "section" wrappers** — every page rolls its own section card
   (`<div className="rounded-xl p-6 bg-[var(--color-surface)] border ...">`).
   This is a `ShowcaseSection` molecule begging to be extracted.

---

## Section 4 — Missing molecules (gap analysis)

Per Rafa: molecules must pre-exist as components, not just be documented as
patterns. Concrete gaps observed:

### 1. `DataExplorer` — table + pagination + search + filter
- **Gap**: today every consumer of `DataTable` re-wires it with `Pagination`,
  `Input` (search), and `SegmentedControl`/`Chip` (filter) inline. The
  `data-table` showcase itself does this.
- **Compose**: `DataTable` + `Pagination` + `Input` (search) + `SegmentedControl`
  (filter chips) + optional `Badge` for active-filter count.
- **Use cases**: any list view (assessments list, students list, questions list,
  reports list).

### 2. `FormField` — label + input + error + helper
- **Status**: half-done. `Input` already bundles `label / error / helperText /
  leadingIcon / trailingIcon`. There is **no separate `FormField` wrapper**, so
  composing `Select`, `Textarea`, `Checkbox` (none of which exist yet) with
  consistent label/error treatment will require duplicating the markup.
- **Recommendation**: extract `FormField` as a wrapper that renders label/error/
  helper around any control (`children`), then refactor `Input` to use it.

### 3. `ConfirmModal` — modal + danger button + cancel
- **Gap**: `Modal` exposes `Modal.Action`/`Modal.Cancel` primitives but no
  pre-baked confirmation flow. Every consumer wires "Are you sure? + Confirm
  (danger) + Cancel" by hand.
- **Compose**: `Modal` + `Button[variant=danger-primary]` (action) +
  `Button[variant=tertiary]` (cancel) + `Modal.Title` + `Modal.Description`.
- **API sketch**: `<ConfirmModal title onConfirm onCancel danger? confirmLabel cancelLabel />`.

### 4. `EmptyState` — illustration + title + description + cta
- **Gap**: `DataTable` accepts an `emptyState?: React.ReactNode` but there is
  no canonical `EmptyState` component to drop in. Each consumer hand-rolls an
  illustration + heading + button.
- **Compose**: optional illustration slot + heading + description + optional
  primary `Button`.

### 5. `NavigationCard` — card + chevron + click
- **Gap**: the `/components` index hand-rolls a navigation card. Several
  education organisms (`CategoryCard`, `BigCard`) reimplement variations of
  "click → navigate" cards.
- **Compose**: `Card` + heading + optional icon + chevron + `onClick`/`href`.

### 6. `ShowcaseSection` (workspace-only molecule for `apps/web`)
- **Gap**: every showcase reimplements the section/header/demo-frame pattern.
- **Note**: this molecule may live in `apps/web` rather than the DS, since it's
  documentation chrome. Still, extracting it kills the worst dogfooding
  duplication.
- **Compose**: heading (`<h2>` styled) + optional description + framed demo
  area (`Card`-like).

### 7. `SearchBar` — input + leading icon + clear button + (optional) shortcut hint
- **Gap**: `Input` accepts a leading icon, but search-with-clear-button +
  cmd-K-style shortcut hint pattern is repeated. `CommandPalette` has its own
  internal search.
- **Compose**: `Input` (search type) + `IconButton` (clear) + `Badge` (kbd hint).

### 8. `Toolbar` — segmented control + search + actions row
- **Gap**: list/table headers across showcases hand-roll a row of filter chips
  + search + action buttons.
- **Compose**: `SegmentedControl` + `SearchBar` + slot for `Button`/`IconButton`s.

### 9. `PageHeader` — title + subtitle + breadcrumb + actions
- **Gap**: every showcase hand-rolls `<h1>` + `<p>` + spacing. There is no
  canonical page header.
- **Compose**: `Breadcrumb` (optional) + heading + subtitle + actions slot.

### 10. `ListItem` (generic row) — avatar/icon + title + meta + chevron + action
- **Gap**: `AssessmentListItem` is education-specific. A generic `ListItem`
  molecule would back any list/menu surface.

---

## Section 5 — Showcase refactor proposal

Goal: eliminate raw-HTML chrome in every showcase by using the DS for page
structure. Order of execution.

1. **Introduce `ShowcaseLayout`** (`apps/web/src/components/showcase-layout.tsx`)
   - Props: `title`, `description`, `category` (atom/molecule/organism),
     `children`.
   - Implementation: composes DS `Card`, `Badge` (for the atom/molecule/organism
     pill), `Tabs` for Preview/Code/Props/Themes. No raw `<main>` or `<h1>`
     classes.
2. **Introduce `ShowcaseSection`** for variant groups inside a showcase
   (replaces the recurring `<section><h2>{...}</h2><div className="rounded-xl
   ...">{...}</div></section>` block).
3. **Convert one showcase end-to-end as the canonical pattern**
   (suggest: `button` — smallest surface, most variants).
4. **Convert remaining 19 showcases** to `ShowcaseLayout` + `ShowcaseSection`.
5. **Tabs in `ShowcaseLayout`**:
   - `Preview` (default) — current visual demo
   - `Code` — source snippet (read from co-located `*.example.tsx`)
   - `Props` — auto-rendered table from TS types (later)
   - `Themes` — preview across the 3 brand themes (later)
6. **Index page (`/components`) refactored**:
   - Replace inline `<Link className="rounded-2xl ...">` cards with DS `Card`
     wrapped in `Link`.
   - Replace raw `<h2>` group headings with `ShowcaseSection`.
   - Keep the gradient-circle treatment inside the `Card`'s body, not as
     replacement for `Card`.
7. **Sidebar nav**: add a "Components" entry that routes to `/components`
   (index). Currently sidebar exists in `apps/web/src/components/` (out of scope
   for this audit, but the link must land on the new index).

---

## Section 6 — Pending decision for Rafa

**Question**: Is Atomic Design a *taxonomy* (documentation classification only)
or a *runtime API* (separate `atoms/`, `molecules/`, `organisms/` directories
with newly-exported molecule components)?

### Option A — taxonomy only
- Add `category: "atom" | "molecule" | "organism"` metadata on each component
  (e.g. in `registry.ts`).
- Showcase index groups by category (already does this informally).
- Zero new components. Zero file moves. Pure doc.
- **Pros**: cheap, ships in 1 PR, no breaking imports.
- **Cons**: the molecules Rafa wants ("DataExplorer pre-existing") still don't
  exist — the rule "moléculas devem pré-existir" is violated.

### Option B — runtime API (recommended, matches Rafa's stated rule)
- Restructure: `packages/ds-education/src/{atoms,molecules,organisms,domain}/`.
- Create the missing molecules (Section 4) as actual exported components.
- Refactor showcases to consume only DS surface (Section 5).
- **Pros**: dogfooding becomes structurally enforced — you can't build a
  showcase with raw HTML because the DS exports the parts you need. Matches
  "moléculas pré-existem".
- **Cons**: larger surface to maintain; folder migration breaks existing imports
  (manageable via barrel re-exports from `index.ts`).

### Recommendation: **Option B**

Rafa's rule explicitly says molecules must pre-exist. Option A doesn't satisfy
that. Option B does. Folder migration is one mechanical change; new molecules
unlock Section 5's refactor.

### First 5 molecules to create (in this order)

1. **`ShowcaseLayout` + `ShowcaseSection`** (lives in `apps/web` first; promote
   to DS later). Unblocks Section 5 immediately and gives the highest
   visible-quality lift across all 20 showcases.
2. **`DataExplorer`** — Rafa's flagship example. Composes `DataTable +
   Pagination + Input(search) + SegmentedControl(filter)`. Also collapses the
   `data-table` showcase's hand-wired composition.
3. **`ConfirmModal`** — high-frequency UX pattern; `Modal` already has the
   primitives, this is a thin wrapper.
4. **`EmptyState`** — required by `DataTable.emptyState` and used across every
   list view.
5. **`PageHeader`** — replaces the hand-rolled `<h1>` + breadcrumb + subtitle
   block on every page (dashboards, showcases, app surfaces).

After these 5 land, re-evaluate the gap list (Section 4 items 7-10) before
expanding further. Premature molecule expansion is a real cost; ship the 5,
measure usage, then promote.

---

## Appendix — taxonomy by the numbers

- Total components inspected: **22 base + 10 domain = 32**
- Atoms: 10
- Molecules: 8 (9 if `Input` is reclassified)
- Organisms: 4 base + 10 domain = 14
- Showcases: 20 (19 component pages + 1 index)
- Showcases that dogfood the DS for page chrome: **0 of 20**
- Missing high-priority molecules: **5** (recommended to create)
- Missing nice-to-have molecules: **5** (defer)

---

*End of audit.*
