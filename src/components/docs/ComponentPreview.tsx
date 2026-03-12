import type React from 'react'
import { cn } from '@/lib/utils'

interface ComponentPreviewProps {
  children: React.ReactNode
  className?: string
  title?: string
  noClip?: boolean
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  children,
  className,
  title,
  noClip = false,
}) => (
  <div className={cn('rounded-m3-md border border-m3-outline-variant/60 shadow-soft', noClip ? 'overflow-visible' : 'overflow-hidden')}>
    {title && (
      <div className="px-4 py-2.5 bg-m3-surface-container border-b border-m3-outline-variant">
        <span className="text-xs font-medium text-m3-on-surface-variant uppercase tracking-wider">
          {title}
        </span>
      </div>
    )}
    <div
      className={cn(
        'p-6 bg-m3-surface flex flex-wrap items-center gap-4',
        className
      )}
    >
      {children}
    </div>
  </div>
)
