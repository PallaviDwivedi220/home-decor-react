import * as React from 'react'
import { cn } from '@/lib/utils'

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'outline' | 'secondary'
}

const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-yellow-600 text-white',
  outline: 'ring-1 ring-gray-300 text-gray-900',
  secondary: 'bg-gray-100 text-gray-800',
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <span ref={ref} className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', variants[variant], className)} {...props} />
  )
)
Badge.displayName = 'Badge'
