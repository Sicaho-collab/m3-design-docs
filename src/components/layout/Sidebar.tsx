import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  ChevronDown,
  SquareMousePointer,
  RectangleHorizontal,
  ToggleRight,
  TextCursorInput,
  MessageSquare,
  Layers,
  Hand,
  CircleDot,
  LayoutList,
  SlidersHorizontal,
  Loader,
  Bell,
  Info,
  PanelLeft,
  Home,
  Palette,
  Type,
  Box,
  CheckSquare,
  Circle,
  X,
  Menu,
  NavigationIcon,
  MonitorSmartphone,
  PanelTop,
  Search,
  AlignJustify,
  SeparatorHorizontal,
  Table,
  GitCommitHorizontal,
  ChevronsLeftRight,
  Tag,
  ListIcon,
  LayoutPanelLeft,
  PanelBottomOpen,
  CalendarDays,
  Sparkles,
  MessageSquareText,
  BotMessageSquare,
  PencilLine,
  ContactRound,
} from 'lucide-react'
import * as Collapsible from '@radix-ui/react-collapsible'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Getting Started', path: '/', icon: <Home className="size-4" /> },
      { label: 'Design Tokens', path: '/tokens', icon: <Palette className="size-4" /> },
      { label: 'Typography', path: '/typography', icon: <Type className="size-4" /> },
    ],
  },
  {
    title: 'Actions',
    items: [
      { label: 'Button', path: '/components/button', icon: <SquareMousePointer className="size-4" /> },
      { label: 'FAB', path: '/components/fab', icon: <Box className="size-4" /> },
      { label: 'Icon Button', path: '/components/icon-button', icon: <Circle className="size-4" /> },
    ],
  },
  {
    title: 'Communication',
    items: [
      { label: 'Badge', path: '/components/badge', icon: <Bell className="size-4" /> },
      { label: 'Progress', path: '/components/progress', icon: <Loader className="size-4" /> },
      { label: 'Snackbar', path: '/components/snackbar', icon: <MessageSquare className="size-4" /> },
      { label: 'Tooltip', path: '/components/tooltip', icon: <Info className="size-4" /> },
    ],
  },
  {
    title: 'Containment',
    items: [
      { label: 'Bottom Sheet', path: '/components/bottom-sheet', icon: <PanelBottomOpen className="size-4" /> },
      { label: 'Card', path: '/components/card', icon: <RectangleHorizontal className="size-4" /> },
      { label: 'Dialog', path: '/components/dialog', icon: <PanelLeft className="size-4" /> },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { label: 'Chip', path: '/components/chip', icon: <Layers className="size-4" /> },
      { label: 'Navigation Bar', path: '/components/navigation-bar', icon: <NavigationIcon className="size-4" /> },
      { label: 'Navigation Rail', path: '/components/navigation-rail', icon: <LayoutPanelLeft className="size-4" /> },
      { label: 'Tabs', path: '/components/tabs', icon: <LayoutList className="size-4" /> },
      { label: 'Top App Bar', path: '/components/top-app-bar', icon: <PanelTop className="size-4" /> },
    ],
  },
  {
    title: 'Selection',
    items: [
      { label: 'Checkbox', path: '/components/checkbox', icon: <CheckSquare className="size-4" /> },
      { label: 'Date Picker', path: '/components/date-picker', icon: <CalendarDays className="size-4" /> },
      { label: 'Radio Button', path: '/components/radio', icon: <CircleDot className="size-4" /> },
      { label: 'Slider', path: '/components/slider', icon: <SlidersHorizontal className="size-4" /> },
      { label: 'Switch', path: '/components/switch', icon: <ToggleRight className="size-4" /> },
    ],
  },
  {
    title: 'Text Input',
    items: [
      { label: 'AI Prompt Box', path: '/components/ai-prompt-box', icon: <BotMessageSquare className="size-4" /> },
      { label: 'Rich Text Editor', path: '/components/rich-text-editor', icon: <PencilLine className="size-4" /> },
      { label: 'Search', path: '/components/search', icon: <Search className="size-4" /> },
      { label: 'Text Field', path: '/components/text-field', icon: <TextCursorInput className="size-4" /> },
    ],
  },
  {
    title: 'Lists & Menus',
    items: [
      { label: 'Divider', path: '/components/divider', icon: <SeparatorHorizontal className="size-4" /> },
      { label: 'List', path: '/components/list', icon: <ListIcon className="size-4" /> },
      { label: 'Menu', path: '/components/menu', icon: <AlignJustify className="size-4" /> },
    ],
  },
  {
    title: 'Data Display',
    items: [
      { label: 'Contacts Table', path: '/components/contacts-table', icon: <ContactRound className="size-4" /> },
      { label: 'Data Table', path: '/components/data-table', icon: <Table className="size-4" /> },
      { label: 'Pagination', path: '/components/pagination', icon: <ChevronsLeftRight className="size-4" /> },
      { label: 'Stepper', path: '/components/stepper', icon: <GitCommitHorizontal className="size-4" /> },
      { label: 'Tag', path: '/components/tag', icon: <Tag className="size-4" /> },
    ],
  },
  {
    title: 'Custom',
    items: [
      { label: 'Button Colorful', path: '/custom/button-colorful', icon: <Sparkles className="size-4" /> },
      { label: 'Chat Input', path: '/custom/chat-input', icon: <MessageSquareText className="size-4" /> },
    ],
  },
]

export const Sidebar: React.FC = () => {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const sidebarContent = (
    <nav className="flex flex-col h-full" aria-label="Component navigation">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-m3-outline-variant">
        <div className="size-8 rounded-m3-sm bg-m3-primary flex items-center justify-center">
          <Hand className="size-4 text-m3-on-primary" />
        </div>
        <div>
          <h1 className="text-sm font-medium text-m3-on-surface leading-tight font-display">M3 Design System</h1>
          <p className="text-[10px] text-m3-on-surface-variant">v1.0 · shadcn + Material 3</p>
        </div>
      </div>

      {/* Nav sections */}
      <div className="flex-1 overflow-y-auto py-2 px-2">
        {navSections.map((section) => (
          <SidebarSection
            key={section.title}
            section={section}
            currentPath={location.pathname}
            onNavigate={() => setMobileOpen(false)}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-m3-outline-variant">
        <p className="text-[10px] text-m3-on-surface-variant">
          Based on Material 3 Design Kit
        </p>
      </div>
    </nav>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-m3-sm bg-m3-surface-container shadow-m3-2 text-m3-on-surface"
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-m3-scrim/32 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-[280px] bg-m3-surface-container-low border-r border-m3-outline-variant transition-transform duration-300',
          'lg:translate-x-0 lg:static lg:z-auto',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}

interface SidebarSectionProps {
  section: NavSection
  currentPath: string
  onNavigate: () => void
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  section,
  currentPath,
  onNavigate,
}) => {
  const [open, setOpen] = React.useState(true)

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="mb-1">
      <Collapsible.Trigger className="flex items-center justify-between w-full px-2 py-2 text-xs font-medium uppercase tracking-wider text-m3-on-surface-variant hover:text-m3-on-surface transition-colors rounded-m3-sm hover:bg-m3-on-surface/4">
        <span>{section.title}</span>
        <ChevronDown
          className={cn(
            'size-3.5 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
        <div className="space-y-0.5 pb-2">
          {section.items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 px-3 py-2 text-sm rounded-m3-full transition-all duration-200',
                  isActive
                    ? 'bg-m3-secondary-container text-m3-on-secondary-container font-medium'
                    : 'text-m3-on-surface-variant hover:bg-m3-on-surface/8 hover:text-m3-on-surface'
                )
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
