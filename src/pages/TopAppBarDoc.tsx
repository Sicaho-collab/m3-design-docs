import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { TopAppBar } from '@/components/ui/top-app-bar'
import { ArrowLeft, MoreVertical, Search } from 'lucide-react'

const iconBtn = (icon: React.ReactNode) => (
  <button className="p-2 rounded-full hover:bg-m3-on-surface/8 text-m3-on-surface transition-colors">{icon}</button>
)

export default function TopAppBarDoc() {
  return (
    <div className="space-y-12">
      <PageHeader title="Top App Bar" description="Top app bars display navigation and actions at the top of a screen in four size variants." />
      <Section title="Small (Default)">
        <ComponentPreview className="p-0 overflow-hidden rounded-m3-md">
          <TopAppBar title="Page Title" leading={iconBtn(<ArrowLeft className="size-6" />)} trailing={<>{iconBtn(<Search className="size-6" />)}{iconBtn(<MoreVertical className="size-6" />)}</>} />
        </ComponentPreview>
        <CodeBlock>{`<TopAppBar title="Page Title" variant="small" leading={<BackButton />} trailing={<Actions />} />`}</CodeBlock>
      </Section>
      <Section title="Center Aligned">
        <ComponentPreview className="p-0 overflow-hidden rounded-m3-md">
          <TopAppBar title="Page Title" variant="center-aligned" leading={iconBtn(<ArrowLeft className="size-6" />)} trailing={iconBtn(<MoreVertical className="size-6" />)} />
        </ComponentPreview>
      </Section>
      <Section title="Medium">
        <ComponentPreview className="p-0 overflow-hidden rounded-m3-md">
          <TopAppBar title="Medium App Bar" variant="medium" leading={iconBtn(<ArrowLeft className="size-6" />)} trailing={iconBtn(<MoreVertical className="size-6" />)} />
        </ComponentPreview>
      </Section>
      <Section title="Large">
        <ComponentPreview className="p-0 overflow-hidden rounded-m3-md">
          <TopAppBar title="Large App Bar" variant="large" leading={iconBtn(<ArrowLeft className="size-6" />)} trailing={iconBtn(<MoreVertical className="size-6" />)} />
        </ComponentPreview>
      </Section>
      <Section title="Props">
        <PropsTable props={[
          { name: 'title', type: 'string', required: true, description: 'Bar title text' },
          { name: 'variant', type: "'small' | 'center-aligned' | 'medium' | 'large'", defaultValue: "'small'", description: 'Size variant' },
          { name: 'leading', type: 'ReactNode', description: 'Leading icon button (e.g. back, menu)' },
          { name: 'trailing', type: 'ReactNode', description: 'Trailing action icons' },
          { name: 'scrolled', type: 'boolean', defaultValue: 'false', description: 'Adds shadow when content is scrolled' },
        ]} />
      </Section>
    </div>
  )
}
