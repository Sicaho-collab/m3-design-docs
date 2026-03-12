import { useState } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'
import { AccessibilityNote } from '@/components/docs/AccessibilityNote'
import { NavigationRail } from '@/components/ui/navigation-rail'
import { Home, Search, Bookmark, Settings, Plus, Bell, User, Mail } from 'lucide-react'

const railItems = [
  { label: 'Home', icon: <Home className="size-6" /> },
  { label: 'Search', icon: <Search className="size-6" />, badge: true },
  { label: 'Saved', icon: <Bookmark className="size-6" />, badge: 3 },
  { label: 'Settings', icon: <Settings className="size-6" /> },
]

const railItemsAlt = [
  { label: 'Home', icon: <Home className="size-6" /> },
  { label: 'Notifications', icon: <Bell className="size-6" />, badge: 12 },
  { label: 'Messages', icon: <Mail className="size-6" /> },
  { label: 'Profile', icon: <User className="size-6" /> },
]

const navRailProps: PropDef[] = [
  { name: 'items', type: 'NavRailItem[]', required: true, description: 'Array of navigation items to display' },
  { name: 'activeIndex', type: 'number', required: true, description: 'Index of the currently active item' },
  { name: 'onSelect', type: '(index: number) => void', required: true, description: 'Called when an item is selected' },
  { name: 'fab', type: 'ReactNode', description: 'Optional FAB element rendered below the menu button' },
  { name: 'expanded', type: 'boolean', description: 'Controlled expanded state — shows labels beside icons when true' },
  { name: 'onExpandedChange', type: '(expanded: boolean) => void', description: 'Called when the collapse/expand toggle is clicked' },
  { name: 'defaultExpanded', type: 'boolean', default: 'false', description: 'Default expanded state for uncontrolled mode' },
  { name: 'alignment', type: "'top' | 'center' | 'bottom'", default: "'top'", description: 'Vertical alignment of navigation items' },
  { name: 'hideMenuButton', type: 'boolean', default: 'false', description: 'Hide the collapse/expand toggle button' },
  { name: 'className', type: 'string', description: 'Additional CSS class name' },
]

const navRailItemProps: PropDef[] = [
  { name: 'label', type: 'string', required: true, description: 'Text label for the navigation item' },
  { name: 'icon', type: 'ReactNode', required: true, description: 'Icon element (default state)' },
  { name: 'activeIcon', type: 'ReactNode', description: 'Icon element when item is active (e.g. filled variant)' },
  { name: 'badge', type: 'number | boolean', description: 'Badge indicator — boolean for dot, number for count' },
]

const basicCode = `import { NavigationRail } from '@sicaho-collab/ui-web'
import { Home, Search, Bookmark, Settings } from 'lucide-react'

const items = [
  { label: 'Home', icon: <Home /> },
  { label: 'Search', icon: <Search />, badge: true },
  { label: 'Saved', icon: <Bookmark />, badge: 3 },
  { label: 'Settings', icon: <Settings /> },
]

<NavigationRail
  items={items}
  activeIndex={active}
  onSelect={setActive}
/>`

const expandedCode = `// Controlled expand/collapse
const [expanded, setExpanded] = useState(false)

<NavigationRail
  items={items}
  activeIndex={active}
  onSelect={setActive}
  expanded={expanded}
  onExpandedChange={setExpanded}
/>`

const fabCode = `<NavigationRail
  items={items}
  activeIndex={active}
  onSelect={setActive}
  fab={
    <button className="flex items-center justify-center size-14 rounded-m3-lg bg-m3-primary-container text-m3-on-primary-container shadow-m3-1 hover:shadow-m3-2 transition-shadow">
      <Plus className="size-6" />
    </button>
  }
/>`

const alignmentCode = `// Center-aligned destinations
<NavigationRail
  items={items}
  activeIndex={active}
  onSelect={setActive}
  alignment="center"
/>`

export default function NavigationRailDoc() {
  const [active1, setActive1] = useState(0)
  const [active2, setActive2] = useState(0)
  const [expanded2, setExpanded2] = useState(false)
  const [active3, setActive3] = useState(0)
  const [active4, setActive4] = useState(0)
  const [active5, setActive5] = useState(0)

  return (
    <div className="space-y-12">
      <PageHeader
        title="Navigation Rail"
        description="Navigation rails provide access to primary destinations in apps when using tablet and desktop layouts. They feature a collapse/expand toggle, optional FAB, and M3 interaction states."
        status="stable"
      />

      <Section title="Platform Availability">
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <div className="flex items-center gap-2 rounded-m3-sm bg-m3-surface-container-low px-4 py-3">
            <span className="text-sm font-medium text-m3-on-surface">Web</span>
            <span className="ml-auto text-xs font-medium text-m3-primary bg-m3-primary-container px-2 py-0.5 rounded-m3-full">Available</span>
          </div>
          <div className="flex items-center gap-2 rounded-m3-sm bg-m3-surface-container-low px-4 py-3">
            <span className="text-sm font-medium text-m3-on-surface">Mobile</span>
            <span className="ml-auto text-xs font-medium text-m3-on-surface-variant bg-m3-surface-container-high px-2 py-0.5 rounded-m3-full">N/A</span>
          </div>
        </div>
        <p className="mt-3 text-sm text-m3-on-surface-variant">
          NavigationRail is a web-only component designed for tablet and desktop layouts. On mobile, use <strong>NavigationBar</strong> (bottom tab bar) instead.
        </p>
      </Section>

      {/* ── Basic ── */}
      <Section
        title="Basic"
        description="The default navigation rail includes a menu button at the top for collapse/expand. Click the hamburger icon to toggle between collapsed and expanded states."
      >
        <ComponentPreview className="p-0 overflow-hidden rounded-m3-md min-h-[360px] flex justify-start items-stretch">
          <NavigationRail items={railItems} activeIndex={active1} onSelect={setActive1} />
          <div className="flex-1 flex items-center justify-center text-m3-on-surface-variant text-sm">
            Content area
          </div>
        </ComponentPreview>
        <CodeBlock code={basicCode} language="tsx" />
      </Section>

      {/* ── Controlled expand/collapse ── */}
      <Section
        title="Controlled Expand / Collapse"
        description="Use the expanded and onExpandedChange props for controlled state. In expanded mode, labels appear beside icons for better readability."
      >
        <ComponentPreview className="p-0 overflow-hidden rounded-m3-md min-h-[360px] flex justify-start items-stretch">
          <NavigationRail
            items={railItemsAlt}
            activeIndex={active2}
            onSelect={setActive2}
            expanded={expanded2}
            onExpandedChange={setExpanded2}
          />
          <div className="flex-1 flex flex-col items-center justify-center gap-2 text-sm">
            <span className="text-m3-on-surface-variant">
              Rail is {expanded2 ? 'expanded' : 'collapsed'}
            </span>
            <button
              onClick={() => setExpanded2(!expanded2)}
              className="px-4 py-2 rounded-m3-full bg-m3-primary text-m3-on-primary text-sm font-medium"
            >
              Toggle from outside
            </button>
          </div>
        </ComponentPreview>
        <CodeBlock code={expandedCode} language="tsx" />
      </Section>

      {/* ── With FAB ── */}
      <Section
        title="With FAB"
        description="Place a Floating Action Button below the menu toggle using the fab prop. The FAB follows M3 placement guidelines for navigation rails."
      >
        <ComponentPreview className="p-0 overflow-hidden rounded-m3-md min-h-[360px] flex justify-start items-stretch">
          <NavigationRail
            items={railItems}
            activeIndex={active3}
            onSelect={setActive3}
            fab={
              <button className="flex items-center justify-center size-14 rounded-m3-lg bg-m3-primary-container text-m3-on-primary-container shadow-m3-1 hover:shadow-m3-2 active:shadow-m3-1 transition-shadow">
                <Plus className="size-6" />
              </button>
            }
          />
          <div className="flex-1 flex items-center justify-center text-m3-on-surface-variant text-sm">
            Content area
          </div>
        </ComponentPreview>
        <CodeBlock code={fabCode} language="tsx" />
      </Section>

      {/* ── Alignment ── */}
      <Section
        title="Alignment"
        description="Destinations can be aligned to the top (default), center, or bottom of the rail."
      >
        <ComponentPreview className="p-0 overflow-hidden rounded-m3-md min-h-[360px] flex justify-start items-stretch">
          <NavigationRail
            items={railItems.slice(0, 3)}
            activeIndex={active4}
            onSelect={setActive4}
            alignment="center"
            hideMenuButton
          />
          <div className="flex-1 flex items-center justify-center text-m3-on-surface-variant text-sm">
            Center-aligned (no menu button)
          </div>
        </ComponentPreview>
        <CodeBlock code={alignmentCode} language="tsx" />
      </Section>

      {/* ── Without menu button ── */}
      <Section
        title="Without Menu Button"
        description="Use hideMenuButton to remove the collapse/expand toggle when the rail should stay in a fixed state."
      >
        <ComponentPreview className="p-0 overflow-hidden rounded-m3-md min-h-[360px] flex justify-start items-stretch">
          <NavigationRail
            items={railItemsAlt}
            activeIndex={active5}
            onSelect={setActive5}
            hideMenuButton
          />
          <div className="flex-1 flex items-center justify-center text-m3-on-surface-variant text-sm">
            Fixed collapsed rail
          </div>
        </ComponentPreview>
      </Section>

      {/* ── API Reference ── */}
      <Section title="API Reference — NavigationRail">
        <PropsTable props={navRailProps} />
      </Section>

      <Section title="API Reference — NavRailItem">
        <PropsTable props={navRailItemProps} />
      </Section>

      {/* ── Accessibility ── */}
      <Section title="Accessibility">
        <AccessibilityNote
          items={[
            'Uses <nav> landmark with aria-label for screen readers',
            'Active item is marked with aria-current="page"',
            'Menu toggle has aria-expanded and descriptive aria-label',
            'All items are keyboard focusable with visible focus-visible ring',
            'Hover, pressed, and focus states follow M3 state layer guidelines',
            'Badge counts are conveyed to assistive technology',
          ]}
        />
      </Section>
    </div>
  )
}
