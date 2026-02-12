export interface SystemState {
  stack: string[]
  queue: string[]
  heap: Record<string, any>
  variables: Record<string, any>
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

export const INITIAL_SYSTEM_STATE: SystemState = {
  stack: [],
  queue: [],
  heap: {},
  variables: {},
}
