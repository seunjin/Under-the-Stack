export interface LessonMeta {
  id: string;
  title: string;
  description: string;
  duration?: string;
}

export interface Section {
  id: string;
  title: string;
  lessons: LessonMeta[];
}

export const CURRICULUM: Section[] = [
  {
    id: 'overview',
    title: '섹션 1. 개요 (Overview)',
    lessons: [
      { id: 'intro', title: '수강생 여러분께 하고 싶은 말', duration: '03:22', description: '플랫폼 소개 및 학습 방법 안내' },
      { id: 'ds-al-intro', title: '자료구조와 알고리즘이란?', duration: '07:55', description: 'CS의 근간이 되는 자료구조와 알고리즘의 개념' },
      { id: 'complexity', title: '시간복잡도 (Time Complexity)', duration: '08:40', description: 'Big-O 표기법과 성능 분석의 기초' },
      { id: 'env-setup', title: '자바스크립트 실행 환경 구축', duration: '06:13', description: '실습을 위한 엔진 및 디버깅 환경 설정' },
    ],
  },
  {
    id: 'data-structures',
    title: '섹션 2. 자료구조 (Data Structures)',
    lessons: [
      { id: 'array', title: '배열 (Array)', duration: '04:55', description: '메모리 상의 선형 구조와 인덱싱' },
      { id: 'linked-list-concept', title: '연결리스트 (Linked List) - 개념', duration: '05:28', description: '노드와 포인터를 이용한 동적 데이터 관리' },
      { id: 'stack-concept', title: '스택 (Stack) - 개념', duration: '06:27', description: 'LIFO 구조와 브라우저 콜 스택의 원리' },
      { id: 'queue-concept', title: '큐 (Queue) - 개념', duration: '05:47', description: 'FIFO 구조와 이벤트 루프 테스크 큐' },
    ],
  },
  {
    id: 'algorithms',
    title: '섹션 3. 알고리즘',
    lessons: [
      { id: 'recursion', title: '재귀', duration: '14:25', description: '자기 자신을 호출하는 함수와 기저 사례' },
      { id: 'sorting-bubble', title: '정렬 - 버블정렬', duration: '10:15', description: '인접 요소 비교를 통한 기초 정렬' },
      { id: 'dp-memoization', title: '동적 프로그래밍 - 메모이제이션', duration: '13:32', description: '중복 계산을 피하는 효율적 최적화' },
    ],
  },
];
