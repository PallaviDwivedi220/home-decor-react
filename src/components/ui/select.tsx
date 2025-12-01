import * as React from 'react'
import { cn } from '@/lib/utils'

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  fullWidth?: boolean
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, fullWidth = true, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-600',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    />
  )
)
Select.displayName = 'Select'
