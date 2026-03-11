import { useState, useEffect, useMemo } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Download, ChevronDown, X, Mail, Twitter, User } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Contact {
  id: string
  name: string
  email: string
  connectionStrength: 'Very weak' | 'Weak' | 'Good' | 'Very strong'
  twitterFollowers: number
  description?: string
}

export interface ContactsTableProps {
  title?: string
  contacts?: Contact[]
  onContactSelect?: (contactId: string) => void
  className?: string
  enableAnimations?: boolean
}

type SortField = 'name' | 'connectionStrength' | 'twitterFollowers'
type SortOrder = 'asc' | 'desc'

// ─── Default data ─────────────────────────────────────────────────────────────

const defaultContacts: Contact[] = [
  { id: '1',  name: 'Pierre from Claap',      email: 'pierre@claap.io',                connectionStrength: 'Weak',        twitterFollowers: 2400,  description: 'Tech entrepreneur and investor' },
  { id: '2',  name: 'HardwareSavvy',           email: 'hardwaresavvy+andr...',          connectionStrength: 'Very strong', twitterFollowers: 8900,  description: 'Hardware specialist' },
  { id: '3',  name: 'Voiceform',               email: 'harrison@voiceform.c...',        connectionStrength: 'Good',        twitterFollowers: 5200,  description: 'Voice technology expert' },
  { id: '4',  name: 'Marketer Milk',           email: 'hi@marketmilk.com',              connectionStrength: 'Good',        twitterFollowers: 6100,  description: 'Marketing strategist' },
  { id: '5',  name: 'Allen from CAST AI',      email: 'allen@mail.cast.ai',             connectionStrength: 'Weak',        twitterFollowers: 3300,  description: 'AI infrastructure lead' },
  { id: '6',  name: 'Marija Krasnovskytė',     email: 'marija@cast.ai',                 connectionStrength: 'Very weak',   twitterFollowers: 1800,  description: 'Technical advisor' },
  { id: '7',  name: 'eryn@basistheory.com',    email: 'eryn@basistheory.com',           connectionStrength: 'Very weak',   twitterFollowers: 2100,  description: 'Security specialist' },
  { id: '8',  name: 'Brad Patterson',          email: 'brad@basistheory.com',           connectionStrength: 'Good',        twitterFollowers: 4500,  description: 'Product manager' },
  { id: '9',  name: 'Sarah Chen',              email: 'sarah.chen@techvault.com',       connectionStrength: 'Very strong', twitterFollowers: 12400, description: 'CEO and founder' },
  { id: '10', name: 'David Rodriguez',         email: 'david.rodriguez@innovate.io',    connectionStrength: 'Good',        twitterFollowers: 7800,  description: 'Lead developer' },
  { id: '11', name: 'Emily Watson',            email: 'emily.watson@future.co',         connectionStrength: 'Weak',        twitterFollowers: 3900,  description: 'Marketing director' },
  { id: '12', name: 'James Mitchell',          email: 'james@buildit.dev',              connectionStrength: 'Very strong', twitterFollowers: 9200,  description: 'Architect and advisor' },
  { id: '13', name: 'Lisa Anderson',           email: 'lisa.anderson@ventures.com',     connectionStrength: 'Good',        twitterFollowers: 5600,  description: 'Venture investor' },
  { id: '14', name: 'Michael Zhang',           email: 'michael@cloudtech.ai',           connectionStrength: 'Weak',        twitterFollowers: 4100,  description: 'Infrastructure engineer' },
  { id: '15', name: 'Jennifer Lee',            email: 'jen@designsystem.io',            connectionStrength: 'Very strong', twitterFollowers: 11200, description: 'Design system lead' },
  { id: '16', name: 'Robert Chang',            email: 'robert.chang@quantify.co',       connectionStrength: 'Good',        twitterFollowers: 6800,  description: 'Analytics expert' },
  { id: '17', name: 'Amanda Pierce',           email: 'amanda@growthlab.com',           connectionStrength: 'Weak',        twitterFollowers: 2900,  description: 'Growth consultant' },
  { id: '18', name: 'Christopher Hayes',       email: 'chris.hayes@webscale.io',        connectionStrength: 'Very strong', twitterFollowers: 13500, description: 'Platform engineer' },
  { id: '19', name: 'Victoria Moore',          email: 'victoria@datasync.com',          connectionStrength: 'Good',        twitterFollowers: 7100,  description: 'Data scientist' },
  { id: '20', name: 'Nicholas Brown',          email: 'nick@apibase.dev',               connectionStrength: 'Very weak',   twitterFollowers: 1500,  description: 'API developer' },
  { id: '21', name: 'Rebecca Sullivan',        email: 'rebecca.s@innovationlab.io',     connectionStrength: 'Good',        twitterFollowers: 8300,  description: 'Innovation strategist' },
  { id: '22', name: 'Thomas Wright',           email: 'thomas@blockchain.tech',         connectionStrength: 'Weak',        twitterFollowers: 3700,  description: 'Blockchain developer' },
  { id: '23', name: 'Maria Garcia',            email: 'maria.garcia@futuretech.com',    connectionStrength: 'Very strong', twitterFollowers: 10800, description: 'Tech evangelist' },
  { id: '24', name: 'Daniel Park',             email: 'daniel@smartsolutions.ai',       connectionStrength: 'Good',        twitterFollowers: 6400,  description: 'Solutions architect' },
  { id: '25', name: 'Sophie Laurent',          email: 'sophie.laurent@design.co',       connectionStrength: 'Weak',        twitterFollowers: 4200,  description: 'UX lead' },
]

// ─── Strength badge config ────────────────────────────────────────────────────

type StrengthStyle = { bg: string; text: string; dot: string }

const strengthStyles: Record<Contact['connectionStrength'], StrengthStyle> = {
  'Very weak':   { bg: 'bg-m3-error-container',     text: 'text-m3-on-error-container',     dot: 'bg-m3-error' },
  'Weak':        { bg: 'bg-m3-secondary-container', text: 'text-m3-on-secondary-container', dot: 'bg-m3-secondary' },
  'Good':        { bg: 'bg-m3-primary-container',   text: 'text-m3-on-primary-container',   dot: 'bg-m3-primary' },
  'Very strong': { bg: 'bg-m3-tertiary-container',  text: 'text-m3-on-tertiary-container',  dot: 'bg-m3-tertiary' },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const StrengthBadge: React.FC<{ strength: Contact['connectionStrength'] }> = ({ strength }) => {
  const { bg, text, dot } = strengthStyles[strength]
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-m3-xs', bg, text)}>
      {strength === 'Very strong' ? (
        <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
          <path d="M8 1L3 9H7L8 15L13 7H9L8 1Z" />
        </svg>
      ) : (
        <span className={cn('w-1.5 h-1.5 rounded-m3-full', dot)} />
      )}
      {strength}
    </span>
  )
}

// ─── Toolbar dropdown wrapper ─────────────────────────────────────────────────

interface DropdownProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const Dropdown: React.FC<DropdownProps> = ({ open, onClose, children }) => {
  if (!open) return null
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className="absolute right-0 mt-1 z-20 bg-white border border-m3-outline-variant shadow-m3-2 rounded-m3-sm py-1 min-w-max">
        {children}
      </div>
    </>
  )
}

interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

const DropdownItem: React.FC<DropdownItemProps> = ({ active, className, children, ...props }) => (
  <button
    type="button"
    className={cn(
      'w-full px-3 py-2 text-left text-sm text-m3-on-surface hover:bg-m3-surface-container-low transition-colors',
      active && 'bg-m3-surface-container font-medium',
      className
    )}
    {...props}
  >
    {children}
  </button>
)

// ─── Toolbar button ───────────────────────────────────────────────────────────

interface ToolbarBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

const ToolbarBtn: React.FC<ToolbarBtnProps> = ({ active, className, children, ...props }) => (
  <button
    type="button"
    className={cn(
      'flex items-center gap-1.5 px-3 py-1.5 text-sm text-m3-on-surface',
      'bg-white border border-m3-outline-variant rounded-m3-sm',
      'hover:bg-m3-surface-container-low transition-colors',
      active && 'ring-2 ring-m3-primary/30',
      className
    )}
    {...props}
  >
    {children}
  </button>
)

// ─── Active badge ──────────────────────────────────────────────────────────────

const ActiveBadge: React.FC = () => (
  <span className="text-xs bg-m3-primary text-m3-on-primary rounded-m3-xs px-1.5 py-0.5 leading-none">1</span>
)

// ─── Contact detail modal ─────────────────────────────────────────────────────

interface ContactDetailProps {
  contact: Contact
  onClose: () => void
}

const ContactDetail: React.FC<ContactDetailProps> = ({ contact, onClose }) => {
  const { bg, text, dot } = strengthStyles[contact.connectionStrength]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="absolute inset-0 bg-m3-scrim/30 backdrop-blur-sm flex items-center justify-center z-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 16 }}
        transition={{ type: 'spring', stiffness: 340, damping: 28, mass: 0.75 }}
        className="bg-white border border-m3-outline-variant shadow-m3-3 rounded-m3-lg p-6 mx-6 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 size-6 rounded-m3-full bg-m3-surface-container hover:bg-m3-surface-container-high flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="size-3 text-m3-on-surface-variant" />
        </button>

        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-m3-full bg-m3-primary-container flex items-center justify-center shrink-0">
              <User className="size-6 text-m3-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-m3-on-surface leading-tight">{contact.name}</h3>
              <div className="mt-1">
                <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-m3-xs', bg, text)}>
                  {contact.connectionStrength === 'Very strong' ? (
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1L3 9H7L8 15L13 7H9L8 1Z"/></svg>
                  ) : (
                    <span className={cn('w-1.5 h-1.5 rounded-m3-full', dot)} />
                  )}
                  {contact.connectionStrength}
                </span>
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Mail className="size-3.5 text-m3-on-surface-variant" />
                <span className="text-xs text-m3-on-surface-variant uppercase tracking-wide">Email</span>
              </div>
              <a href={`mailto:${contact.email}`} className="text-sm text-m3-primary hover:text-m3-on-primary-container underline underline-offset-2">
                {contact.email}
              </a>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Twitter className="size-3.5 text-m3-on-surface-variant" />
                <span className="text-xs text-m3-on-surface-variant uppercase tracking-wide">Twitter Followers</span>
              </div>
              <p className="text-sm font-medium text-m3-on-surface">{contact.twitterFollowers.toLocaleString()}</p>
            </div>
            {contact.description && (
              <div>
                <span className="text-xs text-m3-on-surface-variant uppercase tracking-wide block mb-1">Description</span>
                <p className="text-sm text-m3-on-surface-variant">{contact.description}</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-m3-outline-variant">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="w-full px-4 py-2.5 bg-m3-primary text-m3-on-primary rounded-m3-full text-sm font-medium hover:opacity-90 transition-opacity"
              onClick={() => { window.location.href = `mailto:${contact.email}` }}
            >
              Send Email
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Export helpers ───────────────────────────────────────────────────────────

function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

// ─── Column header cell ───────────────────────────────────────────────────────

const ColHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('flex items-center gap-1.5 border-r border-m3-outline-variant/50 px-3', className)}>
    {children}
  </div>
)

// ─── Main component ───────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 10

const strengthOrder: Record<Contact['connectionStrength'], number> = {
  'Very weak': 0, 'Weak': 1, 'Good': 2, 'Very strong': 3,
}

export function ContactsTable({
  title = 'Person',
  contacts: initialContacts = defaultContacts,
  onContactSelect,
  className,
  enableAnimations = true,
}: ContactsTableProps = {}) {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [filterStrength, setFilterStrength] = useState<Contact['connectionStrength'] | null>(null)
  const [selectedContactDetail, setSelectedContactDetail] = useState<Contact | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = enableAnimations && !shouldReduceMotion

  // Close all menus when clicking away is handled per-menu via Dropdown's backdrop

  const handleContactSelect = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId]
    )
    onContactSelect?.(contactId)
  }

  const handleSelectAll = () => {
    setSelectedContacts(
      selectedContacts.length === paginatedContacts.length ? [] : paginatedContacts.map((c) => c.id)
    )
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
    else { setSortField(field); setSortOrder('asc') }
    setShowSortMenu(false)
    setCurrentPage(1)
  }

  const handleFilter = (strength: Contact['connectionStrength'] | null) => {
    setFilterStrength(strength)
    setShowFilterMenu(false)
    setCurrentPage(1)
  }

  const sortedAndFiltered = useMemo(() => {
    let list = filterStrength
      ? initialContacts.filter((c) => c.connectionStrength === filterStrength)
      : [...initialContacts]

    if (sortField) {
      list.sort((a, b) => {
        const aVal = sortField === 'connectionStrength' ? strengthOrder[a.connectionStrength] : a[sortField]
        const bVal = sortField === 'connectionStrength' ? strengthOrder[b.connectionStrength] : b[sortField]
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }
    return list
  }, [initialContacts, sortField, sortOrder, filterStrength])

  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return sortedAndFiltered.slice(start, start + ITEMS_PER_PAGE)
  }, [sortedAndFiltered, currentPage])

  const totalPages = Math.ceil(sortedAndFiltered.length / ITEMS_PER_PAGE)

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Connection Strength', 'Twitter Followers', 'Description']
    const rows = sortedAndFiltered.map((c) => [c.name, c.email, c.connectionStrength, c.twitterFollowers, c.description ?? ''])
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    downloadBlob(csv, `contacts-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv;charset=utf-8;')
  }

  const exportToJSON = () => {
    downloadBlob(JSON.stringify(sortedAndFiltered, null, 2), `contacts-${new Date().toISOString().split('T')[0]}.json`, 'application/json;charset=utf-8;')
  }

  const containerVariants = {
    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
  }

  const rowVariants = {
    hidden:   { opacity: 0, y: 16, scale: 0.98, filter: 'blur(3px)' },
    visible:  { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 400, damping: 26, mass: 0.7 } },
    exit:     { opacity: 0, y: -8, transition: { duration: 0.15 } },
  }

  const columnGrid = '40px 220px 160px 140px 200px 1fr 40px'

  return (
    <div className={cn('w-full max-w-7xl mx-auto', className)}>

      {/* ── Toolbar ── */}
      <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
        {/* Filter */}
        <div className="relative">
          <ToolbarBtn active={!!filterStrength} onClick={() => { setShowFilterMenu((v) => !v); setShowSortMenu(false); setShowExportMenu(false) }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 3H14M4 8H12M6 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Filter
            {filterStrength && <ActiveBadge />}
          </ToolbarBtn>
          <Dropdown open={showFilterMenu} onClose={() => setShowFilterMenu(false)}>
            <DropdownItem active={!filterStrength} onClick={() => handleFilter(null)}>All Connections</DropdownItem>
            <div className="my-1 h-px bg-m3-outline-variant/50" />
            {(['Very strong', 'Good', 'Weak', 'Very weak'] as const).map((s) => (
              <DropdownItem key={s} active={filterStrength === s} onClick={() => handleFilter(s)}>
                <StrengthBadge strength={s} />
              </DropdownItem>
            ))}
          </Dropdown>
        </div>

        {/* Sort */}
        <div className="relative">
          <ToolbarBtn onClick={() => { setShowSortMenu((v) => !v); setShowFilterMenu(false); setShowExportMenu(false) }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 6L6 3L9 6M6 3V13M13 10L10 13L7 10M10 13V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sort
            {sortField && <ActiveBadge />}
            <ChevronDown size={13} className="text-m3-on-surface-variant" />
          </ToolbarBtn>
          <Dropdown open={showSortMenu} onClose={() => setShowSortMenu(false)}>
            <DropdownItem active={sortField === 'name'} onClick={() => handleSort('name')}>
              Name{sortField === 'name' && ` (${sortOrder === 'asc' ? 'A–Z' : 'Z–A'})`}
            </DropdownItem>
            <DropdownItem active={sortField === 'connectionStrength'} onClick={() => handleSort('connectionStrength')}>
              Connection{sortField === 'connectionStrength' && ` (${sortOrder === 'asc' ? '↑' : '↓'})`}
            </DropdownItem>
            <DropdownItem active={sortField === 'twitterFollowers'} onClick={() => handleSort('twitterFollowers')}>
              Followers{sortField === 'twitterFollowers' && ` (${sortOrder === 'asc' ? '↑' : '↓'})`}
            </DropdownItem>
          </Dropdown>
        </div>

        {/* Export */}
        <div className="relative">
          <ToolbarBtn onClick={() => { setShowExportMenu((v) => !v); setShowFilterMenu(false); setShowSortMenu(false) }}>
            <Download size={14} />
            Export
            <ChevronDown size={13} className="text-m3-on-surface-variant" />
          </ToolbarBtn>
          <Dropdown open={showExportMenu} onClose={() => setShowExportMenu(false)}>
            <DropdownItem onClick={() => { exportToCSV(); setShowExportMenu(false) }}>Export as CSV</DropdownItem>
            <div className="my-1 h-px bg-m3-outline-variant/50" />
            <DropdownItem onClick={() => { exportToJSON(); setShowExportMenu(false) }}>Export as JSON</DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white border border-m3-outline-variant overflow-hidden rounded-m3-md relative">
        <div className="overflow-x-auto">
          <div className="min-w-[1100px]">

            {/* Header row */}
            <div
              className="px-3 py-3 text-xs font-medium text-m3-on-surface-variant bg-m3-surface-container-low border-b border-m3-outline-variant"
              style={{ display: 'grid', gridTemplateColumns: columnGrid }}
            >
              {/* Checkbox */}
              <div className="flex items-center justify-center border-r border-m3-outline-variant/40 pr-3">
                <input
                  type="checkbox"
                  className="size-4 rounded cursor-pointer accent-m3-primary"
                  checked={paginatedContacts.length > 0 && selectedContacts.length === paginatedContacts.length}
                  onChange={handleSelectAll}
                  aria-label="Select all on this page"
                />
              </div>
              <ColHeader>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="opacity-50">
                  <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M3 14C3 11.5 5 10 8 10S13 11.5 13 14" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                {title}
              </ColHeader>
              <ColHeader>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="opacity-50">
                  <path d="M3 8L6 5L10 9L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Connection Strength
              </ColHeader>
              <ColHeader>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="opacity-50">
                  <path d="M2 2H4M2 8H6M2 14H8M10 2V14M14 4V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Twitter Followers
              </ColHeader>
              <ColHeader>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="opacity-50">
                  <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 6L8 9L14 6" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                Email Address
              </ColHeader>
              <ColHeader>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="opacity-50">
                  <path d="M3 3H13M3 8H13M3 13H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Description
              </ColHeader>
              {/* Actions */}
              <div className="flex items-center justify-center px-3">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="opacity-30">
                  <circle cx="8" cy="8" r="1" fill="currentColor"/>
                  <circle cx="13" cy="8" r="1" fill="currentColor"/>
                  <circle cx="3" cy="8" r="1" fill="currentColor"/>
                </svg>
              </div>
            </div>

            {/* Data rows */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`page-${currentPage}-${filterStrength ?? 'all'}-${sortField ?? 'none'}`}
                variants={shouldAnimate ? containerVariants : {}}
                initial={shouldAnimate ? 'hidden' : 'visible'}
                animate="visible"
              >
                {paginatedContacts.map((contact) => (
                  <motion.div key={contact.id} variants={shouldAnimate ? rowVariants : {}}>
                    <div
                      className={cn(
                        'px-3 py-3 group border-b border-m3-outline-variant/40 transition-colors duration-150',
                        selectedContacts.includes(contact.id)
                          ? 'bg-m3-surface-container'
                          : 'bg-white hover:bg-m3-surface-container-low'
                      )}
                      style={{ display: 'grid', gridTemplateColumns: columnGrid, alignItems: 'center' }}
                    >
                      {/* Checkbox */}
                      <div className="flex items-center justify-center border-r border-m3-outline-variant/40 pr-3">
                        <input
                          type="checkbox"
                          className="size-4 rounded cursor-pointer accent-m3-primary"
                          checked={selectedContacts.includes(contact.id)}
                          onChange={() => handleContactSelect(contact.id)}
                          aria-label={`Select ${contact.name}`}
                        />
                      </div>

                      {/* Name */}
                      <div className="flex items-center min-w-0 border-r border-m3-outline-variant/40 px-3">
                        <span className="inline-flex items-center gap-2 px-2 py-1 bg-m3-surface-container rounded-m3-full text-sm text-m3-on-surface min-w-0">
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="opacity-40 shrink-0">
                            <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M3 14C3 11.5 5 10 8 10S13 11.5 13 14" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                          <span className="truncate">{contact.name}</span>
                        </span>
                      </div>

                      {/* Connection strength */}
                      <div className="flex items-center border-r border-m3-outline-variant/40 px-3">
                        <StrengthBadge strength={contact.connectionStrength} />
                      </div>

                      {/* Followers */}
                      <div className="flex items-center border-r border-m3-outline-variant/40 px-3">
                        <span className="text-sm text-m3-on-surface">
                          {contact.twitterFollowers.toLocaleString()}
                        </span>
                      </div>

                      {/* Email */}
                      <div className="flex items-center min-w-0 border-r border-m3-outline-variant/40 px-3">
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-sm text-m3-primary hover:text-m3-on-primary-container underline underline-offset-2 truncate"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {contact.email}
                        </a>
                      </div>

                      {/* Description */}
                      <div className="flex items-center min-w-0 border-r border-m3-outline-variant/40 px-3">
                        <span className="text-sm text-m3-on-surface-variant truncate">
                          {contact.description ?? '—'}
                        </span>
                      </div>

                      {/* Detail trigger */}
                      <div className="flex items-center justify-center px-3">
                        <button
                          type="button"
                          aria-label={`View details for ${contact.name}`}
                          onClick={() => setSelectedContactDetail(contact)}
                          className="opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity text-m3-on-surface"
                        >
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                            <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                            <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* Contact detail overlay */}
        <AnimatePresence>
          {selectedContactDetail && (
            <ContactDetail
              contact={selectedContactDetail}
              onClose={() => setSelectedContactDetail(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="mt-3 flex items-center justify-between px-1">
          <span className="text-xs text-m3-on-surface-variant">
            Page {currentPage} of {totalPages} &middot; {sortedAndFiltered.length} contacts
            {filterStrength && ` · filtered by "${filterStrength}"`}
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs text-m3-on-surface bg-white border border-m3-outline-variant rounded-m3-sm hover:bg-m3-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs text-m3-on-surface bg-white border border-m3-outline-variant rounded-m3-sm hover:bg-m3-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
