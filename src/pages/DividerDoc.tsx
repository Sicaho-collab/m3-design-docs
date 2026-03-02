import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { Divider } from '@/components/ui/divider'

export default function DividerDoc() {
  return (
    <div className="space-y-12">
      <PageHeader title="Divider" description="Dividers are thin lines that group content in lists and layouts. They can be full-width, inset, or vertical." />
      <Section title="Horizontal">
        <ComponentPreview>
          <div className="w-full space-y-4">
            <p className="text-sm text-m3-on-surface">Full bleed</p>
            <Divider />
            <p className="text-sm text-m3-on-surface">Inset left</p>
            <Divider inset="left" />
            <p className="text-sm text-m3-on-surface">Middle inset</p>
            <Divider inset="middle" />
          </div>
        </ComponentPreview>
        <CodeBlock>{`<Divider />
<Divider inset="left" />
<Divider inset="middle" />`}</CodeBlock>
      </Section>
      <Section title="Vertical">
        <ComponentPreview>
          <div className="flex items-center gap-4 h-8">
            <span className="text-sm text-m3-on-surface">Left</span>
            <Divider orientation="vertical" />
            <span className="text-sm text-m3-on-surface">Right</span>
          </div>
        </ComponentPreview>
        <CodeBlock>{`<Divider orientation="vertical" />`}</CodeBlock>
      </Section>
    </div>
  )
}
