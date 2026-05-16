"use client"

import * as React from "react"
import { Trash2, AlertTriangle, RotateCcw, LogOut } from "lucide-react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@impactxlab/ds-education"
import { Button } from "@impactxlab/ds-education"

export default function AlertDialogPlayground() {
  const [deletedItem, setDeletedItem] = React.useState<string | null>(null)
  const [publishedAt, setPublishedAt] = React.useState<string | null>(null)

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <h1 className="text-[28px] font-bold mb-2 text-[var(--color-text)]">
        AlertDialog
      </h1>
      <p className="mb-8 text-[var(--color-text-muted)]">
        Compound Radix para ações críticas ou destrutivas. Foca em Confirm/Cancel —
        sem X de fechar, sem clicar fora para dispensar.
      </p>

      {/* ── API note ── */}
      <p className="mb-6 text-xs text-[var(--color-text-muted)] font-mono bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3">
        {`<AlertDialogAction variant="danger|danger-secondary|primary|..."> `}
        — passa diretamente para Button. Variantes disponíveis: primary (default), secondary, danger, danger-primary, danger-secondary, danger-tertiary, tertiary, tertiary-dark.
      </p>

      <div className="flex gap-3 flex-wrap">

        {/* 1. Confirmar exclusão — variant="danger" (filled destrutivo) */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="danger-secondary">
              <Trash2 />
              Excluir aluno
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir aluno permanentemente?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. O aluno{" "}
                <strong>João da Silva</strong> e todos os seus dados de progresso,
                avaliações e histórico serão removidos definitivamente do sistema.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {/* Cancel: variant="secondary" (default) */}
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              {/* Action: variant="danger" — filled vermelho */}
              <AlertDialogAction
                variant="danger"
                onClick={() => setDeletedItem("João da Silva")}
              >
                Excluir permanentemente
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* 2. Confirmar ação reversível — variant="primary" (default) */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Publicar avaliação</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Publicar avaliação?</AlertDialogTitle>
              <AlertDialogDescription>
                A avaliação será disponibilizada para todos os alunos da turma
                imediatamente. Você poderá despublicá-la depois nas configurações.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Agora não</AlertDialogCancel>
              {/* Action: variant="primary" (default) — filled brand */}
              <AlertDialogAction
                onClick={() =>
                  setPublishedAt(new Date().toLocaleTimeString("pt-BR"))
                }
              >
                Publicar agora
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* 3. Descrição longa — variant="danger" */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="tertiary">
              <RotateCcw />
              Redefinir progresso
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <AlertTriangle
                  size={18}
                  className="inline mr-1.5 text-[var(--color-danger-primary)] align-text-bottom"
                />
                Redefinir todo o progresso da turma?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Você está prestes a remover o progresso de <strong>34 alunos</strong>{" "}
                na disciplina <strong>Matemática — Módulo 3</strong>. Isso inclui:
                <br /><br />
                • Todas as atividades concluídas e pendentes
                <br />
                • Pontuações e histórico de tentativas
                <br />
                • Marcos de aprendizagem atingidos
                <br />
                • Relatórios gerados até o momento
                <br /><br />
                Os dados serão mantidos em arquivo por 30 dias antes de serem
                excluídos definitivamente. Esta ação afetará relatórios gerados
                anteriormente e não pode ser desfeita de forma automática.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar operação</AlertDialogCancel>
              <AlertDialogAction variant="danger">
                Sim, redefinir progresso
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* 4. Ação moderada — variant="danger-secondary" (outline destrutivo) */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary">
              <LogOut />
              Encerrar sessão
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Encerrar sessão ativa?</AlertDialogTitle>
              <AlertDialogDescription>
                A sessão do aluno <strong>Maria Oliveira</strong> será encerrada
                imediatamente. Qualquer atividade em andamento não salva será perdida.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Manter sessão</AlertDialogCancel>
              {/* Action: variant="danger-secondary" — outline destrutivo (menos ênfase) */}
              <AlertDialogAction variant="danger-secondary">
                Encerrar sessão
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>

      {/* Feedback visual das ações */}
      {deletedItem && (
        <p className="mt-6 text-sm text-[var(--color-text-muted)]">
          Aluno <strong>{deletedItem}</strong> excluído.{" "}
          <button
            className="underline text-[var(--color-primary)]"
            onClick={() => setDeletedItem(null)}
          >
            Limpar
          </button>
        </p>
      )}
      {publishedAt && (
        <p className="mt-6 text-sm text-[var(--color-text-muted)]">
          Avaliação publicada às <strong>{publishedAt}</strong>.{" "}
          <button
            className="underline text-[var(--color-primary)]"
            onClick={() => setPublishedAt(null)}
          >
            Limpar
          </button>
        </p>
      )}
    </div>
  )
}
