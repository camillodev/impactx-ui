"use client"

import * as React from "react"
import {
  ListPageTemplate,
  DataTableWithPagination,
  type Column,
  Button,
  Badge,
  Cluster,
  Input,
} from "@camillodev/ui"
import { Plus, Search } from "lucide-react"

interface Aluno {
  id: number
  nome: string
  turma: string
  status: "ativo" | "inadimplente" | "trancado"
}

const STATUS: Record<Aluno["status"], { variant: "success" | "danger" | "ink"; label: string }> = {
  ativo: { variant: "success", label: "Ativo" },
  inadimplente: { variant: "danger", label: "Inadimplente" },
  trancado: { variant: "ink", label: "Trancado" },
}

function generate(n: number): Aluno[] {
  const nomes = ["Maria Silva", "João Pedro", "Ana Beatriz", "Carlos Eduardo", "Larissa Costa", "Rafael Mendes", "Sofia Lima", "Felipe Santos"]
  const turmas = ["Matemática A", "Português B", "Inglês C"]
  const statuses: Aluno["status"][] = ["ativo", "ativo", "ativo", "inadimplente", "trancado"]
  return Array.from({ length: n }).map((_, i) => ({
    id: i + 1,
    nome: nomes[i % nomes.length]!,
    turma: turmas[i % turmas.length]!,
    status: statuses[i % statuses.length]!,
  }))
}

const ALUNOS = generate(32)

export default function ListPageExample() {
  const columns: Column<Aluno>[] = [
    { key: "nome", header: "Nome", cell: (a) => <span className="font-medium">{a.nome}</span>, sortable: true, sortAccessor: (a) => a.nome },
    { key: "turma", header: "Turma", cell: (a) => a.turma, sortable: true, sortAccessor: (a) => a.turma },
    { key: "status", header: "Status", cell: (a) => <Badge variant={STATUS[a.status].variant} size="sm">{STATUS[a.status].label}</Badge> },
    { key: "actions", header: "", align: "right", cell: () => <Button variant="tertiary" size="sm">Editar</Button> },
  ]

  return (
    <ListPageTemplate
      title="Alunos"
      description="Gerencie os alunos da unidade Camargos."
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Alunos" },
      ]}
      primaryAction={
        <Button variant="primary">
          <Plus /> Novo aluno
        </Button>
      }
      secondaryActions={
        <Button variant="tertiary">Exportar</Button>
      }
      filters={
        <Cluster gap="sm">
          <Input
            placeholder="Buscar por nome ou CPF…"
            leadingIcon={<Search />}
            containerClassName="w-full max-w-sm"
          />
          <select
            aria-label="Filtrar por status"
            defaultValue=""
            className="h-10 rounded-md border-2 border-[var(--color-border-input)] bg-[var(--color-bg)] px-3 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
          >
            <option value="">Todos os status</option>
            <option value="ativo">Ativo</option>
            <option value="inadimplente">Inadimplente</option>
            <option value="trancado">Trancado</option>
          </select>
        </Cluster>
      }
    >
      <DataTableWithPagination columns={columns} data={ALUNOS} pageSize={10} />
    </ListPageTemplate>
  )
}
