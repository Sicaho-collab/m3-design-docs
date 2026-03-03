import { useState } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { SearchBar } from '@/components/ui/search-bar'
import { Mic } from 'lucide-react'

export default function SearchBarDoc() {
  const [query, setQuery] = useState('')
  const [viewQuery, setViewQuery] = useState('')
  return (
    <div className="space-y-12">
      <PageHeader title="Search" description="Search lets users query and find information. M3 provides a search bar and search view variant." />
      <Section title="Search Bar">
        <ComponentPreview>
          <SearchBar value={query} onChange={setQuery} placeholder="Search…" trailing={<button className="p-1 rounded-full hover:bg-m3-on-surface/8 text-m3-on-surface-variant"><Mic className="size-5" /></button>} className="max-w-md" />
        </ComponentPreview>
        <CodeBlock code={`<SearchBar value={query} onChange={setQuery} placeholder="Search…" />`} />
      </Section>
      <Section title="Search View">
        <ComponentPreview className="p-0 overflow-hidden rounded-m3-md">
          <SearchBar value={viewQuery} onChange={setViewQuery} variant="view" placeholder="Search…" onBack={() => setViewQuery('')} />
        </ComponentPreview>
        <CodeBlock code={`<SearchBar variant="view" value={query} onChange={setQuery} onBack={handleBack} />`} />
      </Section>
      <Section title="Props">
        <PropsTable props={[
          { name: 'value', type: 'string', description: 'Controlled input value' },
          { name: 'onChange', type: '(value: string) => void', description: 'Value change callback' },
          { name: 'variant', type: "'bar' | 'view'", default: "'bar'", description: 'Visual variant' },
          { name: 'placeholder', type: 'string', default: "'Search'", description: 'Input placeholder' },
          { name: 'trailing', type: 'ReactNode', description: 'Trailing element (e.g. mic icon)' },
          { name: 'onBack', type: '() => void', description: 'Shows back arrow when provided' },
        ]} />
      </Section>
    </div>
  )
}
