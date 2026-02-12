import { INITIAL_SYSTEM_STATE, type LessonData } from './types'

export const LESSONS: Record<string, LessonData> = {
  'engine-test': {
    id: 'engine-test',
    title: 'Engine Verification',
    initialState: INITIAL_SYSTEM_STATE,
    steps: [
      {
        id: 0,
        codeLine: 1,
        description: "빈 배열 'a'를 초기화합니다. (Initialize an empty array 'a')",
        stateUpdate: (state) => ({
          ...state,
          variables: { ...state.variables, a: '[]' },
          heap: { ...state.heap, '0x1': [] },
        }),
      },
      {
        id: 1,
        codeLine: 2,
        description: "배열 'a'에 '1'을 추가(push)합니다. (Push '1' into array 'a')",
        stateUpdate: (state) => ({
          ...state,
          heap: { ...state.heap, '0x1': [1] },
        }),
      },
    ],
  },
  'complexity': {
    id: 'complexity',
    title: '시간복잡도 시뮬레이션',
    initialState: INITIAL_SYSTEM_STATE,
    steps: [
      {
        id: 0,
        codeLine: 1,
        description: "O(1) 연산: 상항 시간 내에 접근합니다.",
        stateUpdate: (state) => ({ ...state, stack: ['access_array[0]'] })
      }
    ]
  },
  'stack-concept': {
    id: 'stack-concept',
    title: '브라우저 콜 스택의 원리',
    initialState: INITIAL_SYSTEM_STATE,
    steps: [
      {
        id: 0,
        codeLine: 1,
        description: "함수 호출 시 스택 프레임이 쌓입니다.",
        stateUpdate: (state) => ({ ...state, stack: ['main', 'fetchData'] })
      }
    ]
  }
}
