import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textFieldVariants = cva(
  'relative w-full',
  {
    variants: {
      variant: {
        filled: '',
        outlined: '',
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  }
)

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof textFieldVariants> {
  label?: string
  supportingText?: string
  error?: boolean
  errorText?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      variant,
      label,
      supportingText,
      error,
      errorText,
      leadingIcon,
      trailingIcon,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId()
    const supportId = React.useId()

    return (
      <div className={cn(textFieldVariants({ variant }), className)}>
        <div
          className={cn(
            'relative flex items-center',
            variant === 'filled' &&
              'bg-m3-surface-container-highest rounded-t-m3-xs border-b-2 border-m3-on-surface-variant focus-within:border-m3-primary',
            variant === 'outlined' &&
              'border border-m3-outline rounded-m3-xs focus-within:border-2 focus-within:border-m3-primary',
            error && 'border-m3-error focus-within:border-m3-error'
          )}
        >
          {leadingIcon && (
            <span className="pl-3 text-m3-on-surface-variant [&_svg]:size-5">
              {leadingIcon}
            </span>
          )}
          <div className="relative flex-1 min-w-0">
            <input
              ref={ref}
              id={inputId}
              aria-describedby={supportingText || errorText ? supportId : undefined}
              aria-invalid={error}
              className={cn(
                'peer w-full bg-transparent outline-none text-m3-on-surface text-base h-14 px-4 pt-5 pb-1 placeholder-transparent',
                leadingIcon && 'pl-2',
                trailingIcon && 'pr-2'
              )}
              placeholder={label}
              {...props}
            />
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  'absolute left-4 top-1/2 -translate-y-1/2 text-m3-on-surface-variant text-base transition-all duration-200 pointer-events-none origin-top-left',
                  variant === 'outlined'
                    ? 'peer-focus:-top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-m3-primary peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1'
                    : 'peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-m3-primary peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs',
                  leadingIcon && 'left-2',
                  error && 'peer-focus:text-m3-error'
                )}
              >
                {label}
              </label>
            )}
          </div>
          {trailingIcon && (
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

export { TextField, textFieldVariants }
