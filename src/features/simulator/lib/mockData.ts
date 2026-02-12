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
    title: '시간복잡도 (Time Complexity)',
    initialState: INITIAL_SYSTEM_STATE,
    steps: [
      {
        id: 0,
        codeLine: 1,
        description: 'O(1) - 상수 시간: 데이터 크기에 상관없이 즉시 접근합니다. (ex: 객체 키 접근)',
        stateUpdate: (state) => ({
          ...state,
          variables: { ...state.variables, data: '{ id: 1 }' },
          stack: ['accessKey'],
        }),
      },
      {
        id: 1,
        codeLine: 2,
        description: 'O(n) - 선형 시간: 데이터가 늘어날수록 작업 시간도 늘어납니다. (ex: 배열 전체 순회)',
        stateUpdate: (state) => ({
          ...state,
          stack: ['loop_1', 'loop_2', 'loop_3', '...'],
        }),
      },
      {
        id: 2,
        codeLine: 3,
        description: '[실무 매핑] React에서 1,000개의 아이템을 루프 돌며 렌더링할 때, 이 O(n) 연산이 매번 발생하면 버벅임의 원인이 됩니다.',
        stateUpdate: (state) => state,
      },
    ],
  },
  'array': {
    id: 'array',
    title: '배열 (Array)과 메모리',
    initialState: INITIAL_SYSTEM_STATE,
    steps: [
      {
        id: 0,
        codeLine: 1,
        description: "연속된 메모리 공간에 배열 'arr'을 생성합니다. (Heap 영역 할당)",
        stateUpdate: (state) => ({
          ...state,
          heap: { '0x100': [10, 20, 30] },
          variables: { arr: 'Address(0x100)' },
        }),
      },
      {
        id: 1,
        codeLine: 2,
        description: '인덱스 접근(arr[1]): 주소 값을 알기 때문에 O(1)속도로 즉시 접근 가능합니다.',
        stateUpdate: (state) => ({
          ...state,
          stack: ['arr[1] -> 20'],
        }),
      },
      {
        id: 2,
        codeLine: 3,
        description: "[실무 매핑] React에서 배열을 변경하지 않고 새로운 배열을 만드는 '불변성 유지'는 이 메모리 주소를 새로 할당하는 과정입니다.",
        stateUpdate: (state) => ({
          ...state,
          heap: { ...state.heap, '0x200': [10, 20, 30, 40] },
          variables: { arr: 'Address(0x200)' },
        }),
      },
    ],
  },
  'stack-queue': {
    id: 'stack-queue',
    title: '스택 & 큐 (Stack & Queue)',
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
        description: '[실무 매핑] 스택은 브라우저의 Call Stack, 큐는 비동기 작업을 관리하는 Event Loop와 연결됩니다.',
        stateUpdate: (state) => state,
      },
    ],
  },
  'hash-table': {
    id: 'hash-table',
    title: '해시테이블 (Hash Table)',
    initialState: INITIAL_SYSTEM_STATE,
    steps: [
      {
        id: 0,
        codeLine: 1,
        description: "Key-Value 데이터를 저장하기 위해 해시 함수(Hash Function)를 실행합니다.",
        stateUpdate: (state) => ({
          ...state,
          variables: { key: "'user_id'", hash: '102' },
          stack: ['hash("user_id") -> 102'],
        }),
      },
      {
        id: 1,
        codeLine: 2,
        description: "해시 값(102)을 인덱스로 사용하여 메모리(Bucket)에 값을 저장합니다. O(1) 성능의 핵심입니다.",
        stateUpdate: (state) => ({
          ...state,
          heap: { ...state.heap, 'index_102': { name: 'Jin' } },
        }),
      },
      {
        id: 2,
        codeLine: 3,
        description: "[실무 매핑] JavaScript의 Object나 Map은 내부적으로 해시를 사용하여 데이터를 관리합니다. 이는 DB의 Index 탐색 속도를 이해하는 밑거름이 됩니다.",
        stateUpdate: (state) => state,
      },
    ],
  },
  'event-loop': {
    id: 'event-loop',
    title: '이벤트 루프 시뮬레이션',
    initialState: INITIAL_SYSTEM_STATE,
    steps: [
      {
        id: 0,
        codeLine: 1,
        description: "스크립트 실행 시작: main() 함수가 콜 스택에 쌓입니다.",
        stateUpdate: (state) => ({
          ...state,
          stack: ['main'],
        }),
      },
      {
        id: 1,
        codeLine: 2,
        description: "setTimeout() 호출: 브라우저 API에 타이머를 위임합니다.",
        stateUpdate: (state) => ({
          ...state,
          stack: ['main', 'setTimeout'],
        }),
      },
      {
        id: 2,
        codeLine: 3,
        description: "메인 함수 종료: 콜 스택이 비워집니다.",
        stateUpdate: (state) => ({
          ...state,
          stack: [],
        }),
      },
      {
        id: 3,
        codeLine: 4,
        description: "타이머 완료: 콜백 함수(`cb`)가 테스크 큐(Task Queue)에 진입합니다.",
        stateUpdate: (state) => ({
          ...state,
          queue: ['cb'],
        }),
      },
      {
        id: 4,
        codeLine: 5,
        description: "이벤트 루프 작동: 콜 스택이 비어있으므로 큐의 콜백을 스택으로 이동시킵니다.",
        stateUpdate: (state) => ({
          ...state,
          stack: ['cb'],
          queue: [],
        }),
      },
      {
        id: 5,
        codeLine: 6,
        description: "콜백 실행 완료: 모든 비동기 작업이 종료되었습니다.",
        stateUpdate: (state) => ({
          ...state,
          stack: [],
        }),
      },
    ],
  },
}
