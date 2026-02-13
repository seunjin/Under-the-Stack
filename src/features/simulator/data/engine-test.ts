import { INITIAL_SYSTEM_STATE, type LessonData } from '../lib/types'

export const engineTestLesson: LessonData = {
  id: 'engine-test',
  title: 'Engine Verification',
  description: '시뮬레이터 엔진의 작동을 검증하는 테스트 레슨입니다.',
  content:
    '이 레슨은 시스템 엔진이 정상적으로 작동하는지 확인하기 위한 절차를 포함합니다.',
  initialState: INITIAL_SYSTEM_STATE,
  steps: [
    {
      id: 0,
      codeLine: 1,
      description:
        "빈 배열 'a'를 초기화합니다. (Initialize an empty array 'a')",
      stateUpdate: (state) => ({
        ...state,
        variables: { ...state.variables, a: '[]' },
        heap: { ...state.heap, '0x1': [] },
      }),
    },
    {
      id: 1,
      codeLine: 2,
      description:
        "배열 'a'에 '1'을 추가(push)합니다. (Push '1' into array 'a')",
      stateUpdate: (state) => ({
        ...state,
        heap: { ...state.heap, '0x1': [1] },
      }),
    },
  ],
}
