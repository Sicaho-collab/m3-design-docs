import { useState } from 'react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { DataTable, type Column } from '@/components/ui/data-table'
import { Tag } from '@/components/ui/tag'

interface User {
  [key: string]: unknown
  name: string
  email: string
  role: string
  status: string
  joined: string
}

const sampleData: User[] = [
  { name: 'Alice Martin', email: 'alice@example.com', role: 'Admin', status: 'Active', joined: '2024-01-12' },
  { name: 'Bob Chen', email: 'bob@example.com', role: 'Editor', status: 'Active', joined: '2024-03-05' },
  { name: 'Carol Singh', email: 'carol@example.com', role: 'Viewer', status: 'Inactive', joined: '2023-11-20' },
  { name: 'Dan Okafor', email: 'dan@example.com', role: 'Editor', status: 'Active', joined: '2024-02-18' },
  { name: 'Eva Johansson', email: 'eva@example.com', role: 'Admin', status: 'Active', joined: '2023-09-03' },
]

const columns: Column<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', sortable: true },
  {
    key: 'status',
    header: 'Status',
    cell: (row) => (
      <Tag variant={row.status === 'Active' ? 'tonal' : 'outlined'} size="sm">
        {row.status as string}
      </Tag>
    ),
  },
  { key: 'joined', header: 'Joined', align: 'right', sortable: true },
]

export default function DataTableDoc() {
  const [sortKey, setSortKey] = useState<string>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const handleSort = (key: string) => {
    if (key === sortKey) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = [...sampleData].sort((a, b) => {
    const av = String(a[sortKey] ?? '')
    const bv = String(b[sortKey] ?? '')
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
  })

  return (
    <div className="space-y-12">
      <PageHeader
        title="Data Table"
        description="Data tables display information in rows and columns with optional sorting. They follow M3 list and surface patterns."
      />
      <Section title="Basic Table">
        <ComponentPreview>
          <DataTable columns={columns} data={sorted} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
        </ComponentPreview>
        <CodeBlock code={`<DataTable columns={columns} data={data} sortKey="name" sortDir="asc" onSort={handleSort} />`} />
      </Section>
      <Section title="Empty State">
        <ComponentPreview>
          <DataTable columns={columns} data={[]} emptyState={<span>No users found</span>} />
        </ComponentPreview>
      </Section>
      <Section title="Props">
        <PropsTable
          props={[
            { name: 'columns', type: 'Column<T>[]', required: true, description: 'Column definitions' },
            { name: 'data', type: 'T[]', required: true, description: 'Row data' },
            { name: 'sortKey', type: 'string', description: 'Currently sorted column key' },
            { name: 'sortDir', type: "'asc' | 'desc'", description: 'Sort direction' },
            { name: 'onSort', type: '(key: string) => void', description: 'Sort change callback' },
            { name: 'stickyHeader', type: 'boolean', default: 'false', description: 'Sticky table header' },
            { name: 'onRowClick', type: '(row: T) => void', description: 'Row click handler' },
            { name: 'emptyState', type: 'ReactNode', description: 'Content when data is empty' },
          ]}
        />
      </Section>
    </div>
  )
}
