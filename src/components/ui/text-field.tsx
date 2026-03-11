import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  supportingText?: string
  error?: boolean
  errorText?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  multiline?: boolean
  rows?: number
}

const TextField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  (
    {
      className,
      label,
      supportingText,
      error,
      errorText,
      leadingIcon,
      trailingIcon,
      multiline = false,
      rows = 4,
      placeholder,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId()
    const supportId = React.useId()
    const hasExplicitPlaceholder = !!placeholder

    return (
      <div className={cn('relative w-full', className)}>
        <div
          className={cn(
            'relative flex',
            multiline ? 'items-start' : 'items-center',
            'bg-white rounded-t-m3-xs border-b-2 border-m3-on-surface-variant focus-within:border-m3-primary',
            error && 'border-m3-error focus-within:border-m3-error'
          )}
        >
          {leadingIcon && (
            <span className="pl-3 text-m3-on-surface-variant [&_svg]:size-5">
              {leadingIcon}
            </span>
          )}
          <div className="relative flex-1 min-w-0">
            {multiline ? (
              <textarea
                ref={ref as React.Ref<HTMLTextAreaElement>}
                id={inputId}
                rows={rows}
                aria-describedby={supportingText || errorText ? supportId : undefined}
                aria-invalid={error}
                placeholder={hasExplicitPlaceholder ? placeholder : label}
                className={cn(
                  'peer w-full bg-transparent outline-none text-m3-on-surface text-base resize-vertical leading-relaxed',
                  label ? 'px-4 pt-6 pb-4' : 'px-4 pt-4 pb-4',
                  !hasExplicitPlaceholder && 'placeholder-transparent',
                  hasExplicitPlaceholder && 'placeholder-m3-on-surface-variant/60',
                  leadingIcon && 'pl-2'
                )}
                {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
              />
            ) : (
              <input
                ref={ref as React.Ref<HTMLInputElement>}
                id={inputId}
                aria-describedby={supportingText || errorText ? supportId : undefined}
                aria-invalid={error}
                placeholder={hasExplicitPlaceholder ? placeholder : label}
                className={cn(
                  'peer w-full bg-transparent outline-none text-m3-on-surface text-base h-14 px-4 pt-5 pb-1',
                  !hasExplicitPlaceholder && 'placeholder-transparent',
                  hasExplicitPlaceholder && 'placeholder-m3-on-surface-variant/60',
                  leadingIcon && 'pl-2',
                  trailingIcon && 'pr-2'
                )}
                {...props}
              />
            )}
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  'absolute pointer-events-none transition-all duration-200 origin-top-left text-m3-on-surface-variant',
                  multiline
                    ? hasExplicitPlaceholder
                      // With explicit placeholder: label is always shrunk at top
                      ? 'left-4 right-4 top-0 pt-1 pb-0.5 z-[1] bg-white text-xs'
                      // Without explicit placeholder: animates from inside field to top
                      : cn(
                          'left-4 right-4 text-base top-[18px]',
                          'peer-focus:top-0 peer-focus:pt-1 peer-focus:pb-0.5 peer-focus:text-xs peer-focus:z-[1] peer-focus:bg-white',
                          'peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:pt-1 peer-[:not(:placeholder-shown)]:pb-0.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:z-[1] peer-[:not(:placeholder-shown)]:bg-white'
                        )
                    : cn(
                        'text-base',
                        hasExplicitPlaceholder
                          ? 'left-4 top-1 translate-y-0 text-xs'
                          : cn(
                              'left-4 top-1/2 -translate-y-1/2',
                              'peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-xs',
                              'peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs'
                            ),
                        leadingIcon && 'left-2'
                      ),
                  error
                    ? 'text-m3-error peer-focus:text-m3-error'
                    : 'peer-focus:text-m3-primary'
                )}
              >
                {label}
              </label>
            )}
          </div>
          {!multiline && trailingIcon && (
            <span className="pr-3 text-m3-on-surface-variant [&_svg]:size-5">
              {trailingIcon}
            </span>
          )}
        </div>
        {(supportingText || errorText) && (
          <p
            id={supportId}
            className={cn(
              'text-xs mt-1 px-4',
              error ? 'text-m3-error' : 'text-m3-on-surface-variant'
            )}
          >
            {error ? errorText : supportingText}
          </p>
        )}
      </div>
    )
  }
)
TextField.displayName = 'TextField'

export { TextField }
