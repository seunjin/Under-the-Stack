import { INITIAL_SYSTEM_STATE, type LessonData } from '../lib/types'

export const complexityLesson: LessonData = {
  id: 'complexity',
  title: '작업의 비용 (Complexity)',
  description:
    '알고리즘의 효율성을 측정하는 기준인 시간복잡도를 실제 데이터 탐색 사례를 통해 이해해 봅니다.',
  content: `
### 🖐️ 반갑습니다! 효율적인 엔지니어링의 세계를 함께 탐험해 볼까요?

코드를 작성하다 보면 "기능이 잘 동작하는가?"라는 질문을 넘어, 언젠가 반드시 마주하게 되는 질문이 있습니다. 바로 **데이터의 양이 아주 많아졌을 때도 이 코드가 여전히 빠르게 성능을 유지할 수 있을까**? 라는 의문이죠.

이 질문에 대한 해답이자 엔지니어링의 기초가 되는 **시간복잡도(Time Complexity)** 에 대해, 원리부터 실무 팁까지 차근차근 상세히 풀어 드릴게요.

---

### 1. 왜 '초(Second)' 단위로 측정하지 않을까요?

우리가 알고리즘의 효율성을 따질 때, 단순히 "0.1초 만에 끝나요!"라고 말하지 않는 이유가 무엇일까요? 

컴퓨터의 성능은 제각각이기 때문입니다. 최신형 기기에서는 순식간에 끝나는 작업도, 저사양 기기나 데이터가 쏟아지는 서버 환경에서는 엄청난 병목 현상을 일으킬 수 있거든요. 

그래서 우리는 절대적인 '시간' 대신, **데이터의 양(N)이 늘어날 때 연산의 횟수가 어떻게 변화하는가**? 라는 추세에 집중합니다. 이를 전문 용어로 시간복잡도라 부르고, **Big-O** 라는 기호로 표현하는 것이죠.

> **Big-O**는 알고리즘의 효율성을 나타내는 수학적 표기법입니다. 하드웨어 성능과 관계없이 알고리즘 자체의 "성장 속도"를 측정하는 척도죠.

---

### 2. 시뮬레이터에서 마주한 두 가지 방식의 차이

방금 회원 5,000명을 찾는 과정을 보셨나요? 그 시뮬레이션 안에는 아주 중요한 두 가지 법칙이 숨어 있습니다.

#### 📦 선형 탐색: O(N) - "데이터의 양만큼 정직하게"

##### 어떻게 동작하나요?
리스트의 첫 번째 항목부터 마지막까지 하나씩 대조하는 방식입니다. 데이터가 5,000개면 최대 5,000번을 확인해야 하죠. 데이터 양에 정비례하여 시간이 정직하게 증가하는 특성이 있습니다.

##### 실무 사례
자바스크립트의 <badge>Array.find()</badge> 나 <badge>Array.filter()</badge> 같은 함수들이 대표적입니다. 리스트의 인덱스를 모를 때 처음부터 순차적으로 탐색하는 모든 과정이 바로 <badge>O(N)</badge> 의 범주에 속합니다.

\`\`\`javascript
// 데이터가 늘어날수록 선형적으로 시간이 증가합니다. (O(N))
const target = users.find(u => u.id === 5000); 
\`\`\`

#### ⚡ 직접 접근: O(1) - "양과 상관없는 즉시성"

##### 어떻게 동작하나요?
데이터가 아무리 많아져도 딱 한 번에 찾아가는 방식입니다. 주소나 인덱스를 미리 알고 있는 경우로, 데이터의 양과는 전혀 무관하게 일정한 속도를 보장합니다.

##### 실무 사례 
객체의 프로퍼티에 즉시 접근하거나, <badge>Map</badge> 이나 <badge>Set</badge> 객체를 사용하여 데이터를 빠르게 조회하는 경우입니다.

\`\`\`javascript
// 데이터 양과 상관없이 항상 일정한 시간(O(1))이 걸립니다.

// 1. 객체(Object) 프로퍼티 접근
const targetFromObj = userMap['5000']; 

// 2. Map 객체 사용
const targetFromMap = userMap.get('5000');
\`\`\`

<callout variant="idea">
데이터가 10배 늘어날 때 작업 시간도 10배 늘어나면 <badge>O(N)</badge>, 데이터 양과 상관없이 항상 일정한 시간이 걸리면 <badge>O(1)</badge> 입니다.
</callout>

---

### 💡 실무를 위한 핵심 인사이트

이론적으로 배운 <badge>O(N)</badge>과 <badge>O(1)</badge>의 감각은 실제 웹 서비스를 만들 때 의사결정의 기준이 됩니다. 현대 프론트엔드 실무에서 꼭 기억해야 할 핵심 원칙 세 가지를 정리해 드립니다.

- **탐색을 상수로 만들기**: 대규모 데이터에서 검색 기능을 구현할 때, 배열을 매번 순회(<badge>O(N)</badge>)하기보다 미리 **해시 맵(Map)** 구조로 정규화하여 즉시 접근(<badge>O(1)</badge>)하는 습관을 가지세요.
- **중첩 루프의 경계**: 리스트 렌더링이나 데이터 가공 시 루프 안에서 또 다른 루프를 호출하는 **O(N²)** 함정을 주의해야 합니다. 이는 브라우저의 메인 스레드를 멈추게 하는 주범입니다.
- **데이터 구조는 선택**: <badge>Set</badge>이나 <badge>Map</badge>은 약간의 메모리를 더 사용하지만, 검색 성능이 중요한 필터링이나 중복 체크 환경에서는 비교할 수 없는 응답 속도를 제공합니다.

<callout variant="info" title="엔지니어링 트레이드오프">
모든 것을 최적화할 필요는 없습니다. 데이터가 작을 때는 배열의 단순함이 가장 강력한 무기가 되기도 하죠. 데이터 규모와 환경에 맞는 최적의 비용을 찾는 것이 시스템 사고의 본질입니다.
</callout>

---

> 지식은 실천할 때 비로소 가치가 생깁니다. 오늘 익힌 시간복잡도 감각을 여러분의 다음 프로젝트 코드에 녹여보세요. 훨씬 더 견고하고 전문적인 시스템을 만드실 수 있을 거예요! 😊
    `,
  initialState: {
    ...INITIAL_SYSTEM_STATE,
    metadata: {
      items: ['User_A', 'User_B', 'User_C', 'User_D', 'User_E'],
      currentIndex: -1,
      targetIndex: 2, // 'User_C'를 찾는 것이 목표
      mode: 'sequential',
      found: false,
      description:
        '시스템 사고의 시작은 "작업의 비용"을 인지하는 것입니다. 5,000명의 회원 중 특정 사용자를 찾는 시나리오를 가정해 보겠습니다.',
    },
  },
  steps: [
    {
      id: 0,
      codeLine: 1,
      description:
        '5,000명의 회원 데이터가 존재합니다. 특정 사용자("User_C")의 정보를 조회해야 하는 상황입니다.',
      stateUpdate: (state) => ({
        ...state,
        metadata: {
          ...state.metadata,
          description:
            '5,000명의 회원 데이터가 메모리에 로드되었습니다. 특정 사용자("User_C")를 검색합니다.',
        },
      }),
    },
    {
      id: 1,
      codeLine: 2,
      description:
        '가장 단순한 방법은 첫 번째 데이터부터 순차적으로 대조하는 것입니다. (선형 탐색)',
      stateUpdate: (state) => ({
        ...state,
        metadata: {
          ...state.metadata,
          currentIndex: 0,
          found: false,
          description:
            '첫 번째 항목부터 검사를 시작합니다. 데이터가 많아질수록 이 작업의 수행 시간은 데이터 수(N)에 비례하여 늘어납니다.',
        },
      }),
    },
    {
      id: 2,
      codeLine: 3,
      description:
        '데이터를 하나씩 확인할 때마다 시스템의 자원(시간)이 소모됩니다.',
      stateUpdate: (state) => ({
        ...state,
        metadata: {
          ...state.metadata,
          currentIndex: 1,
          found: false,
          description:
            '두 번째 항목을 확인합니다. 여전히 대조 작업이 진행 중입니다.',
        },
      }),
    },
    {
      id: 3,
      codeLine: 4,
      description:
        '대상을 찾았습니다. 하지만 만칭 5,000번째 데이터가 목표였다면 5,000번의 연산이 필요했을 것입니다.',
      stateUpdate: (state) => ({
        ...state,
        metadata: {
          ...state.metadata,
          currentIndex: 2,
          found: true,
          description:
            '목표 데이터를 발견했습니다. 이 방식은 평균적으로 N/2번의 확인 과정이 필요하며, 이를 전문 용어로 O(N)의 시간복잡도를 가진다고 합니다.',
        },
      }),
    },
    {
      id: 4,
      codeLine: 5,
      description:
        '이번에는 데이터의 위치를 미리 알고 있는 "인덱스(Index)" 방식을 적용해 보겠습니다.',
      stateUpdate: (state) => ({
        ...state,
        metadata: {
          ...state.metadata,
          currentIndex: -1,
          found: false,
          mode: 'direct',
          description:
            '해시 테이블이나 인덱스를 사용하면 데이터의 양과 상관없이 위치를 즉시 계산할 수 있습니다.',
        },
      }),
    },
    {
      id: 5,
      codeLine: 6,
      description:
        '데이터의 양과 관계없이 단 한 번의 접근으로 조회를 완료합니다.',
      stateUpdate: (state) => ({
        ...state,
        metadata: {
          ...state.metadata,
          currentIndex: 2,
          found: true,
          mode: 'direct',
          description:
            '위치를 즉시 파악하여 한 번에 접근했습니다. 데이터가 5,000개든 5,000,000개든 수행 시간은 일정합니다. 이를 O(1)의 성능이라고 부릅니다.',
        },
      }),
    },
    {
      id: 6,
      codeLine: 7,
      description:
        '💡 실무 연결: React의 Key 설정이나 DB 인덱스 엔지니어링의 본질이 바로 이 "작업 비용의 최적화"에 있습니다.',
      stateUpdate: (state) => ({
        ...state,
        metadata: {
          ...state.metadata,
          description:
            '이처럼 엔지니어링은 단순히 기능을 구현하는 것을 넘어, 시스템의 자원을 효율적으로 사용하는 최적의 경로를 설계하는 과정입니다.',
        },
      }),
    },
  ],
}
