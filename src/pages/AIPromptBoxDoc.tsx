import { AIPromptBox } from '@/components/ui/ai-prompt-box'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'
import { CodeBlock } from '@/components/docs/CodeBlock'

const props: PropDef[] = [
  {
    name: 'placeholder',
    type: 'string',
    default: '"Send message..."',
    description: 'Placeholder text shown in the textarea when empty.',
  },
  {
    name: 'onSend',
    type: '(message: string) => void',
    description: 'Called with the trimmed message string when the user submits (Enter or Send button).',
  },
  {
    name: 'sendLabel',
    type: 'string',
    default: '"Send"',
    description: 'Label text for the ButtonColorful submit button.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables all interactive elements.',
  },
  {
    name: 'enableAnimations',
    type: 'boolean',
    default: 'true',
    description: 'Enables enter animation and hover/tap micro-interactions. Respects prefers-reduced-motion.',
  },
  {
    name: 'enableShadows',
    type: 'boolean',
    default: 'true',
    description: 'Renders subtle ambient shadows around the component.',
  },
  {
    name: 'mainGradient',
    type: 'ThemeGradients',
    description: 'Override the main conic gradient border colors for light and dark themes.',
  },
  {
    name: 'outerGradient',
    type: 'ThemeGradients',
    description: 'Override the outer thin border gradient colors for light and dark themes.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes applied to the root wrapper.',
  },
]

const usageCode = `import { AIPromptBox } from '@/components/ui/ai-prompt-box'

export function Example() {
  return (
    <AIPromptBox
      placeholder="Ask me anything..."
      sendLabel="Send"
      onSend={(msg) => console.log('sent:', msg)}
    />
  )
}`

export default function AIPromptBoxDoc() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="AI Prompt Box"
        description="A rich chat input with a conic gradient border and ButtonColorful submit. Supports dark mode, reduced motion, and full keyboard interaction."
      />

      <Section
        title="Default"
        description="Type a message and press Enter or click the Send button to submit."
      >
        <ComponentPreview className="items-start justify-start">
          <div className="w-full max-w-xl">
            <AIPromptBox placeholder="Send message..." />
          </div>
        </ComponentPreview>
        <CodeBlock code={usageCode} />
      </Section>

      <Section
        title="Disabled"
        description="All controls are non-interactive when disabled is true."
      >
        <ComponentPreview className="items-start justify-start">
          <div className="w-full max-w-xl">
            <AIPromptBox disabled placeholder="Input disabled..." />
          </div>
        </ComponentPreview>
        <CodeBlock code={`<AIPromptBox disabled placeholder="Input disabled..." />`} />
      </Section>

      <Section
        title="No Animations"
        description="Set enableAnimations to false to remove the entrance animation and hover effects."
      >
        <ComponentPreview className="items-start justify-start">
          <div className="w-full max-w-xl">
            <AIPromptBox enableAnimations={false} placeholder="No animations..." />
          </div>
        </ComponentPreview>
        <CodeBlock code={`<AIPromptBox enableAnimations={false} />`} />
      </Section>

      <Section title="API Reference">
        <PropsTable props={props} />
      </Section>
    </div>
  )
}
