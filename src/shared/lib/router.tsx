import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import {
  CurriculumSidebar,
  QueueView,
  StackView,
  type SystemState,
  LESSONS,
  type SimulationStep,
} from '@/features/simulator'
import { MainLayout } from '@/shared/components/layout/MainLayout'

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
      const currentStep = currentLesson.steps.find((s: SimulationStep) => s.id === i)
      if (currentStep) {
        state = currentStep.stateUpdate(state)
      }
    }
    return state
  }, [step, currentLesson])

  const currentStepData = currentLesson.steps.find((s: SimulationStep) => s.id === step)

  return (
    <MainLayout
      sidebar={<CurriculumSidebar />}
      content={
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>학습 과정</span>
            <span>/</span>
            <span className="text-foreground uppercase">{id}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            {currentLesson.title}
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {currentLesson.id === 'engine-test'
                ? 'Step-by-step engine verification scenario. Observe how the stack and heap change as we execute commands.'
                : '프론트엔드 엔지니어를 위한 자료구조 실습 커리큘럼입니다. 시뮬레이터를 통해 내부 동작 원리를 파악하세요.'}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/50 overflow-hidden shadow-sm">
            <div className="bg-muted/50 px-4 py-2 border-b border-border flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                현재 단계 설명 (Step Guide)
              </span>
            </div>
            <div className="p-6">
              <p className="text-base text-foreground/90 leading-relaxed font-medium">
                {currentStepData?.description || 'Initial state...'}
              </p>
            </div>
          </div>
        </div>
      }
      visualizer={
        <div className="flex-1 flex flex-col p-6 h-full overflow-hidden">
          {/* Top Panel: Stack & Viz */}
          <div className="flex-1 flex gap-6 min-h-0">
            {/* Call Stack Section */}
            <div className="flex-[0.3] flex flex-col">
              <div className="mb-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                콜 스택 (Call Stack)
              </div>
              <div className="flex-1 min-h-0 bg-[#0c0c0e] border border-white/5 rounded-xl">
                <StackView items={currentSystemState.stack} />
              </div>
            </div>

            {/* Heap / State Section */}
            <div className="flex-[0.7] flex flex-col">
              <div className="mb-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                메모리 & 상태 (Memory & State)
              </div>
              <div className="flex-1 min-h-0 bg-[#0c0c0e] border border-white/5 rounded-xl p-4 overflow-auto">
                <pre className="text-xs font-mono text-muted whitespace-pre-wrap">
                  {JSON.stringify(currentSystemState, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {/* Middle Panel: Task Queue (Dummy for now) */}
          <div className="mt-6">
            <QueueView items={currentSystemState.queue} />
          </div>

          {/* Control Panel */}
          <div className="h-20 mt-6 border-t border-border flex items-center justify-between px-2 shrink-0">
            <div className="flex items-center gap-3">
              <button
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
                onClick={() =>
                  router.navigate({
                    to: '/lesson/$id',
                    params: { id },
                    search: (prev: any) => ({
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
                <div className="h-1 w-32 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary shadow-[0_0_10px_var(--color-primary)]"
                    animate={{
                      width: `${((step + 1) / currentLesson.steps.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
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

// Create Router
const routeTree = rootRoute.addChildren([indexRoute, lessonRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
