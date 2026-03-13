import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SimpleCalendar } from '@/components/ui/simple-calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  className?: string
}

function DatePicker({
  date,
  onDateChange,
  placeholder = 'Pick a date',
  disabled = false,
  minDate,
  maxDate,
  className,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'flex items-center gap-2 w-[280px] px-3 py-2.5',
            'rounded-m3-sm border border-m3-outline-variant/60 shadow-soft bg-m3-surface',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary focus-visible:ring-offset-2',
            'disabled:opacity-50 disabled:pointer-events-none',
            className
          )}
        >
          <CalendarIcon className="w-4 h-4 text-m3-on-surface-variant shrink-0" />
          {date ? (
            <span className="text-sm text-m3-on-surface">{format(date, 'PPP')}</span>
          ) : (
            <span className="text-sm text-m3-on-surface-variant">{placeholder}</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <SimpleCalendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          disabled={[
            ...(minDate ? [{ before: minDate }] : []),
            ...(maxDate ? [{ after: maxDate }] : []),
          ]}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
export type { DatePickerProps }
