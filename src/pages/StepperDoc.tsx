import { useState } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { Stepper } from '@/components/ui/stepper'
import { Button } from '@/components/ui/button'

const steps = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Profile', description: 'Set up your profile', optional: true },
  { label: 'Preferences', description: 'Choose your settings' },
  { label: 'Review', description: 'Confirm and submit' },
]

export default function StepperDoc() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <div className="space-y-12">
      <PageHeader
        title="Stepper"
        description="Steppers convey progress through numbered steps, ideal for multi-step forms and guided flows."
      />
      <Section title="Horizontal Stepper">
        <ComponentPreview>
          <div className="w-full space-y-6">
            <Stepper steps={steps} activeStep={activeStep} />
            <div className="flex gap-3 justify-center">
              <Button variant="outlined" size="sm" onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0}>Back</Button>
              <Button size="sm" onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))} disabled={activeStep === steps.length - 1}>Next</Button>
            </div>
          </div>
        </ComponentPreview>
        <CodeBlock code={`<Stepper steps={steps} activeStep={1} />`} />
      </Section>
      <Section title="Vertical Stepper">
        <ComponentPreview>
          <Stepper steps={steps} activeStep={activeStep} orientation="vertical" className="max-w-xs" />
        </ComponentPreview>
        <CodeBlock code={`<Stepper steps={steps} activeStep={1} orientation="vertical" />`} />
      </Section>
      <Section title="Props">
        <PropsTable
          props={[
            { name: 'steps', type: 'Step[]', required: true, description: 'Array of step objects with label, description, and optional flag' },
            { name: 'activeStep', type: 'number', required: true, description: 'Zero-based index of the current step' },
            { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction' },
          ]}
        />
      </Section>
    </div>
  )
}
