'use client'
import { useState, useMemo } from 'react'
import { AssetCard } from '@/components/marketplace/AssetCard/AssetCard'
import { Button }    from '@/components/ui/Button/Button'
import type { Asset } from '@/types/marketplace'

interface AssetGridProps {
  assets:         Asset[]
  initialCount?:  number
  loadMoreCount?: number
  columns?:       3 | 4 | 5 | 6
  emptyMessage?:  string
}

const colClasses: Record<NonNullable<AssetGridProps['columns']>, string> = {
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  5: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  6: 'sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
}

const colToContext: Record<NonNullable<AssetGridProps['columns']>, 'grid3' | 'grid4' | 'grid5' | 'grid6'> = {
  3: 'grid3',
  4: 'grid4',
  5: 'grid5',
  6: 'grid6',
}

export function AssetGrid({
  assets,
  initialCount  = 12,
  loadMoreCount = 12,
  columns       = 5,
  emptyMessage  = 'No assets match these filters yet. Try clearing one or two.',
}: AssetGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const visible = useMemo(() => assets.slice(0, visibleCount), [assets, visibleCount])
  const hasMore = visibleCount < assets.length
  const context = colToContext[columns]

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center" role="status">
        <p className="font-body text-body-lg text-text-secondary max-w-[420px]">
          {emptyMessage}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <div className={`grid grid-cols-2 ${colClasses[columns]} gap-5`} role="list" aria-label="Asset grid">
        {visible.map((asset, i) => (
          <div key={asset.id} role="listitem">
            <AssetCard
              asset={asset}
              priority={i < 6}
              context={context}
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setVisibleCount(c => c + loadMoreCount)}
          >
            Load more assets
          </Button>
        </div>
      )}
    </div>
  )
}
