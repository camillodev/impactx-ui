import { AssessmentCard } from "@impactx/ds-education"

export default function AssessmentCardPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-10 py-12 font-sans">
      <h1 className="text-2xl font-semibold text-[var(--color-text)] mb-1">AssessmentCard</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-10">
        Organism para listagem de avaliações: título, meta, descrição, status e ações.
      </p>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Estados (5 status)
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <AssessmentCard
              title="Mid-year Diagnostic"
              subject="Language"
              grade="6th Grade"
              description="Comprehensive language assessment covering reading, writing, and grammar."
              status="completed"
            />
            <AssessmentCard
              title="Math Benchmark Q2"
              subject="Math"
              grade="7th Grade"
              description="Quarterly benchmark covering algebra and geometry foundations."
              status="in-progress"
            />
            <AssessmentCard
              title="End-of-year Summative"
              subject="Science"
              grade="8th Grade"
              description="Cumulative assessment scheduled for May 28."
              status="scheduled"
            />
            <AssessmentCard
              title="Reading Comprehension"
              subject="Language"
              grade="5th Grade"
              description="Draft test, awaiting review."
              status="draft"
            />
            <AssessmentCard
              title="History Pre-test"
              subject="History"
              grade="9th Grade"
              description="Diagnostic to gauge prior knowledge."
              status="not-started"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Sem description
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AssessmentCard
              title="Quick Vocabulary Check"
              subject="Language"
              grade="4th Grade"
              status="completed"
            />
            <AssessmentCard
              title="Geometry Spot Quiz"
              subject="Math"
              grade="6th Grade"
              status="in-progress"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
          Grid de catálogo (6 cards)
        </h2>
        <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AssessmentCard
              title="Algebra Foundations"
              subject="Math"
              grade="7th Grade"
              description="Linear equations, expressions and inequalities."
              status="completed"
            />
            <AssessmentCard
              title="Cell Biology Unit Test"
              subject="Science"
              grade="8th Grade"
              description="Mitochondria, membranes and the cell cycle."
              status="in-progress"
            />
            <AssessmentCard
              title="Essay Writing Workshop"
              subject="Language"
              grade="9th Grade"
              description="Argumentative essay structure and rubric calibration."
              status="scheduled"
            />
            <AssessmentCard
              title="World Wars Overview"
              subject="History"
              grade="10th Grade"
              description="Causes, key events and consequences across both World Wars."
              status="draft"
            />
            <AssessmentCard
              title="Fractions & Decimals"
              subject="Math"
              grade="5th Grade"
              description="Operations, conversions and word problems."
              status="not-started"
            />
            <AssessmentCard
              title="Poetry Analysis"
              subject="Language"
              grade="8th Grade"
              description="Meter, metaphor and close reading techniques."
              status="completed"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
