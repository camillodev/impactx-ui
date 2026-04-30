"use client"

import { useState } from "react"
import {
  HeroBanner,
  Tabs,
  TabsContent,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  DonutScore,
  BigCard,
  CtaBanner,
  Badge,
  Stat,
  Avatar,
} from "@impactx/ds-education"
import { Users, BookOpen, CalendarCheck, TrendingUp, Award } from "lucide-react"

export default function RelatorioVisaoGeralTemplate() {
  const [tab] = useState("visao-geral")

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <HeroBanner
        eyebrow="Relatório · Kumon Camargos"
        title="Visão geral"
        description="Resumo da operação da unidade — alunos, sessões, folhas e levels avançados."
      />

      <Tabs value={tab}>
        <TabsContent value="visao-geral" className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Stat asCard label="Alunos ativos" value="124" icon={<Users className="size-5" />} delta="+6" deltaTrend="up" />
            <Stat asCard label="Sessões na semana" value="248" icon={<CalendarCheck className="size-5" />} />
            <Stat asCard label="Folhas concluídas" value="3.142" icon={<BookOpen className="size-5" />} delta="+8%" deltaTrend="up" />
            <Stat asCard label="Levels avançados (mês)" value="18" icon={<TrendingUp className="size-5" />} delta="+4" deltaTrend="up" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Aproveitamento médio por disciplina</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center gap-2">
                <DonutScore value={82} label="Matemática" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <DonutScore value={68} label="Português" warning />
              </div>
              <div className="flex flex-col items-center gap-2">
                <DonutScore value={74} label="Inglês" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Aluno destaque do mês</CardTitle>
              <Badge variant="success">+3 levels em 30 dias</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar name="Mariana Silva" size="lg" />
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">Mariana Silva</span>
                  <span className="text-sm text-muted-foreground">
                    Matemática · Level 4A → 3A · 92% acerto · SRS 4.2
                  </span>
                  <span className="text-xs text-muted-foreground">Última sessão: 28/04/2026</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <BigCard
              title="Próximas sessões"
              description="48 alunos agendados pra essa semana — 12 com folhas planejadas pra avanço de level."
              icon={CalendarCheck}
            />
            <BigCard
              title="Top performers do mês"
              description="6 alunos com avanço de 2+ levels e SRS acima de 4.0."
              icon={Award}
            />
          </div>

          <CtaBanner
            heading="Pronta pra próxima sessão?"
            description="Abra a agenda da semana, revise folhas e prepare diagnósticas pendentes."
            buttonLabel="Agendar próxima sessão"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
