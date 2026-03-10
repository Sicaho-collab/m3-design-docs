import React, { useState } from 'react'
import { Calendar, type RangeValue } from '@/components/ui/calendar'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { AccessibilityNote } from '@/components/docs/AccessibilityNote'
import { startOfDay, endOfDay, subDays, subMonths, subWeeks } from 'date-fns'

const calendarProps: PropDef[] = [
  {
    name: 'value',
    type: 'RangeValue | null',
    description: 'The controlled value of the date range. An object with start and end Date fields.',
  },
  {
    name: 'onChange',
    type: '(date: RangeValue | null) => void',
    description: 'Callback fired when the selected date range changes.',
  },
  {
    name: 'allowClear',
    type: 'boolean',
    default: 'false',
    description: 'When true, displays a clear button to reset the selected range.',
  },
  {
    name: 'compact',
    type: 'boolean',
    default: 'false',
    description: 'Renders the picker in a compact layout suitable for tight spaces.',
  },
  {
    name: 'stacked',
    type: 'boolean',
    default: 'false',
    description: 'When used with presets, stacks the combobox and calendar button vertically.',
  },
  {
    name: 'horizontalLayout',
    type: 'boolean',
    default: 'false',
    description: 'Renders the calendar grid and inputs side-by-side in the popover.',
  },
  {
    name: 'showTimeInput',
    type: 'boolean',
    default: 'true',
    description: 'When true, shows time inputs alongside the date inputs in the popover.',
  },
  {
    name: 'popoverAlignment',
    type: '"start" | "center" | "end"',
    default: '"start"',
    description: 'Controls the horizontal alignment of the calendar popover relative to the trigger.',
  },
  {
    name: 'presets',
    type: 'Record<string, { text: string; start: Date; end: Date }>',
    description: 'Optional named date range presets shown in a searchable combobox alongside the picker.',
  },
  {
    name: 'presetIndex',
    type: 'number',
    description: 'Index of the preset to select by default when presets are provided.',
  },
  {
    name: 'minValue',
    type: 'Date',
    description: 'The earliest selectable date. Days before this date are disabled.',
  },
  {
    name: 'maxValue',
    type: 'Date',
    description: 'The latest selectable date. Days after this date are disabled.',
  },
]

const now = new Date()
const examplePresets = {
  today: { text: 'Today', start: startOfDay(now), end: endOfDay(now) },
  yesterday: { text: 'Yesterday', start: startOfDay(subDays(now, 1)), end: endOfDay(subDays(now, 1)) },
  'last-7-days': { text: 'Last 7 Days', start: startOfDay(subDays(now, 7)), end: endOfDay(now) },
  'last-30-days': { text: 'Last 30 Days', start: startOfDay(subDays(now, 30)), end: endOfDay(now) },
  'last-3-months': { text: 'Last 3 Months', start: startOfDay(subMonths(now, 3)), end: endOfDay(now) },
  'last-week': { text: 'Last Week', start: startOfDay(subWeeks(now, 1)), end: endOfDay(now) },
}

const basicUsageCode = `import { useState } from 'react'
import { Calendar, type RangeValue } from '@/components/ui/calendar'

function DateRangeExample() {
  const [date, setDate] = useState<RangeValue | null>(null)

  return (
    <Calendar
      allowClear
      value={date}
      onChange={setDate}
    />
  )
}`

const withPresetsCode = `import { useState } from 'react'
import { startOfDay, endOfDay, subDays, subMonths } from 'date-fns'
import { Calendar, type RangeValue } from '@/components/ui/calendar'

const now = new Date()
const presets = {
  today: { text: 'Today', start: startOfDay(now), end: endOfDay(now) },
  'last-7-days': { text: 'Last 7 Days', start: startOfDay(subDays(now, 7)), end: endOfDay(now) },
  'last-30-days': { text: 'Last 30 Days', start: startOfDay(subDays(now, 30)), end: endOfDay(now) },
  'last-3-months': { text: 'Last 3 Months', start: startOfDay(subMonths(now, 3)), end: endOfDay(now) },
}

function DateRangeWithPresets() {
  const [date, setDate] = useState<RangeValue | null>(null)

  return (
    <Calendar
      allowClear
      value={date}
      onChange={setDate}
      presets={presets}
    />
  )
}`

const horizontalCode = `<Calendar
  allowClear
  horizontalLayout
  value={date}
  onChange={setDate}
/>`

export default function DatePickerDoc() {
  const [date, setDate] = useState<RangeValue | null>(null)
  const [dateWithPresets, setDateWithPresets] = useState<RangeValue | null>(null)
  const [dateHorizontal, setDateHorizontal] = useState<RangeValue | null>(null)
  const [dateNoTime, setDateNoTime] = useState<RangeValue | null>(null)

  return (
    <div className="space-y-12">
      <PageHeader
        title="Date Picker"
        description="A date range picker component with calendar popover, optional presets, timezone support, and time inputs. Lets users select a start and end date by clicking calendar days or typing directly."
      />

      <Section
        title="Basic"
        description="Click the button to open the calendar. Select a start date then an end date. The Apply button confirms typed date/time inputs."
      >
        <ComponentPreview noClip className="items-start justify-start">
          <Calendar allowClear value={date} onChange={setDate} />
        </ComponentPreview>
        <CodeBlock code={basicUsageCode} language="tsx" />
      </Section>

      <Section
        title="With Presets"
        description="Pass a presets object to show a searchable combobox alongside the calendar button. Users can type to filter presets or enter relative and fixed date expressions."
      >
        <ComponentPreview noClip className="items-start justify-start">
          <Calendar
            allowClear
            value={dateWithPresets}
            onChange={setDateWithPresets}
            presets={examplePresets}
          />
        </ComponentPreview>
        <CodeBlock code={withPresetsCode} language="tsx" />
      </Section>

      <Section
        title="Horizontal Layout"
        description="Use horizontalLayout to display the calendar grid and date/time inputs side by side inside the popover."
      >
        <ComponentPreview noClip className="items-start justify-start">
          <Calendar
            allowClear
            horizontalLayout
            value={dateHorizontal}
            onChange={setDateHorizontal}
          />
        </ComponentPreview>
        <CodeBlock code={horizontalCode} language="tsx" />
      </Section>

      <Section
        title="Without Time Input"
        description="Set showTimeInput to false to hide the time fields and only allow date-level selection."
      >
        <ComponentPreview noClip className="items-start justify-start">
          <Calendar
            allowClear
            showTimeInput={false}
            value={dateNoTime}
            onChange={setDateNoTime}
          />
        </ComponentPreview>
        <CodeBlock
          code={`<Calendar allowClear showTimeInput={false} value={date} onChange={setDate} />`}
          language="tsx"
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={calendarProps} />
      </Section>

      <Section title="Accessibility">
        <AccessibilityNote
          items={[
            'The calendar popover closes when clicking outside or scrolling/resizing the window.',
            'Date inputs accept typed values in MMM dd, yyyy format and time inputs accept HH:mm.',
            'Use the Apply button or press Enter to confirm manually typed values.',
            'Min/max value constraints visually disable out-of-range days and prevent their selection.',
          ]}
        />
      </Section>
    </div>
  )
}
