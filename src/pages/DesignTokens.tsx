import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'

const colorTokens = [
  {
    group: 'Primary',
    swatches: [
      { name: 'primary', bg: 'bg-m3-primary', text: 'text-m3-on-primary', value: '#9A76BE' },
      { name: 'on-primary', bg: 'bg-m3-on-primary', text: 'text-m3-primary', value: '#FFFFFF', border: true },
      { name: 'primary-container', bg: 'bg-m3-primary-container', text: 'text-m3-on-primary-container', value: '#EDE0FF' },
      { name: 'on-primary-container', bg: 'bg-m3-on-primary-container', text: 'text-m3-primary-container', value: '#583D72' },
    ],
  },
  {
    group: 'Secondary',
    swatches: [
      { name: 'secondary', bg: 'bg-m3-secondary', text: 'text-m3-on-secondary', value: '#FFA33C' },
      { name: 'on-secondary', bg: 'bg-m3-on-secondary', text: 'text-m3-secondary', value: '#FFFFFF', border: true },
      { name: 'secondary-container', bg: 'bg-m3-secondary-container', text: 'text-m3-on-secondary-container', value: '#FFE5C4' },
      { name: 'on-secondary-container', bg: 'bg-m3-on-secondary-container', text: 'text-m3-secondary-container', value: '#4D2800' },
    ],
  },
  {
    group: 'Tertiary',
    swatches: [
      { name: 'tertiary', bg: 'bg-m3-tertiary', text: 'text-m3-on-tertiary', value: '#252525' },
      { name: 'on-tertiary', bg: 'bg-m3-on-tertiary', text: 'text-m3-tertiary', value: '#FFFFFF', border: true },
      { name: 'tertiary-container', bg: 'bg-m3-tertiary-container', text: 'text-m3-on-tertiary-container', value: '#3D3D3D' },
      { name: 'on-tertiary-container', bg: 'bg-m3-on-tertiary-container', text: 'text-m3-tertiary-container', value: '#E8E8E8' },
    ],
  },
  {
    group: 'Error',
    swatches: [
      { name: 'error', bg: 'bg-m3-error', text: 'text-m3-on-error', value: '#B3261E' },
      { name: 'on-error', bg: 'bg-m3-on-error', text: 'text-m3-error', value: '#FFFFFF', border: true },
      { name: 'error-container', bg: 'bg-m3-error-container', text: 'text-m3-on-error-container', value: '#F9DEDC' },
      { name: 'on-error-container', bg: 'bg-m3-on-error-container', text: 'text-m3-error-container', value: '#410E0B' },
    ],
  },
  {
    group: 'Surface',
    swatches: [
      { name: 'surface', bg: 'bg-m3-surface', text: 'text-m3-on-surface', value: '#FFFFFF', border: true },
      { name: 'surface-dim', bg: 'bg-m3-surface-dim', text: 'text-m3-on-surface', value: '#D9D9D9' },
      { name: 'surface-container-low', bg: 'bg-m3-surface-container-low', text: 'text-m3-on-surface', value: '#F7F7F7' },
      { name: 'surface-container', bg: 'bg-m3-surface-container', text: 'text-m3-on-surface', value: '#F1F1F1' },
      { name: 'surface-container-high', bg: 'bg-m3-surface-container-high', text: 'text-m3-on-surface', value: '#EBEBEB' },
      { name: 'surface-container-highest', bg: 'bg-m3-surface-container-highest', text: 'text-m3-on-surface', value: '#E3E3E3' },
    ],
  },
  {
    group: 'Outline',
    swatches: [
      { name: 'outline', bg: 'bg-m3-outline', text: 'text-white', value: '#7A7A7A' },
      { name: 'outline-variant', bg: 'bg-m3-outline-variant', text: 'text-m3-on-surface', value: '#C9C9C9' },
    ],
  },
]

const elevationLevels = [
  { level: 1, shadow: 'shadow-m3-1', token: '--shadow-m3-1' },
  { level: 2, shadow: 'shadow-m3-2', token: '--shadow-m3-2' },
  { level: 3, shadow: 'shadow-m3-3', token: '--shadow-m3-3' },
  { level: 4, shadow: 'shadow-m3-4', token: '--shadow-m3-4' },
  { level: 5, shadow: 'shadow-m3-5', token: '--shadow-m3-5' },
]

const radiusTokens = [
  { name: 'none', className: 'rounded-m3-none', value: '0px' },
  { name: 'xs', className: 'rounded-m3-xs', value: '4px' },
  { name: 'sm', className: 'rounded-m3-sm', value: '8px' },
  { name: 'md', className: 'rounded-m3-md', value: '12px' },
  { name: 'lg', className: 'rounded-m3-lg', value: '16px' },
  { name: 'xl', className: 'rounded-m3-xl', value: '28px' },
  { name: 'full', className: 'rounded-m3-full', value: '9999px' },
]

const spacingTokens = [
  { name: 'm3-0', value: '0px', width: '0%' },
  { name: 'm3-1', value: '4px', width: '4%' },
  { name: 'm3-2', value: '8px', width: '8%' },
  { name: 'm3-3', value: '12px', width: '12%' },
  { name: 'm3-4', value: '16px', width: '16%' },
  { name: 'm3-5', value: '20px', width: '20%' },
  { name: 'm3-6', value: '24px', width: '24%' },
  { name: 'm3-8', value: '32px', width: '32%' },
  { name: 'm3-10', value: '40px', width: '40%' },
  { name: 'm3-12', value: '48px', width: '48%' },
  { name: 'm3-16', value: '64px', width: '64%' },
]

const typographyScale = [
  { role: 'Display Large', fontClass: 'font-display text-[57px] leading-[64px] tracking-[-0.25px]', sample: 'Display Large' },
  { role: 'Display Medium', fontClass: 'font-display text-[45px] leading-[52px]', sample: 'Display Medium' },
  { role: 'Display Small', fontClass: 'font-display text-[36px] leading-[44px]', sample: 'Display Small' },
  { role: 'Headline Large', fontClass: 'font-display text-[32px] leading-[40px]', sample: 'Headline Large' },
  { role: 'Headline Medium', fontClass: 'font-display text-[28px] leading-[36px]', sample: 'Headline Medium' },
  { role: 'Headline Small', fontClass: 'font-display text-[24px] leading-[32px]', sample: 'Headline Small' },
  { role: 'Title Large', fontClass: 'text-[22px] leading-[28px]', sample: 'Title Large' },
  { role: 'Title Medium', fontClass: 'text-[16px] leading-[24px] font-medium tracking-[0.15px]', sample: 'Title Medium' },
  { role: 'Title Small', fontClass: 'text-[14px] leading-[20px] font-medium tracking-[0.1px]', sample: 'Title Small' },
  { role: 'Label Large', fontClass: 'text-[14px] leading-[20px] font-medium tracking-[0.1px]', sample: 'Label Large' },
  { role: 'Label Medium', fontClass: 'text-[12px] leading-[16px] font-medium tracking-[0.5px]', sample: 'Label Medium' },
  { role: 'Label Small', fontClass: 'text-[11px] leading-[16px] font-medium tracking-[0.5px]', sample: 'Label Small' },
  { role: 'Body Large', fontClass: 'text-[16px] leading-[24px] tracking-[0.5px]', sample: 'Body Large' },
  { role: 'Body Medium', fontClass: 'text-[14px] leading-[20px] tracking-[0.25px]', sample: 'Body Medium' },
  { role: 'Body Small', fontClass: 'text-[12px] leading-[16px] tracking-[0.4px]', sample: 'Body Small' },
]

export default function DesignTokens() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Design Tokens"
        description="The foundational values that define the visual language of the M3 design system. Tokens ensure consistency across all components."
      />

      {/* Color System */}
      <Section
        title="Color System"
        description="Material 3 uses a semantic color system organized into primary, secondary, tertiary, error, surface, and outline roles."
      >
        <div className="space-y-8">
          {colorTokens.map((group) => (
            <div key={group.group} className="space-y-3">
              <h3 className="text-base font-medium text-m3-on-surface font-display">{group.group}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {group.swatches.map((swatch) => (
                  <div
                    key={swatch.name}
                    className={`${swatch.bg} ${swatch.text} rounded-m3-md p-4 flex flex-col justify-between min-h-[100px] ${
                      swatch.border ? 'ring-1 ring-inset ring-m3-outline-variant' : ''
                    }`}
                  >
                    <span className="text-sm font-medium">{swatch.name}</span>
                    <div className="mt-auto pt-2">
                      <code className="text-xs opacity-80">{swatch.value}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section
        title="Typography Scale"
        description="Display styles use Outfit. All other text uses PT Sans Caption."
      >
        <div className="space-y-4">
          {typographyScale.map(({ role, fontClass, sample }) => (
            <div key={role} className="flex items-baseline gap-6 border-b border-m3-outline-variant pb-4">
              <span className="text-xs text-m3-on-surface-variant w-40 shrink-0">{role}</span>
              <span className={`${fontClass} text-m3-on-surface`}>{sample}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Elevation */}
      <Section
        title="Elevation"
        description="Material 3 defines 5 elevation levels using shadow tokens. Higher levels create more visual separation from the surface."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {elevationLevels.map(({ level, shadow, token }) => (
            <div key={level} className="flex flex-col items-center gap-3">
              <div
                className={`${shadow} bg-m3-surface-container-low rounded-m3-md w-full aspect-square flex items-center justify-center`}
              >
                <span className="text-2xl font-normal text-m3-on-surface-variant">{level}</span>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-m3-on-surface">Level {level}</p>
                <code className="text-xs text-m3-on-surface-variant">{token}</code>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Border Radius */}
      <Section
        title="Border Radius"
        description="Shape tokens control the roundness of component corners, from sharp to fully circular."
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {radiusTokens.map(({ name, className, value }) => (
            <div key={name} className="flex flex-col items-center gap-3">
              <div
                className={`${className} bg-m3-primary-container w-full aspect-square border-2 border-m3-primary`}
              />
              <div className="text-center">
                <p className="text-sm font-medium text-m3-on-surface">{name}</p>
                <code className="text-xs text-m3-on-surface-variant">{value}</code>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Spacing */}
      <Section
        title="Spacing Scale"
        description="A consistent spacing scale based on a 4px grid that maintains visual rhythm throughout the interface."
      >
        <div className="space-y-3">
          {spacingTokens.map(({ name, value, width }) => (
            <div key={name} className="flex items-center gap-4">
              <code className="text-xs text-m3-on-surface-variant w-16 shrink-0 text-right">
                {name}
              </code>
              <div className="flex-1 flex items-center gap-3">
                <div
                  className="h-2 rounded-m3-xs bg-m3-primary/80 transition-all duration-300"
                  style={{ width }}
                />
                <span className="text-xs text-m3-on-surface-variant shrink-0">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
