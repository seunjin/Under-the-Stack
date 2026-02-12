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
        'flex flex-col-reverse items-center justify-end gap-2 p-4 h-full w-full border-x border-border/30 bg-black/20',
        className,
      )}
    >
      <AnimatePresence initial={false}>
        {items.map((item, index) => (
          <motion.div
            key={`${item}-${index}`}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            layout
            className="w-full h-12 flex items-center justify-center bg-primary/10 border border-primary/30 rounded-md shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          >
            <span className="text-xs font-mono font-medium text-primary uppercase tracking-tight">
              {item}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="mt-auto pt-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest opacity-50">
        Call Stack
      </div>
    </div>
  )
}
