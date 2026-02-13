import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/shared/lib'

const badgeVariants = cva(
  'inline-flex items-center rounded px-1.5 py-0.5 text-[0.85em] font-medium transition-colors focus:outline-none focus:ring-0',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary/10 text-primary hover:bg-primary/20',
        secondary:
          'border-transparent bg-neutral-100 text-neutral-600 hover:bg-neutral-200/50',
        destructive:
          'border-transparent bg-red-50 text-red-600 hover:bg-red-100',
        outline: 'border-neutral-200 text-neutral-600 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
