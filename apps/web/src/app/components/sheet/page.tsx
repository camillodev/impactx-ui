"use client"

import * as React from "react"
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  Button,
  Input,
  Grid,
} from "@camillodev/ui"

export default function SheetPlayground() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")

  return (
    <div style={{ padding: 32, maxWidth: 960, margin: "0 auto" }}>
      <h1 className="text-[28px] font-bold mb-2 text-[var(--color-text)]">Sheet</h1>
      <p className="mb-8 text-[var(--color-text-muted)]">
        Drawer / slide-over baseado em Radix Dialog. Suporta 4 lados: top, right, bottom, left.
      </p>

      <div className="flex gap-3 flex-wrap">

        {/* 1. Right — formulário de convite */}
        <Sheet>
          <SheetTrigger asChild>
            <Button>Right (default)</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Convidar membro</SheetTitle>
              <SheetDescription>
                Preencha os dados para enviar o convite por e-mail.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 overflow-y-auto flex-1 px-6 py-2">
              <Input
                label="Nome completo"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex.: Ana Souza"
              />
              <Input
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ana@empresa.com"
              />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[var(--color-text)]">Função</label>
                <select
                  className="h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  defaultValue="member"
                >
                  <option value="admin">Admin</option>
                  <option value="member">Membro</option>
                  <option value="viewer">Visualizador</option>
                </select>
              </div>
            </div>
            <SheetFooter className="flex-row justify-end">
              <SheetClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </SheetClose>
              <Button>Enviar convite</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* 2. Left — menu de navegação */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary">Left</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navegação</SheetTitle>
              <SheetDescription>Acesse as seções do painel.</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-1 flex-1 overflow-y-auto px-6 py-2">
              {[
                "Dashboard",
                "Avaliações",
                "Relatórios",
                "Alunos",
                "Configurações",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-secondary-hover)] transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="ghost" className="w-full">
                  Fechar menu
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* 3. Bottom — filtros rápidos */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary">Bottom</Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>
                Selecione os critérios para filtrar os resultados.
              </SheetDescription>
            </SheetHeader>
            <Grid cols={{ base: 2, sm: 3 }} gap="sm" className="px-6 py-4">
              {[
                "Matemática",
                "Português",
                "Ciências",
                "História",
                "Geografia",
                "Inglês",
              ].map((subject) => (
                <label
                  key={subject}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[var(--color-primary)] rounded"
                  />
                  <span className="text-sm text-[var(--color-text)]">{subject}</span>
                </label>
              ))}
            </Grid>
            <SheetFooter className="flex-row justify-end">
              <SheetClose asChild>
                <Button variant="secondary">Limpar</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button>Aplicar filtros</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* 4. Top — notificação / anúncio */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">Top</Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>Novidade disponível</SheetTitle>
              <SheetDescription>
                Uma nova versão do painel foi lançada com melhorias de desempenho e novos relatórios.
              </SheetDescription>
            </SheetHeader>
            <div className="px-6 py-2">
              <ul className="flex flex-col gap-1 text-sm text-[var(--color-text-muted)]">
                <li>• Relatórios por turma com comparativo mensal</li>
                <li>• Exportação em PDF com 1 clique</li>
                <li>• Dashboard remodelado para mobile</li>
              </ul>
            </div>
            <SheetFooter className="flex-row justify-end">
              <SheetClose asChild>
                <Button variant="secondary">Mais tarde</Button>
              </SheetClose>
              <Button>Ver novidades</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

      </div>
    </div>
  )
}
