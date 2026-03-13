import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'
import { PlatformUsage } from '@/components/docs/PlatformUsage'
import { AccessibilityNote } from '@/components/docs/AccessibilityNote'

/* ── Inline demo helpers (self-contained, no external deps) ── */

function formatDisplayValue(raw: string): string {
  if (!raw) return ''
  const parts = raw.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

function formatCurrency(n: number): string {
  return `$${n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/* ── Interactive demo ── */

function BudgetInputDemo() {
  const [budget, setBudget] = useState('1500')

  const display = formatDisplayValue(budget)
  const num = parseFloat(budget)
  const isValid = !isNaN(num) && num > 0

  const breakdown = useMemo(() => {
    if (!isValid) return null
    const studentPayment = num
    const serviceFee = num * 0.12
    const processingFee = num * 0.017
    const gst = (serviceFee + processingFee) * 0.10
    const total = studentPayment + serviceFee + processingFee + gst
    return { studentPayment, serviceFee, processingFee, gst, total }
  }, [num, isValid])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/,/g, '')
    if (val === '' || /^\d+(\.\d{0,2})?$/.test(val)) {
      setBudget(val)
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 py-6 w-full">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-m3-on-surface">What's your budget?</h3>
        <p className="text-sm text-m3-on-surface-variant mt-1">
          Enter the student payment (incl. super) and we'll calculate the rest
        </p>
      </div>

      {/* Large centered input */}
      <div className="flex items-baseline gap-1">
        <span className="text-5xl font-bold text-m3-on-surface-variant select-none">$</span>
        <input
          type="text"
          inputMode="decimal"
          value={display}
          onChange={handleChange}
          placeholder="0.00"
          className="text-5xl font-bold text-m3-on-surface bg-transparent outline-none text-center placeholder:text-m3-outline"
          style={{ width: `${Math.max(4, (display || '0.00').length + 1)}ch` }}
        />
      </div>

      {/* Breakdown card */}
      {breakdown && (
        <div className="w-full max-w-md rounded-m3-md bg-m3-secondary-container p-5 flex flex-col gap-3">
          <p className="text-sm font-semibold text-m3-on-surface text-center">Cost Breakdown</p>
          <div className="flex flex-col gap-2">
            <Row label="Student payment (incl. super)" value={formatCurrency(breakdown.studentPayment)} />
            <Row label="Alumable Service Fee (12%)" value={formatCurrency(breakdown.serviceFee)} />
            <Row label="Processing fee (1.7%)" value={formatCurrency(breakdown.processingFee)} />
            <Row label="GST (10%)" value={formatCurrency(breakdown.gst)} />
            <hr className="border-m3-outline-variant my-1" />
            <div className="flex justify-between text-base">
              <span className="font-semibold text-m3-on-surface">Total Gig Cost</span>
              <span className="font-bold text-m3-on-surface">{formatCurrency(breakdown.total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-m3-on-surface-variant">{label}</span>
      <span className="text-m3-on-surface font-medium">{value}</span>
    </div>
  )
}

/* ── Props table ── */

const budgetInputProps: PropDef[] = [
  {
    name: 'value',
    type: 'string',
    required: true,
    description: 'The raw numeric budget string (no commas). Commas are added for display automatically.',
  },
  {
    name: 'onChange',
    type: '(e: ChangeEvent<HTMLInputElement>) => void',
    required: true,
    description: 'Called on input change. The handler should strip commas and validate before storing.',
  },
  {
    name: 'onBlur',
    type: '() => void',
    description: 'Called when the input loses focus. Typically used to trigger validation.',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "'0.00'",
    description: 'Placeholder text shown when the input is empty.',
  },
  {
    name: 'error',
    type: 'string',
    description: 'Error message displayed below the input. When set, the error is shown with role="alert".',
  },
  {
    name: 'breakdown',
    type: 'FeeBreakdown | null',
    description: 'When provided, renders the cost breakdown card below the input with animated number transitions.',
  },
]

/* ── Usage code ── */

const usageCode = `import { useState, useMemo } from 'react'
import NumberFlow from '@number-flow/react'
import { calculateFeeBreakdown, isValidBudgetInput } from './fee-utils'

export function BudgetStep({ data, patch }) {
  const [touched, setTouched] = useState(false)
  const budgetNum = parseFloat(data.budget)
  const isValid = !isNaN(budgetNum) && budgetNum > 0

  const breakdown = useMemo(() => {
    if (!isValid) return null
    return calculateFeeBreakdown(budgetNum)
  }, [budgetNum, isValid])

  // Format with commas for display
  const display = (() => {
    if (!data.budget) return ''
    const parts = data.budget.split('.')
    parts[0] = parts[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')
    return parts.join('.')
  })()

  function handleChange(e) {
    const val = e.target.value.replace(/,/g, '')
    if (val === '' || /^\\d+(\\.\\d{0,2})?$/.test(val)) {
      patch({ budget: val })
    }
  }

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Large centered input — no border, no card */}
      <div className="flex items-baseline gap-1">
        <span className="text-5xl font-bold text-m3-on-surface-variant">$</span>
        <input
          type="text"
          inputMode="decimal"
          value={display}
          onChange={handleChange}
          placeholder="0.00"
          className="text-5xl font-bold text-m3-on-surface bg-transparent
                     outline-none text-center placeholder:text-m3-outline"
          style={{ width: \`\${Math.max(4, (display || '0.00').length + 1)}ch\` }}
        />
      </div>

      {/* Breakdown with animated numbers */}
      {breakdown && (
        <div className="w-full max-w-md rounded-m3-md bg-m3-secondary-container p-5">
          <NumberFlow
            value={breakdown.total}
            format={{ style: 'currency', currency: 'AUD',
                      minimumFractionDigits: 2, useGrouping: true }}
            transformTiming={{ duration: 500, easing: 'ease-out' }}
            spinTiming={{ duration: 500, easing: 'ease-out' }}
          />
        </div>
      )}
    </div>
  )
}`

/* ── Doc page ── */

export default function BudgetInputDoc() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Budget Input"
        description="A focused, centered currency input with auto-calculated fee breakdown. Designed for high-value wizard steps where the user enters a single monetary amount. Uses NumberFlow for animated digit transitions."
        status="stable"
      />

      {/* ── Interactive demo ── */}
      <Section
        title="Interactive Demo"
        description="Type a budget amount to see the input auto-size and the breakdown calculate in real time. In production, the breakdown values animate with rolling digit transitions via NumberFlow."
      >
        <ComponentPreview title="Budget step" noClip>
          <BudgetInputDemo />
        </ComponentPreview>
      </Section>

      {/* ── Anatomy ── */}
      <Section
        title="Anatomy"
        description="The component is composed of three parts that work together."
      >
        <div className="space-y-4 text-sm text-m3-on-surface-variant">
          <div className="flex gap-3">
            <span className="font-mono text-xs bg-m3-surface-container-high px-2 py-1 rounded text-m3-primary shrink-0">1</span>
            <div>
              <p className="font-medium text-m3-on-surface">Header</p>
              <p>Centered title and subtitle explaining what to enter. No card wrapper — clean and minimal.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="font-mono text-xs bg-m3-surface-container-high px-2 py-1 rounded text-m3-primary shrink-0">2</span>
            <div>
              <p className="font-medium text-m3-on-surface">Currency Input</p>
              <p>Large <code className="text-xs bg-m3-surface-container-high px-1.5 py-0.5 rounded text-m3-primary">text-5xl</code> borderless input with a fixed <code className="text-xs bg-m3-surface-container-high px-1.5 py-0.5 rounded text-m3-primary">$</code> prefix. Auto-sizes width based on content using <code className="text-xs bg-m3-surface-container-high px-1.5 py-0.5 rounded text-m3-primary">ch</code> units. Displays commas for thousands separators.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="font-mono text-xs bg-m3-surface-container-high px-2 py-1 rounded text-m3-primary shrink-0">3</span>
            <div>
              <p className="font-medium text-m3-on-surface">Fee Breakdown Card</p>
              <p>Uses <code className="text-xs bg-m3-surface-container-high px-1.5 py-0.5 rounded text-m3-primary">bg-m3-secondary-container</code> (orange) to visually distinguish it from primary-container interactions. All currency values animate via <code className="text-xs bg-m3-surface-container-high px-1.5 py-0.5 rounded text-m3-primary">NumberFlow</code> with rolling digit transitions.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Interaction ── */}
      <Section
        title="Interaction"
        description="Key interaction patterns and behaviours."
      >
        <div className="rounded-m3-md border border-m3-outline-variant overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-m3-surface-container border-b border-m3-outline-variant">
                <th className="text-left py-3 px-4 font-medium text-m3-on-surface">Interaction</th>
                <th className="text-left py-3 px-4 font-medium text-m3-on-surface">Behaviour</th>
              </tr>
            </thead>
            <tbody className="text-m3-on-surface-variant">
              <tr className="border-b border-m3-outline-variant">
                <td className="py-3 px-4 font-medium text-m3-on-surface">Typing</td>
                <td className="py-3 px-4">Only allows digits and up to 2 decimal places. Commas are inserted automatically as the number grows (e.g. 1,000). Input width adjusts dynamically.</td>
              </tr>
              <tr className="border-b border-m3-outline-variant">
                <td className="py-3 px-4 font-medium text-m3-on-surface">Real-time calculation</td>
                <td className="py-3 px-4">The fee breakdown appears instantly when a valid amount is entered. All values animate with NumberFlow's rolling digit effect.</td>
              </tr>
              <tr className="border-b border-m3-outline-variant">
                <td className="py-3 px-4 font-medium text-m3-on-surface">Total emphasis</td>
                <td className="py-3 px-4">The Total Gig Cost row uses custom <code className="text-xs bg-m3-surface-container-high px-1.5 py-0.5 rounded text-m3-primary">transformTiming</code> and <code className="text-xs bg-m3-surface-container-high px-1.5 py-0.5 rounded text-m3-primary">spinTiming</code> (500ms ease-out) for a more prominent animation.</td>
              </tr>
              <tr className="border-b border-m3-outline-variant">
                <td className="py-3 px-4 font-medium text-m3-on-surface">Validation</td>
                <td className="py-3 px-4">Error shown on blur or on Continue click. Validates: non-empty, positive number, max $100,000 cap.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-m3-on-surface">Clearing</td>
                <td className="py-3 px-4">User can clear the input entirely. The breakdown card hides when there is no valid amount.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Design decisions ── */}
      <Section
        title="Design Decisions"
        description="Why this pattern was chosen over a standard text field."
      >
        <div className="space-y-3 text-sm text-m3-on-surface-variant">
          <p><strong className="text-m3-on-surface">No border/card on input:</strong> The budget step is a critical moment in the gig posting flow. Removing visual chrome lets the user focus entirely on the number they're entering.</p>
          <p><strong className="text-m3-on-surface">Large text (text-5xl):</strong> Communicates importance and makes the amount easy to read and verify before proceeding.</p>
          <p><strong className="text-m3-on-surface">Secondary-container for breakdown:</strong> The orange <code className="text-xs bg-m3-surface-container-high px-1.5 py-0.5 rounded text-m3-primary">secondary-container</code> differentiates the calculated breakdown from interactive elements which use <code className="text-xs bg-m3-surface-container-high px-1.5 py-0.5 rounded text-m3-primary">primary-container</code> (purple).</p>
          <p><strong className="text-m3-on-surface">NumberFlow animations:</strong> Rolling digit transitions give immediate visual feedback that the calculation is updating, without requiring a loading state.</p>
        </div>
      </Section>

      {/* ── Usage ── */}
      <PlatformUsage webCode={usageCode} />

      {/* ── Props ── */}
      <Section title="Props">
        <PropsTable props={budgetInputProps} />
      </Section>

      {/* ── Accessibility ── */}
      <Section title="Accessibility">
        <AccessibilityNote
          items={[
            'Uses inputMode="decimal" for mobile numeric keyboard with decimal point.',
            'Error messages use role="alert" so screen readers announce validation errors immediately.',
            'The $ prefix is a visual-only span (not part of the input value) to avoid confusing assistive technology.',
            'NumberFlow respects prefers-reduced-motion — animations are disabled when the OS setting is on.',
            'The input auto-sizes but maintains a minimum width of 4ch to ensure the tap target is always reachable.',
          ]}
        />
      </Section>
    </div>
  )
}
