import React from 'react'
import { cn } from '@/lib/utils'

type RatingProps = {
  value: number // 0..5 (can be fractional)
  count?: number
  className?: string
  showValue?: boolean // show numeric value like 4.5
  size?: number // font size for stars
}

// Memoize the entire Rating component to prevent unnecessary re-renders
export const Rating = React.memo(function Rating({ value = 0, count, className, showValue = false, size = 16 }: RatingProps) {
  // Ensure we have a valid number between 0-5
  const rating = typeof value === 'number' ? Math.max(0, Math.min(5, value)) : 0;
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  
  return (
    <div className={cn("flex flex-col", className)} aria-label={`Rating ${rating} out of 5`}>
      <div className="flex items-center gap-1">
        {/* Stars display with partial fill */}
        <div className="relative inline-block leading-none" aria-hidden="true">
          <span className="text-gray-300 select-none" style={{ fontSize: size }}>★★★★★</span>
          <span className="absolute left-0 top-0 overflow-hidden text-yellow-600 select-none" style={{ width: `${pct}%`, fontSize: size }}>★★★★★</span>
        </div>
        
        {/* Rating value */}
        {showValue && (
          <span className="ml-1 text-xs font-medium text-gray-700 tabular-nums">
            {rating.toFixed(1)}
          </span>
        )}
      </div>
      
      {/* Review count */}
      {typeof count === 'number' && count > 0 && (
        <span className="text-xs text-gray-500 mt-0.5 tabular-nums">
          ({count} reviews)
        </span>
      )}
    </div>
  );
});
