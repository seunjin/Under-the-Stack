import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import {
  ComplexityVisualizer,
  CURRICULUM,
  CurriculumSidebar,
  getDeepDive,
  LESSONS,
  type LessonMeta,
  type Module,
  QueueView,
  type SimulationStep,
  StackView,
  type SystemState,
  type Track,
} from '@/features/simulator'
import { MainLayout } from '@/shared/components/layout/MainLayout'
import { MarkdownRenderer } from '@/shared/components/markdown/MarkdownRenderer'

// Root Route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
})

// Index Route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <MainLayout
      content={
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Master Web Systems
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Interactive visualizations for modern web engineering. Understand
            the stack, the heap, and the event loop through live simulations.
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() =>
                router.navigate({
                  to: '/lesson/$id',
                  params: { id: 'engine-test' },
                  search: { step: 0 },
                })
              }
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2"
            >
              Start Learning
            </button>
          </div>
        </div>
      }
    />
  ),
})

// Lesson Route
interface LessonSearch {
  step: number
}

export const lessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lesson/$id',
  validateSearch: (search: Record<string, unknown>): LessonSearch => {
    return {
      step: Number(search?.step ?? 0),
    }
  },
  component: LessonComponent,
})

function LessonComponent() {
  const { id } = lessonRoute.useParams()
  const { step } = lessonRoute.useSearch()

  const currentLesson = LESSONS[id] || LESSONS['engine-test']

  // Derived State Calculation
  const currentSystemState = useMemo(() => {
    let state: SystemState = currentLesson.initialState
    for (let i = 0; i <= step; i++) {
      const currentStep = currentLesson.steps.find(
        (s: SimulationStep) => s.id === i,
      )
      if (currentStep) {
        state = currentStep.stateUpdate(state)
      }
    }
    return state
  }, [step, currentLesson])

  const currentStepData = currentLesson.steps.find(
    (s: SimulationStep) => s.id === step,
  )

  return (
    <MainLayout
      sidebar={<CurriculumSidebar />}
      content={
        <div className="space-y-6 min-w-0 w-full">
          <div className="flex items-center gap-2 text-[12px] font-medium text-muted-foreground/60 uppercase tracking-widest mb-4">
            <span>Lesson Module</span>
            <span className="opacity-30">/</span>
            <span className="text-primary/70">{id}</span>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 min-w-0 w-full gap-8"
          >
            {/* Header Area */}
            <header className="space-y-4">
              <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
                {currentLesson.title}
              </h2>
              <p className="text-xl text-foreground/70 leading-relaxed font-medium">
                {currentLesson.description}
              </p>
            </header>

            {/* Content Area */}
            {currentLesson.content && (
              <MarkdownRenderer content={currentLesson.content} />
            )}

            {/* Deep Dive CTA */}
            {CURRICULUM.flatMap((t: Track) =>
              t.modules.flatMap((m: Module) => m.lessons),
            ).find((l: LessonMeta) => l.id === id)?.deepDiveId && (
              <div className="mt-12 p-8 rounded-2xl bg-neutral-900 text-white shadow-2xl border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-8xl font-black italic">DEEP</span>
                </div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center px-2 py-0.5 rounded bg-blue-500 text-[10px] font-bold uppercase tracking-widest">
                      Expertise
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">
                      수석 엔지니어의 Engineering Deep-Dive
                    </h3>
                    <p className="text-neutral-400 max-w-lg leading-relaxed">
                      단순한 이론을 넘어, 실제 프론트엔드 코드베이스에서
                      발생하는 고난도 성능 최적화 전략과 설계 패턴을 깊이 있게
                      탐구합니다.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const lessonMeta = CURRICULUM.flatMap((t: Track) =>
                        t.modules.flatMap((m: Module) => m.lessons),
                      ).find((l: LessonMeta) => l.id === id)
                      if (lessonMeta?.deepDiveId) {
                        router.navigate({
                          to: '/deep-dive/$id',
                          params: { id: lessonMeta.deepDiveId },
                        })
                      }
                    }}
                    className="shrink-0 bg-white text-black hover:bg-neutral-200 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
                  >
                    심화 학습 시작하기 →
                  </button>
                </div>
              </div>
            )}
          </motion.article>

          {/* 전용 비주얼라이저가 아닌 경우에만 별도의 설명 카드를 표시 */}
          {id !== 'complexity' && (
            <div className="rounded-xl border border-border bg-card/50 overflow-hidden shadow-sm">
              <div className="bg-muted/50 px-4 py-2 border-b border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  현재 단계 설명 (Step Guide)
                </span>
              </div>
              <div className="p-6">
                <p className="text-base text-foreground/90 leading-relaxed font-medium">
                  {currentStepData?.description || 'Initial state...'}
                </p>
              </div>
            </div>
          )}
        </div>
      }
      visualizer={
        <div className="flex-1 flex flex-col p-6 h-full overflow-hidden">
          {id === 'complexity' ? (
            <ComplexityVisualizer state={currentSystemState} />
          ) : (
            <>
              {/* 통합 런타임 뷰에서의 단계 설명 카드 */}
              <div className="mb-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-2xl">
                <div className="bg-blue-500/10 px-4 py-1.5 border-b border-white/5">
                  <span className="text-[10px] text-blue-400 uppercase tracking-widest">
                    Current Step Guide
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-white/90 leading-relaxed font-medium">
                    {currentStepData?.description || 'Initial state...'}
                  </p>
                </div>
              </div>

              {/* Top Panel: Stack & Viz */}
              <div className="flex-1 flex gap-6 min-h-0">
                {/* Call Stack Section */}
                <div className="flex-[0.3] flex flex-col">
                  <div className="mb-3 text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />콜
                    스택 (Call Stack)
                  </div>
                  <div className="flex-1 min-h-0 bg-[#0c0c0e] border border-white/5 rounded-xl">
                    <StackView items={currentSystemState.stack} />
                  </div>
                </div>

                {/* Heap / State Section */}
                <div className="flex-[0.7] flex flex-col">
                  <div className="mb-3 text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    메모리 & 상태 (Memory & State)
                  </div>
                  <div className="flex-1 min-h-0 bg-[#0c0c0e] border border-white/5 rounded-xl p-4 overflow-auto">
                    <pre className="text-xs text-muted whitespace-pre-wrap">
                      {JSON.stringify(currentSystemState, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Middle Panel: Task Queue (Dummy for now) */}
              <div className="mt-6">
                <QueueView items={currentSystemState.queue} />
              </div>
            </>
          )}

          {/* Control Panel */}
          <div className="h-20 mt-6 border-t border-border flex items-center justify-between px-2 shrink-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  router.navigate({
                    to: '/lesson/$id',
                    params: { id },
                    search: (prev) => ({
                      ...prev,
                      step: Math.max(0, step - 1),
                    }),
                  })
                }
                className="h-10 px-6 rounded-md border border-border bg-transparent hover:bg-accent transition-all text-xs font-bold disabled:opacity-30"
                disabled={step === 0}
              >
                이전 (PREV)
              </button>
              <button
                type="button"
                onClick={() =>
                  router.navigate({
                    to: '/lesson/$id',
                    params: { id },
                    search: (prev) => ({
                      ...prev,
                      step: Math.min(currentLesson.steps.length - 1, step + 1),
                    }),
                  })
                }
                className="h-10 px-8 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-xs font-bold shadow-lg shadow-primary/20 disabled:opacity-30"
                disabled={step >= currentLesson.steps.length - 1}
              >
                다음 (NEXT)
              </button>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-3">
                <div className="h-2 w-32 bg-neutral-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary shadow-[0_0_10px_var(--color-primary)]"
                    animate={{
                      width: `${((step + 1) / currentLesson.steps.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[13px] font-medium text-muted-foreground uppercase tracking-widest">
                  {step + 1} / {currentLesson.steps.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}
// Deep-Dive Route
export const deepDiveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/deep-dive/$id',
  component: DeepDiveComponent,
})

function DeepDiveComponent() {
  const { id } = deepDiveRoute.useParams()
  const deepDive = getDeepDive(id)

  if (!deepDive) return <div>Deep Dive not found</div>

  return (
    <MainLayout
      sidebar={<CurriculumSidebar />}
      content={
        <div className="space-y-8 min-w-0 w-full pb-20">
          <div className="flex items-center gap-2 text-[12px] font-medium text-muted-foreground/60 uppercase tracking-widest mb-4">
            <button
              type="button"
              onClick={() =>
                router.navigate({
                  to: '/lesson/$id',
                  params: { id: deepDive.lessonId },
                  search: { step: 0 },
                })
              }
              className="hover:text-primary transition-colors"
            >
              Back to Lesson
            </button>
            <span className="opacity-30">/</span>
            <span className="text-primary/70">Engineering Deep-Dive</span>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 min-w-0 w-full"
          >
            <MarkdownRenderer content={deepDive.content} />
          </motion.article>

          <footer className="mt-12 pt-8 border-t border-border">
            <button
              type="button"
              onClick={() =>
                router.navigate({
                  to: '/lesson/$id',
                  params: { id: deepDive.lessonId },
                  search: { step: 0 },
                })
              }
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              ← 레슨으로 돌아가기
            </button>
          </footer>
        </div>
      }
    />
  )
}

// Create Router
const routeTree = rootRoute.addChildren([
  indexRoute,
  lessonRoute,
  deepDiveRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
