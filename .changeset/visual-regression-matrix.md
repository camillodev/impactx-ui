---
---

Internal: visual regression spec ganha matriz `3 temas (education/kumon/impactx) × 2 modes (light/dark) × 3 viewports (mobile/tablet/desktop) × 3 rotas críticas (button/card/input)` = 54 snapshots. Substituiu spec antigo (12 rotas × 3 viewports × 1 tema × light). Captura regressão visual cross-tema e cross-mode em uma rede de 54 estados ao invés de 36. Rotas críticas são as 3 onde mudanças de token/cor aparecem antes de qualquer outro lugar. Sem mudanças no package publicável.
