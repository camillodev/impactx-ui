"use client"

import * as React from "react"
import { Camera } from "lucide-react"
import {
  Modal,
  Button,
  Input,
  Avatar,
  Chip,
  Badge,
  Stat,
  BannerCTA,
  cn,
} from "@impactxlab/ds-education"

// ─── Types ────────────────────────────────────────────────────────────────

export type Disciplina = "Matemática" | "Português" | "Inglês"

export interface MatriculaFormData {
  aluno: {
    nome: string
    email: string
    idade: number
    responsavel: string
  }
  disciplinas: Disciplina[]
  diagnosticaInicial: {
    observacoes: string
  }
}

export interface MatriculaModalProps {
  open: boolean
  onClose: () => void
  onSubmit?: (data: MatriculaFormData) => void
}

const INITIAL_FORM: MatriculaFormData = {
  aluno: { nome: "", email: "", idade: 0, responsavel: "" },
  disciplinas: [],
  diagnosticaInicial: { observacoes: "" },
}

const DISCIPLINAS: Disciplina[] = ["Matemática", "Português", "Inglês"]

type Step = 1 | 2 | 3 | 4

// ─── Component ────────────────────────────────────────────────────────────

export function MatriculaModal({ open, onClose, onSubmit }: MatriculaModalProps) {
  const [step, setStep] = React.useState<Step>(1)
  const [formData, setFormData] = React.useState<MatriculaFormData>(INITIAL_FORM)

  const next = () => setStep((s) => Math.min(4, s + 1) as Step)
  const prev = () => setStep((s) => Math.max(1, s - 1) as Step)

  const reset = React.useCallback(() => {
    setStep(1)
    setFormData(INITIAL_FORM)
    onClose()
  }, [onClose])

  const submit = () => {
    onSubmit?.(formData)
    reset()
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) reset()
  }

  // ─── Validação por step ──────────────────────────────────────────────────
  const isStepValid = ((): boolean => {
    if (step === 1) {
      const { nome, email, idade, responsavel } = formData.aluno
      return (
        nome.trim().length > 0 &&
        email.trim().length > 0 &&
        idade > 0 &&
        responsavel.trim().length > 0
      )
    }
    if (step === 2) {
      return formData.disciplinas.length >= 1
    }
    return true
  })()

  // ─── Handlers de form ────────────────────────────────────────────────────
  const updateAluno = (patch: Partial<MatriculaFormData["aluno"]>) =>
    setFormData((f) => ({ ...f, aluno: { ...f.aluno, ...patch } }))

  const toggleDisciplina = (d: Disciplina) =>
    setFormData((f) => ({
      ...f,
      disciplinas: f.disciplinas.includes(d)
        ? f.disciplinas.filter((x) => x !== d)
        : [...f.disciplinas, d],
    }))

  const updateObservacoes = (observacoes: string) =>
    setFormData((f) => ({ ...f, diagnosticaInicial: { observacoes } }))

  return (
    <Modal open={open} onOpenChange={handleOpenChange}>
      <Modal.Content className="sm:max-w-2xl">
        <Modal.Header>
          <div className="flex flex-col gap-1">
            <Modal.Title>Nova matrícula</Modal.Title>
            <Modal.Description className="text-sm text-[var(--color-text-muted)]">
              Etapa {step} de 4
            </Modal.Description>
          </div>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body className="flex flex-col gap-6">
          {/* Step indicator */}
          <div className="flex items-center gap-2" aria-label="Progresso">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-2 flex-1 rounded-full transition-colors",
                  s <= step
                    ? "bg-[var(--color-primary)]"
                    : "bg-[var(--color-border)]"
                )}
              />
            ))}
          </div>

          {step === 1 && (
            <StepDadosAluno data={formData.aluno} onChange={updateAluno} />
          )}
          {step === 2 && (
            <StepDisciplinas
              value={formData.disciplinas}
              onToggle={toggleDisciplina}
            />
          )}
          {step === 3 && (
            <StepDiagnostica
              observacoes={formData.diagnosticaInicial.observacoes}
              onChange={updateObservacoes}
            />
          )}
          {step === 4 && <StepConfirmacao data={formData} />}
        </Modal.Body>

        <Modal.Footer className="justify-between">
          <Button
            variant="tertiary"
            onClick={step === 1 ? reset : prev}
          >
            {step === 1 ? "Cancelar" : "Voltar"}
          </Button>
          <Button
            variant="primary"
            disabled={!isStepValid}
            onClick={step === 4 ? submit : next}
          >
            {step === 4 ? "Confirmar matrícula" : "Próximo"}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

// ─── Step 1 — Dados do aluno ──────────────────────────────────────────────

interface StepDadosAlunoProps {
  data: MatriculaFormData["aluno"]
  onChange: (patch: Partial<MatriculaFormData["aluno"]>) => void
}

function StepDadosAluno({ data, onChange }: StepDadosAlunoProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <Avatar
          size="xl"
          fallback={data.nome || "Aluno"}
          alt={data.nome || "Avatar do aluno"}
        />
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-2 text-sm font-medium",
            "text-[var(--color-primary)] hover:underline"
          )}
        >
          <Camera className="h-4 w-4" />
          Adicionar foto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nome do aluno"
          placeholder="Ex.: Ana Silva"
          value={data.nome}
          onChange={(e) => onChange({ nome: e.target.value })}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="aluno@exemplo.com"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          required
        />
        <Input
          label="Idade"
          type="number"
          min={3}
          max={99}
          placeholder="0"
          value={data.idade > 0 ? String(data.idade) : ""}
          onChange={(e) =>
            onChange({ idade: Number.parseInt(e.target.value, 10) || 0 })
          }
          required
        />
        <Input
          label="Responsável"
          placeholder="Nome completo"
          value={data.responsavel}
          onChange={(e) => onChange({ responsavel: e.target.value })}
          required
        />
      </div>
    </div>
  )
}

// ─── Step 2 — Disciplinas ─────────────────────────────────────────────────

interface StepDisciplinasProps {
  value: Disciplina[]
  onToggle: (d: Disciplina) => void
}

function StepDisciplinas({ value, onToggle }: StepDisciplinasProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-base font-semibold text-[var(--color-text)]">
          Quais disciplinas o aluno vai cursar?
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Selecione pelo menos uma. É possível adicionar mais depois.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {DISCIPLINAS.map((d) => (
          <Chip
            key={d}
            label={d}
            active={value.includes(d)}
            onClick={() => onToggle(d)}
          />
        ))}
      </div>

      {value.length === 0 && (
        <p className="text-xs text-[var(--color-text-muted)]">
          Nenhuma disciplina selecionada.
        </p>
      )}
    </div>
  )
}

// ─── Step 3 — Diagnóstica inicial ─────────────────────────────────────────

interface StepDiagnosticaProps {
  observacoes: string
  onChange: (v: string) => void
}

function StepDiagnostica({ observacoes, onChange }: StepDiagnosticaProps) {
  return (
    <div className="flex flex-col gap-5">
      <BannerCTA
        variant="soft"
        title="Diagnóstica inicial"
        description="A diagnóstica inicial será aplicada na primeira sessão presencial — nada a preencher agora."
        actionLabel="Saiba mais"
      />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="diagnostica-obs"
          className="text-sm font-medium text-[var(--color-text)]"
        >
          Observações do responsável (opcional)
        </label>
        <textarea
          id="diagnostica-obs"
          value={observacoes}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder="Ex.: dificuldades específicas, interesses, observações pedagógicas..."
          className={cn(
            "w-full rounded-md border bg-[var(--color-bg)] px-3.5 py-2.5",
            "text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]",
            "border-[var(--color-border)] outline-none transition-colors",
            "focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20"
          )}
        />
      </div>

      <Stat
        asCard
        label="Início previsto"
        value="Próxima segunda-feira"
        delta="Confirmação por email"
        deltaTrend="neutral"
      />
    </div>
  )
}

// ─── Step 4 — Confirmação ─────────────────────────────────────────────────

interface StepConfirmacaoProps {
  data: MatriculaFormData
}

function StepConfirmacao({ data }: StepConfirmacaoProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-base font-semibold text-[var(--color-text)]">
          Confirme os dados da matrícula
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Revise antes de finalizar — você poderá editar depois nas
          configurações do aluno.
        </p>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SummaryRow label="Aluno" value={data.aluno.nome || "—"} />
        <SummaryRow label="Email" value={data.aluno.email || "—"} />
        <SummaryRow
          label="Idade"
          value={data.aluno.idade > 0 ? `${data.aluno.idade} anos` : "—"}
        />
        <SummaryRow label="Responsável" value={data.aluno.responsavel || "—"} />

        <div className="flex flex-col gap-2 sm:col-span-2">
          <dt className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
            Disciplinas
          </dt>
          <dd className="flex flex-wrap gap-2">
            {data.disciplinas.length > 0 ? (
              data.disciplinas.map((d) => (
                <Badge key={d} variant="primary" size="sm">
                  {d}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-[var(--color-text-muted)]">—</span>
            )}
          </dd>
        </div>

        {data.diagnosticaInicial.observacoes.trim() && (
          <div className="sm:col-span-2">
            <SummaryRow
              label="Observações"
              value={data.diagnosticaInicial.observacoes}
            />
          </div>
        )}
      </dl>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
        {label}
      </dt>
      <dd className="text-sm text-[var(--color-text)]">{value}</dd>
    </div>
  )
}
