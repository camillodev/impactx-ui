import {
  Card,
  CardMedia,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardContent,
  CardMeta,
  Badge,
  Button,
  Avatar,
  IconButton,
  Separator,
  Stack,
  Grid,
} from "@camillodev/ui"
import { MoreHorizontal, GraduationCap, Calendar, BookOpen } from "lucide-react"

// Reference: Figma Alfabeto Card 4156:291 — 5 states × layouts.
// Tudo via tokens — visual segue tema ativo (kumon azul, education azul, impactx verde).

const STATES = [
  { state: "default", label: "Default" },
  { state: "default", label: "Hover (hover me)", hint: "interactive" },
  { state: "active", label: "Active / Selected" },
  { state: "disabled", label: "Disabled" },
  { state: "loading", label: "Loading" },
] as const

type ShowcaseState = "default" | "active" | "disabled" | "loading"

interface CardStateProps {
  state: ShowcaseState
  hint?: string
}

function StateLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
      {children}
    </span>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Vertical · Media=image · Footer=false
// ───────────────────────────────────────────────────────────────────────────

function VerticalImageCard({ state, hint }: CardStateProps) {
  if (state === "loading") {
    return <Card loading direction="vertical" />
  }
  return (
    <Card
      direction="vertical"
      state={state === "active" || state === "disabled" ? state : "default"}
      interactive={hint === "interactive"}
    >
      <CardMedia
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=400"
        alt="Paisagem montanhosa"
      />
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardSubtitle>Subtitle 1</CardSubtitle>
      </CardHeader>
    </Card>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Vertical · Media=image · Footer=true (Figma reference exato)
// ───────────────────────────────────────────────────────────────────────────

function VerticalImageFooterCard({ state, hint }: CardStateProps) {
  if (state === "loading") {
    return <Card loading direction="vertical" />
  }
  return (
    <Card
      direction="vertical"
      state={state === "active" || state === "disabled" ? state : "default"}
      interactive={hint === "interactive"}
    >
      <CardMedia
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=400"
        alt="Paisagem montanhosa"
      />
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardSubtitle>Subtitle 1</CardSubtitle>
      </CardHeader>
      <CardMeta
        avatar={
          <Avatar
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80"
            alt="Maria Silva"
            size="sm"
          />
        }
        caption="Atualizado em 19/4/2021"
        actions={
          <IconButton
            aria-label="Mais ações"
            variant="ghost"
            size="sm"
            icon={<MoreHorizontal />}
          />
        }
      />
    </Card>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Vertical · Media=icon · Footer=false
// ───────────────────────────────────────────────────────────────────────────

function VerticalIconCard({ state, hint }: CardStateProps) {
  if (state === "loading") {
    return <Card loading direction="vertical" />
  }
  return (
    <Card
      direction="vertical"
      state={state === "active" || state === "disabled" ? state : "default"}
      interactive={hint === "interactive"}
    >
      <CardMedia variant="icon">
        <GraduationCap />
      </CardMedia>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardSubtitle>Subtitle 1</CardSubtitle>
      </CardHeader>
    </Card>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Vertical · Media=none · Footer=false
// ───────────────────────────────────────────────────────────────────────────

function VerticalNoneCard({ state, hint }: CardStateProps) {
  if (state === "loading") {
    return <Card loading direction="vertical" />
  }
  return (
    <Card
      direction="vertical"
      state={state === "active" || state === "disabled" ? state : "default"}
      interactive={hint === "interactive"}
    >
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardSubtitle>Subtitle 1</CardSubtitle>
      </CardHeader>
    </Card>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Horizontal · Media=image · Footer=false
// ───────────────────────────────────────────────────────────────────────────

function HorizontalImageCard({ state, hint }: CardStateProps) {
  if (state === "loading") {
    return <Card loading direction="horizontal" />
  }
  return (
    <Card
      direction="horizontal"
      state={state === "active" || state === "disabled" ? state : "default"}
      interactive={hint === "interactive"}
    >
      <CardMedia
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=200"
        alt="Paisagem"
      />
      <CardHeader className="justify-center">
        <CardTitle>Card Title</CardTitle>
        <CardSubtitle>Subtitle 1</CardSubtitle>
      </CardHeader>
    </Card>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Horizontal · Media=image · Footer=true
// ───────────────────────────────────────────────────────────────────────────

function HorizontalImageFooterCard({ state, hint }: CardStateProps) {
  if (state === "loading") {
    return <Card loading direction="horizontal" />
  }
  return (
    <Card
      direction="horizontal"
      state={state === "active" || state === "disabled" ? state : "default"}
      interactive={hint === "interactive"}
    >
      <CardMedia
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=200"
        alt="Paisagem"
      />
      <Stack direction="vertical" className="flex-1 min-w-0">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardSubtitle>Subtitle 1</CardSubtitle>
        </CardHeader>
        <CardMeta
          avatar={
            <Avatar
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80"
              alt=""
              size="sm"
            />
          }
          caption="Atualizado em 19/4/2021"
          actions={
            <IconButton
              aria-label="Mais ações"
              variant="ghost"
              size="sm"
              icon={<MoreHorizontal />}
            />
          }
        />
      </Stack>
    </Card>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Page
// ───────────────────────────────────────────────────────────────────────────

function StateGrid({
  title,
  description,
  renderCard,
}: {
  title: string
  description?: string
  renderCard: (props: CardStateProps) => React.ReactNode
}) {
  return (
    <section className="mb-12">
      <header className="mb-4">
        <h2 className="text-sm font-semibold text-[var(--color-text)]">{title}</h2>
        {description && (
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{description}</p>
        )}
      </header>
      <Grid cols={{ base: 1, sm: 2, md: 3, lg: 5 }} gap="md">
        {STATES.map((entry) => {
          const hint = "hint" in entry ? entry.hint : undefined
          return (
            <Stack key={entry.label} direction="vertical" gap="sm">
              <StateLabel>{entry.label}</StateLabel>
              {renderCard({
                state: entry.state as ShowcaseState,
                ...(hint ? { hint } : {}),
              })}
            </Stack>
          )
        })}
      </Grid>
    </section>
  )
}

export default function CardPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-10 py-12 font-sans">
      <header className="mb-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">Card</h1>
        <p className="text-base text-[var(--color-text-muted)] mb-4">
          Container multi-direção com slots opcionais (CardMedia, CardHeader, CardContent, CardMeta).
          Referência: sistema do Figma Alfabeto (60 variants = direction × media × footer × state).
        </p>
        <p className="text-sm text-[var(--color-text-muted)]">
          <strong className="text-[var(--color-text)]">Tudo via tokens.</strong> Visual segue
          o tema ativo (kumon azul, education azul, impactx verde) automaticamente. Border
          do active state usa <code className="font-mono text-xs">var(--color-border-card-active)</code>.
        </p>
      </header>

      <StateGrid
        title="Vertical · Media=Image · Footer=False"
        renderCard={VerticalImageCard}
      />

      <StateGrid
        title="Vertical · Media=Icon · Footer=False"
        renderCard={VerticalIconCard}
      />

      <StateGrid
        title="Vertical · Media=None · Footer=False"
        renderCard={VerticalNoneCard}
      />

      <StateGrid
        title="Vertical · Media=Image · Footer=True (com Avatar + Data + Actions)"
        description="Padrão usado em lista de matrículas / cards de aluno."
        renderCard={VerticalImageFooterCard}
      />

      <StateGrid
        title="Horizontal · Media=Image · Footer=False"
        renderCard={HorizontalImageCard}
      />

      <StateGrid
        title="Horizontal · Media=Image · Footer=True"
        description="Padrão de lista compacta com meta-info."
        renderCard={HorizontalImageFooterCard}
      />

      {/* Legacy composições — preservadas pra back-compat */}
      <section className="mt-16 pt-12 border-t border-[var(--color-border)]">
        <h2 className="text-base font-semibold text-[var(--color-text)] mb-1">
          Composições legadas
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          API antiga (Card + CardHeader + CardTitle + CardContent) continua funcionando.
        </p>

        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="lg" className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Título do card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--color-text-muted)]">
                Conteúdo descritivo, ações ou qualquer composição.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Com badge</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="success" size="sm">Ativo</Badge>
              <p className="text-sm text-[var(--color-text-muted)] mt-3">
                Composições heterogêneas no body.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Com ação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                Card com botão dentro.
              </p>
              <Button size="sm">Abrir</Button>
            </CardContent>
          </Card>
        </Grid>

        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between gap-4">
                <span className="text-[var(--color-text-muted)]">
                  <BookOpen className="inline size-4 mr-2 align-text-bottom" />
                  Tema
                </span>
                <span className="text-[var(--color-text)] font-medium">Education</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-[var(--color-text-muted)]">
                  <Calendar className="inline size-4 mr-2 align-text-bottom" />
                  Modo
                </span>
                <span className="text-[var(--color-text)] font-medium">Light</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
