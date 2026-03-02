import * as React from 'react'
import { cn } from '@/lib/utils'
import { Search, X, ArrowLeft } from 'lucide-react'

export interface SearchBarProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  variant?: 'bar' | 'view'
  leading?: React.ReactNode
  trailing?: React.ReactNode
  onBack?: () => void
  className?: string
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, placeholder = 'Search', variant = 'bar', leading, trailing, onBack, className }, ref) => {
    return (
      <div
        className={cn(
          'flex items-center gap-3 rounded-m3-full bg-m3-surface-container-high px-4 h-14 w-full',
          variant === 'view' && 'rounded-none border-b border-m3-outline-variant bg-m3-surface',
          className
        )}
      >
        {onBack ? (
          <button onClick={onBack} className="shrink-0 text-m3-on-surface p-1 rounded-full hover:bg-m3-on-surface/8" aria-label="Back">
            <ArrowLeft className="size-6" />
          </button>
        ) : (
          <Search className="size-6 shrink-0 text-m3-on-surface-variant" />
        )}
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-m3-on-surface placeholder:text-m3-on-surface-variant text-base outline-none"
        />
        {value && (
          <button
            onClick={() => onChange?.('')}
            className="shrink-0 text-m3-on-surface-variant p-1 rounded-full hover:bg-m3-on-surface/8"
            aria-label="Clear search"
          >
            <X className="size-5" />
          </button>
        )}
        {trailing && <div className="shrink-0">{trailing}</div>}
      </div>
    )
  }
)
SearchBar.displayName = 'SearchBar'
