import { INITIAL_SYSTEM_STATE, type LessonData } from '../lib/types'

export const complexityLesson: LessonData = {
  id: 'complexity',
  title: '작업의 비용 (Complexity)',
  description:
    '알고리즘의 효율성을 측정하는 기준인 시간복잡도를 실제 데이터 탐색 사례를 통해 이해해 봅니다.',
  content: `
### 안녕하세요. "느려지는 코드"를 눈으로 이해해 봅시다

코드는 잘 동작하는데, 데이터가 늘어나는 순간 갑자기 버벅인 적 있으시죠?  
주니어 시절에는 보통 "브라우저가 느린가?"라고 생각하기 쉽습니다.  
그런데 실무에서는 대개 그 전에 이미 문제가 시작됩니다. 바로 **데이터를 찾고 가공하는 방식**입니다.

이번 레슨은 딱 한 가지 감각을 만드는 것이 목표입니다.

> "이 코드는 지금은 괜찮아도, 데이터가 10배가 되면 비용이 어떻게 변할까?"

이 질문을 자연스럽게 하게 되면, 이미 복잡도를 도구로 쓰기 시작한 겁니다.

---

### 용어를 먼저 쉽게 맞춰볼게요

<callout variant="info" title="핵심 용어 3개">
<code>복잡도(Complexity)</code>: 작업량이 입력 크기에 따라 어떻게 증가하는지 <br> 
<code>시간복잡도(Time Complexity)</code>: 연산 횟수 기준의 증가 추세 <br> 
<code>Big-O</code>: 증가 추세를 표기하는 방법 (예: O(N), O(1))
</callout>

여기서 중요한 포인트는 "현재 몇 ms 걸렸는지"보다  
"데이터가 커졌을 때 얼마나 더 비싸지는지"를 보는 겁니다.

왜냐하면 ms는 기기/상황마다 달라지지만, 증가 추세는 코드 구조를 거의 그대로 반영하기 때문입니다.

---

### 비유로 이해해 볼까요? (도서관에서 책 찾기)

#### 방법 A: 책장을 처음부터 끝까지 훑기
원하는 책이 나올 때까지 한 권씩 확인합니다.  
책이 많아질수록 확인 횟수도 늘어나죠. 이게 \`O(N)\` 감각입니다.

#### 방법 B: 청구번호로 바로 위치 찾기
인덱스(목록표)에서 위치를 알고 바로 이동합니다.  
책이 많아져도 조회 비용은 거의 일정합니다. 이게 (평균) \`O(1)\` 감각입니다.

같은 "책 찾기"인데, 경로가 달라지면 비용이 완전히 달라집니다.

---

### 자바스크립트 코드에 바로 대응해 보면

#### O(N) 예시: 배열에서 순차 탐색
\`\`\`javascript
const user = users.find((u) => u.id === targetId)
\`\`\`

#### (평균) O(1) 예시: 키 기반 즉시 조회
\`\`\`javascript
const userFromObject = usersById[targetId]
const userFromMap = usersMap.get(targetId)
\`\`\`

<callout variant="idea" title="정확한 표현">
Object/Map 조회는 보통 "평균 O(1)"로 설명합니다.  
해시 충돌이 극단적으로 몰리는 최악 상황에서는 O(N)까지 갈 수 있습니다.
</callout>

---

### 시뮬레이터는 이렇게 보면 더 잘 이해됩니다

화면에는 5명 샘플이 나오지만, 학습 목표는 5,000명 이상 규모를 상정하는 것입니다.  
즉, 숫자 자체보다 **곡선의 모양**을 보는 훈련입니다.

시뮬레이터의 초반 장면에서는 한 칸씩 비교가 진행되면서 "확인 횟수"가 계속 늘어납니다.  
중간 이후 장면으로 가면 접근 경로가 고정되면서 확인 횟수 증가가 거의 멈춥니다.  
이 흐름을 끝까지 보면, 같은 기능이라도 자료구조를 어떻게 설계하느냐에 따라 시스템 비용이 달라진다는 사실이 훨씬 직관적으로 보입니다.

---

### 실무 팁: 코드에서 무엇을 먼저 의심해야 할까요?

실무에서 화면이 무거워지기 시작할 때, 먼저 렌더 함수 안의 데이터 접근 경로를 봐주세요.  

\`map\`, \`find\`, \`filter\`가 서로 겹쳐 있으면, 코드가 짧아 보여도 실제 비용은 빠르게 커질 수 있습니다.  
이럴 때는 배열 하나로 모든 걸 해결하려고 하기보다, 조회가 잦은 데이터만 \`byId\` 형태의 인덱스를 같이 두는 방식이 훨씬 안정적입니다.  

여기서 자주 헷갈리는 이유는, 둘 다 "리스트 화면에서 성능 이슈처럼 보인다"는 공통점이 있기 때문입니다.  

하지만 실제로는 해결하는 문제가 다릅니다. \`key\`는 React가 "어떤 아이템이 같은 아이템인지"를 구분하도록 돕는 장치라서, 잘못 주면 아이템이 재사용되며 입력값이 섞이거나 애니메이션이 튀는 식의 **UI 정합성 문제**가 생깁니다.  

반면 조회 복잡도는 "데이터를 찾기 위해 몇 번 반복하느냐"의 문제라서, 구조가 나쁘면 데이터가 커질수록 렌더 전 계산이 느려지는 **연산 비용 문제**가 생깁니다.  

즉, \`key\`를 고쳐도 탐색 비용은 그대로일 수 있고, 반대로 \`byId\` 인덱스를 도입해도 잘못된 \`key\`에서 오는 UI 버그는 그대로 남을 수 있습니다.

<callout variant="info" title="현실적인 트레이드오프">
항상 최적화가 정답은 아닙니다.  
데이터가 작고 변경이 단순하면 배열이 더 읽기 쉽고 유지보수도 쉽습니다.  
핵심은 "필요한 구간을 정확히 최적화"하는 것입니다.
</callout>

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
        '이번 실습의 핵심은 "기능 구현"보다 "작업 비용"입니다. 화면은 5명 샘플이지만, 실제 5,000명 규모를 상상하며 보세요.',
    },
  },
  steps: [
    {
      id: 0,
      codeLine: 1,
      description:
        '5명 샘플 목록에서 특정 사용자("User_C")를 찾습니다. 이 상황을 5,000명 서비스로 확장해 생각해 보세요.',
      stateUpdate: (state) => ({
        ...state,
        metadata: {
          ...state.metadata,
          description:
            '목표는 단 하나입니다. 필요한 데이터를 "얼마나 적은 연산으로" 찾을 수 있느냐입니다.',
        },
      }),
    },
    {
      id: 1,
      codeLine: 2,
      description:
        '첫 번째 항목부터 차례대로 비교합니다. 구현은 쉽지만 데이터가 커질수록 비용이 정직하게 증가합니다.',
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
        '한 번 비교할 때마다 시간 자원이 소모됩니다. 이 "반복 확인"이 쌓여서 체감 성능 차이를 만듭니다.',
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
        '이번에는 3번째에서 찾았지만, 항상 운이 좋진 않습니다. 목표가 뒤쪽이면 확인 횟수가 크게 늘어납니다.',
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
        '이제 접근 방식을 바꿔봅니다. 위치 정보를 미리 알고 바로 접근하는 인덱스 전략입니다.',
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
        '조회 경로가 확정되어 있어 거의 한 번에 도달합니다. 데이터가 늘어도 비용 증가가 작습니다.',
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
        '💡 실무 연결: 상태 정규화, 인덱스 설계, 조회 경로 최적화의 핵심은 모두 "작업 비용"을 줄이는 데 있습니다.',
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
