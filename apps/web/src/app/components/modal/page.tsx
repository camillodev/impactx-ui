"use client"

import * as React from "react"
import { FileText, CheckSquare, Clock, AlertTriangle } from "lucide-react"
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter,
  ModalCancel,
  ModalAction,
  ModalBanner,
  ModalCarousel,
  ModalCarouselSlide,
  ModalCarouselNav,
  ModalSplit,
  ModalSplitBody,
  ModalSplitMain,
  ModalSplitAside,
  ModalSplitTitle,
  ModalSplitFooter,
  ModalInfoList,
  ModalInfoItem,
} from "@impactxlab/design-system"
import { Button } from "@impactxlab/design-system"
import { Input } from "@impactxlab/design-system"

const HeroIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <circle cx="34" cy="40" r="30" fill="var(--color-border-muted)" />
    <rect x="28" y="18" width="10" height="32" rx="3" fill="var(--color-primary)" />
    <circle cx="33" cy="58" r="5" fill="var(--color-primary)" />
  </svg>
)

export default function ModalPlayground() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")

  return (
    <div style={{ padding: 32, maxWidth: 1024, margin: "0 auto" }}>
      <h1 className="text-[28px] font-bold mb-2 text-[var(--color-text)]">Modal</h1>
      <p className="mb-8 text-[var(--color-text-muted)]">
        Todos os variants compartilham padding/border/footer canônico do <code>Split</code>. Light/dark
        controlado pelo toggle global do header.
      </p>

      <div className="flex gap-3 flex-wrap">
        {/* 1. Simple — só body + close, sem footer */}
        <Modal>
          <ModalTrigger asChild>
            <Button variant="secondary">Simple</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Sessão expirada</ModalTitle>
              <ModalClose />
            </ModalHeader>
            <ModalBody>
              Sua sessão acabou. Faça login novamente para continuar de onde parou.
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* 2. Confirm — body + cancel + action */}
        <Modal>
          <ModalTrigger asChild>
            <Button>Confirm</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Apagar item</ModalTitle>
              <ModalClose />
            </ModalHeader>
            <ModalBody>
              Tem certeza que quer apagar este item? Esta ação não pode ser desfeita.
            </ModalBody>
            <ModalFooter>
              <ModalCancel>Cancelar</ModalCancel>
              <ModalAction variant="danger">Apagar</ModalAction>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* 3. Form — inputs no body */}
        <Modal>
          <ModalTrigger asChild>
            <Button variant="secondary">Form</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Convidar pessoa</ModalTitle>
              <ModalClose />
            </ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4">
                <Input
                  label="Nome"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome completo"
                />
                <Input
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@empresa.com"
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <ModalCancel>Cancelar</ModalCancel>
              <ModalAction>Enviar convite</ModalAction>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* 4. Welcome — banner + content + 2 CTAs (reusa Split structure) */}
        <Modal>
          <ModalTrigger asChild>
            <Button variant="ghost">Welcome</Button>
          </ModalTrigger>
          <ModalContent size="welcome">
            <ModalSplit>
              <ModalBanner height={200}>
                <div>
                  <div className="text-xs opacity-85 mb-1">NOVIDADE</div>
                  <h2 className="text-[32px] font-extrabold leading-tight">
                    Bem-vindo ao Impact X DS
                  </h2>
                </div>
              </ModalBanner>
              <ModalSplitBody className="pt-8">
                <ModalSplitMain>
                  <p className="text-base leading-relaxed text-[var(--color-text-muted-strong)]">
                    Acabamos de lançar o Design System. Componentes prontos, 3 themes
                    (Education, Kumon, Impact X), atomic design 100% e dark mode nativo.
                  </p>
                </ModalSplitMain>
              </ModalSplitBody>
              <ModalSplitFooter>
                <ModalCancel>Mais tarde</ModalCancel>
                <ModalAction>Explorar agora</ModalAction>
              </ModalSplitFooter>
            </ModalSplit>
          </ModalContent>
        </Modal>

        {/* 5. Carousel onboarding (reusa Split + carousel slides) */}
        <Modal>
          <ModalTrigger asChild>
            <Button variant="ghost">Carousel</Button>
          </ModalTrigger>
          <ModalContent size="carousel">
            <ModalSplit>
              <ModalCarousel>
                <ModalCarouselSlide>
                  <ModalBanner height={200} bg="linear-gradient(135deg, #0467DB, #4B9EF5)">
                    <h2 className="text-[28px] font-extrabold leading-tight">Tokens primeiro</h2>
                  </ModalBanner>
                  <ModalSplitBody className="pt-8">
                    <ModalSplitMain>
                      <p className="text-base leading-relaxed text-[var(--color-text-muted-strong)]">
                        Todo componente consome tokens CSS. Trocar o theme troca cores, radius e
                        fontes — zero refactor.
                      </p>
                    </ModalSplitMain>
                  </ModalSplitBody>
                </ModalCarouselSlide>
                <ModalCarouselSlide>
                  <ModalBanner height={200} bg="linear-gradient(135deg, #11C76F, #4BD494)">
                    <h2 className="text-[28px] font-extrabold leading-tight">Multi-vertical</h2>
                  </ModalBanner>
                  <ModalSplitBody className="pt-8">
                    <ModalSplitMain>
                      <p className="text-base leading-relaxed text-[var(--color-text-muted-strong)]">
                        Education, Kumon e Impact X já vêm prontos. Adicionar um novo é replicar a
                        estrutura de tokens.
                      </p>
                    </ModalSplitMain>
                  </ModalSplitBody>
                </ModalCarouselSlide>
                <ModalCarouselSlide>
                  <ModalBanner height={200} bg="linear-gradient(135deg, #0066B3, #4B9EF5)">
                    <h2 className="text-[28px] font-extrabold leading-tight">Pronto pra publicar</h2>
                  </ModalBanner>
                  <ModalSplitBody className="pt-8">
                    <ModalSplitMain>
                      <p className="text-base leading-relaxed text-[var(--color-text-muted-strong)]">
                        Build via tsup, ESM + CJS + d.ts. Importável como{" "}
                        <code className="text-[var(--color-primary)]">@impactx/ds</code>.
                      </p>
                    </ModalSplitMain>
                  </ModalSplitBody>
                </ModalCarouselSlide>
                <ModalCarouselNav finishLabel="Começar" />
              </ModalCarousel>
            </ModalSplit>
          </ModalContent>
        </Modal>

        {/* 6. Split — 2 colunas com info card (referência canônica do design) */}
        <Modal>
          <ModalTrigger asChild>
            <Button>Split (Importante)</Button>
          </ModalTrigger>
          <ModalContent size="welcome">
            <ModalSplit>
              <ModalSplitBody>
                <ModalSplitMain>
                  <ModalSplitTitle hero={<HeroIcon />}>Importante</ModalSplitTitle>
                  <div className="space-y-4 text-[15px] leading-relaxed text-[var(--color-text-muted-strong)]">
                    <p>
                      Você pode interromper e reiniciar a prova quantas vezes quiser, mas{" "}
                      <strong className="text-[var(--color-text)]">o cronômetro não vai parar</strong>;
                    </p>
                    <p>
                      A prova encerrará automaticamente quando o tempo acabar, mesmo que você não
                      tenha confirmado a finalização;
                    </p>
                    <p>
                      Ao final da avaliação você verá a sua quantidade de acertos, mas o resultado
                      só estará disponível após a liberação oficial dos resultados.
                    </p>
                  </div>
                </ModalSplitMain>

                <ModalSplitAside>
                  <ModalInfoList>
                    <ModalInfoItem
                      icon={<FileText />}
                      label="Prova"
                      value={
                        <>
                          SAS Fuvest 2020
                          <br />
                          1º edição
                        </>
                      }
                    />
                    <ModalInfoItem
                      icon={<CheckSquare />}
                      label="Número de questões"
                      value="90 questões"
                    />
                    <ModalInfoItem
                      icon={<Clock />}
                      label="Tempo de prova"
                      value="Restam 2h 30min"
                      emphasis="warning"
                    />
                  </ModalInfoList>
                </ModalSplitAside>
              </ModalSplitBody>

              <ModalSplitFooter>
                <ModalCancel className="border-none bg-transparent shadow-none px-0 text-[var(--color-text-muted)] hover:bg-transparent hover:text-[var(--color-text)]">
                  Cancelar
                </ModalCancel>
                <ModalAction>Continuar</ModalAction>
              </ModalSplitFooter>
            </ModalSplit>
          </ModalContent>
        </Modal>

        {/* 7. Alert — danger emphasis */}
        <Modal>
          <ModalTrigger asChild>
            <Button variant="danger-secondary">Alert (danger)</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle className="flex items-center gap-3">
                <AlertTriangle className="text-[var(--color-danger-primary)]" size={24} />
                Atenção
              </ModalTitle>
              <ModalClose />
            </ModalHeader>
            <ModalBody>
              Esta operação afeta múltiplos registros e não pode ser desfeita. Confirma?
            </ModalBody>
            <ModalFooter>
              <ModalCancel>Voltar</ModalCancel>
              <ModalAction variant="danger">Sim, prosseguir</ModalAction>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}
