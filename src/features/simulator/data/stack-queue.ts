import { INITIAL_SYSTEM_STATE, type LessonData } from '../lib/types'

export const stackQueueLesson: LessonData = {
  id: 'stack-queue',
  title: '스택 & 큐 (Stack & Queue)',
  description:
    'LIFO와 FIFO 구조의 차이와 실제 브라우저 런타임에서의 활용 사례를 시뮬레이션합니다.',
  initialState: INITIAL_SYSTEM_STATE,
  steps: [
    {
      id: 0,
      codeLine: 1,
      description: 'Stack (LIFO): 나중에 들어온 데이터가 먼저 나갑니다.',
      stateUpdate: (state) => ({
        ...state,
        stack: ['main', 'funcA', 'funcB'],
      }),
    },
    {
      id: 1,
      codeLine: 2,
      description: 'Queue (FIFO): 먼저 들어온 데이터가 먼저 나갑니다.',
      stateUpdate: (state) => ({
        ...state,
        queue: ['task1', 'task2'],
      }),
    },
    {
      id: 2,
      codeLine: 3,
      description:
        '[실무 매핑] 스택은 브라우저의 Call Stack, 큐는 비동기 작업을 관리하는 Event Loop와 연결됩니다.',
      stateUpdate: (state) => state,
    },
  ],
}
