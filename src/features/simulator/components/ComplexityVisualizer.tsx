import { AnimatePresence, motion } from 'framer-motion'
import type React from 'react'
import { cn } from '@/shared/lib'
import type { SystemState } from '../lib/types'

interface ComplexityVisualizerProps {
  state: SystemState
}

interface ComplexityMetadata {
  items: string[]
  currentIndex: number
  targetIndex: number
  mode: 'sequential' | 'direct'
  found: boolean
  description: string
}

interface ComplexityItemCardProps {
  item: string
  index: number
  currentIndex: number
  targetIndex: number
  found: boolean
}

function ComplexityItemCard({
  item,
  index,
  currentIndex,
  targetIndex,
  found,
}: ComplexityItemCardProps) {
  const isCurrent = index === currentIndex
  const isTargetFound = index === targetIndex && found
  const isPassed = index < currentIndex && !isTargetFound

  const borderColor = isTargetFound
    ? '#4ade80'
    : isCurrent
      ? '#3b82f6'
      : 'rgba(255,255,255,0.1)'

  const backgroundColor = isTargetFound
    ? 'rgba(74, 222, 128, 0.1)'
    : isCurrent
      ? 'rgba(59, 130, 246, 0.1)'
      : 'rgba(255,255,255,0.03)'

  return (
    <motion.div
      key={item}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isCurrent ? 1.1 : 1,
        borderColor,
        backgroundColor,
      }}
      className={cn(
        'relative h-24 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300',
        isPassed ? 'opacity-30' : 'opacity-100',
      )}
    >
      <span className={cn('text-2xl mb-1', isTargetFound && 'animate-bounce')}>
        {isTargetFound ? '🎉' : '👤'}
      </span>
      <span className="text-[10px] text-white/60 uppercase tracking-tighter">
        {item}
      </span>

      {isCurrent && !found && (
        <motion.div
          layoutId="searcher"
          className="absolute inset-0 border-2 border-blue-500 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        />
      )}
    </motion.div>
  )
}

/**
 * ComplexityVisualizer
 * Level 0 시간복잡도(작업의 비용) 레슨을 위한 전용 비주얼라이저
 * '이름 찾기' 비유를 사용하여 순차 탐색과 상수 시간 탐색의 차이를 시각화함
 */
export const ComplexityVisualizer: React.FC<ComplexityVisualizerProps> = ({
  state,
}) => {
  const metadata = (state.metadata || {}) as Partial<ComplexityMetadata>
  const {
    items = [],
    currentIndex = -1,
    targetIndex = -1,
    mode = 'sequential', // 'sequential' or 'direct'
    found = false,
    description = '', // 현재 단계 설명 추가
  } = metadata

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0c0c0e] rounded-2xl border border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 w-full max-w-2xl space-y-6">
        {/* Step Description Card - Inside Visualizer */}
        <motion.div
          key={description}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 shadow-2xl backdrop-blur-sm"
        >
          <div className="text-[10px] text-blue-400 uppercase tracking-widest mb-1">
            Current Step
          </div>
          <p className="text-sm text-white/90 leading-relaxed font-medium">
            {description || '진행을 시작하세요.'}
          </p>
        </motion.div>

        {/* Status Header */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-white/80">
            {targetIndex !== -1
              ? `Target: "${items[targetIndex]}"`
              : 'System Ready'}
          </h3>
          <div className="flex justify-center gap-2">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tighter uppercase ${mode === 'sequential' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}
            >
              {mode === 'sequential'
                ? 'Linear Access (O(N))'
                : 'Direct Access (O(1))'}
            </span>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="grid grid-cols-5 gap-4 min-w-0 w-full">
          <AnimatePresence mode="popLayout">
            {items.map((item: string, index: number) => (
              <ComplexityItemCard
                key={item}
                item={item}
                index={index}
                currentIndex={currentIndex}
                targetIndex={targetIndex}
                found={found}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Counter / Stats */}
        <div className="flex justify-center gap-12 pt-4">
          <div className="text-center">
            <div className="text-3xl font-black text-white">
              {mode === 'direct'
                ? currentIndex === -1
                  ? 0
                  : 1
                : Math.max(0, currentIndex + 1)}
            </div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest">
              확인 횟수 (Steps)
            </div>
          </div>
          <div className="text-center">
            <div
              className={`text-3xl font-black ${found ? 'text-green-400' : 'text-white/20'}`}
            >
              {found ? 'SUCCESS' : 'SEARCHING'}
            </div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest">
              상태 (Status)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
