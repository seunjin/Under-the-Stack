import { INITIAL_SYSTEM_STATE, type LessonData } from '../lib/types'

export const arrayLesson: LessonData = {
  id: 'array',
  title: '배열 (Array)과 메모리',
  description:
    '연속된 메모리 구조에서의 데이터 접근과 불변성 관리의 원리를 학습합니다.',
  initialState: INITIAL_SYSTEM_STATE,
  steps: [
    {
      id: 0,
      codeLine: 1,
      description:
        "연속된 메모리 공간에 배열 'arr'을 생성합니다. (Heap 영역 할당)",
      stateUpdate: (state) => ({
        ...state,
        heap: { '0x100': [10, 20, 30] },
        variables: { arr: 'Address(0x100)' },
      }),
    },
    {
      id: 1,
      codeLine: 2,
      description:
        '인덱스 접근(arr[1]): 주소 값을 알기 때문에 O(1)속도로 즉시 접근 가능합니다.',
      stateUpdate: (state) => ({
        ...state,
        stack: ['arr[1] -> 20'],
      }),
    },
    {
      id: 2,
      codeLine: 3,
      description:
        "[실무 매핑] React에서 배열을 변경하지 않고 새로운 배열을 만드는 '불변성 유지'는 이 메모리 주소를 새로 할당하는 과정입니다.",
      stateUpdate: (state) => ({
        ...state,
        heap: { ...state.heap, '0x200': [10, 20, 30, 40] },
        variables: { arr: 'Address(0x200)' },
      }),
    },
  ],
}
