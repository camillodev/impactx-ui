// apps/web/src/app/templates/_mock-kumon-data.ts
// Mock data compartilhado para os templates Kumon (Wave 2: matricula, relatorios, alunos).
// Tudo inline; sem dependências externas.

export type Disciplina = "Matemática" | "Português" | "Inglês"

export type Level =
  | "7A"
  | "6A"
  | "5A"
  | "4A"
  | "3A"
  | "2A"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"

export const LEVELS_ORDER: Level[] = [
  "7A",
  "6A",
  "5A",
  "4A",
  "3A",
  "2A",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
]

export type AlunoStatus = "ativo" | "trancado" | "concluido" | "novo"

export interface Aluno {
  id: string
  nome: string
  email: string
  avatarUrl?: string
  status: AlunoStatus
  matriculadoDesde: string // ISO date
  ultimaSessao: string // ISO date
  disciplinas: {
    disciplina: Disciplina
    levelAtual: Level
    folhasConcluidas: number
    taxaAcerto: number // 0-100
  }[]
  orientadora: string
}

export interface Folha {
  id: string
  alunoId: string
  disciplina: Disciplina
  level: Level
  numero: string // ex "5A-21"
  dataConclusao?: string
  taxaAcerto?: number
  tempoMedio?: number // minutos
}

export interface Sessao {
  id: string
  alunoId: string
  data: string // ISO datetime
  disciplinas: Disciplina[]
  folhasEntregues: number
  observacoes?: string
}

export const ORIENTADORAS = [
  "Profª. Camila Rodrigues",
  "Profª. Ana Paula Mendes",
  "Profº. Roberto Alves",
  "Profª. Letícia Borges",
]

// 30 alunos mock — variação de status, disciplinas, levels e taxas.
export const ALUNOS: Aluno[] = [
  {
    id: "a-001",
    nome: "Mariana Silva Costa",
    email: "mariana.silva@email.com",
    status: "ativo",
    matriculadoDesde: "2024-03-15",
    ultimaSessao: "2026-04-28",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "4A", folhasConcluidas: 287, taxaAcerto: 92 },
      { disciplina: "Português", levelAtual: "5A", folhasConcluidas: 198, taxaAcerto: 88 },
    ],
    orientadora: "Profª. Camila Rodrigues",
  },
  {
    id: "a-002",
    nome: "Lucas Almeida Ferreira",
    email: "lucas.almeida@email.com",
    status: "ativo",
    matriculadoDesde: "2023-08-02",
    ultimaSessao: "2026-04-29",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "C", folhasConcluidas: 612, taxaAcerto: 95 },
      { disciplina: "Inglês", levelAtual: "B", folhasConcluidas: 410, taxaAcerto: 90 },
    ],
    orientadora: "Profª. Ana Paula Mendes",
  },
  {
    id: "a-003",
    nome: "Júlia Pereira Souza",
    email: "julia.pereira@email.com",
    status: "ativo",
    matriculadoDesde: "2024-01-10",
    ultimaSessao: "2026-04-27",
    disciplinas: [
      { disciplina: "Português", levelAtual: "3A", folhasConcluidas: 220, taxaAcerto: 85 },
    ],
    orientadora: "Profº. Roberto Alves",
  },
  {
    id: "a-004",
    nome: "Pedro Henrique Souza",
    email: "pedro.henrique@email.com",
    status: "ativo",
    matriculadoDesde: "2022-11-20",
    ultimaSessao: "2026-04-26",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "E", folhasConcluidas: 890, taxaAcerto: 96 },
      { disciplina: "Português", levelAtual: "D", folhasConcluidas: 705, taxaAcerto: 91 },
      { disciplina: "Inglês", levelAtual: "C", folhasConcluidas: 480, taxaAcerto: 89 },
    ],
    orientadora: "Profª. Letícia Borges",
  },
  {
    id: "a-005",
    nome: "Beatriz Oliveira Lima",
    email: "beatriz.oliveira@email.com",
    status: "ativo",
    matriculadoDesde: "2024-06-05",
    ultimaSessao: "2026-04-28",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "5A", folhasConcluidas: 175, taxaAcerto: 82 },
      { disciplina: "Inglês", levelAtual: "6A", folhasConcluidas: 120, taxaAcerto: 78 },
    ],
    orientadora: "Profª. Camila Rodrigues",
  },
  {
    id: "a-006",
    nome: "Gabriel Santos Ribeiro",
    email: "gabriel.santos@email.com",
    status: "ativo",
    matriculadoDesde: "2023-02-14",
    ultimaSessao: "2026-04-29",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "B", folhasConcluidas: 540, taxaAcerto: 93 },
    ],
    orientadora: "Profª. Ana Paula Mendes",
  },
  {
    id: "a-007",
    nome: "Sofia Martins Cardoso",
    email: "sofia.martins@email.com",
    status: "ativo",
    matriculadoDesde: "2024-09-01",
    ultimaSessao: "2026-04-25",
    disciplinas: [
      { disciplina: "Português", levelAtual: "4A", folhasConcluidas: 142, taxaAcerto: 86 },
      { disciplina: "Inglês", levelAtual: "5A", folhasConcluidas: 95, taxaAcerto: 80 },
    ],
    orientadora: "Profº. Roberto Alves",
  },
  {
    id: "a-008",
    nome: "Rafael Carvalho Dias",
    email: "rafael.carvalho@email.com",
    status: "ativo",
    matriculadoDesde: "2023-05-22",
    ultimaSessao: "2026-04-28",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "A", folhasConcluidas: 420, taxaAcerto: 94 },
      { disciplina: "Português", levelAtual: "B", folhasConcluidas: 360, taxaAcerto: 87 },
    ],
    orientadora: "Profª. Letícia Borges",
  },
  {
    id: "a-009",
    nome: "Isabela Rocha Nogueira",
    email: "isabela.rocha@email.com",
    status: "ativo",
    matriculadoDesde: "2024-04-18",
    ultimaSessao: "2026-04-29",
    disciplinas: [
      { disciplina: "Inglês", levelAtual: "3A", folhasConcluidas: 240, taxaAcerto: 88 },
    ],
    orientadora: "Profª. Camila Rodrigues",
  },
  {
    id: "a-010",
    nome: "Matheus Barbosa Pinto",
    email: "matheus.barbosa@email.com",
    status: "ativo",
    matriculadoDesde: "2022-07-30",
    ultimaSessao: "2026-04-27",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "D", folhasConcluidas: 760, taxaAcerto: 97 },
      { disciplina: "Português", levelAtual: "C", folhasConcluidas: 590, taxaAcerto: 92 },
    ],
    orientadora: "Profª. Ana Paula Mendes",
  },
  {
    id: "a-011",
    nome: "Helena Cunha Vieira",
    email: "helena.cunha@email.com",
    status: "ativo",
    matriculadoDesde: "2024-02-08",
    ultimaSessao: "2026-04-26",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "3A", folhasConcluidas: 268, taxaAcerto: 89 },
      { disciplina: "Português", levelAtual: "2A", folhasConcluidas: 310, taxaAcerto: 91 },
      { disciplina: "Inglês", levelAtual: "4A", folhasConcluidas: 180, taxaAcerto: 84 },
    ],
    orientadora: "Profº. Roberto Alves",
  },
  {
    id: "a-012",
    nome: "Enzo Gabriel Moreira",
    email: "enzo.gabriel@email.com",
    status: "ativo",
    matriculadoDesde: "2023-10-12",
    ultimaSessao: "2026-04-28",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "2A", folhasConcluidas: 380, taxaAcerto: 90 },
    ],
    orientadora: "Profª. Letícia Borges",
  },
  {
    id: "a-013",
    nome: "Valentina Lopes Araújo",
    email: "valentina.lopes@email.com",
    status: "ativo",
    matriculadoDesde: "2024-07-22",
    ultimaSessao: "2026-04-29",
    disciplinas: [
      { disciplina: "Português", levelAtual: "5A", folhasConcluidas: 130, taxaAcerto: 83 },
      { disciplina: "Inglês", levelAtual: "6A", folhasConcluidas: 88, taxaAcerto: 76 },
    ],
    orientadora: "Profª. Camila Rodrigues",
  },
  {
    id: "a-014",
    nome: "Bernardo Cavalcante Mota",
    email: "bernardo.cavalcante@email.com",
    status: "ativo",
    matriculadoDesde: "2023-03-09",
    ultimaSessao: "2026-04-27",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "B", folhasConcluidas: 560, taxaAcerto: 94 },
      { disciplina: "Inglês", levelAtual: "A", folhasConcluidas: 420, taxaAcerto: 90 },
    ],
    orientadora: "Profª. Ana Paula Mendes",
  },
  {
    id: "a-015",
    nome: "Lara Fernandes Teixeira",
    email: "lara.fernandes@email.com",
    status: "ativo",
    matriculadoDesde: "2024-05-30",
    ultimaSessao: "2026-04-28",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "4A", folhasConcluidas: 210, taxaAcerto: 87 },
    ],
    orientadora: "Profº. Roberto Alves",
  },
  {
    id: "a-016",
    nome: "Davi Lucca Monteiro",
    email: "davi.lucca@email.com",
    status: "ativo",
    matriculadoDesde: "2022-09-15",
    ultimaSessao: "2026-04-26",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "E", folhasConcluidas: 920, taxaAcerto: 95 },
      { disciplina: "Português", levelAtual: "D", folhasConcluidas: 740, taxaAcerto: 89 },
    ],
    orientadora: "Profª. Letícia Borges",
  },
  {
    id: "a-017",
    nome: "Manuela Castro Ramos",
    email: "manuela.castro@email.com",
    status: "ativo",
    matriculadoDesde: "2024-08-19",
    ultimaSessao: "2026-04-29",
    disciplinas: [
      { disciplina: "Português", levelAtual: "6A", folhasConcluidas: 96, taxaAcerto: 81 },
      { disciplina: "Inglês", levelAtual: "7A", folhasConcluidas: 60, taxaAcerto: 75 },
    ],
    orientadora: "Profª. Camila Rodrigues",
  },
  {
    id: "a-018",
    nome: "Theo Mendes Correia",
    email: "theo.mendes@email.com",
    status: "ativo",
    matriculadoDesde: "2023-06-28",
    ultimaSessao: "2026-04-28",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "A", folhasConcluidas: 460, taxaAcerto: 93 },
    ],
    orientadora: "Profª. Ana Paula Mendes",
  },
  {
    id: "a-019",
    nome: "Alice Gomes Batista",
    email: "alice.gomes@email.com",
    status: "ativo",
    matriculadoDesde: "2024-03-25",
    ultimaSessao: "2026-04-27",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "5A", folhasConcluidas: 195, taxaAcerto: 86 },
      { disciplina: "Português", levelAtual: "4A", folhasConcluidas: 240, taxaAcerto: 90 },
    ],
    orientadora: "Profº. Roberto Alves",
  },
  {
    id: "a-020",
    nome: "Arthur Nunes Tavares",
    email: "arthur.nunes@email.com",
    status: "ativo",
    matriculadoDesde: "2023-12-04",
    ultimaSessao: "2026-04-29",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "3A", folhasConcluidas: 295, taxaAcerto: 88 },
      { disciplina: "Inglês", levelAtual: "4A", folhasConcluidas: 175, taxaAcerto: 82 },
    ],
    orientadora: "Profª. Letícia Borges",
  },
  {
    id: "a-021",
    nome: "Cecília Andrade Pires",
    email: "cecilia.andrade@email.com",
    status: "ativo",
    matriculadoDesde: "2022-04-11",
    ultimaSessao: "2026-04-28",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "D", folhasConcluidas: 810, taxaAcerto: 96 },
      { disciplina: "Português", levelAtual: "C", folhasConcluidas: 645, taxaAcerto: 92 },
      { disciplina: "Inglês", levelAtual: "B", folhasConcluidas: 470, taxaAcerto: 89 },
    ],
    orientadora: "Profª. Camila Rodrigues",
  },
  {
    id: "a-022",
    nome: "Murilo Freitas Aragão",
    email: "murilo.freitas@email.com",
    status: "ativo",
    matriculadoDesde: "2024-10-07",
    ultimaSessao: "2026-04-26",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "6A", folhasConcluidas: 72, taxaAcerto: 79 },
    ],
    orientadora: "Profª. Ana Paula Mendes",
  },
  {
    id: "a-023",
    nome: "Larissa Duarte Campos",
    email: "larissa.duarte@email.com",
    status: "trancado",
    matriculadoDesde: "2023-01-16",
    ultimaSessao: "2026-03-12",
    disciplinas: [
      { disciplina: "Português", levelAtual: "B", folhasConcluidas: 380, taxaAcerto: 85 },
    ],
    orientadora: "Profº. Roberto Alves",
  },
  {
    id: "a-024",
    nome: "Felipe Macedo Brito",
    email: "felipe.macedo@email.com",
    status: "trancado",
    matriculadoDesde: "2022-12-03",
    ultimaSessao: "2026-02-28",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "C", folhasConcluidas: 580, taxaAcerto: 88 },
      { disciplina: "Inglês", levelAtual: "D", folhasConcluidas: 420, taxaAcerto: 84 },
    ],
    orientadora: "Profª. Letícia Borges",
  },
  {
    id: "a-025",
    nome: "Yasmin Barros Siqueira",
    email: "yasmin.barros@email.com",
    status: "trancado",
    matriculadoDesde: "2024-01-29",
    ultimaSessao: "2026-04-02",
    disciplinas: [
      { disciplina: "Inglês", levelAtual: "5A", folhasConcluidas: 140, taxaAcerto: 81 },
    ],
    orientadora: "Profª. Camila Rodrigues",
  },
  {
    id: "a-026",
    nome: "Vinícius Coelho Marques",
    email: "vinicius.coelho@email.com",
    status: "trancado",
    matriculadoDesde: "2023-07-14",
    ultimaSessao: "2026-03-22",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "A", folhasConcluidas: 410, taxaAcerto: 87 },
    ],
    orientadora: "Profª. Ana Paula Mendes",
  },
  {
    id: "a-027",
    nome: "Antonella Vasconcelos Reis",
    email: "antonella.vasconcelos@email.com",
    status: "concluido",
    matriculadoDesde: "2020-02-20",
    ultimaSessao: "2026-01-15",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "O", folhasConcluidas: 1980, taxaAcerto: 98 },
      { disciplina: "Português", levelAtual: "L", folhasConcluidas: 1620, taxaAcerto: 95 },
    ],
    orientadora: "Profª. Letícia Borges",
  },
  {
    id: "a-028",
    nome: "Heitor Pacheco Cordeiro",
    email: "heitor.pacheco@email.com",
    status: "concluido",
    matriculadoDesde: "2019-09-08",
    ultimaSessao: "2026-02-05",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "M", folhasConcluidas: 1740, taxaAcerto: 97 },
      { disciplina: "Inglês", levelAtual: "K", folhasConcluidas: 1380, taxaAcerto: 94 },
    ],
    orientadora: "Profº. Roberto Alves",
  },
  {
    id: "a-029",
    nome: "Maria Clara Sales Bezerra",
    email: "maria.clara@email.com",
    status: "novo",
    matriculadoDesde: "2026-04-15",
    ultimaSessao: "2026-04-28",
    disciplinas: [
      { disciplina: "Matemática", levelAtual: "7A", folhasConcluidas: 8, taxaAcerto: 72 },
    ],
    orientadora: "Profª. Camila Rodrigues",
  },
  {
    id: "a-030",
    nome: "Bruno Henrique Faria",
    email: "bruno.henrique@email.com",
    status: "novo",
    matriculadoDesde: "2026-04-22",
    ultimaSessao: "2026-04-29",
    disciplinas: [
      { disciplina: "Português", levelAtual: "7A", folhasConcluidas: 5, taxaAcerto: 70 },
      { disciplina: "Inglês", levelAtual: "7A", folhasConcluidas: 3, taxaAcerto: 74 },
    ],
    orientadora: "Profª. Ana Paula Mendes",
  },
]

// 80 folhas mock — distribuídas entre alunos ativos, datas dos últimos 30 dias.
function buildFolhas(): Folha[] {
  const out: Folha[] = []
  const ativos = ALUNOS.filter((a) => a.status === "ativo" || a.status === "novo")
  const baseDate = new Date("2026-04-29T18:00:00.000Z").getTime()
  const dayMs = 24 * 60 * 60 * 1000

  for (let i = 0; i < 80; i++) {
    const aluno = ativos[i % ativos.length]!
    const disciplinaInfo = aluno.disciplinas[i % aluno.disciplinas.length]!
    const folhaSeq = ((i * 7) % 200) + 1
    const data = new Date(baseDate - (i % 30) * dayMs).toISOString().slice(0, 10)
    const acertoBase = disciplinaInfo!.taxaAcerto
    const acerto = Math.max(60, Math.min(100, acertoBase + ((i % 7) - 3)))
    const tempo = 8 + (i % 17)

    out.push({
      id: `f-${String(i + 1).padStart(3, "0")}`,
      alunoId: aluno!.id,
      disciplina: disciplinaInfo!.disciplina,
      level: disciplinaInfo!.levelAtual,
      numero: `${disciplinaInfo!.levelAtual}-${folhaSeq}`,
      dataConclusao: data,
      taxaAcerto: acerto,
      tempoMedio: tempo,
    })
  }
  return out
}

export const FOLHAS: Folha[] = buildFolhas()

// 50 sessões mock — últimas 8 semanas (~56 dias).
function buildSessoes(): Sessao[] {
  const out: Sessao[] = []
  const candidatos = ALUNOS.filter((a) => a.status === "ativo" || a.status === "novo")
  const baseDate = new Date("2026-04-29T14:00:00.000Z").getTime()
  const dayMs = 24 * 60 * 60 * 1000
  const obs = [
    "Excelente foco hoje.",
    "Precisou de revisão em frações.",
    "Avançou para a próxima folha.",
    "Apresentou dúvidas em vocabulário.",
    "Muito bem na leitura interpretativa.",
    undefined,
    undefined,
  ]

  for (let i = 0; i < 50; i++) {
    const aluno = candidatos[i % candidatos.length]!
    const offsetDays = (i * 3) % 56
    const hour = 9 + (i % 8)
    const dt = new Date(baseDate - offsetDays * dayMs)
    dt.setUTCHours(hour, 0, 0, 0)
    const disciplinasSessao =
      aluno.disciplinas.length === 1
        ? [aluno.disciplinas[0]!.disciplina]
        : aluno.disciplinas.slice(0, ((i % aluno.disciplinas.length) + 1)).map((d) => d.disciplina)
    const folhasEntregues = 3 + (i % 6)

    out.push({
      id: `s-${String(i + 1).padStart(3, "0")}`,
      alunoId: aluno!.id,
      data: dt.toISOString(),
      disciplinas: disciplinasSessao,
      folhasEntregues,
      observacoes: obs[i % obs.length],
    })
  }
  return out
}

export const SESSOES: Sessao[] = buildSessoes()

// Helpers
export function getAlunoById(id: string): Aluno | undefined {
  return ALUNOS.find((a) => a.id === id)
}

export function getFolhasByAluno(alunoId: string): Folha[] {
  return FOLHAS.filter((f) => f.alunoId === alunoId)
}

export function getSessoesByAluno(alunoId: string): Sessao[] {
  return SESSOES.filter((s) => s.alunoId === alunoId)
}

// Stats agregadas pra dashboard
export const STATS = {
  alunosAtivos: ALUNOS.filter((a) => a.status === "ativo").length,
  novosNoMes: ALUNOS.filter((a) => a.status === "novo").length,
  sessoesNoMes: 248,
  folhasConcluidasNoMes: 3142,
  levelsAvancadosNoMes: 18,
  unidadeNome: "Kumon Camargos",
}
