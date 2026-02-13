import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/shared/lib'

interface StackViewProps {
  items: string[]
  className?: string
}

export function StackView({ items, className }: StackViewProps) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse items-center justify-end gap-2 p-4 h-full w-full',
        className,
      )}
    >
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            layout
            className="w-full h-12 flex items-center justify-center bg-primary/20 border border-primary/40 rounded-md shadow-[0_0_20px_rgba(146,252,50,0.1)] backdrop-blur-md"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              {item}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="mt-auto pt-4 text-[10px] text-muted uppercase tracking-widest">
        Call Stack
      </div>
    </div>
  )
}
