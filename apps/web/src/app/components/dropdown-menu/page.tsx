"use client"

import * as React from "react"
import { User, Settings, LogOut, Trash2, Copy, Edit2, Share2, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
} from "@camillodev/ui"
import { Button } from "@camillodev/ui"

export default function DropdownMenuPage() {
  const [showStatus, setShowStatus] = React.useState(true)
  const [showActivity, setShowActivity] = React.useState(false)
  const [role, setRole] = React.useState("viewer")

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-[28px] font-bold mb-2 text-[var(--color-text)]">DropdownMenu</h1>
      <p className="mb-10 text-[var(--color-text-muted)]">
        Compound Radix completo — Item, CheckboxItem, RadioItem, SubMenu, Shortcut.
      </p>

      <div className="flex flex-wrap gap-6 items-start">

        {/* 1. Menu simples com separator e item destrutivo */}
        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
            Simples + Destrutivo
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                Opções <ChevronDown className="ml-1 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Conta</DropdownMenuLabel>
              <DropdownMenuItem>
                <User />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[var(--color-danger-primary)] focus:text-[var(--color-danger-primary)] focus:bg-[var(--color-danger-soft)]">
                <LogOut />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        {/* 2. Com Shortcuts */}
        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
            Com Shortcuts
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                Arquivo <ChevronDown className="ml-1 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <Copy />
                Copiar
                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit2 />
                Editar
                <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 />
                Compartilhar
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[var(--color-danger-primary)] focus:text-[var(--color-danger-primary)] focus:bg-[var(--color-danger-soft)]">
                <Trash2 />
                Excluir
                <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        {/* 3. CheckboxItems */}
        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
            Checkbox Items
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                Visualizar <ChevronDown className="ml-1 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Colunas visíveis</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
                Status
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showActivity} onCheckedChange={setShowActivity}>
                Atividade recente
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked disabled>
                Nome (obrigatório)
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        {/* 4. RadioGroup */}
        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
            Radio Group
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                Permissão: {role === "admin" ? "Admin" : role === "editor" ? "Editor" : "Leitor"}{" "}
                <ChevronDown className="ml-1 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Nível de acesso</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={role} onValueChange={setRole}>
                <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="editor">Editor</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="viewer">Leitor</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        {/* 5. SubMenu */}
        <section className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
            Sub Menu
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                Ações <ChevronDown className="ml-1 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Edit2 />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Share2 />
                    Compartilhar
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Por e-mail</DropdownMenuItem>
                    <DropdownMenuItem>Por link</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Exportar como PDF</DropdownMenuItem>
                    <DropdownMenuItem>Exportar como CSV</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-[var(--color-danger-primary)] focus:text-[var(--color-danger-primary)] focus:bg-[var(--color-danger-soft)]">
                  <Trash2 />
                  Excluir
                  <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

      </div>
    </div>
  )
}
