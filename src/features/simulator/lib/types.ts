export interface SystemState {
  stack: string[]
  queue: string[]
  heap: Record<string, unknown>
  variables: Record<string, unknown>
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
  initialState: SystemState
  steps: SimulationStep[]
}

export interface LessonMeta {
  id: string
  title: string
  description: string
  iconType?: 'base' | 'applied'
}

export interface Module {
  id: string
  title: string
  lessons: LessonMeta[]
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
