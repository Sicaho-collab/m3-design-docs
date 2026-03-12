'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface VerticalNavStep {
  label: string
  description?: string
  count?: number
}

export interface VerticalNavStepperProps {
  steps: VerticalNavStep[]
  activeIndex: number
  onStepClick: (index: number) => void
  className?: string
}

export function VerticalNavStepper({
  steps,
  activeIndex,
  onStepClick,
  className,
}: VerticalNavStepperProps) {
  return (
    <nav
      className={cn('flex flex-col', className)}
      aria-label="Step navigation"
      role="navigation"
    >
      {steps.map((step, index) => {
        const isActive = index === activeIndex
        const isLast = index === steps.length - 1

        return (
          <div key={index} className="flex">
            {/* Circle + connector column */}
            <div className="flex flex-col items-center">
              {/* Step circle */}
              <button
                type="button"
                onClick={() => onStepClick(index)}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                  'text-sm font-medium cursor-pointer',
                  'transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-m3-primary text-m3-on-primary'
                    : 'bg-m3-surface-container-high text-m3-on-surface-variant',
                )}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Step ${index + 1}: ${step.label}`}
              >
                {index + 1}
              </button>

              {/* Connecting line */}
              {!isLast && (
                <div className="w-[2px] flex-1 min-h-[16px] bg-m3-outline-variant" />
              )}
            </div>

            {/* Label + description column */}
            <button
              type="button"
              onClick={() => onStepClick(index)}
              className={cn(
                'flex-1 flex items-start gap-2 ml-3 cursor-pointer text-left',
                'rounded-m3-sm px-2 py-1 -mt-0.5 transition-colors duration-200',
                'hover:bg-m3-on-surface/8',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary',
                !isLast && 'mb-2',
              )}
              tabIndex={-1}
            >
              <div className="flex flex-col min-h-[28px] justify-center">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'text-sm transition-colors duration-200',
                      isActive
                        ? 'text-m3-primary font-semibold'
                        : 'text-m3-on-surface',
                    )}
                  >
                    {step.label}
                  </span>
                  {step.count !== undefined && (
                    <span
                      className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full"
                      style={{ background: '#FFE5C4', color: '#4D2800' }}
                    >
                      {step.count}
                    </span>
                  )}
                </div>
                {step.description && (
                  <span className="text-xs text-m3-on-surface-variant mt-0.5">
                    {step.description}
                  </span>
                )}
              </div>
            </button>
          </div>
        )
      })}
    </nav>
  )
}
