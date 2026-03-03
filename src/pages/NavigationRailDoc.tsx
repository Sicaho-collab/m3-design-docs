import { useState } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { NavigationRail } from '@/components/ui/navigation-rail'
import { Home, Search, Bookmark, Settings } from 'lucide-react'

const railItems = [
  { label: 'Home', icon: <Home className="size-6" /> },
  { label: 'Search', icon: <Search className="size-6" />, badge: true },
  { label: 'Saved', icon: <Bookmark className="size-6" /> },
  { label: 'Settings', icon: <Settings className="size-6" /> },
]

export default function NavigationRailDoc() {
  const [active, setActive] = useState(0)
  return (
    <div className="space-y-12">
      <PageHeader title="Navigation Rail" description="Navigation rails provide access to primary destinations in apps when using tablet and desktop layouts." />
      <Section title="Navigation Rail">
        <ComponentPreview className="p-0 overflow-hidden rounded-m3-md min-h-[300px] flex justify-start items-stretch">
          <NavigationRail items={railItems} activeIndex={active} onSelect={setActive} />
        </ComponentPreview>
        <CodeBlock code={`<NavigationRail items={items} activeIndex={0} onSelect={setActive} />`} />
      </Section>
      <Section title="Props">
        <PropsTable props={[
          { name: 'items', type: 'NavRailItem[]', required: true, description: 'Navigation items' },
          { name: 'activeIndex', type: 'number', required: true, description: 'Active item index' },
          { name: 'onSelect', type: '(index: number) => void', required: true, description: 'Selection callback' },
          { name: 'header', type: 'ReactNode', description: 'Optional header element (e.g. FAB)' },
        ]} />
      </Section>
    </div>
  )
}
