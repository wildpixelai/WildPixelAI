'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Download, Share2, ChevronRight, CheckCircle2, BookOpen, Palette, Sparkles } from 'lucide-react'
import { AssetCard }  from '@/components/marketplace/AssetCard/AssetCard'
import { Button }     from '@/components/ui/Button/Button'
import { imageSizes } from '@/lib/image-utils'
import { focalPointToObjectPosition } from '@/lib/image-utils'
import { trackViewAsset, trackDownloadAsset, trackLicenseClick } from '@/lib/analytics'
import { journalPostBySlug } from '@/data/journal'
import { SOCIAL } from '@/lib/constants'
import type { Asset, Category, Collection } from '@/types/marketplace'
import type { BreadcrumbItem } from '@/lib/schema'

interface AssetDetailClientProps {
  asset:               Asset
  category?:           Category
  collection?:         Collection
  related:             Asset[]
  breadcrumbs:         BreadcrumbItem[]
  siteUrl:             string
  commercialAvailable: boolean
}

const licenseBadge: Record<Asset['license'], { label: string; className: string }> = {
  free:       { label: 'FREE',       className: 'bg-free/15 text-free border-free/30' },
  personal:   { label: 'STANDARD',   className: 'bg-accent-subtle text-accent border-accent/25' },
  commercial: { label: 'COMMERCIAL', className: 'bg-accent-2/15 text-accent-2 border-accent-2/30' },
  premium:    { label: 'PREMIUM',    className: 'bg-accent-blue/15 text-accent-blue border-accent-blue/30' },
}

// Technical Details panel displays these fields as capitalized text (unchanged from before
// the license/orientation enum values were normalized to lowercase at the data layer).
function displayCase(value: string): string {
  return value.length ? value[0].toUpperCase() + value.slice(1) : value
}

function useDownloadCount(assetId: string, initialCount: number) {
  const key = `dl_${assetId}`
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? sessionStorage.getItem(key) : null
    if (stored !== null) setCount(initialCount + parseInt(stored, 10))
  }, [assetId, initialCount, key])

  const increment = () => {
    const stored = typeof window !== 'undefined' ? sessionStorage.getItem(key) : null
    const next = (stored !== null ? parseInt(stored, 10) : 0) + 1
    if (typeof window !== 'undefined') sessionStorage.setItem(key, String(next))
    setCount(initialCount + next)
  }

  return { count, increment }
}

export function AssetDetailClient({
  asset, category, collection, related, breadcrumbs, siteUrl, commercialAvailable,
}: AssetDetailClientProps) {
  const [saved,       setSaved]       = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [downloaded,  setDownloaded]  = useState(false)
  const badge = licenseBadge[asset.license]
  const { count: downloadCount, increment } = useDownloadCount(asset.id, asset.downloads ?? 0)
  const objectPosition = focalPointToObjectPosition({ focusX: asset.focusX, focusY: asset.focusY })

  // Related journal stories
  const relatedStories = (asset.relatedJournal ?? [])
    .map(slug => journalPostBySlug(slug))
    .filter(Boolean) as NonNullable<ReturnType<typeof journalPostBySlug>>[]

  useEffect(() => {
    trackViewAsset(asset.id, asset.title, asset.category, asset.license)
  }, [asset.id, asset.title, asset.category, asset.license])

  const handleDownload = async () => {
    if (downloading) return
    setDownloading(true)
    try {
      increment()
      trackDownloadAsset(asset.id, asset.title, asset.license)
      const response = await fetch(asset.image)
      const blob = await response.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = asset.filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 3000)
    } catch {
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 3000)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12 py-8 lg:py-12">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8 font-body text-caption text-text-tertiary overflow-x-auto scrollbar-hide">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-2 shrink-0">
            {i > 0 && <ChevronRight size={12} aria-hidden="true" />}
            {i < breadcrumbs.length - 1 ? (
              <Link href={crumb.href} className="hover:text-text transition-colors whitespace-nowrap">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-text truncate max-w-[200px]">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16">

        {/* Image — uses focal point for object-position */}
        <div className={`relative rounded-lg overflow-hidden border border-border bg-bg-elevated
          ${asset.orientation === 'portrait'  ? 'aspect-[4/5]' :
            asset.orientation === 'landscape' ? 'aspect-[4/3]' : 'aspect-square'}`}>
          <Image
            src={asset.image}
            alt={asset.alt ?? asset.title}
            fill
            priority
            sizes={imageSizes.assetDetail}
            className="object-cover"
            style={{ objectPosition }}
          />
          {asset.caption && (
            <p className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent font-body text-caption text-white/80">
              {asset.caption}
            </p>
          )}
        </div>

        {/* Metadata panel */}
        <div className="flex flex-col gap-6">

          <div>
            <span className={`font-body text-label-sm font-semibold px-2 py-1 rounded-sm border inline-block mb-3 ${badge.className}`}>
              {badge.label}
            </span>
            <h1 className="font-heading font-semibold text-display-lg text-text">{asset.title}</h1>
            <p className="font-body text-body-lg text-text-secondary mt-2">{asset.subtitle}</p>
          </div>

          <p className="font-body text-body-md text-text-secondary leading-relaxed">
            {asset.description}
          </p>

          <p className="font-body text-caption text-text-tertiary">
            {downloadCount.toLocaleString()} {downloadCount === 1 ? 'download' : 'downloads'}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {asset.license === 'free' ? (
              <Button
                variant="primary" size="lg"
                icon={downloaded ? <CheckCircle2 size={16} /> : <Download size={16} />}
                iconPosition="left"
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? 'Preparing…' : downloaded ? 'Downloaded!' : 'Download Free'}
              </Button>
            ) : (
              <Button variant="primary" size="lg" href="/pricing">Get License</Button>
            )}
            <Button
              variant="secondary" size="lg"
              icon={<Heart size={16} className={saved ? 'fill-accent-2 text-accent-2' : ''} />}
              iconPosition="left"
              onClick={() => setSaved(v => !v)}
              aria-pressed={saved}
            >
              {saved ? 'Saved' : 'Save'}
            </Button>
            <Button
              variant="ghost" size="lg"
              icon={<Share2 size={16} />} iconPosition="left"
              onClick={() => {
                if (typeof navigator !== 'undefined' && navigator.share) {
                  navigator.share({ title: asset.title, url: `${siteUrl}/asset/${asset.id}` }).catch(() => null)
                }
              }}
            >
              Share
            </Button>
          </div>

          {/* Colour palette */}
          <div>
            <h2 className="font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-3">Colour Palette</h2>
            <div className="flex gap-2 flex-wrap">
              {asset.colors.map(hex => (
                <span key={hex} className="flex flex-col items-center gap-1.5">
                  <span className="w-9 h-9 rounded-full border border-border-strong" style={{ backgroundColor: hex }} title={hex} aria-label={`Colour ${hex}`} role="img" />
                  <span className="font-body text-[10px] text-text-tertiary uppercase">{hex}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h2 className="font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {asset.tags.map(tag => (
                <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 rounded-full bg-bg-glass border border-border text-text-secondary hover:text-text hover:border-border-strong font-body text-label-sm transition-colors duration-150">
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Technical details */}
          <div className="rounded-md border border-border bg-bg-elevated p-5">
            <h2 className="font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-4">Technical Details</h2>
            <dl className="grid grid-cols-2 gap-y-3 gap-x-4">
              {[
                ['Resolution',  asset.resolution],
                ['Format',      asset.format],
                ['Orientation', displayCase(asset.orientation)],
                ['License',     displayCase(asset.license)],
              ].map(([label, value]) => (
                <div key={label} className="contents">
                  <dt className="font-body text-caption text-text-tertiary">{label}</dt>
                  <dd className="font-body text-body-sm text-text text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

        </div>
      </div>

      {/* ── Continue Exploring ──────────────────────────────────────────
          Conversion architecture: after the download section, guide the
          visitor toward the next meaningful action — the collection this
          piece belongs to, the research behind it, similar artwork,
          commercial licensing, home decor, and custom licensing. */}
      <section className="mt-20 pt-12 border-t border-border" aria-labelledby="continue-exploring-heading">
        <h2 id="continue-exploring-heading" className="font-heading text-heading-xl text-text mb-10">
          Continue Exploring
        </h2>

        <div className="flex flex-col gap-12">

          {/* Explore Collection */}
          {collection && (
            <div>
              <h3 className="font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-4">
                Explore the Collection
              </h3>
              <Link
                href={`/collections/${collection.slug}`}
                className="flex items-center justify-between p-5 rounded-lg border border-border hover:border-border-strong bg-bg-elevated transition-colors duration-150 group"
              >
                <div>
                  <p className="font-body text-caption text-text-tertiary">Part of collection</p>
                  <p className="font-body text-body-md font-medium text-text mt-0.5">{collection.title}</p>
                </div>
                <ChevronRight size={16} className="text-text-tertiary group-hover:text-text group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
              </Link>
            </div>
          )}

          {/* Read the Story Behind this Artwork — hides gracefully when none exist */}
          {relatedStories.length > 0 && (
            <div>
              <h3 className="font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-4">
                Read the Story Behind this Artwork
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedStories.map(story => (
                  <Link key={story.id} href={`/journal/${story.slug}`}
                    className="group flex gap-4 p-4 rounded-lg border border-border hover:border-border-strong bg-bg-elevated transition-colors duration-200">
                    <span className="w-10 h-10 rounded-md bg-accent-subtle flex items-center justify-center text-accent shrink-0">
                      <BookOpen size={18} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-body text-caption text-text-tertiary mb-1">{story.category} · {story.readingTime} min</p>
                      <p className="font-body text-body-sm font-medium text-text leading-snug line-clamp-2">{story.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Similar Artwork — 3 to 6 related pieces */}
          {related.length > 0 && (
            <div>
              <h3 className="font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-4">
                Similar Artwork
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {related.map(a => <AssetCard key={a.id} asset={a} context="grid4" />)}
              </div>
            </div>
          )}

          {/* Looking for Commercial Use? */}
          <div className="rounded-lg border border-border bg-bg-elevated p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-md bg-accent-subtle flex items-center justify-center text-accent shrink-0">
                <Sparkles size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-heading text-heading-sm text-text">Looking for Commercial Use?</h3>
                <p className="font-body text-body-sm text-text-secondary mt-1.5 max-w-[420px]">
                  Need higher-resolution artwork or commercial licensing?
                </p>
                {!commercialAvailable && (
                  <p className="font-body text-caption text-text-tertiary mt-1.5">
                    Commercial Collection — Coming Soon
                  </p>
                )}
              </div>
            </div>
            {commercialAvailable ? (
              <Button
                variant="secondary" size="md" href="/pricing#commercial"
                onClick={() => trackLicenseClick('commercial', 'asset_detail_commercial_cta')}
                className="shrink-0"
              >
                Explore Commercial Collection
              </Button>
            ) : (
              <Button
                variant="secondary" size="md" href="/contact"
                onClick={() => trackLicenseClick('commercial', 'asset_detail_commercial_cta')}
                className="shrink-0"
              >
                Contact Us
              </Button>
            )}
          </div>

          {/* Home Decor */}
          <div className="rounded-lg border border-border bg-bg-elevated p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-md bg-accent-subtle flex items-center justify-center text-accent shrink-0">
                <Palette size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-heading text-heading-sm text-text">Looking for artwork for your home?</h3>
                <p className="font-body text-body-sm text-text-secondary mt-1.5 max-w-[420px]">
                  Explore our Home &amp; Decor inspiration.
                </p>
              </div>
            </div>
            <a
              href={SOCIAL.pinterestDeco.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL.pinterestDeco.ariaLabel}
              className="shrink-0 inline-flex items-center justify-center h-11 px-5 rounded-full bg-bg-glass border border-border-strong font-body text-label-md text-text hover:bg-white/10 transition-colors duration-200"
            >
              WildPixel Deco
            </a>
          </div>

          {/* Custom Licensing */}
          <div className="rounded-lg border border-border bg-bg-elevated p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:justify-between">
            <div>
              <h3 className="font-heading text-heading-sm text-text">Need something exclusive?</h3>
              <p className="font-body text-body-sm text-text-secondary mt-1.5 max-w-[420px]">
                Let&rsquo;s discuss licensing or collaborations.
              </p>
            </div>
            <Button
              variant="primary" size="md" href="/contact"
              onClick={() => trackLicenseClick('custom', 'asset_detail_custom_licensing')}
              className="shrink-0"
            >
              Contact the Creator
            </Button>
          </div>

        </div>
      </section>
    </div>
  )
}
