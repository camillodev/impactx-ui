"use client"

import * as React from "react"
import {
  FormPageTemplate,
  Button,
  Stack,
  Input,
  Textarea,
} from "@impactx/ds-education"

interface FormValues {
  nome: string
  cpf: string
  dataNascimento: string
  email: string
  telefone: string
  turma: string
  observacoes: string
}

export default function FormPageExample() {
  const [values, setValues] = React.useState<FormValues>({
    nome: "",
    cpf: "",
    dataNascimento: "",
    email: "",
    telefone: "",
    turma: "",
    observacoes: "",
  })

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(`Formulário submetido!\n${JSON.stringify(values, null, 2)}`)
  }

  return (
    <FormPageTemplate
      title="Novo aluno"
      description="Preencha os dados para cadastrar um novo aluno na unidade."
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Alunos", href: "/alunos" },
        { label: "Novo aluno" },
      ]}
      backHref="/alunos"
      onSubmit={handleSubmit}
      primaryAction={
        <Button type="submit" variant="primary">
          Salvar aluno
        </Button>
      }
      secondaryAction={
        <Button type="button" variant="tertiary" onClick={() => window.history.back()}>
          Cancelar
        </Button>
      }
    >
      <Stack gap="md">
        <Input
          label="Nome completo"
          placeholder="Ex: Maria Silva"
          value={values.nome}
          onChange={(e) => handleChange("nome", e.target.value)}
          required
        />
        <Input
          label="CPF"
          placeholder="000.000.000-00"
          value={values.cpf}
          onChange={(e) => handleChange("cpf", e.target.value)}
        />
        <Input
          label="Data de nascimento"
          type="date"
          value={values.dataNascimento}
          onChange={(e) => handleChange("dataNascimento", e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          placeholder="maria@example.com"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          label="Telefone"
          placeholder="(31) 99999-9999"
          value={values.telefone}
          onChange={(e) => handleChange("telefone", e.target.value)}
        />
        <div>
          <label htmlFor="form-turma" className="text-sm font-medium text-[var(--color-text)] block mb-1.5">
            Turma
          </label>
          <select
            id="form-turma"
            value={values.turma}
            onChange={(e) => handleChange("turma", e.target.value)}
            className="flex h-10 w-full items-center rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm text-[var(--color-text)]"
          >
            <option value="">Selecione uma turma</option>
            <option value="mat-a">Matemática A</option>
            <option value="por-b">Português B</option>
            <option value="ing-c">Inglês C</option>
          </select>
        </div>
        <Textarea
          label="Observações"
          placeholder="Adicione informações relevantes sobre o aluno…"
          rows={4}
          value={values.observacoes}
          onChange={(e) => handleChange("observacoes", e.target.value)}
        />
      </Stack>
    </FormPageTemplate>
  )
}
