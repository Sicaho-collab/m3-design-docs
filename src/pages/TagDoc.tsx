import { useState } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { Tag } from '@/components/ui/tag'
import { Star } from 'lucide-react'

export default function TagDoc() {
  const [tags, setTags] = useState(['Design', 'Development', 'Material 3', 'React'])

  return (
    <div className="space-y-12">
      <PageHeader
        title="Tag"
        description="Tags are compact elements that represent attributes, metadata, or categories. They can be removable or static."
      />

      <Section title="Variants">
        <ComponentPreview>
          <div className="flex flex-wrap gap-2">
            <Tag variant="filled">Filled</Tag>
            <Tag variant="tonal">Tonal</Tag>
            <Tag variant="outlined">Outlined</Tag>
            <Tag variant="surface">Surface</Tag>
          </div>
        </ComponentPreview>
        <CodeBlock>{`<Tag variant="filled">Filled</Tag>
<Tag variant="tonal">Tonal</Tag>
<Tag variant="outlined">Outlined</Tag>
<Tag variant="surface">Surface</Tag>`}</CodeBlock>
      </Section>

      <Section title="Sizes">
        <ComponentPreview>
          <div className="flex flex-wrap items-center gap-2">
            <Tag size="sm">Small</Tag>
            <Tag size="md">Medium</Tag>
            <Tag size="lg">Large</Tag>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="With Icon">
        <ComponentPreview>
          <div className="flex flex-wrap gap-2">
            <Tag variant="tonal" icon={<Star />}>Featured</Tag>
            <Tag variant="filled" icon={<Star />}>Starred</Tag>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Removable Tags">
        <ComponentPreview>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag} variant="tonal" onRemove={() => setTags(tags.filter((t) => t !== tag))}>
                {tag}
              </Tag>
            ))}
          </div>
        </ComponentPreview>
        <CodeBlock>{`<Tag variant="tonal" onRemove={() => removeTag(tag)}>{tag}</Tag>`}</CodeBlock>
      </Section>

      <Section title="Props">
        <PropsTable
          props={[
            { name: 'variant', type: "'filled' | 'tonal' | 'outlined' | 'surface'", defaultValue: "'tonal'", description: 'Visual style' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Tag size' },
            { name: 'onRemove', type: '() => void', description: 'If provided, renders a remove button' },
            { name: 'icon', type: 'ReactNode', description: 'Leading icon element' },
          ]}
        />
      </Section>
    </div>
  )
}
