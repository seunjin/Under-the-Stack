import type { Track } from './types'

/**
 * 전용 트랙 구조 (Web System Thinking)
 * - Base Systems: CS 기초
 * - Applied Web Systems: 실무 매핑
 */
export const CURRICULUM: Track[] = [
  {
    id: 'base-systems',
    title: 'Track 1. Base Systems',
    description: '웹 개발을 위한 필수 CS 기초 체력',
    modules: [
      {
        id: 'foundations',
        title: 'Foundations',
        lessons: [
          {
            id: 'complexity',
            title: '시간복잡도 (Time Complexity)',
            description: 'Big-O 감각과 성능 분석의 기초',
            iconType: 'base',
            deepDiveId: 'react-normalization',
          },
          {
            id: 'array',
            title: '배열 (Array)',
            description: '메모리 상의 선형 구조와 접근 비용',
            iconType: 'base',
          },
          {
            id: 'stack-queue',
            title: '스택 & 큐 (Stack & Queue)',
            description: 'LIFO와 FIFO 구조의 이해',
            iconType: 'base',
          },
          {
            id: 'hash-table',
            title: '해시테이블 (Hash Table)',
            description: 'Key-Value 쌍과 O(1) 탐색의 비밀',
            iconType: 'base',
          },
        ],
      },
      {
        id: 'structures',
        title: 'Data Structures',
        lessons: [
          {
            id: 'linked-list',
            title: '연결리스트 (Linked List)',
            description: '노드와 포인터를 이용한 동적 데이터',
            iconType: 'base',
          },
          {
            id: 'tree',
            title: '트리 (Tree)',
            description: '계층형 데이터와 탐색 알고리즘',
            iconType: 'base',
          },
        ],
      },
    ],
  },
  {
    id: 'applied-systems',
    title: 'Track 2. Applied Web Systems',
    description: '실무 기술로 재해석하는 시스템 사고',
    modules: [
      {
        id: 'runtime',
        title: 'Runtime & Rendering',
        lessons: [
          {
            id: 'event-loop',
            title: '이벤트 루프 (Event Loop)',
            description: 'Queue와 Stack으로 이해하는 비동기 JS',
            iconType: 'applied',
          },
          {
            id: 'virtual-dom',
            title: '가상 DOM (Virtual DOM)',
            description: 'Tree와 Diffing 알고리즘의 실체',
            iconType: 'applied',
          },
          {
            id: 'react-rendering',
            title: 'React 리스트 렌더링',
            description: 'Array 구조가 렌더링 성능에 미치는 영향',
            iconType: 'applied',
          },
        ],
      },
      {
        id: 'network-db',
        title: 'Network & Persistence',
        lessons: [
          {
            id: 'http-cache',
            title: 'HTTP 캐싱 전략',
            description: 'Hash와 캐시 헤더의 연결고리',
            iconType: 'applied',
          },
          {
            id: 'db-index',
            title: 'DB 인덱스 (B-Tree)',
            description: '왜 인덱스를 걸면 검색이 빨라질까?',
            iconType: 'applied',
          },
        ],
      },
    ],
  },
]
