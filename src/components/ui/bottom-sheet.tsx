import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

export interface BottomSheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  children?: React.ReactNode
  snapPoints?: ('sm' | 'md' | 'lg' | 'full')[]
  defaultSnap?: 'sm' | 'md' | 'lg' | 'full'
}

const snapHeights = {
  sm: 'max-h-[30vh]',
  md: 'max-h-[50vh]',
  lg: 'max-h-[75vh]',
  full: 'max-h-[92vh]',
}

export function BottomSheet({ open, onOpenChange, title, description, children, defaultSnap = 'md' }: BottomSheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-m3-scrim/32 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            'fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-[28px] bg-m3-surface overflow-hidden',
            snapHeights[defaultSnap],
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
            'duration-300'
          )}
        >
          {/* Handle */}
          <div className="flex justify-center pt-4 pb-2 shrink-0">
            <div className="w-8 h-1 rounded-full bg-m3-outline-variant" />
          </div>

          {/* Header */}
          {(title || description) && (
            <div className="px-6 pb-4 shrink-0">
              {title && (
                <Dialog.Title className="text-lg font-medium text-m3-on-surface text-center">
                  {title}
                </Dialog.Title>
              )}
              {description && (
                <Dialog.Description className="mt-1 text-sm text-m3-on-surface-variant text-center">
                  {description}
                </Dialog.Description>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
