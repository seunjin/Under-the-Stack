import { INITIAL_SYSTEM_STATE, type LessonData } from '../lib/types'

export const eventLoopLesson: LessonData = {
  id: 'event-loop',
  title: '이벤트 루프 시뮬레이션',
  description:
    '콜 스택과 테스크 큐 사이의 조율 과정을 통해 비동기 처리의 원리를 이해합니다.',
  initialState: INITIAL_SYSTEM_STATE,
  steps: [
    {
      id: 0,
      codeLine: 1,
      description: '스크립트 실행 시작: main() 함수가 콜 스택에 쌓입니다.',
      stateUpdate: (state) => ({
        ...state,
        stack: ['main'],
      }),
    },
    {
      id: 1,
      codeLine: 2,
      description: 'setTimeout() 호출: 브라우저 API에 타이머를 위임합니다.',
      stateUpdate: (state) => ({
        ...state,
        stack: ['main', 'setTimeout'],
      }),
    },
    {
      id: 2,
      codeLine: 3,
      description: '메인 함수 종료: 콜 스택이 비워집니다.',
      stateUpdate: (state) => ({
        ...state,
        stack: [],
      }),
    },
    {
      id: 3,
      codeLine: 4,
      description:
        '타이머 완료: 콜백 함수(`cb`)가 테스크 큐(Task Queue)에 진입합니다.',
      stateUpdate: (state) => ({
        ...state,
        queue: ['cb'],
      }),
    },
    {
      id: 4,
      codeLine: 5,
      description:
        '이벤트 루프 작동: 콜 스택이 비어있으므로 큐의 콜백을 스택으로 이동시킵니다.',
      stateUpdate: (state) => ({
        ...state,
        stack: ['cb'],
        queue: [],
      }),
    },
    {
      id: 5,
      codeLine: 6,
      description: '콜백 실행 완료: 모든 비동기 작업이 종료되었습니다.',
      stateUpdate: (state) => ({
        ...state,
        stack: [],
      }),
    },
  ],
}
