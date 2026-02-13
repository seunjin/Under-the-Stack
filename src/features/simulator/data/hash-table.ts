import { INITIAL_SYSTEM_STATE, type LessonData } from '../lib/types'

export const hashTableLesson: LessonData = {
  id: 'hash-table',
  title: '해시테이블 (Hash Table)',
  description:
    '키(Key)를 주소로 변환하여 데이터를 즉시 찾아내는 최적화 기법을 배웁니다.',
  initialState: INITIAL_SYSTEM_STATE,
  steps: [
    {
      id: 0,
      codeLine: 1,
      description:
        'Key-Value 데이터를 저장하기 위해 해시 함수(Hash Function)를 실행합니다.',
      stateUpdate: (state) => ({
        ...state,
        variables: { key: "'user_id'", hash: '102' },
        stack: ['hash("user_id") -> 102'],
      }),
    },
    {
      id: 1,
      codeLine: 2,
      description:
        '해시 값(102)을 인덱스로 사용하여 메모리(Bucket)에 값을 저장합니다. O(1) 성능의 핵심입니다.',
      stateUpdate: (state) => ({
        ...state,
        heap: { ...state.heap, index_102: { name: 'Jin' } },
      }),
    },
    {
      id: 2,
      codeLine: 3,
      description:
        '[실무 매핑] JavaScript의 Object나 Map은 내부적으로 해시를 사용하여 데이터를 관리합니다. 이는 DB의 Index 탐색 속도를 이해하는 밑거름이 됩니다.',
      stateUpdate: (state) => state,
    },
  ],
}
