import * as React from 'react'
import { cn } from '@/lib/utils'

export interface NavRailItem {
  label: string
  icon: React.ReactNode
  activeIcon?: React.ReactNode
  badge?: number | boolean
}

export interface NavigationRailProps {
  items: NavRailItem[]
  activeIndex: number
  onSelect: (index: number) => void
  /** Optional FAB element rendered below the menu button */
  fab?: React.ReactNode
  /** Controlled expanded state — when true, shows labels beside icons */
  expanded?: boolean
  /** Called when the collapse/expand toggle is clicked */
  onExpandedChange?: (expanded: boolean) => void
  /** Default expanded state for uncontrolled mode */
  defaultExpanded?: boolean
  /** Align items within the rail: top (default), center, or bottom */
  alignment?: 'top' | 'center' | 'bottom'
  /** Hide the collapse/expand menu button */
  hideMenuButton?: boolean
  /** Optional header element (e.g. logo) rendered at the very top */
  header?: React.ReactNode
  /** Additional class name */
  className?: string
}

export function NavigationRail({
  items,
  activeIndex,
  onSelect,
  fab,
  expanded: controlledExpanded,
  onExpandedChange,
  defaultExpanded = false,
  alignment = 'top',
  hideMenuButton = false,
  header,
  className,
}: NavigationRailProps) {
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded)
  const isControlled = controlledExpanded !== undefined
  const expanded = isControlled ? controlledExpanded : internalExpanded

  const toggleExpanded = () => {
    const next = !expanded
    if (!isControlled) setInternalExpanded(next)
    onExpandedChange?.(next)
  }

  const alignClass =
    alignment === 'center' ? 'justify-center' :
    alignment === 'bottom' ? 'justify-end' :
    'justify-start'

  return (
    <nav
      className={cn(
        'flex flex-col items-center h-screen sticky top-0 py-3 transition-[width] duration-300 ease-in-out',
        expanded ? 'w-[220px]' : 'w-[80px]',
        className,
      )}
      style={{ background: 'linear-gradient(to bottom, #ECEEF1, #F3EAFC)' }}
      aria-label="Side navigation"
    >
      {/* ── Header (logo) ── */}
      {header && <div className="mb-2 flex items-center justify-center">{header}</div>}

      {/* ── Menu toggle button ── */}
      {!hideMenuButton && (
        <button
          onClick={toggleExpanded}
          aria-label={expanded ? 'Collapse navigation' : 'Expand navigation'}
          aria-expanded={expanded}
          className={cn(
            'flex items-center justify-center size-12 rounded-m3-full transition-colors duration-200',
            'text-m3-on-surface-variant hover:bg-m3-on-surface/8 active:bg-m3-on-surface/12',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2 focus-visible:ring-offset-m3-surface-container',
            expanded && 'self-start ml-2',
          )}
        >
          {expanded ? (
            /* M3 "menu_open" icon — hamburger with left-pointing arrow */
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z" />
            </svg>
          ) : (
            /* M3 "menu" icon — standard hamburger */
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          )}
        </button>
      )}

      {/* ── FAB slot ── */}
      {fab && (
        <div className={cn('mt-2 mb-2', expanded && 'self-start ml-2')}>
          {fab}
        </div>
      )}

      {/* ── Destinations ── */}
      <div className={cn('flex flex-col w-full gap-0.5 flex-1 mt-2', alignClass)}>
        {items.map((item, i) => {
          const active = i === activeIndex
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'group relative flex items-center gap-3 w-full transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-m3-primary',
                expanded ? 'px-4 py-3 rounded-m3-full mx-2 w-[calc(100%-16px)]' : 'flex-col px-2 py-3',
              )}
            >
              {/* Full-row hover/pressed state layer (expanded mode) */}
              {expanded && (
                <div
                  className={cn(
                    'absolute inset-0 rounded-m3-full transition-all duration-200',
                    !active && 'group-hover:bg-m3-on-surface/8 group-active:bg-m3-on-surface/12',
                    active && 'bg-m3-secondary-container group-hover:bg-m3-secondary-container/80 group-active:bg-m3-secondary-container/70',
                  )}
                />
              )}

              {/* Icon container with active indicator pill */}
              <div className="relative flex items-center justify-center shrink-0 w-[56px] h-8 rounded-m3-full transition-all duration-200">
                {/* Hover state layer (collapsed mode only — expanded uses the full-row layer) */}
                {!expanded && (
                  <div
                    className={cn(
                      'absolute inset-0 rounded-m3-full transition-all duration-200',
                      !active && 'group-hover:bg-m3-on-surface/8 group-active:bg-m3-on-surface/12',
                      active && 'group-hover:bg-m3-on-secondary-container/8 group-active:bg-m3-on-secondary-container/12',
                    )}
                  />
                )}
                {/* Active indicator pill (collapsed mode only) */}
                {!expanded && (
                  <div
                    className={cn(
                      'absolute inset-0 rounded-m3-full transition-all duration-300 ease-out',
                      active ? 'bg-m3-secondary-container scale-100 opacity-100' : 'scale-75 opacity-0',
                    )}
                  />
                )}
                {/* Icon */}
                <span
                  className={cn(
                    'relative z-10 [&_svg]:size-6 transition-colors duration-200',
                    active ? 'text-m3-on-secondary-container' : 'text-m3-on-surface-variant',
                  )}
                >
                  {active && item.activeIcon ? item.activeIcon : item.icon}
                </span>
                {/* Badge */}
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      'absolute -top-1 right-1 rounded-full bg-m3-error text-m3-on-error text-[10px] font-medium leading-none z-20',
                      typeof item.badge === 'boolean'
                        ? 'size-2'
                        : 'min-w-[16px] h-4 px-1 flex items-center justify-center',
                    )}
                  >
                    {typeof item.badge === 'number' ? (item.badge > 99 ? '99+' : item.badge) : ''}
                  </span>
                )}
              </div>

              {/* Label */}
              {expanded ? (
                <span
                  className={cn(
                    'relative z-10 text-sm whitespace-nowrap transition-colors duration-200 overflow-hidden',
                    active ? 'font-semibold text-m3-on-secondary-container' : 'font-medium text-m3-on-surface-variant',
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <span
                  className={cn(
                    'text-[11px] text-center leading-tight transition-colors duration-200',
                    active ? 'font-semibold text-m3-on-surface' : 'text-m3-on-surface-variant',
                  )}
                >
                  {item.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
