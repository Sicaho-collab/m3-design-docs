import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

export interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  siblingCount?: number
  className?: string
}

function getPageRange(page: number, totalPages: number, siblingCount: number): (number | 'ellipsis')[] {
  const delta = siblingCount
  const left = page - delta
  const right = page + delta + 1
  const range: number[] = []
  const rangeWithDots: (number | 'ellipsis')[] = []

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= left && i < right)) {
      range.push(i)
    }
  }

  let prev: number | undefined
  for (const i of range) {
    if (prev !== undefined) {
      if (i - prev === 2) {
        rangeWithDots.push(prev + 1)
      } else if (i - prev > 2) {
        rangeWithDots.push('ellipsis')
      }
    }
    rangeWithDots.push(i)
    prev = i
  }

  return rangeWithDots
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  showFirstLast = false,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const pages = getPageRange(page, totalPages, siblingCount)

  return (
    <nav role="navigation" aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      {showFirstLast && (
        <PageButton
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          aria-label="First page"
        >
          «
        </PageButton>
      )}
      <PageButton
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
      </PageButton>

      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e${i}`} className="flex size-9 items-center justify-center text-m3-on-surface-variant">
            <MoreHorizontal className="size-4" />
          </span>
        ) : (
          <PageButton
            key={p}
            onClick={() => onPageChange(p)}
            active={p === page}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </PageButton>
        )
      )}

      <PageButton
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </PageButton>
      {showFirstLast && (
        <PageButton
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          aria-label="Last page"
        >
          »
        </PageButton>
      )}
    </nav>
  )
}

interface PageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

function PageButton({ active, className, children, ...props }: PageButtonProps) {
  return (
    <button
      className={cn(
        'flex size-9 items-center justify-center rounded-m3-full text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-38',
        active
          ? 'bg-m3-secondary-container text-m3-on-secondary-container'
          : 'text-m3-on-surface-variant hover:bg-m3-on-surface/8 hover:text-m3-on-surface',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
