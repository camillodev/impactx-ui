import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

/**
 * Visual regression + a11y gate.
 *
 * Matriz de cobertura:
 *   3 temas (education | kumon | impactx)
 *   × 2 modes (light | dark)
 *   × 3 viewports (mobile 375 | tablet 768 | desktop 1440)
 *   × 3 rotas criticas (button | card | input)
 *   = 54 snapshots
 *
 * Por que 3 rotas e nao todas: rotas onde primary/tokens aparecem na superficie.
 * Refator de token quebra essas 3 antes de qualquer outra. Outras paginas (templates,
 * primitives) entram via DataTable/Stack/Grid que nao mudam visualmente com tema.
 *
 * Adicionar rota nova:
 *   - Pequeno custo (1 rota = +18 snapshots)
 *   - So adicionar se for visualmente sensivel a tokens (cor/spacing/radius/shadow)
 *
 * Adicionar tema novo:
 *   - Tema 4 = +18 snapshots por rota critica
 *   - Pensar 2x antes (Style Dictionary 3-tier facilita futuro)
 *
 * IMPORTANTE: baselines committed to git foram geradas localmente. Rafa deve
 * eyeball-aprovar todas antes do merge da PR que introduzir uma mudanca visual.
 */

const SHOWCASE_ROUTES = [
  "/components/button",
  "/components/card",
  "/components/input",
] as const

const THEMES = ["education", "kumon", "impactx"] as const
const MODES = ["light", "dark"] as const

/**
 * Aplica theme + mode no <html> antes do snapshot.
 * Theme = className (.theme-education / .theme-kumon / .theme-impactx).
 * Mode = data-mode (light = sem atributo; dark = data-mode="dark").
 */
async function applyTheme(page: import("@playwright/test").Page, theme: string, mode: string) {
  await page.evaluate(({ theme, mode }) => {
    const html = document.documentElement
    // Limpa themes anteriores e seta o atual
    html.classList.remove("theme-education", "theme-kumon", "theme-impactx")
    html.classList.add(`theme-${theme}`)
    // Mode
    if (mode === "dark") {
      html.setAttribute("data-mode", "dark")
    } else {
      html.removeAttribute("data-mode")
    }
  }, { theme, mode })
  // Permite repaint do CSS
  await page.waitForTimeout(150)
}

for (const route of SHOWCASE_ROUTES) {
  for (const theme of THEMES) {
    for (const mode of MODES) {
      const snapshotName = `${route.replace(/\//g, "-").slice(1)}--${theme}--${mode}.png`

      test(`visual: ${route} [${theme}/${mode}]`, async ({ page }) => {
        await page.goto(route, { waitUntil: "domcontentloaded" })
        await page.waitForLoadState("load")
        await applyTheme(page, theme, mode)
        // Wait extra tick pra mounts client-side e color-mix recompute
        await page.waitForTimeout(300)
        await expect(page).toHaveScreenshot(snapshotName, { fullPage: true })
      })
    }
  }

  // A11y roda 1x por rota (em theme/mode default — education/light).
  // A11y nao depende de tema (axe checa contraste com cor computada, mas
  // gerar 54 a11y runs vira ruido — basta validar 1 vez por rota).
  test(`a11y: ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" })
    await page.waitForLoadState("load")
    await page.waitForTimeout(300)

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze()

    // Phase 1 gate: only fail on "critical" impact (missing labels, broken aria).
    // "serious" (e.g., color-contrast on muted text, scrollable-region without
    // keyboard) is tracked but doesn't block — will be tightened to "serious"
    // after the existing violations are triaged.
    const blocking = results.violations.filter((v) => v.impact === "critical")
    const serious = results.violations.filter((v) => v.impact === "serious")

    if (serious.length > 0) {
      console.warn(
        `[a11y warn ${route}] ${serious.length} serious violations:`,
        serious.map((v) => v.id).join(", ")
      )
    }

    if (blocking.length > 0) {
      const summary = blocking
        .map((v) => `- ${v.id} (${v.impact}): ${v.help}\n  nodes: ${v.nodes.length}`)
        .join("\n")
      throw new Error(`A11y critical violations on ${route}:\n${summary}`)
    }
  })
}
