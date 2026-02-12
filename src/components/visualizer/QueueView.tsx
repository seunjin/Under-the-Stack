import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface QueueViewProps {
    items: any[]
    title?: string
    className?: string
}

export function QueueView({ items, title = "Task Queue", className }: QueueViewProps) {
    return (
        <div className={cn("flex flex-col gap-2 p-4 border border-border/30 bg-black/20 rounded-xl overflow-hidden", className)}>
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2 opacity-50">
                {title}
            </div>
            <div className="flex gap-2 min-h-[60px] items-center">
                <AnimatePresence initial={false}>
                    {items.map((item, index) => (
                        <motion.div
                            key={`${item}-${index}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            layout
                            className="px-4 py-2 bg-secondary/50 border border-border rounded-lg flex items-center justify-center shadow-sm"
                        >
                            <span className="text-xs font-mono font-medium">{item}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {items.length === 0 && (
                    <div className="text-xs text-muted-foreground italic opacity-30">Empty</div>
                )}
            </div>
        </div>
    )
}
