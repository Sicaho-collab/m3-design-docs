import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SimpleCalendarProps = React.ComponentProps<typeof DayPicker>

function SimpleCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: SimpleCalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          'inline-flex items-center justify-center rounded-md',
          'size-7 bg-transparent',
          'text-m3-on-surface-variant'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-m3-on-surface-variant rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'h-9 w-9 text-center text-sm p-0 relative',
          '[&:has([aria-selected].day-range-end)]:rounded-r-md',
          '[&:has([aria-selected].day-range-start)]:rounded-l-md',
          'first:[&:has([aria-selected])]:rounded-l-md',
          'last:[&:has([aria-selected])]:rounded-r-md',
          'focus-within:relative focus-within:z-20'
        ),
        day: cn(
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
          'inline-flex items-center justify-center rounded-md text-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-m3-primary text-m3-on-primary focus:bg-m3-primary focus:text-m3-on-primary',
        day_today: 'bg-m3-surface-container-high text-m3-on-surface',
        day_outside:
          'day-outside text-m3-on-surface-variant/50 aria-selected:bg-m3-primary/50 aria-selected:text-m3-on-primary/80',
        day_disabled: 'text-m3-on-surface-variant/50',
        day_range_middle:
          'aria-selected:bg-m3-surface-container aria-selected:text-m3-on-surface',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="size-4" />,
        IconRight: () => <ChevronRight className="size-4" />,
      }}
      {...props}
    />
  )
}
SimpleCalendar.displayName = 'SimpleCalendar'

export { SimpleCalendar }
