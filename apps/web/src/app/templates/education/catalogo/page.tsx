"use client"

import { useState } from "react"
import {
  HeroBanner,
  CategoryCard,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
} from "@impactx/ds-education"
import {
  BarChart3,
  PieChart,
  Users,
  School,
  BookOpen,
  Target,
  TrendingUp,
  Award,
} from "lucide-react"

const reports = [
  { id: "visao-geral", title: "Visão geral", subtitle: "Resumo executivo da rede", icon: BarChart3 },
  { id: "questoes", title: "Análise por questão", subtitle: "Detalhamento item a item", icon: PieChart },
  { id: "alunos", title: "Por aluno", subtitle: "Desempenho individual", icon: Users },
  { id: "escolas", title: "Por escola", subtitle: "Comparativo entre unidades", icon: School },
  { id: "componentes", title: "Componentes curriculares", subtitle: "Matemática, Português, Ciências…", icon: BookOpen },
  { id: "habilidades", title: "Habilidades BNCC", subtitle: "Mapa de fragilidades", icon: Target },
  { id: "evolucao", title: "Evolução temporal", subtitle: "Comparativo entre bimestres", icon: TrendingUp },
  { id: "destaques", title: "Destaques", subtitle: "Top alunos e turmas", icon: Award },
]

export default function CatalogoTemplate() {
  const [active, setActive] = useState<string>("visao-geral")

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-8">
      <HeroBanner
        eyebrow="Catálogo"
        title="Relatórios disponíveis"
        description="Escolha o recorte ideal para entender o desempenho da sua rede."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reports.map((r) => (
          <CategoryCard
            key={r.id}
            icon={r.icon}
            title={r.title}
            subtitle={r.subtitle}
            active={active === r.id}
            onClick={() => setActive(r.id)}
          />
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Atualizações recentes</CardTitle>
          <Badge variant="success">Novo</Badge>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>Relatório de Habilidades BNCC agora cobre o 9º Ano EF.</li>
            <li>Comparativo regional disponível para redes municipais a partir de 03/2026.</li>
            <li>Exportação em PDF unificada por escola ou turma.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
