import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { List, ListItem, ListDivider } from '@/components/ui/list'
import { User, Settings, Bell, ChevronRight, Star } from 'lucide-react'

export default function ListDoc() {
  return (
    <div className="space-y-12">
      <PageHeader title="Lists" description="Lists are continuous, vertical indexes of text and images. They organize content clearly and let users navigate." />
      <Section title="One-line List">
        <ComponentPreview>
          <List className="border border-m3-outline-variant max-w-sm w-full">
            <ListItem headline="Alice Martin" leading={<User />} trailing={<ChevronRight />} />
            <ListDivider />
            <ListItem headline="Settings" leading={<Settings />} trailing={<ChevronRight />} />
            <ListDivider />
            <ListItem headline="Notifications" leading={<Bell />} trailing={<ChevronRight />} />
          </List>
        </ComponentPreview>
        <CodeBlock code={`<List>
  <ListItem headline="Alice Martin" leading={<User />} trailing={<ChevronRight />} />
  <ListDivider />
  <ListItem headline="Settings" leading={<Settings />} />
</List>`} />
      </Section>
      <Section title="Two-line and Three-line">
        <ComponentPreview>
          <List className="border border-m3-outline-variant max-w-sm w-full">
            <ListItem headline="Project Alpha" supporting="Last updated 2 hours ago" leading={<Star />} trailing={<ChevronRight />} />
            <ListDivider />
            <ListItem headline="Design Tokens" overline="Updated" supporting="Primary colours changed to #9A76BE. Typography updated to Outfit and PT Sans Caption." leading={<Bell />} />
          </List>
        </ComponentPreview>
      </Section>
    </div>
  )
}
