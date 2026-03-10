import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { Stepper, Step, useStepper } from '@/components/ui/stepper'
import { Button } from '@/components/ui/button'

const steps = [
  { label: 'Step 1', description: 'Create your account' },
  { label: 'Step 2', description: 'Set up your profile' },
  { label: 'Step 3', description: 'Confirm and submit' },
]

function StepControls() {
  const { prevStep, nextStep, isDisabledStep, isLastStep, hasCompletedAllSteps, resetSteps } = useStepper()
  if (hasCompletedAllSteps) {
    return (
      <div className="flex items-center gap-3 mt-4">
        <span className="text-sm text-m3-on-surface-variant">All steps completed!</span>
        <Button variant="outlined" size="sm" onClick={resetSteps}>Reset</Button>
      </div>
    )
  }
  return (
    <div className="flex gap-3 mt-4">
      <Button variant="outlined" size="sm" onClick={prevStep} disabled={isDisabledStep}>Prev</Button>
      <Button size="sm" onClick={nextStep}>{isLastStep ? 'Finish' : 'Next'}</Button>
    </div>
  )
}

function HorizontalDemo() {
  return (
    <div className="w-full">
      <Stepper initialStep={0} steps={steps}>
        <Step label="Step 1" description="Create your account">
          <div className="py-4 text-sm text-m3-on-surface-variant">Step 1 content goes here.</div>
        </Step>
        <Step label="Step 2" description="Set up your profile">
          <div className="py-4 text-sm text-m3-on-surface-variant">Step 2 content goes here.</div>
        </Step>
        <Step label="Step 3" description="Confirm and submit">
          <div className="py-4 text-sm text-m3-on-surface-variant">Step 3 content goes here.</div>
        </Step>
        <StepControls />
      </Stepper>
    </div>
  )
}

function VerticalDemo() {
  return (
    <div className="w-full max-w-xs">
      <Stepper initialStep={0} steps={steps} orientation="vertical">
        <Step label="Step 1" description="Create your account">
          <div className="py-4 text-sm text-m3-on-surface-variant">Step 1 content goes here.</div>
        </Step>
        <Step label="Step 2" description="Set up your profile">
          <div className="py-4 text-sm text-m3-on-surface-variant">Step 2 content goes here.</div>
        </Step>
        <Step label="Step 3" description="Confirm and submit">
          <div className="py-4 text-sm text-m3-on-surface-variant">Step 3 content goes here.</div>
        </Step>
        <StepControls />
      </Stepper>
    </div>
  )
}

const usageCode = `import { Stepper, Step, useStepper } from '@/components/ui/stepper'
import { Button } from '@/components/ui/button'

const steps = [
  { label: 'Step 1', description: 'Create your account' },
  { label: 'Step 2', description: 'Set up your profile' },
  { label: 'Step 3', description: 'Confirm and submit' },
]

function StepControls() {
  const { prevStep, nextStep, isDisabledStep, isLastStep } = useStepper()
  return (
    <div className="flex gap-3 mt-4">
      <Button variant="outlined" size="sm" onClick={prevStep} disabled={isDisabledStep}>Prev</Button>
      <Button size="sm" onClick={nextStep}>{isLastStep ? 'Finish' : 'Next'}</Button>
    </div>
  )
}

export function StepperExample() {
  return (
    <Stepper initialStep={0} steps={steps}>
      <Step label="Step 1" description="Create your account">
        <div>Step 1 content</div>
      </Step>
      <Step label="Step 2" description="Set up your profile">
        <div>Step 2 content</div>
      </Step>
      <Step label="Step 3" description="Confirm and submit">
        <div>Step 3 content</div>
      </Step>
      <StepControls />
    </Stepper>
  )
}`

export default function StepperDoc() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Stepper"
        description="Steppers convey progress through numbered steps, ideal for multi-step forms and guided flows."
      />

      <Section title="Horizontal Stepper">
        <ComponentPreview>
          <HorizontalDemo />
        </ComponentPreview>
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="Vertical Stepper">
        <ComponentPreview>
          <VerticalDemo />
        </ComponentPreview>
        <CodeBlock code={`<Stepper initialStep={0} steps={steps} orientation="vertical">
  {/* Step children */}
</Stepper>`} />
      </Section>

      <Section title="Props">
        <PropsTable
          props={[
            { name: 'steps', type: 'StepItem[]', required: true, description: 'Array of step metadata objects with label, description, and optional flag' },
            { name: 'initialStep', type: 'number', required: true, description: 'Zero-based index of the step to start on' },
            { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction of the stepper' },
            { name: 'variant', type: "'circle' | 'circle-alt' | 'line'", default: "'circle'", description: 'Visual style of the step indicators' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the step icon buttons' },
            { name: 'state', type: "'loading' | 'error'", description: 'Global state applied to the current step' },
            { name: 'onClickStep', type: '(step: number, setStep: fn) => void', description: 'Called when a step indicator is clicked, enabling clickable navigation' },
            { name: 'expandVerticalSteps', type: 'boolean', default: 'false', description: 'When true, all vertical step content is visible at once' },
            { name: 'scrollTracking', type: 'boolean', default: 'false', description: 'Automatically scrolls the active step into view when it changes' },
          ]}
        />
      </Section>
    </div>
  )
}
