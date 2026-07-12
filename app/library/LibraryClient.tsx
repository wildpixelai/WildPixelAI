'use client'
import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CategoryTabs } from '@/components/marketplace/CategoryTabs/CategoryTabs'
import { FilterBar }    from '@/components/marketplace/FilterBar/FilterBar'
import { AssetGrid }    from '@/components/marketplace/AssetGrid/AssetGrid'
import { filterOptions } from '@/data/filters'
import { searchAssets, filterAssets } from '@/lib/search'
import { trackFilter, trackSearch } from '@/lib/analytics'
import type { Asset, Category } from '@/types/marketplace'

function LibraryInner({ assets, categories }: { assets: Asset[]; categories: Category[] }) {
  const params = useSearchParams()

  const [category, setCategory] = useState('all')
  const [license,  setLicense]  = useState(params.get('license') ?? 'All')
  const [style,    setStyle]    = useState('All')
  const [color,    setColor]    = useState('All')
  const [theme,    setTheme]    = useState('All')
  const [sort,     setSort]     = useState('Latest')
  const [query,    setQuery]    = useState(params.get('q') ?? '')

  const filtered = useMemo(() => {
    if (query.trim()) {
      trackSearch(query, 0)          // count logged after render
      return searchAssets(assets, query).map(r => r.asset)
    }
    return filterAssets(assets, { category, license, style, color, theme, sort })
  }, [assets, category, license, style, color, theme, sort, query])

  const handleCategoryChange = (v: string) => { setCategory(v); trackFilter('category', v) }
  const handleLicenseChange  = (v: string) => { setLicense(v);  trackFilter('license', v) }
  const handleStyleChange    = (v: string) => { setStyle(v);    trackFilter('style', v) }
  const handleColorChange    = (v: string) => { setColor(v);    trackFilter('color', v) }
  const handleThemeChange    = (v: string) => { setTheme(v);    trackFilter('theme', v) }
  const handleSortChange     = (v: string) => { setSort(v);     trackFilter('sort', v) }

  return (
    <>
      {/* Sticky filter bar */}
      <div className="sticky top-[72px] z-20 bg-bg/95 backdrop-blur-glass py-4
        -mx-6 px-6 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 border-b border-border mb-8">
        <CategoryTabs categories={categories} active={category} onChange={handleCategoryChange} />
        <div className="mt-3">
          <FilterBar
            license={license} style={style} color={color} theme={theme} sort={sort}
            onLicenseChange={handleLicenseChange}
            onStyleChange={handleStyleChange}
            onColorChange={handleColorChange}
            onThemeChange={handleThemeChange}
            onSortChange={handleSortChange}
            licenseOptions={filterOptions.licenses}
            styleOptions={['All', ...filterOptions.styles]}
            colorOptions={['All', ...filterOptions.colors]}
            themeOptions={['All', ...filterOptions.themes]}
            sortOptions={filterOptions.sort}
          />
        </div>
        <p className="font-body text-caption text-text-tertiary mt-3" role="status" aria-live="polite">
          {filtered.length} asset{filtered.length !== 1 ? 's' : ''}
          {query.trim() ? ` matching "${query}"` : ''}
        </p>
      </div>

      <AssetGrid assets={filtered} initialCount={18} loadMoreCount={18} columns={5} />
    </>
  )
}

export function LibraryClient(props: { assets: Asset[]; categories: Category[] }) {
  return (
    <Suspense fallback={<div className="h-20" />}>
      <LibraryInner {...props} />
    </Suspense>
  )
}
