import type { DeepDive } from '../../lib/types'
import { reactNormalizationDeepDive } from './react-normalization'

export const DEEP_DIVES: Record<string, DeepDive> = {
  'react-normalization': reactNormalizationDeepDive,
}

export function getDeepDive(id: string): DeepDive | undefined {
  return DEEP_DIVES[id]
}
