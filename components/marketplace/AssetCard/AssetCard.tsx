'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/cn'
import { imageSizes } from '@/lib/image-utils'
import type { Asset } from '@/types/marketplace'

interface AssetCardProps {
  asset:      Asset
  priority?:  boolean
  className?: string
  /** Grid context — determines which sizes string to use */
  context?:   'grid4' | 'grid5' | 'grid6' | 'grid3'
}

const licenseBadge: Record<Asset['license'], { label: string; className: string }> = {
  free:       { label: 'FREE',       className: 'bg-free/15 text-free border-free/30' },
  personal:   { label: 'STANDARD',   className: 'bg-accent-subtle text-accent border-accent/25' },
  commercial: { label: 'COMMERCIAL', className: 'bg-accent-2/15 text-accent-2 border-accent-2/30' },
  premium:    { label: 'PREMIUM',    className: 'bg-accent-blue/15 text-accent-blue border-accent-blue/30' },
}

const contextToSizes: Record<NonNullable<AssetCardProps['context']>, string> = {
  grid3: imageSizes.gridCard3,
  grid4: imageSizes.gridCard4,
  grid5: imageSizes.gridCard5,
  grid6: imageSizes.gridCard6,
}

export function AssetCard({ asset, priority, className, context = 'grid5' }: AssetCardProps) {
  const [saved, setSaved] = useState(false)
  const badge = licenseBadge[asset.license]
  const sizes = contextToSizes[context]

  return (
    <Link
      href={`/asset/${asset.id}`}
      className={cn(
        'group relative flex flex-col rounded-lg overflow-hidden',
        'bg-bg-elevated border border-border hover:border-border-strong',
        'transition-all duration-300 ease-smooth',
        'hover:shadow-lift hover:-translate-y-1',
        className,
      )}
    >
      {/* Image */}
      <div
        className={cn(
          'relative overflow-hidden bg-bg',
          asset.orientation === 'portrait'  ? 'aspect-[4/5]' :
          asset.orientation === 'landscape' ? 'aspect-[4/3]' : 'aspect-square',
        )}
      >
        <Image
          src={asset.image}
          alt={asset.title}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-center transition-transform duration-500 ease-smooth group-hover:scale-[1.04]"
        />

        {/* Save button */}
        <button
          type="button"
          aria-label={saved ? `Remove ${asset.title} from saved` : `Save ${asset.title}`}
          aria-pressed={saved}
          onClick={e => { e.preventDefault(); setSaved(v => !v) }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <Heart
            size={16}
            className={cn('transition-colors', saved ? 'fill-accent-2 text-accent-2' : 'text-text')}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="font-body text-body-md font-medium text-text truncate">
            {asset.title}
          </h3>
          <p className="font-body text-caption text-text-tertiary mt-0.5 truncate">
            {asset.styles.slice(0, 3).join(' · ')}
          </p>
        </div>
        <span
          className={cn(
            'shrink-0 font-body text-label-sm font-semibold px-2 py-1 rounded-sm border whitespace-nowrap',
            badge.className,
          )}
        >
          {badge.label}
        </span>
      </div>
    </Link>
  )
}
