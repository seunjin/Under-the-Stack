export interface SystemState {
  stack: string[]
  queue: string[]
  heap: Record<string, unknown>
  variables: Record<string, unknown>
  metadata?: Record<string, unknown> // 커스텀 비주얼라이저 전용 상태
}

export interface SimulationStep {
  id: number
  codeLine: number
  description: string
  stateUpdate: (prevState: SystemState) => SystemState
}

export interface LessonData {
  id: string
  title: string
  description: string // 레슨 요약
  content?: string // 레슨 상세 이론 (마크다운 등)
  initialState: SystemState
  steps: SimulationStep[]
}

export interface LessonMeta {
  id: string
  title: string
  description: string
  iconType?: 'base' | 'applied'
  deepDiveId?: string // 인접한 심화 학습 콘텐츠 ID
}

export interface Module {
  id: string
  title: string
  lessons: LessonMeta[]
}

export interface DeepDive {
  id: string
  title: string
  lessonId: string
  content: string // 상세 마크다운 콘텐츠
}

export interface Track {
  id: string
  title: string
  description: string
  modules: Module[]
}

export const INITIAL_SYSTEM_STATE: SystemState = {
  stack: [],
  queue: [],
  heap: {},
  variables: {},
}
