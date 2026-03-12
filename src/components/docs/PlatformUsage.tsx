import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Smartphone } from 'lucide-react'
import { CodeBlock } from './CodeBlock'
import { cn } from '@/lib/utils'

interface PlatformUsageProps {
  webCode?: string
  mobileCode?: string
  webLanguage?: string
  mobileLanguage?: string
  className?: string
}

export const PlatformUsage: React.FC<PlatformUsageProps> = ({
  webCode,
  mobileCode,
  webLanguage = 'tsx',
  mobileLanguage = 'tsx',
  className,
}) => {
  const hasBoth = !!webCode && !!mobileCode
  const [tab, setTab] = React.useState<'web' | 'mobile'>(webCode ? 'web' : 'mobile')

  const variants = {
    enter: { opacity: 0, y: 12 },
    center: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' as const } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cn(
        'rounded-m3-md border border-m3-outline-variant bg-m3-surface overflow-hidden',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-m3-outline-variant bg-m3-surface-container-low">
        <h3 className="text-sm font-semibold text-m3-on-surface font-display">
          Platform Usage
        </h3>
        {hasBoth && (
          <div className="flex gap-1 rounded-m3-full bg-m3-surface-container p-0.5">
            <button
              onClick={() => setTab('web')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-m3-full text-xs font-medium transition-all duration-200',
                tab === 'web'
                  ? 'bg-m3-primary text-m3-on-primary shadow-sm'
                  : 'text-m3-on-surface-variant hover:text-m3-on-surface',
              )}
            >
              <Monitor className="size-3.5" />
              Web
            </button>
            <button
              onClick={() => setTab('mobile')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-m3-full text-xs font-medium transition-all duration-200',
                tab === 'mobile'
                  ? 'bg-m3-primary text-m3-on-primary shadow-sm'
                  : 'text-m3-on-surface-variant hover:text-m3-on-surface',
              )}
            >
              <Smartphone className="size-3.5" />
              Mobile
            </button>
          </div>
        )}
      </div>

      {/* Tech badge */}
      <div className="px-5 pt-3 pb-1">
        <span className="inline-flex items-center gap-1.5 text-xs text-m3-on-surface-variant">
          {tab === 'web' ? (
            <>
              <span className="size-1.5 rounded-m3-full bg-m3-primary" />
              React + Tailwind
            </>
          ) : (
            <>
              <span className="size-1.5 rounded-m3-full bg-m3-tertiary" />
              React Native + StyleSheet
            </>
          )}
        </span>
      </div>

      {/* Code content */}
      <div className="p-4 pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {tab === 'web' && webCode && (
              <CodeBlock code={webCode} language={webLanguage} />
            )}
            {tab === 'mobile' && mobileCode && (
              <CodeBlock code={mobileCode} language={mobileLanguage} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
