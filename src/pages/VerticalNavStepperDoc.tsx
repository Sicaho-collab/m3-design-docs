import { useState } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'
import { PlatformUsage } from '@/components/docs/PlatformUsage'
import { AccessibilityNote } from '@/components/docs/AccessibilityNote'
import { VerticalNavStepper } from '@/components/ui/vertical-nav-stepper'

const props: PropDef[] = [
  {
    name: 'steps',
    type: '{ label: string; description?: string; count?: number }[]',
    required: true,
    description: 'Array of step definitions. Each step has a label, optional description, and optional count badge.',
  },
  {
    name: 'activeIndex',
    type: 'number',
    required: true,
    description: 'The index (0-based) of the currently active/selected step.',
  },
  {
    name: 'onStepClick',
    type: '(index: number) => void',
    required: true,
    description: 'Callback fired when any step is clicked. Receives the step index.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes applied to the outer nav container.',
  },
]

const basicSteps = [
  { label: 'Job Details' },
  { label: 'Requirements' },
  { label: 'Compensation' },
  { label: 'Review & Post' },
]

const stepsWithDescriptions = [
  { label: 'Job Details', description: 'Title, type, and location' },
  { label: 'Requirements', description: 'Skills and qualifications' },
  { label: 'Compensation', description: 'Pay rate and benefits' },
  { label: 'Review & Post', description: 'Final review before posting' },
]

const stepsWithCounts = [
  { label: 'Applied', description: 'New applicants', count: 12 },
  { label: 'Screening', description: 'Under review', count: 5 },
  { label: 'Interview', description: 'Scheduled interviews', count: 3 },
  { label: 'Offer', description: 'Offers extended', count: 1 },
  { label: 'Hired', description: 'Onboarding', count: 0 },
]

const webUsageCode = `import { useState } from 'react'
import { VerticalNavStepper } from '@sicaho-collab/ui-web'

const steps = [
  { label: 'Job Details', description: 'Title, type, and location' },
  { label: 'Requirements', description: 'Skills and qualifications' },
  { label: 'Compensation', description: 'Pay rate and benefits' },
  { label: 'Review & Post', description: 'Final review before posting' },
]

export function Example() {
  const [active, setActive] = useState(0)

  return (
    <VerticalNavStepper
      steps={steps}
      activeIndex={active}
      onStepClick={setActive}
    />
  )
}`

const mobileUsageCode = `import { useState } from 'react'
import { VerticalNavStepper } from '@sicaho-collab/ui-mobile'

const steps = [
  { label: 'Job Details', description: 'Title, type, and location' },
  { label: 'Requirements', description: 'Skills and qualifications' },
  { label: 'Compensation', description: 'Pay rate and benefits' },
  { label: 'Review & Post', description: 'Final review before posting' },
]

export function Example() {
  const [active, setActive] = useState(0)

  return (
    <VerticalNavStepper
      steps={steps}
      activeIndex={active}
      onStepClick={setActive}
    />
  )
}`

export default function VerticalNavStepperDoc() {
  const [activeBasic, setActiveBasic] = useState(0)
  const [activeDesc, setActiveDesc] = useState(1)
  const [activeCounts, setActiveCounts] = useState(2)

  return (
    <div className="space-y-10">
      <PageHeader
        title="Vertical Nav Stepper"
        description="A vertical navigation stepper for sidebar navigation. Unlike the standard Stepper component, this is purely navigational — any step can be clicked at any time, and there are no checkmarks or progress semantics. Designed for use as sidebar navigation in multi-section pages like hiring workflows."
        status="stable"
      />

      {/* Basic */}
      <Section
        title="Basic"
        description="Simple vertical nav with step labels only. Click any step to navigate — the active step gets a filled primary circle."
      >
        <ComponentPreview title="Labels only">
          <div className="w-[240px]">
            <VerticalNavStepper
              steps={basicSteps}
              activeIndex={activeBasic}
              onStepClick={setActiveBasic}
            />
          </div>
        </ComponentPreview>
      </Section>

      {/* With descriptions */}
      <Section
        title="With Descriptions"
        description="Each step can include an optional description below the label for additional context."
      >
        <ComponentPreview title="Labels + descriptions">
          <div className="w-[280px]">
            <VerticalNavStepper
              steps={stepsWithDescriptions}
              activeIndex={activeDesc}
              onStepClick={setActiveDesc}
            />
          </div>
        </ComponentPreview>
      </Section>

      {/* With count badges */}
      <Section
        title="With Count Badges"
        description="Steps can show a count badge (e.g., number of candidates at each hiring stage). Active badges use M3 primary container colors."
      >
        <ComponentPreview title="Hiring pipeline nav">
          <div className="w-[280px]">
            <VerticalNavStepper
              steps={stepsWithCounts}
              activeIndex={activeCounts}
              onStepClick={setActiveCounts}
            />
          </div>
        </ComponentPreview>
      </Section>

      {/* Key differences */}
      <Section
        title="Key Differences from Stepper"
        description="This component is designed for navigation, not progress tracking."
      >
        <div className="bg-m3-surface-container-lowest rounded-m3-md p-6 text-sm text-m3-on-surface space-y-3">
          <div className="flex gap-3">
            <span className="text-m3-primary font-semibold shrink-0">Navigation</span>
            <span>Any step can be clicked at any time — no linear progression required.</span>
          </div>
          <div className="flex gap-3">
            <span className="text-m3-primary font-semibold shrink-0">No checkmarks</span>
            <span>Previously visited steps return to their default (numbered) state, not a checkmark.</span>
          </div>
          <div className="flex gap-3">
            <span className="text-m3-primary font-semibold shrink-0">Active state</span>
            <span>The active step shows a filled primary circle with white number, while inactive steps show grey circles.</span>
          </div>
          <div className="flex gap-3">
            <span className="text-m3-primary font-semibold shrink-0">Count badges</span>
            <span>Optional count badges for showing item counts per section (e.g., candidates per hiring stage).</span>
          </div>
        </div>
      </Section>

      {/* Usage */}
      <PlatformUsage webCode={webUsageCode} mobileCode={mobileUsageCode} />

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable props={props} />
      </Section>

      {/* Accessibility */}
      <AccessibilityNote
        items={[
          'Uses semantic <nav> with aria-label="Step navigation" for landmark identification.',
          'Each step circle is a <button> with aria-label describing the step number and label.',
          'Active step is indicated with aria-current="step".',
          'Full keyboard navigation: Tab through steps, Enter/Space to activate.',
          'Focus-visible ring uses M3 primary color with ring-offset for clear visibility.',
          'Hover states provide visual feedback on interactive rows.',
        ]}
      />
    </div>
  )
}
