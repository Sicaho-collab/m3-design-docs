import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'

interface AccentSwatch {
  name: string
  hex: string
}

const subtlerColors: AccentSwatch[] = [
  { name: 'gray', hex: '#D8D8D8' },
  { name: 'blue', hex: '#C6CEE8' },
  { name: 'teal', hex: '#C0D8E8' },
  { name: 'green', hex: '#C0E8D8' },
  { name: 'lime', hex: '#D8E8A8' },
  { name: 'yellow', hex: '#F0DEB0' },
  { name: 'orange', hex: '#F0C8A0' },
  { name: 'magenta', hex: '#F0C0D0' },
  { name: 'purple', hex: '#E0C8E8' },
]

const subtleColors: AccentSwatch[] = [
  { name: 'gray', hex: '#9E9EA0' },
  { name: 'blue', hex: '#6080D0' },
  { name: 'teal', hex: '#60B0C8' },
  { name: 'green', hex: '#50B878' },
  { name: 'lime', hex: '#50B868' },
  { name: 'yellow', hex: '#E8A820' },
  { name: 'orange', hex: '#E88020' },
  { name: 'magenta', hex: '#E05060' },
  { name: 'purple', hex: '#9860C0' },
]

function contrastTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.55 ? '#1C1B1F' : '#FFFFFF'
}

const SwatchRow: React.FC<{ colors: AccentSwatch[] }> = ({ colors }) => (
  <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
    {colors.map((swatch) => {
      const textColor = contrastTextColor(swatch.hex)

      return (
        <div key={swatch.name} className="flex flex-col items-center gap-2">
          <div
            className="w-full aspect-square rounded-m3-md flex items-center justify-center"
            style={{ backgroundColor: swatch.hex }}
          >
            <span
              className="text-[11px] font-medium capitalize"
              style={{ color: textColor }}
            >
              {swatch.name}
            </span>
          </div>
          <div className="text-center w-full">
            <code className="text-[10px] text-m3-on-surface-variant opacity-70">
              {swatch.hex}
            </code>
          </div>
        </div>
      )
    })}
  </div>
)

export default function AccentColoursDoc() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Accent Colours"
        description="Accent background colours provide visual variety for tags, badges, avatars, and status indicators. Each colour comes in two intensities: subtler (lighter) for backgrounds, and subtle (medium) for stronger emphasis."
      />

      <Section
        title="Subtler (Lighter Backgrounds)"
        description="Use subtler accent colours for light-touch backgrounds, such as tag fills, card highlights, and category indicators."
      >
        <SwatchRow
          colors={subtlerColors}

        />
      </Section>

      <Section
        title="Subtle (Medium Backgrounds)"
        description="Use subtle accent colours for stronger emphasis, such as status badges, active states, and filled indicators."
      >
        <SwatchRow
          colors={subtleColors}

        />
      </Section>

      <Section
        title="Usage Guidelines"
        description="How and when to use accent colours in your designs and code."
      >
        <div className="space-y-4">
          <div className="bg-m3-surface-container rounded-m3-md p-5 space-y-3">
            <h3 className="text-sm font-medium text-m3-on-surface">Token naming convention</h3>
            <code className="text-xs text-m3-on-surface-variant block">
              color.background.accent.&#123;color&#125;.&#123;subtler|subtle&#125;.default
            </code>
            <p className="text-sm text-m3-on-surface-variant">
              Replace <code className="text-xs bg-m3-surface-container-high px-1 py-0.5 rounded-m3-xs">&#123;color&#125;</code> with
              one of: gray, blue, teal, green, lime, yellow, orange, magenta, purple.
            </p>
          </div>

          <div className="bg-m3-surface-container rounded-m3-md p-5 space-y-3">
            <h3 className="text-sm font-medium text-m3-on-surface">When to use each intensity</h3>
            <ul className="text-sm text-m3-on-surface-variant space-y-1.5 list-disc list-inside">
              <li><strong>Subtler</strong> — background fills where text readability is the priority (tags, chips, table row highlights)</li>
              <li><strong>Subtle</strong> — stronger fills where the colour itself carries meaning (status badges, progress indicators, avatars)</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  )
}
