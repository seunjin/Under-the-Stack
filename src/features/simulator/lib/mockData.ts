import { arrayLesson } from '../data/array'
import { complexityLesson } from '../data/complexity'
import { engineTestLesson } from '../data/engine-test'
import { eventLoopLesson } from '../data/event-loop'
import { hashTableLesson } from '../data/hash-table'
import { stackQueueLesson } from '../data/stack-queue'
import type { LessonData } from './types'

export const LESSONS: Record<string, LessonData> = {
  'engine-test': engineTestLesson,
  complexity: complexityLesson,
  array: arrayLesson,
  'stack-queue': stackQueueLesson,
  'hash-table': hashTableLesson,
  'event-loop': eventLoopLesson,
}
