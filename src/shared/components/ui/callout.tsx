import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/shared/lib'

const calloutVariants = cva(
  'my-6 flex w-full items-start gap-1 rounded-xl p-4 text-[0.95em] leading-relaxed border-l-[3px] bg-neutral-50 shadow-sm',
  {
    variants: {
      variant: {
        info: 'border-blue-400/70',
        warning: 'border-amber-400/70',
        idea: 'border-emerald-400/70',
        note: 'border-neutral-300',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
)

const variantIcons: Record<string, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  idea: '💡',
  note: '📝',
}

const variantIconColors: Record<string, string> = {
  info: 'text-blue-500',
  warning: 'text-amber-500',
  idea: 'text-emerald-500',
  note: 'text-neutral-500',
}

const variantTitles: Record<string, string> = {
  info: '안내',
  warning: '주의',
  idea: '핵심 요약',
  note: '참고',
}

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string
  icon?: string
}

function Callout({
  className,
  variant = 'info',
  title,
  icon,
  children,
  ...props
}: CalloutProps) {
  const activeIcon =
    icon || (variant ? variantIcons[variant] : variantIcons.info)
  const activeTitle =
    title || (variant ? variantTitles[variant] : variantTitles.info)
  const iconColor = variant
    ? variantIconColors[variant]
    : variantIconColors.info

  return (
    <div className={cn(calloutVariants({ variant }), className)} {...props}>
      <div
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center text-lg',
          iconColor,
        )}
      >
        {activeIcon}
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-bold text-base tracking-tight text-foreground">
          {activeTitle}
        </div>
        <div className="prose-p:my-0 text-foreground/90">{children}</div>
      </div>
    </div>
  )
}

export { Callout, calloutVariants }
