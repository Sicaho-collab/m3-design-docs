import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AlertTriangle, CheckCircle2, Info, XCircle, X } from 'lucide-react'

const alertVariants = cva(
  'relative w-full rounded-m3-md border p-4 pl-12 transition-all overflow-hidden',
  {
    variants: {
      variant: {
        information: 'border-blue-200/60 bg-blue-500/10',
        success: 'border-green-200/60 bg-green-500/10',
        warning: 'border-amber-200/60 bg-amber-500/10',
        error: 'border-m3-error-container bg-m3-error-container',
      },
    },
    defaultVariants: { variant: 'information' },
  }
)

const iconVariants = cva(
  'absolute left-0 top-0 h-full w-10 flex items-center justify-center',
  {
    variants: {
      variant: {
        information: 'text-blue-600',
        success: 'text-green-600',
        warning: 'text-amber-600',
        error: 'text-m3-error',
      },
    },
    defaultVariants: { variant: 'information' },
  }
)

const ICONS = {
  information: <Info className="h-5 w-5" />,
  success: <CheckCircle2 className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  error: <XCircle className="h-5 w-5" />,
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title: string
  description: string
  onClose?: () => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, description, onClose, ...props }, ref) => {
    if (!variant) return null

    return (
      <motion.div
        ref={ref}
        role="alert"
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {/* Icon strip */}
        <div className={cn(iconVariants({ variant }))}>{ICONS[variant]}</div>

        {/* Content */}
        <div className="flex-grow">
          <h5 className="font-medium text-m3-on-surface">{title}</h5>
          <p className="text-sm text-m3-on-surface-variant">{description}</p>
        </div>

        {/* Dismiss button */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Dismiss"
            className="absolute right-3 top-3 p-1 rounded-m3-full text-m3-on-surface-variant/50 transition-colors hover:text-m3-on-surface-variant hover:bg-m3-on-surface/8"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>
    )
  }
)
Alert.displayName = 'Alert'

export { Alert, alertVariants }
