import * as React from 'react'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import { cn } from '@/lib/utils'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Minus,
  Link as LinkIcon,
  LinkOff,
  Undo2,
  Redo2,
} from 'lucide-react'

// ─── Toolbar button ───────────────────────────────────────────────────────────

interface ToolbarButtonProps {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  active = false,
  disabled = false,
  title,
  children,
}) => (
  <button
    type="button"
    onMouseDown={(e) => {
      e.preventDefault()
      onClick()
    }}
    disabled={disabled}
    title={title}
    aria-label={title}
    aria-pressed={active}
    className={cn(
      'inline-flex items-center justify-center size-8 rounded-m3-sm text-m3-on-surface-variant transition-colors duration-150',
      'hover:bg-m3-on-surface/8 hover:text-m3-on-surface',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-m3-primary',
      'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent',
      active && 'bg-m3-secondary-container text-m3-on-secondary-container hover:bg-m3-secondary-container/80'
    )}
  >
    {children}
  </button>
)

// ─── Toolbar separator ────────────────────────────────────────────────────────

const ToolbarSeparator: React.FC = () => (
  <div className="w-px h-5 bg-m3-outline-variant mx-0.5 shrink-0" />
)

// ─── Heading select ───────────────────────────────────────────────────────────

interface HeadingSelectProps {
  editor: Editor
}

const HeadingSelect: React.FC<HeadingSelectProps> = ({ editor }) => {
  const value = editor.isActive('heading', { level: 1 })
    ? '1'
    : editor.isActive('heading', { level: 2 })
    ? '2'
    : editor.isActive('heading', { level: 3 })
    ? '3'
    : '0'

  return (
    <select
      value={value}
      onChange={(e) => {
        const v = e.target.value
        if (v === '0') {
          editor.chain().focus().setParagraph().run()
        } else {
          editor.chain().focus().toggleHeading({ level: Number(v) as 1 | 2 | 3 }).run()
        }
      }}
      title="Text style"
      className={cn(
        'h-8 rounded-m3-sm border border-m3-outline-variant bg-transparent',
        'text-xs text-m3-on-surface px-2 pr-6',
        'appearance-none cursor-pointer outline-none',
        'hover:border-m3-outline hover:bg-m3-surface-container-low',
        'focus-visible:ring-2 focus-visible:ring-m3-primary',
        'transition-colors duration-150',
        'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2349454F\' stroke-width=\'2\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")]',
        'bg-no-repeat bg-[right_6px_center]'
      )}
    >
      <option value="0">Normal</option>
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
      <option value="3">Heading 3</option>
    </select>
  )
}

// ─── Toolbar ─────────────────────────────────────────────────────────────────

interface ToolbarProps {
  editor: Editor
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const setLink = React.useCallback(() => {
    const prev = editor.getAttributes('link').href ?? ''
    const url = window.prompt('Enter URL', prev)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    const href = url.startsWith('http') ? url : `https://${url}`
    editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
  }, [editor])

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-m3-outline-variant bg-m3-surface-container-low">
      {/* Undo / Redo */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo (Ctrl+Z)"
      >
        <Undo2 className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo (Ctrl+Y)"
      >
        <Redo2 className="size-4" />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Text style */}
      <HeadingSelect editor={editor} />

      <ToolbarSeparator />

      {/* Marks */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        title="Bold (Ctrl+B)"
      >
        <Bold className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        title="Italic (Ctrl+I)"
      >
        <Italic className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline')}
        title="Underline (Ctrl+U)"
      >
        <UnderlineIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
        title="Strikethrough"
      >
        <Strikethrough className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive('code')}
        title="Inline code"
      >
        <Code className="size-4" />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        title="Bullet list"
      >
        <List className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        title="Ordered list"
      >
        <ListOrdered className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
        title="Blockquote"
      >
        <Quote className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive('codeBlock')}
        title="Code block"
      >
        <Code2 className="size-4" />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        active={editor.isActive({ textAlign: 'left' })}
        title="Align left"
      >
        <AlignLeft className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        active={editor.isActive({ textAlign: 'center' })}
        title="Align center"
      >
        <AlignCenter className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        active={editor.isActive({ textAlign: 'right' })}
        title="Align right"
      >
        <AlignRight className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        active={editor.isActive({ textAlign: 'justify' })}
        title="Justify"
      >
        <AlignJustify className="size-4" />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Link */}
      <ToolbarButton
        onClick={setLink}
        active={editor.isActive('link')}
        title="Insert link"
      >
        <LinkIcon className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
        title="Remove link"
      >
        <LinkOff className="size-4" />
      </ToolbarButton>

      <ToolbarSeparator />

      {/* Misc */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal rule"
      >
        <Minus className="size-4" />
      </ToolbarButton>
    </div>
  )
}

// ─── Character count footer ───────────────────────────────────────────────────

interface FooterProps {
  editor: Editor
  maxLength?: number
}

const Footer: React.FC<FooterProps> = ({ editor, maxLength }) => {
  const chars = editor.storage.characterCount.characters()
  const words = editor.storage.characterCount.words()
  const atLimit = maxLength !== undefined && chars >= maxLength

  return (
    <div className="flex items-center justify-between px-3 py-1.5 border-t border-m3-outline-variant bg-m3-surface-container-low">
      <span className="text-xs text-m3-on-surface-variant">{words} word{words !== 1 ? 's' : ''}</span>
      <span className={cn('text-xs', atLimit ? 'text-m3-error font-medium' : 'text-m3-on-surface-variant')}>
        {chars}{maxLength !== undefined ? ` / ${maxLength}` : ''} characters
      </span>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export interface RichTextEditorProps {
  /** Initial HTML content */
  defaultValue?: string
  /** Controlled HTML content */
  value?: string
  /** Called with the current HTML whenever content changes */
  onChange?: (html: string) => void
  /** Placeholder text shown when the editor is empty */
  placeholder?: string
  /** Maximum number of characters. Shows a counter; blocks input at limit. */
  maxLength?: number
  /** Renders the editor without the toolbar (read-only display) */
  readOnly?: boolean
  /** Shows the word / character count footer */
  showFooter?: boolean
  /** Minimum height of the editable area (CSS value, default "160px") */
  minHeight?: string
  /** Additional classes on the root wrapper */
  className?: string
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  defaultValue = '',
  value,
  onChange,
  placeholder = 'Start typing…',
  maxLength,
  readOnly = false,
  showFooter = true,
  minHeight = '160px',
  className,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-m3-primary underline underline-offset-2 cursor-pointer hover:text-m3-on-primary-container',
          rel: 'noopener noreferrer',
        },
      }),
      CharacterCount.configure({ limit: maxLength }),
      Placeholder.configure({ placeholder }),
    ],
    content: value ?? defaultValue,
    editable: !readOnly,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML())
    },
  })

  // Sync controlled value when it changes externally
  React.useEffect(() => {
    if (!editor || value === undefined) return
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value, false)
    }
  }, [editor, value])

  // Sync editable flag
  React.useEffect(() => {
    editor?.setEditable(!readOnly)
  }, [editor, readOnly])

  if (!editor) return null

  return (
    <div
      className={cn(
        'w-full rounded-m3-md border border-m3-outline-variant bg-white',
        'focus-within:border-m3-primary transition-colors duration-200',
        'shadow-sm',
        className
      )}
    >
      {!readOnly && <Toolbar editor={editor} />}

      <EditorContent
        editor={editor}
        className={cn(
          'rte-content px-4 py-3 text-m3-on-surface text-sm outline-none',
          'overflow-y-auto',
          readOnly && 'cursor-default'
        )}
        style={{ minHeight }}
      />

      {showFooter && <Footer editor={editor} maxLength={maxLength} />}
    </div>
  )
}

RichTextEditor.displayName = 'RichTextEditor'
