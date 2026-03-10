import { useState } from 'react'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable, type PropDef } from '@/components/docs/PropsTable'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { AccessibilityNote } from '@/components/docs/AccessibilityNote'

const props: PropDef[] = [
  {
    name: 'defaultValue',
    type: 'string',
    default: "''",
    description: 'Initial HTML content for uncontrolled usage.',
  },
  {
    name: 'value',
    type: 'string',
    default: '—',
    description: 'Controlled HTML content. Sync with onChange to keep state in sync.',
  },
  {
    name: 'onChange',
    type: '(html: string) => void',
    default: '—',
    description: 'Called with the current HTML string whenever the content changes.',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "'Start typing…'",
    description: 'Placeholder text shown when the editor is empty.',
  },
  {
    name: 'maxLength',
    type: 'number',
    default: '—',
    description: 'Maximum number of characters. Displays a counter in the footer and blocks further input at the limit.',
  },
  {
    name: 'readOnly',
    type: 'boolean',
    default: 'false',
    description: 'Hides the toolbar and makes the content non-editable. Use for displaying rich content.',
  },
  {
    name: 'showFooter',
    type: 'boolean',
    default: 'true',
    description: 'Shows the word and character count footer below the editor.',
  },
  {
    name: 'minHeight',
    type: 'string',
    default: "'160px'",
    description: 'Minimum height of the editable area as a CSS value.',
  },
  {
    name: 'className',
    type: 'string',
    default: '—',
    description: 'Additional CSS classes applied to the root wrapper element.',
  },
]

const usageCode = `import { RichTextEditor } from '@/components/ui/rich-text-editor'

function Example() {
  const [html, setHtml] = useState('')

  return (
    <RichTextEditor
      placeholder="Start typing…"
      onChange={setHtml}
    />
  )
}`

const controlledCode = `const [html, setHtml] = useState('<p>Hello <strong>world</strong></p>')

<RichTextEditor
  value={html}
  onChange={setHtml}
  placeholder="Write something…"
/>`

const readOnlyCode = `<RichTextEditor
  readOnly
  defaultValue="<h2>Report Summary</h2><p>All systems are operational.</p>"
/>`

const maxLengthCode = `<RichTextEditor
  maxLength={280}
  placeholder="What's happening? (280 chars)"
/>`

const PREFILLED_CONTENT = `<h2>Welcome to the Rich Text Editor</h2><p>This editor supports <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and <s>strikethrough</s> text formatting.</p><ul><li>Bullet lists</li><li>Ordered lists</li><li>Blockquotes</li></ul><blockquote>You can also add blockquotes and inline <code>code</code> snippets.</blockquote><p>Try editing this content or start fresh!</p>`

export default function RichTextEditorDoc() {
  const [html, setHtml] = useState(PREFILLED_CONTENT)
  const [outputVisible, setOutputVisible] = useState(false)

  return (
    <div className="space-y-12">
      <PageHeader
        title="Rich Text Editor"
        description="A full-featured WYSIWYG editor built on Tiptap and ProseMirror. Supports headings, lists, links, code blocks, text alignment, and more — styled entirely with M3 design tokens."
        status="stable"
      />

      {/* ── Default ── */}
      <Section
        title="Default"
        description="The editor includes a toolbar with all formatting options, and a word/character count footer."
      >
        <ComponentPreview title="Rich Text Editor" className="items-start">
          <div className="w-full">
            <RichTextEditor
              defaultValue={PREFILLED_CONTENT}
              placeholder="Start typing…"
            />
          </div>
        </ComponentPreview>
        <CodeBlock code={usageCode} language="tsx" />
      </Section>

      {/* ── Controlled ── */}
      <Section
        title="Controlled"
        description="Bind value and onChange to keep the HTML content in your own state. The output panel below reflects every keystroke."
      >
        <ComponentPreview title="Controlled editor" className="flex-col items-start gap-4">
          <div className="w-full">
            <RichTextEditor
              value={html}
              onChange={setHtml}
              placeholder="Write something…"
            />
          </div>
          <div className="w-full">
            <button
              type="button"
              onClick={() => setOutputVisible((v) => !v)}
              className="text-xs text-m3-primary underline underline-offset-2 mb-2"
            >
              {outputVisible ? 'Hide' : 'Show'} HTML output
            </button>
            {outputVisible && (
              <pre className="text-xs bg-m3-surface-container-highest border border-m3-outline-variant rounded-m3-sm p-3 overflow-x-auto whitespace-pre-wrap break-all">
                {html}
              </pre>
            )}
          </div>
        </ComponentPreview>
        <CodeBlock code={controlledCode} language="tsx" />
      </Section>

      {/* ── Read-only ── */}
      <Section
        title="Read-only"
        description="Set readOnly to render rich HTML content without the toolbar. Useful for displaying stored content."
      >
        <ComponentPreview title="Read-only display" className="items-start">
          <div className="w-full">
            <RichTextEditor
              readOnly
              defaultValue="<h2>Report Summary</h2><p>All systems are <strong>operational</strong>. No incidents were recorded in the past 30 days.</p><ul><li>Uptime: 99.98%</li><li>Latency: &lt; 120 ms</li><li>Errors: 0 critical</li></ul>"
            />
          </div>
        </ComponentPreview>
        <CodeBlock code={readOnlyCode} language="tsx" />
      </Section>

      {/* ── Character limit ── */}
      <Section
        title="Character limit"
        description="Pass maxLength to cap input length and show a live counter in the footer. The counter turns red when the limit is reached."
      >
        <ComponentPreview title="With character limit" className="items-start">
          <div className="w-full">
            <RichTextEditor
              maxLength={280}
              placeholder="What's happening? (280 chars max)"
              minHeight="100px"
            />
          </div>
        </ComponentPreview>
        <CodeBlock code={maxLengthCode} language="tsx" />
      </Section>

      {/* ── Usage ── */}
      <Section title="Usage">
        <CodeBlock code={usageCode} language="tsx" />
      </Section>

      {/* ── Props ── */}
      <Section title="API Reference">
        <PropsTable props={props} />
      </Section>

      {/* ── Accessibility ── */}
      <Section title="Accessibility">
        <AccessibilityNote
          items={[
            'The editor region is a contenteditable element managed by ProseMirror, which maintains correct ARIA roles for rich-text editing.',
            'Every toolbar button has an aria-label and title for screen reader and tooltip support.',
            'Active formatting buttons have aria-pressed="true" so assistive technology announces the current state.',
            'Keyboard shortcuts match platform conventions: Ctrl/Cmd+B for bold, Ctrl/Cmd+I for italic, Ctrl/Cmd+Z for undo, etc.',
            'The character limit counter announces when the limit is reached by turning red, providing a visual cue.',
            'Links are created via a native prompt dialog, which is accessible to all screen readers.',
          ]}
        />
      </Section>

      {/* ── Keyboard shortcuts ── */}
      <Section
        title="Keyboard shortcuts"
        description="All standard text-editor shortcuts are supported out of the box."
      >
        <div className="overflow-x-auto rounded-m3-md border border-m3-outline-variant">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-m3-outline-variant bg-m3-surface-container-low">
                <th className="text-left px-4 py-2.5 text-m3-on-surface-variant font-medium text-xs uppercase tracking-wide">Action</th>
                <th className="text-left px-4 py-2.5 text-m3-on-surface-variant font-medium text-xs uppercase tracking-wide">Windows / Linux</th>
                <th className="text-left px-4 py-2.5 text-m3-on-surface-variant font-medium text-xs uppercase tracking-wide">macOS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-m3-outline-variant">
              {[
                ['Bold', 'Ctrl+B', '⌘B'],
                ['Italic', 'Ctrl+I', '⌘I'],
                ['Underline', 'Ctrl+U', '⌘U'],
                ['Undo', 'Ctrl+Z', '⌘Z'],
                ['Redo', 'Ctrl+Y', '⌘Y'],
                ['Select all', 'Ctrl+A', '⌘A'],
                ['Hard break', 'Shift+Enter', 'Shift+Enter'],
              ].map(([action, win, mac]) => (
                <tr key={action} className="hover:bg-m3-surface-container-low transition-colors">
                  <td className="px-4 py-2.5 text-m3-on-surface">{action}</td>
                  <td className="px-4 py-2.5">
                    <code className="text-xs bg-m3-surface-container-high px-1.5 py-0.5 rounded text-m3-on-surface">{win}</code>
                  </td>
                  <td className="px-4 py-2.5">
                    <code className="text-xs bg-m3-surface-container-high px-1.5 py-0.5 rounded text-m3-on-surface">{mac}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}
