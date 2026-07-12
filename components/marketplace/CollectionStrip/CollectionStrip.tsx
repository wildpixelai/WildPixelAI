import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { imageSizes } from '@/lib/image-utils'
import type { Collection } from '@/types/marketplace'

interface CollectionStripProps {
  collections: Collection[]
}

export function CollectionStrip({ collections }: CollectionStripProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" role="list" aria-label="Collections">
      {collections.map(c => (
        <Link
          key={c.id}
          href={`/collections/${c.slug}`}
          role="listitem"
          className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-border hover:border-border-strong transition-colors duration-200"
          aria-label={`${c.title} — ${c.assetCount} designs`}
        >
          <Image
            src={c.bannerImage}
            alt={c.title}
            fill
            sizes={imageSizes.gridCard3}
            className="object-cover object-center transition-transform duration-500 ease-smooth group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-heading text-heading-sm text-white truncate">{c.title}</h3>
              <p className="font-body text-caption text-white/60 mt-0.5">
                {c.assetCount} {c.assetCount === 1 ? 'design' : 'designs'}
              </p>
            </div>
            <span
              className="shrink-0 w-9 h-9 rounded-full glass flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-110"
              aria-hidden="true"
            >
              <ArrowUpRight size={15} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
