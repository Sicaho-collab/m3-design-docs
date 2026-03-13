import React, { useState } from 'react'
import { format, addDays } from 'date-fns'
import { Calendar as CalendarRange, type RangeValue } from '@/components/ui/calendar'
import { DatePicker } from '@/components/ui/date-picker'
import { SimpleCalendar } from '@/components/ui/simple-calendar'
import { DateRangePicker } from '@sicaho-collab/ui-web'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'
import { PlatformUsage } from '@/components/docs/PlatformUsage'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { AccessibilityNote } from '@/components/docs/AccessibilityNote'
import { startOfDay, endOfDay, subDays, subMonths, subWeeks } from 'date-fns'

/* ─── Props ─── */

const datePickerProps: PropDef[] = [
  { name: 'date', type: 'Date | undefined', description: 'The currently selected date.' },
  { name: 'onDateChange', type: '(date: Date | undefined) => void', description: 'Called when the user selects or clears a date.' },
  { name: 'placeholder', type: 'string', default: '"Pick a date"', description: 'Placeholder text when no date is selected.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger button.' },
  { name: 'minDate', type: 'Date', description: 'Earliest selectable date. Days before this are disabled.' },
  { name: 'maxDate', type: 'Date', description: 'Latest selectable date. Days after this are disabled.' },
  { name: 'className', type: 'string', description: 'Additional class names for the trigger button.' },
]

const calendarProps: PropDef[] = [
  { name: 'value', type: 'RangeValue | null', description: 'The controlled value of the date range. An object with start and end Date fields.' },
  { name: 'onChange', type: '(date: RangeValue | null) => void', description: 'Callback fired when the selected date range changes.' },
  { name: 'allowClear', type: 'boolean', default: 'false', description: 'When true, displays a clear button to reset the selected range.' },
  { name: 'compact', type: 'boolean', default: 'false', description: 'Renders the picker in a compact layout suitable for tight spaces.' },
  { name: 'stacked', type: 'boolean', default: 'false', description: 'When used with presets, stacks the combobox and calendar button vertically.' },
  { name: 'horizontalLayout', type: 'boolean', default: 'false', description: 'Renders the calendar grid and inputs side-by-side in the popover.' },
  { name: 'showTimeInput', type: 'boolean', default: 'true', description: 'When true, shows time inputs alongside the date inputs in the popover.' },
  { name: 'popoverAlignment', type: '"start" | "center" | "end"', default: '"start"', description: 'Controls the horizontal alignment of the calendar popover relative to the trigger.' },
  { name: 'presets', type: 'Record<string, { text: string; start: Date; end: Date }>', description: 'Optional named date range presets shown in a searchable combobox alongside the picker.' },
  { name: 'presetIndex', type: 'number', description: 'Index of the preset to select by default when presets are provided.' },
  { name: 'minValue', type: 'Date', description: 'The earliest selectable date. Days before this date are disabled.' },
  { name: 'maxValue', type: 'Date', description: 'The latest selectable date. Days after this date are disabled.' },
]

const dateRangePickerProps: PropDef[] = [
  { name: 'title', type: 'string', default: '"Select dates"', description: 'Card title (card mode only)' },
  { name: 'description', type: 'string', description: 'Card description text' },
  { name: 'confirmText', type: 'string', default: '"Confirm"', description: 'Confirm button label' },
  { name: 'cancelText', type: 'string', default: '"Cancel"', description: 'Cancel button label' },
  { name: 'initialStartDate', type: 'Date', description: 'Pre-selected start date (uncontrolled)' },
  { name: 'initialEndDate', type: 'Date', description: 'Pre-selected end date (uncontrolled)' },
  { name: 'startDate', type: 'Date | null', description: 'Controlled start date' },
  { name: 'endDate', type: 'Date | null', description: 'Controlled end date' },
  { name: 'onChange', type: '(range) => void', description: 'Called when dates change (controlled mode)' },
  { name: 'onConfirm', type: '(range) => void', description: 'Called when confirm button clicked (card mode)' },
  { name: 'onCancel', type: '() => void', description: 'Called when cancel button clicked (card mode)' },
  { name: 'inline', type: 'boolean', default: 'false', description: 'Render without card wrapper' },
]

/* ─── Code snippets ─── */

const basicCode = `import { useState } from 'react'
import { DatePicker } from '@/components/ui/date-picker'

function Example() {
  const [date, setDate] = useState<Date>()

  return (
    <DatePicker
      date={date}
      onDateChange={setDate}
    />
  )
}`

const withConstraintsCode = `import { addDays } from 'date-fns'

<DatePicker
  date={date}
  onDateChange={setDate}
  placeholder="Select a deadline"
  minDate={new Date()}
  maxDate={addDays(new Date(), 90)}
/>`

const calendarOnlyCode = `import { SimpleCalendar } from '@/components/ui/simple-calendar'

function CalendarExample() {
  const [date, setDate] = useState<Date>()

  return (
    <SimpleCalendar
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  )
}`

const rangeUsageCode = `import { Calendar, type RangeValue } from '@/components/ui/calendar'

function DateRangeExample() {
  const [date, setDate] = useState<RangeValue | null>(null)
  return <Calendar allowClear value={date} onChange={setDate} />
}`

const rangeWithPresetsCode = `import { startOfDay, endOfDay, subDays } from 'date-fns'

const presets = {
  today: { text: 'Today', start: startOfDay(now), end: endOfDay(now) },
  'last-7-days': { text: 'Last 7 Days', start: startOfDay(subDays(now, 7)), end: endOfDay(now) },
  'last-30-days': { text: 'Last 30 Days', start: startOfDay(subDays(now, 30)), end: endOfDay(now) },
}

<Calendar allowClear value={date} onChange={setDate} presets={presets} />`

/* ─── Preset data ─── */

const now = new Date()
const examplePresets = {
  today: { text: 'Today', start: startOfDay(now), end: endOfDay(now) },
  yesterday: { text: 'Yesterday', start: startOfDay(subDays(now, 1)), end: endOfDay(subDays(now, 1)) },
  'last-7-days': { text: 'Last 7 Days', start: startOfDay(subDays(now, 7)), end: endOfDay(now) },
  'last-30-days': { text: 'Last 30 Days', start: startOfDay(subDays(now, 30)), end: endOfDay(now) },
  'last-3-months': { text: 'Last 3 Months', start: startOfDay(subMonths(now, 3)), end: endOfDay(now) },
  'last-week': { text: 'Last Week', start: startOfDay(subWeeks(now, 1)), end: endOfDay(now) },
}

/* ─── Demo components ─── */

function DateRangePickerInlineDemo() {
  const [start, setStart] = useState<Date | null>(null)
  const [end, setEnd] = useState<Date | null>(null)
  return (
    <div className="max-w-sm">
      <DateRangePicker
        inline
        startDate={start}
        endDate={end}
        onChange={(range: { startDate: Date | null; endDate: Date | null }) => {
          setStart(range.startDate)
          setEnd(range.endDate)
        }}
      />
    </div>
  )
}

/* ─── Page ─── */

export default function DatePickerDoc() {
  const [basicDate, setBasicDate] = useState<Date>()
  const [constraintDate, setConstraintDate] = useState<Date>()
  const [calendarDate, setCalendarDate] = useState<Date>()
  const [rangeDate, setRangeDate] = useState<RangeValue | null>(null)
  const [rangeWithPresets, setRangeWithPresets] = useState<RangeValue | null>(null)
  const [rangeHorizontal, setRangeHorizontal] = useState<RangeValue | null>(null)
  const [rangeNoTime, setRangeNoTime] = useState<RangeValue | null>(null)

  return (
    <div className="space-y-12">
      <PageHeader
        title="Date Picker"
        description="Date selection components ranging from simple single-date pickers to full date range pickers with presets, time inputs, and timezone support."
        status="stable"
      />

      {/* ════════════════════════════════════════════
          SINGLE DATE PICKER
          ════════════════════════════════════════════ */}

      <Section
        title="Basic"
        description="A simple date picker with a popover calendar. Click the button to open, select a date, and the popover closes automatically."
      >
        <ComponentPreview title="Single date picker" noClip>
          <DatePicker date={basicDate} onDateChange={setBasicDate} />
        </ComponentPreview>
        <CodeBlock code={basicCode} />
      </Section>

      <Section
        title="With Constraints"
        description="Use minDate and maxDate to restrict the selectable range. Days outside the range are visually disabled."
      >
        <ComponentPreview title="Future dates only (next 90 days)" noClip>
          <DatePicker
            date={constraintDate}
            onDateChange={setConstraintDate}
            placeholder="Select a deadline"
            minDate={new Date()}
            maxDate={addDays(new Date(), 90)}
          />
        </ComponentPreview>
        <CodeBlock code={withConstraintsCode} />
      </Section>

      <Section
        title="Calendar Only"
        description="Use the SimpleCalendar component directly when you want an always-visible calendar without a popover trigger."
      >
        <ComponentPreview title="Inline calendar">
          <div className="rounded-m3-md border border-m3-outline-variant bg-m3-surface-container-lowest">
            <SimpleCalendar
              mode="single"
              selected={calendarDate}
              onSelect={setCalendarDate}
            />
          </div>
          {calendarDate && (
            <p className="text-sm text-m3-on-surface-variant mt-2">
              Selected: <span className="font-medium text-m3-on-surface">{format(calendarDate, 'PPP')}</span>
            </p>
          )}
        </ComponentPreview>
        <CodeBlock code={calendarOnlyCode} />
      </Section>

      {/* ════════════════════════════════════════════
          DATE RANGE PICKER
          ════════════════════════════════════════════ */}

      <div className="border-t border-m3-outline-variant pt-8">
        <h2 className="text-lg font-bold text-m3-on-surface mb-1">Date Range Picker</h2>
        <p className="text-sm text-m3-on-surface-variant mb-8">
          For selecting start and end dates with optional presets, time inputs, and card mode.
        </p>
      </div>

      <Section
        title="Basic Range"
        description="Click the button to open the calendar. Select a start date then an end date. The Apply button confirms typed date/time inputs."
      >
        <ComponentPreview noClip className="items-start justify-start">
          <CalendarRange allowClear value={rangeDate} onChange={setRangeDate} />
        </ComponentPreview>
        <CodeBlock code={rangeUsageCode} />
      </Section>

      <Section
        title="With Presets"
        description="Pass a presets object to show a searchable combobox alongside the calendar button. Users can type to filter presets or enter relative and fixed date expressions."
      >
        <ComponentPreview noClip className="items-start justify-start">
          <CalendarRange
            allowClear
            value={rangeWithPresets}
            onChange={setRangeWithPresets}
            presets={examplePresets}
          />
        </ComponentPreview>
        <CodeBlock code={rangeWithPresetsCode} />
      </Section>

      <Section
        title="Horizontal Layout"
        description="Use horizontalLayout to display the calendar grid and date/time inputs side by side inside the popover."
      >
        <ComponentPreview noClip className="items-start justify-start">
          <CalendarRange
            allowClear
            horizontalLayout
            value={rangeHorizontal}
            onChange={setRangeHorizontal}
          />
        </ComponentPreview>
        <CodeBlock code={`<Calendar allowClear horizontalLayout value={date} onChange={setDate} />`} />
      </Section>

      <Section
        title="Without Time Input"
        description="Set showTimeInput to false to hide the time fields and only allow date-level selection."
      >
        <ComponentPreview noClip className="items-start justify-start">
          <CalendarRange
            allowClear
            showTimeInput={false}
            value={rangeNoTime}
            onChange={setRangeNoTime}
          />
        </ComponentPreview>
        <CodeBlock code={`<Calendar allowClear showTimeInput={false} value={date} onChange={setDate} />`} />
      </Section>

      <Section
        title="Card Mode"
        description="A standalone M3-styled date range picker with calendar, date display fields, and action buttons. Ideal for scheduling flows."
      >
        <ComponentPreview>
          <DateRangePicker
            title="Schedule a gig"
            description="Select start and end dates for the engagement."
            onConfirm={(range: { startDate: Date | null; endDate: Date | null }) => alert(`Selected: ${JSON.stringify(range)}`)}
            onCancel={() => alert('Cancelled')}
          />
        </ComponentPreview>
      </Section>

      <Section
        title="Inline Mode"
        description="Use inline to embed the calendar directly inside a form card without its own wrapper. Supports controlled state."
      >
        <ComponentPreview>
          <DateRangePickerInlineDemo />
        </ComponentPreview>
      </Section>

      {/* ════════════════════════════════════════════
          API REFERENCE
          ════════════════════════════════════════════ */}

      <Section title="API Reference — DatePicker">
        <PropsTable props={datePickerProps} />
      </Section>

      <Section title="API Reference — Calendar (Range)">
        <PropsTable props={calendarProps} />
      </Section>

      <Section title="API Reference — DateRangePicker">
        <PropsTable props={dateRangePickerProps} />
      </Section>

      {/* ── Usage ── */}
      <PlatformUsage webCode={basicCode} />

      {/* ── Accessibility ── */}
      <Section title="Accessibility">
        <AccessibilityNote
          items={[
            'The popover opens on button click and closes when a date is selected or when clicking outside.',
            'Calendar days are keyboard-navigable with arrow keys.',
            'Selected date is announced to screen readers via aria-selected.',
            'Disabled dates outside min/max constraints have pointer-events-none and reduced opacity.',
            'The trigger button shows the formatted date or placeholder text for screen reader context.',
            'Calendar respects prefers-reduced-motion for transitions.',
          ]}
        />
      </Section>
    </div>
  )
}
