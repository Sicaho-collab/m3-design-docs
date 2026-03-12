import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'
import { PlatformUsage } from '@/components/docs/PlatformUsage'
import { AccessibilityNote } from '@/components/docs/AccessibilityNote'

const alertProps: PropDef[] = [
  {
    name: 'variant',
    type: "'information' | 'success' | 'warning' | 'error'",
    default: "'information'",
    description:
      'The visual style and icon of the alert. Each variant uses a distinct color and icon to convey severity.',
  },
  {
    name: 'title',
    type: 'string',
    required: true,
    description: 'The bold heading text displayed inside the alert.',
  },
  {
    name: 'description',
    type: 'string',
    required: true,
    description: 'The body text providing additional context below the title.',
  },
  {
    name: 'onClose',
    type: '() => void',
    default: '\u2014',
    description:
      'Callback fired when the dismiss button is clicked. Passing this prop renders the close icon.',
  },
  {
    name: 'className',
    type: 'string',
    default: '\u2014',
    description: 'Additional CSS class names to apply to the alert container.',
  },
]

const usageCode = `import { Alert } from '@/components/ui/alert'
import { AnimatePresence } from 'framer-motion'

{/* Basic information alert */}
<Alert
  variant="information"
  title="New update available"
  description="A new version of the app is ready to install."
/>

{/* Error alert with dismiss */}
<Alert
  variant="error"
  title="Upload failed"
  description="The file could not be uploaded. Please try again."
  onClose={() => setOpen(false)}
/>

{/* Animated enter/exit */}
<AnimatePresence>
  {open && (
    <Alert
      variant="success"
      title="Profile saved"
      description="Your changes have been saved successfully."
      onClose={() => setOpen(false)}
    />
  )}
</AnimatePresence>`

function AlertDemo() {
  const [showAlert, setShowAlert] = React.useState(false)
  const [demoVariant, setDemoVariant] = React.useState<
    'information' | 'success' | 'warning' | 'error'
  >('information')

  const variants = ['information', 'success', 'warning', 'error'] as const
  const descriptions: Record<string, string> = {
    information: 'A new version of the app is ready to install.',
    success: 'Your changes have been saved successfully.',
    warning: 'Your session will expire in 5 minutes.',
    error: 'The file could not be uploaded. Please try again.',
  }
  const titles: Record<string, string> = {
    information: 'New update available',
    success: 'Profile saved',
    warning: 'Session expiring',
    error: 'Upload failed',
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <Button
            key={v}
            variant={demoVariant === v ? 'default' : 'outline'}
            onClick={() => {
              setDemoVariant(v)
              setShowAlert(true)
            }}
          >
            Show {v}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {showAlert && (
          <Alert
            key={demoVariant}
            variant={demoVariant}
            title={titles[demoVariant]}
            description={descriptions[demoVariant]}
            onClose={() => setShowAlert(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function AlertDoc() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Alert"
        description="Alerts display a short, important message that attracts the user's attention without interrupting their task. They support four severity levels with distinct icons and colors."
        status="stable"
      />

      {/* --- Interactive demo --- */}
      <Section
        title="Interactive demo"
        description="Click a variant button to trigger the alert with a spring animation. Dismiss it with the close button."
      >
        <ComponentPreview title="Animated alerts" className="flex-col items-start">
          <AlertDemo />
        </ComponentPreview>
      </Section>

      {/* --- All variants --- */}
      <Section
        title="Variants"
        description="All four alert variants rendered statically."
      >
        <ComponentPreview title="Information" className="flex-col items-stretch">
          <Alert
            variant="information"
            title="New update available"
            description="A new version of the app is ready to install."
          />
        </ComponentPreview>

        <ComponentPreview title="Success" className="flex-col items-stretch">
          <Alert
            variant="success"
            title="Profile saved"
            description="Your changes have been saved successfully."
          />
        </ComponentPreview>

        <ComponentPreview title="Warning" className="flex-col items-stretch">
          <Alert
            variant="warning"
            title="Session expiring"
            description="Your session will expire in 5 minutes."
          />
        </ComponentPreview>

        <ComponentPreview title="Error" className="flex-col items-stretch">
          <Alert
            variant="error"
            title="Upload failed"
            description="The file could not be uploaded. Please try again."
          />
        </ComponentPreview>
      </Section>

      {/* --- With dismiss --- */}
      <Section
        title="With dismiss button"
        description="Pass onClose to render a dismiss icon in the top-right corner."
      >
        <ComponentPreview title="Dismissible alert" className="flex-col items-stretch">
          <Alert
            variant="information"
            title="Tip"
            description="You can drag and drop files to upload them."
            onClose={() => {}}
          />
        </ComponentPreview>
      </Section>

      {/* --- Usage --- */}
      <PlatformUsage webCode={usageCode} />

      {/* --- Props --- */}
      <Section title="API Reference">
        <PropsTable props={alertProps} />
      </Section>

      {/* --- Accessibility --- */}
      <Section title="Accessibility">
        <AccessibilityNote
          items={[
            'The alert uses role="alert" so screen readers announce the content immediately.',
            'The dismiss button includes an aria-label of "Dismiss" for clear intent.',
            'Each variant uses both color and an icon to convey severity, avoiding reliance on color alone.',
            'The dismiss button is reachable via keyboard tab order and responds to Enter and Space keys.',
            'Use alerts sparingly to avoid overwhelming users with announcements.',
          ]}
        />
      </Section>

      {/* --- Responsive --- */}
      <Section
        title="Responsive behavior"
        description="Guidelines for alert placement and sizing across viewports."
      >
        <div className="prose prose-sm max-w-none text-m3-on-surface-variant">
          <ul className="space-y-2 list-disc list-inside text-sm">
            <li>
              Alerts stretch to the full width of their container on all screen sizes.
            </li>
            <li>
              On mobile, keep alert text concise. The description wraps naturally when the container is narrow.
            </li>
            <li>
              When stacking multiple alerts, separate them with a consistent gap (8-12px) and consider limiting the visible count to avoid overwhelming the user.
            </li>
            <li>
              The icon strip on the left remains a fixed 40px width across all breakpoints for visual consistency.
            </li>
          </ul>
        </div>
      </Section>
    </div>
  )
}
