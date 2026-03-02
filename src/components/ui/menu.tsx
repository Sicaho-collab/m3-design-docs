import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '@/lib/utils'
import { Check, ChevronRight } from 'lucide-react'

const Menu = DropdownMenu.Root
const MenuTrigger = DropdownMenu.Trigger

const MenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[180px] overflow-hidden rounded-m3-md bg-m3-surface-container py-2 shadow-m3-2',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className
      )}
      {...props}
    />
  </DropdownMenu.Portal>
))
MenuContent.displayName = 'MenuContent'

const MenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Item> & { leading?: React.ReactNode; trailing?: React.ReactNode }
>(({ className, leading, trailing, children, ...props }, ref) => (
  <DropdownMenu.Item
    ref={ref}
    className={cn(
      'relative flex items-center gap-3 px-3 py-3 text-sm text-m3-on-surface cursor-pointer select-none outline-none',
      'hover:bg-m3-on-surface/8 focus:bg-m3-on-surface/8',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-38',
      className
    )}
    {...props}
  >
    {leading && <span className="shrink-0 text-m3-on-surface-variant [&_svg]:size-[18px]">{leading}</span>}
    <span className="flex-1">{children}</span>
    {trailing && <span className="shrink-0 text-m3-on-surface-variant text-xs">{trailing}</span>}
  </DropdownMenu.Item>
))
MenuItem.displayName = 'MenuItem'

const MenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenu.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(
      'relative flex items-center gap-3 px-3 py-3 text-sm text-m3-on-surface cursor-pointer select-none outline-none',
      'hover:bg-m3-on-surface/8 focus:bg-m3-on-surface/8',
      className
    )}
    {...props}
  >
    <span className="shrink-0 size-[18px] flex items-center justify-center">
      <DropdownMenu.ItemIndicator>
        <Check className="size-4 text-m3-primary" />
      </DropdownMenu.ItemIndicator>
    </span>
    {children}
  </DropdownMenu.CheckboxItem>
))
MenuCheckboxItem.displayName = 'MenuCheckboxItem'

const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenu.Separator ref={ref} className={cn('my-1 h-px bg-m3-outline-variant', className)} {...props} />
))
MenuSeparator.displayName = 'MenuSeparator'

const MenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenu.Label
    ref={ref}
    className={cn('px-3 py-2 text-xs font-medium text-m3-on-surface-variant uppercase tracking-wider', className)}
    {...props}
  />
))
MenuLabel.displayName = 'MenuLabel'

const MenuSub = DropdownMenu.Sub
const MenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <DropdownMenu.SubTrigger
    ref={ref}
    className={cn(
      'flex items-center gap-3 px-3 py-3 text-sm text-m3-on-surface cursor-pointer select-none outline-none',
      'hover:bg-m3-on-surface/8 focus:bg-m3-on-surface/8 data-[state=open]:bg-m3-on-surface/8',
      className
    )}
    {...props}
  >
    <span className="flex-1">{children}</span>
    <ChevronRight className="size-4 shrink-0 text-m3-on-surface-variant" />
  </DropdownMenu.SubTrigger>
))
MenuSubTrigger.displayName = 'MenuSubTrigger'

const MenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenu.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenu.Portal>
    <DropdownMenu.SubContent
      ref={ref}
      className={cn(
        'z-50 min-w-[160px] overflow-hidden rounded-m3-md bg-m3-surface-container py-2 shadow-m3-2',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      {...props}
    />
  </DropdownMenu.Portal>
))
MenuSubContent.displayName = 'MenuSubContent'

export {
  Menu, MenuTrigger, MenuContent, MenuItem, MenuCheckboxItem,
  MenuSeparator, MenuLabel, MenuSub, MenuSubTrigger, MenuSubContent,
}
