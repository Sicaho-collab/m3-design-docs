import { useState } from 'react'
import { ContactsTable, type Contact } from '@/components/ui/contacts-table'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { AccessibilityNote } from '@/components/docs/AccessibilityNote'

const props: PropDef[] = [
  {
    name: 'title',
    type: 'string',
    default: "'Person'",
    description: 'Column header label for the name column.',
  },
  {
    name: 'contacts',
    type: 'Contact[]',
    default: 'defaultContacts',
    description: 'Array of contact objects to display. Falls back to 25 built-in sample contacts.',
  },
  {
    name: 'onContactSelect',
    type: '(contactId: string) => void',
    default: '—',
    description: 'Called with the contact ID whenever a row checkbox is toggled.',
  },
  {
    name: 'className',
    type: 'string',
    default: '—',
    description: 'Additional CSS classes applied to the root wrapper.',
  },
  {
    name: 'enableAnimations',
    type: 'boolean',
    default: 'true',
    description: 'Enables staggered row entrance animations. Automatically disabled when the user prefers reduced motion.',
  },
]

const contactProps: PropDef[] = [
  { name: 'id',                 type: 'string',  description: 'Unique identifier for the contact.' },
  { name: 'name',               type: 'string',  description: 'Display name.' },
  { name: 'email',              type: 'string',  description: 'Email address. Rendered as a mailto link.' },
  { name: 'connectionStrength', type: "'Very weak' | 'Weak' | 'Good' | 'Very strong'", description: 'Determines badge colour using M3 semantic tokens.' },
  { name: 'twitterFollowers',   type: 'number',  description: 'Follower count, displayed with locale formatting.' },
  { name: 'description',        type: 'string',  default: '—', description: 'Optional short bio shown in the row and detail modal.' },
]

const usageCode = `import { ContactsTable, type Contact } from '@/components/ui/contacts-table'

const myContacts: Contact[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    connectionStrength: 'Very strong',
    twitterFollowers: 9400,
    description: 'Product designer',
  },
]

export function Example() {
  return (
    <ContactsTable
      title="Team Member"
      contacts={myContacts}
      onContactSelect={(id) => console.log('selected', id)}
    />
  )
}`

const smallSampleContacts: Contact[] = [
  { id: 'a1', name: 'Jane Smith',   email: 'jane@example.com',  connectionStrength: 'Very strong', twitterFollowers: 9400, description: 'Product designer' },
  { id: 'a2', name: 'Tom Baker',    email: 'tom@example.com',   connectionStrength: 'Good',        twitterFollowers: 5100, description: 'Backend engineer' },
  { id: 'a3', name: 'Sara Okonkwo', email: 'sara@example.com',  connectionStrength: 'Weak',        twitterFollowers: 2300, description: 'Growth lead' },
  { id: 'a4', name: 'Luis Herrera', email: 'luis@example.com',  connectionStrength: 'Very weak',   twitterFollowers: 900,  description: 'Intern' },
  { id: 'a5', name: 'Amy Nguyen',   email: 'amy@example.com',   connectionStrength: 'Good',        twitterFollowers: 6700, description: 'Data analyst' },
]

export default function ContactsTableDoc() {
  const [lastSelected, setLastSelected] = useState<string | null>(null)

  return (
    <div className="space-y-12">
      <PageHeader
        title="Contacts Table"
        description="A rich data table for displaying contact records with per-row selection, sorting, filtering by connection strength, CSV/JSON export, and an animated detail modal. Built with Framer Motion and styled with M3 design tokens."
        status="stable"
      />

      {/* ── Default (full dataset) ── */}
      <Section
        title="Default"
        description="25 sample contacts with pagination (10 per page). Sort by name, connection strength, or follower count. Filter by strength tier. Click the ⋮ icon on any row to open the detail modal."
      >
        <ComponentPreview title="Contacts Table" className="items-start overflow-x-auto p-4">
          <ContactsTable />
        </ComponentPreview>
        <CodeBlock code={usageCode} language="tsx" />
      </Section>

      {/* ── Custom data ── */}
      <Section
        title="Custom data"
        description="Pass your own contacts array. Row selection events are surfaced via onContactSelect."
      >
        <ComponentPreview title="Custom contacts" className="items-start overflow-x-auto p-4">
          <div className="w-full">
            <ContactsTable
              title="Team Member"
              contacts={smallSampleContacts}
              onContactSelect={(id) => setLastSelected(id)}
            />
            {lastSelected && (
              <p className="mt-3 text-sm text-m3-on-surface-variant">
                Last toggled ID: <span className="font-medium text-m3-on-surface">{lastSelected}</span>
              </p>
            )}
          </div>
        </ComponentPreview>
        <CodeBlock
          language="tsx"
          code={`<ContactsTable
  title="Team Member"
  contacts={myContacts}
  onContactSelect={(id) => console.log('toggled', id)}
/>`}
        />
      </Section>

      {/* ── No animations ── */}
      <Section
        title="Animations disabled"
        description="Set enableAnimations to false to skip the staggered row entrance. Respects prefers-reduced-motion automatically."
      >
        <ComponentPreview title="No animations" className="items-start overflow-x-auto p-4">
          <ContactsTable contacts={smallSampleContacts} enableAnimations={false} />
        </ComponentPreview>
        <CodeBlock language="tsx" code={`<ContactsTable contacts={myContacts} enableAnimations={false} />`} />
      </Section>

      {/* ── Connection strength reference ── */}
      <Section
        title="Connection strength"
        description="Each tier maps directly to an M3 semantic colour token pair for accessible, brand-consistent badges."
      >
        <div className="overflow-x-auto rounded-m3-md border border-m3-outline-variant">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-m3-outline-variant bg-m3-surface-container-low">
                {['Tier', 'Background token', 'Text token'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-m3-on-surface-variant font-medium text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-m3-outline-variant">
              {[
                ['Very weak',   'bg-m3-error-container',     'text-m3-on-error-container'],
                ['Weak',        'bg-m3-secondary-container', 'text-m3-on-secondary-container'],
                ['Good',        'bg-m3-primary-container',   'text-m3-on-primary-container'],
                ['Very strong', 'bg-m3-tertiary-container',  'text-m3-on-tertiary-container'],
              ].map(([tier, bg, text]) => (
                <tr key={tier} className="hover:bg-m3-surface-container-low transition-colors">
                  <td className="px-4 py-2.5 text-m3-on-surface">{tier}</td>
                  <td className="px-4 py-2.5"><code className="text-xs bg-m3-surface-container-high px-1.5 py-0.5 rounded text-m3-primary">{bg}</code></td>
                  <td className="px-4 py-2.5"><code className="text-xs bg-m3-surface-container-high px-1.5 py-0.5 rounded text-m3-primary">{text}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Usage ── */}
      <Section title="Usage">
        <CodeBlock code={usageCode} language="tsx" />
      </Section>

      {/* ── Component props ── */}
      <Section title="ContactsTable Props">
        <PropsTable props={props} />
      </Section>

      {/* ── Contact interface ── */}
      <Section title="Contact Interface">
        <PropsTable props={contactProps} />
      </Section>

      {/* ── Accessibility ── */}
      <Section title="Accessibility">
        <AccessibilityNote
          items={[
            'Row checkboxes carry aria-label="Select {name}" so screen readers announce which contact is being selected.',
            'The select-all checkbox is labelled "Select all on this page".',
            'The detail-trigger button (⋮) carries aria-label="View details for {name}".',
            'The detail modal is a focusable region; clicking the backdrop or the close button dismisses it.',
            'All framer-motion animations are suppressed automatically when the user has prefers-reduced-motion enabled, or when enableAnimations is false.',
            'Email addresses are native anchor tags, triggering the OS mail client on click without JavaScript side effects.',
          ]}
        />
      </Section>
    </div>
  )
}
