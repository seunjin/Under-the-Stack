import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/shared/lib'

interface QueueViewProps {
  items: string[]
  title?: string
  className?: string
}

export function QueueView({
  items,
  title = 'Task Queue',
  className,
}: QueueViewProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 p-4 border border-white/5 bg-[#0c0c0e] rounded-xl overflow-hidden shadow-2xl',
        className,
      )}
    >
      <div className="text-[10px] text-muted uppercase tracking-widest mb-2 ">
        {title}
      </div>
      <div className="flex gap-2 min-h-[60px] items-center">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              layout
              className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-lg flex items-center justify-center shadow-md backdrop-blur-sm"
            >
              <span className="text-xs font-bold text-primary">{item}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <div className="text-xs text-muted italic">Empty</div>
        )}
      </div>
    </div>
  )
}
