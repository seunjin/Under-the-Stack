import { INITIAL_SYSTEM_STATE, type LessonData } from './types'

export const TEST_LESSON: LessonData = {
  id: 'engine-test',
  title: 'Engine Verification',
  initialState: INITIAL_SYSTEM_STATE,
  steps: [
    {
      id: 0,
      codeLine: 1,
      description: "Initialize an empty array 'a'.",
      stateUpdate: (state) => ({
        ...state,
        variables: { ...state.variables, a: '[]' },
        heap: { ...state.heap, '0x1': [] },
      }),
    },
    {
      id: 1,
      codeLine: 2,
      description: "Push '1' into array 'a'.",
      stateUpdate: (state) => ({
        ...state,
        heap: { ...state.heap, '0x1': [1] },
      }),
    },
    {
      id: 2,
      codeLine: 3,
      description: 'Call funcA().',
      stateUpdate: (state) => ({
        ...state,
        stack: [...state.stack, 'funcA'],
      }),
    },
    {
      id: 3,
      codeLine: 4,
      description: 'Execute funcA inside.',
      stateUpdate: (state) => ({
        ...state,
        stack: [...state.stack, 'funcB'],
      }),
    },
    {
      id: 4,
      codeLine: 5,
      description: 'Return from funcB.',
      stateUpdate: (state) => ({
        ...state,
        stack: state.stack.slice(0, -1),
      }),
    },
  ],
}
