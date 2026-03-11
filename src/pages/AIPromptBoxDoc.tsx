import { useState } from 'react'
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
    name: 'dropdownOptions',
    type: 'DropdownOption[]',
    description: 'Options shown in the Select dropdown. Each option has id, label, and value.',
  },
  {
    name: 'onOptionSelect',
    type: '(option: DropdownOption) => void',
    description: 'Called when the user picks an option from the dropdown.',
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

const models = [
  { id: 'claude', label: 'Claude', value: 'claude' },
  { id: 'gpt4',   label: 'GPT-4',  value: 'gpt4' },
]

export function Example() {
  return (
    <AIPromptBox
      placeholder="Ask me anything..."
      dropdownOptions={models}
      onSend={(msg) => console.log('sent:', msg)}
      onOptionSelect={(opt) => console.log('model:', opt.value)}
    />
  )
}`

export default function AIPromptBoxDoc() {
  const [lastMessage, setLastMessage] = useState<string | null>(null)

  return (
    <div className="space-y-12">
      <PageHeader
        title="AI Prompt Box"
        description="A rich chat input with a conic gradient border, file attachment, and model selector dropdown. Supports dark mode, reduced motion, and full keyboard interaction."
      />

      <Section
        title="Default"
        description="Type a message and press Enter or the send icon to submit. Attach files with the Attach File button."
      >
        <ComponentPreview className="items-start justify-start">
          <div className="w-full max-w-xl">
            <AIPromptBox
              placeholder="Send message..."
              onSend={msg => setLastMessage(msg)}
            />
            {lastMessage && (
              <p className="mt-4 text-sm text-m3-on-surface-variant">
                Last sent: <span className="text-m3-on-surface font-medium">{lastMessage}</span>
              </p>
            )}
          </div>
        </ComponentPreview>
        <CodeBlock code={usageCode} language="tsx" />
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
        <CodeBlock code={`<AIPromptBox disabled placeholder="Input disabled..." />`} language="tsx" />
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
        <CodeBlock code={`<AIPromptBox enableAnimations={false} />`} language="tsx" />
      </Section>

      <Section title="API Reference">
        <PropsTable props={props} />
      </Section>
    </div>
  )
}
