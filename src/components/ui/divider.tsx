import * as React from 'react'
import { cn } from '@/lib/utils'

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical'
  inset?: 'none' | 'left' | 'middle'
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', inset = 'none', className, ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="separator"
          aria-orientation="vertical"
          className={cn('self-stretch w-px bg-m3-outline-variant', className)}
        />
      )
    }
    return (
      <hr
        ref={ref}
        role="separator"
        className={cn(
          'border-0 h-px bg-m3-outline-variant',
          inset === 'left' && 'ml-16',
          inset === 'middle' && 'mx-16',
          className
        )}
        {...props}
      />
    )
  }
)
Divider.displayName = 'Divider'
