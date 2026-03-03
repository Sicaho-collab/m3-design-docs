import { useState } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { BottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import { List, ListItem } from '@/components/ui/list'
import { Link, Copy, Mail } from 'lucide-react'

export default function BottomSheetDoc() {
  const [open, setOpen] = useState(false)
  return (
    <div className="space-y-12">
      <PageHeader title="Bottom Sheet" description="Bottom sheets are surfaces containing supplementary content, anchored to the bottom of the screen." />
      <Section title="Modal Bottom Sheet">
        <ComponentPreview>
          <Button onClick={() => setOpen(true)}>Open Bottom Sheet</Button>
          <BottomSheet open={open} onOpenChange={setOpen} title="Share" description="Choose how you want to share this content">
            <List>
              <ListItem headline="Copy link" leading={<Link />} onClick={() => setOpen(false)} />
              <ListItem headline="Copy text" leading={<Copy />} onClick={() => setOpen(false)} />
              <ListItem headline="Share via email" leading={<Mail />} onClick={() => setOpen(false)} />
            </List>
          </BottomSheet>
        </ComponentPreview>
        <CodeBlock code={`<BottomSheet open={open} onOpenChange={setOpen} title="Share">
  <List>
    <ListItem headline="Copy link" leading={<Link />} />
  </List>
</BottomSheet>`} />
      </Section>
      <Section title="Props">
        <PropsTable props={[
          { name: 'open', type: 'boolean', description: 'Controlled open state' },
          { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Open state change callback' },
          { name: 'title', type: 'string', description: 'Sheet title' },
          { name: 'description', type: 'string', description: 'Sheet description' },
          { name: 'defaultSnap', type: "'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Initial height snap point' },
        ]} />
      </Section>
    </div>
  )
}
