'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Search, BookOpen } from 'lucide-react'
import { HeroCarousel }    from '@/components/marketplace/HeroCarousel/HeroCarousel'
import { TrustBar }        from '@/components/marketplace/TrustBar/TrustBar'
import { CategoryTabs }    from '@/components/marketplace/CategoryTabs/CategoryTabs'
import { FilterBar }       from '@/components/marketplace/FilterBar/FilterBar'
import { AssetGrid }       from '@/components/marketplace/AssetGrid/AssetGrid'
import { CollectionStrip } from '@/components/marketplace/CollectionStrip/CollectionStrip'
import { SectionHeader }   from '@/components/ui/SectionHeader/SectionHeader'
import { filterOptions }   from '@/data/filters'
import { HOMEPAGE_FAQ }    from '@/data/faq/homepage'
import { FAQSection }      from '@/components/seo/FAQSection'
import { searchAssets, filterAssets } from '@/lib/search'
import { imageSizes } from '@/lib/image-utils'
import type { HeroConfig } from '@/lib/hero-config'
import type { Asset, Collection, Category, JournalPost } from '@/types/marketplace'

interface HomeClientProps {
  assets:              Asset[]
  featured:            Asset[]
  collections:         Collection[]
  featuredCollections: Collection[]
  categories:          Category[]
  featuredJournal:     JournalPost[]
  heroConfig:          HeroConfig
}

export function HomeClient({
  assets, featured, collections, featuredCollections, categories, featuredJournal, heroConfig,
}: HomeClientProps) {
  const [category, setCategory] = useState('all')
  const [license,  setLicense]  = useState('All')
  const [style,    setStyle]    = useState('All')
  const [color,    setColor]    = useState('All')
  const [theme,    setTheme]    = useState('All')
  const [sort,     setSort]     = useState('Latest')
  const [query,    setQuery]    = useState('')

  const filtered = useMemo(() => {
    if (query.trim()) return searchAssets(assets, query).map(r => r.asset)
    return filterAssets(assets, { category, license, style, color, theme, sort })
  }, [assets, category, license, style, color, theme, sort, query])

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-10 lg:pt-16 lg:pb-12 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="absolute top-20 -left-40 w-[400px] h-[400px] rounded-full bg-accent-2/10 blur-[100px] pointer-events-none" aria-hidden="true" />

        <div className="relative mx-auto max-w-site px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center">

            <div className="flex flex-col gap-6">
              <span className="font-body text-eyebrow font-medium text-accent">
                ORIGINAL. CURATED. TIMELESS.
              </span>

              <h1 className="font-heading font-semibold text-display-xl text-text leading-[1.05] tracking-[-0.03em]">
                Art That Invites You to{' '}
                <span className="gradient-text">Look Longer</span>
              </h1>

              <p className="font-body text-body-xl text-text-secondary max-w-[480px]">
                Discover original illustrations, botanical studies, editorial portraits, cultural
                artworks, and visual stories created through research, observation, and thoughtful
                design.
              </p>

              <form role="search" onSubmit={e => e.preventDefault()} className="relative max-w-[480px]">
                <label htmlFor="home-search" className="sr-only">
                  Search by subject, collection, colour, or style
                </label>
                <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none" aria-hidden="true" />
                <input
                  id="home-search"
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search by subject, collection, colour, style…"
                  className="w-full h-12 pl-11 pr-4 rounded-md bg-bg-glass border border-border
                    font-body text-body-md text-text placeholder:text-text-tertiary
                    focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-border-focus/20
                    transition-colors duration-150"
                />
              </form>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/library" className="inline-flex items-center gap-2 h-12 px-7 rounded-full gradient-accent text-white font-body text-label-md font-medium shadow-glow hover:brightness-110 transition-all duration-200">
                  Explore Free Library
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/journal" className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-bg-glass border border-border-strong font-body text-label-md text-text hover:bg-white/10 transition-colors duration-200">
                  Read the Journal
                </Link>
              </div>
            </div>

            <HeroCarousel config={heroConfig} />
          </div>

          <div className="mt-12 lg:mt-16">
            <TrustBar />
          </div>
        </div>
      </section>

      {/* ── Collections ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 border-t border-border" aria-labelledby="collections-heading">
        <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12">
          <SectionHeader
            id="collections-heading"
            eyebrow="Curated Collections"
            heading="Curated Collections"
            subheading="Explore artwork organised by subject, creative direction, and visual language — from botanical studies to contemporary illustration."
            cta={{ label: 'Browse all collections', href: '/collections' }}
            className="mb-10"
          />
          <CollectionStrip collections={featuredCollections} />
        </div>
      </section>

      {/* ── Journal preview ──────────────────────────────────────────── */}
      {featuredJournal.length > 0 && (
        <section className="py-16 lg:py-20 border-t border-border" aria-labelledby="journal-heading">
          <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12">
            <SectionHeader
              id="journal-heading"
              eyebrow="Stories Behind the Art"
              heading="Stories Behind the Art"
              subheading="Research, observations, and visual essays exploring history, science, culture, mathematics, and nature."
              cta={{ label: 'Read the journal', href: '/journal' }}
              className="mb-10"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJournal.map(post => (
                <Link
                  key={post.id}
                  href={`/journal/${post.slug}`}
                  className="group flex flex-col rounded-lg overflow-hidden border border-border hover:border-border-strong bg-bg-elevated transition-colors duration-200"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-bg">
                    <Image
                      src={post.coverImage}
                      alt={post.heroCaption ?? post.title}
                      fill
                      sizes={imageSizes.gridCard3}
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <span className="font-body text-label-sm text-accent uppercase tracking-wider mb-2 inline-flex items-center gap-1.5">
                      <BookOpen size={13} aria-hidden="true" />
                      {post.category}
                    </span>
                    <h3 className="font-heading text-heading-sm text-text leading-snug flex-1">
                      {post.title}
                    </h3>
                    <p className="font-body text-body-sm text-text-secondary mt-2.5 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <p className="font-body text-caption text-text-tertiary mt-4 pt-4 border-t border-border">
                      {post.readingTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Popular Downloads ────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 border-t border-border" aria-labelledby="free-heading">
        <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12">
          <SectionHeader
            id="free-heading"
            eyebrow="Free Creative Assets"
            heading="Free Creative Assets"
            subheading="Download carefully crafted illustrations and wallpapers for learning, inspiration, and personal creative projects."
            cta={{ label: 'Browse all free assets', href: '/library?license=Free' }}
            className="mb-10"
          />
          <AssetGrid assets={featured} initialCount={6} columns={6} />
        </div>
      </section>

      {/* ── Browse the full library ──────────────────────────────────── */}
      <section className="py-12 lg:py-16 border-t border-border" aria-labelledby="library-heading">
        <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12">
          <h2 id="library-heading" className="sr-only">Browse the creative library</h2>
          <div className="flex flex-col gap-4 mb-8">
            <CategoryTabs categories={categories} active={category} onChange={setCategory} />
            <FilterBar
              license={license} style={style} color={color} theme={theme} sort={sort}
              onLicenseChange={setLicense} onStyleChange={setStyle} onColorChange={setColor}
              onThemeChange={setTheme} onSortChange={setSort}
              licenseOptions={filterOptions.licenses}
              styleOptions={['All', ...filterOptions.styles]}
              colorOptions={['All', ...filterOptions.colors]}
              themeOptions={['All', ...filterOptions.themes]}
              sortOptions={filterOptions.sort}
            />
          </div>
          <AssetGrid
            assets={filtered}
            initialCount={12}
            loadMoreCount={12}
            columns={5}
            emptyMessage="Nothing found yet. Try searching by subject, collection, colour, style, or theme."
          />
        </div>
      </section>

      {/* ── About preview ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 border-t border-border" aria-labelledby="about-preview-heading">
        <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12 flex flex-col lg:flex-row gap-10 items-start lg:items-center justify-between">
          <div className="max-w-[540px]">
            <span className="font-body text-eyebrow font-medium text-accent">Meet the Creator</span>
            <h2 id="about-preview-heading" className="font-heading font-semibold text-heading-xl text-text mt-3">
              Meet the Creator
            </h2>
            <p className="font-body text-body-lg text-text-secondary mt-3">
              WildPixel is an independent creative studio where research, illustration, and
              storytelling come together.
            </p>
            <Link href="/about" className="inline-flex items-center gap-1.5 font-body text-label-md text-accent hover:text-accent-2 transition-colors mt-5 group">
              About WildPixel
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 border-t border-border" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12">
          <div className="max-w-[760px]">
            <FAQSection id="faq" heading="Frequently asked questions" items={HOMEPAGE_FAQ} />
          </div>
        </div>
      </section>

      {/* ── Final CTA — Contact ──────────────────────────────────────── */}
      <section className="py-20 lg:py-28 border-t border-border" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12 text-center">
          <span className="font-body text-eyebrow font-medium text-accent">Custom Licensing</span>
          <h2 id="cta-heading" className="font-heading font-semibold text-display-lg text-text max-w-[600px] mx-auto mt-4">
            Need something exclusive?
          </h2>
          <p className="font-body text-body-lg text-text-secondary mt-5 max-w-[440px] mx-auto">
            Let&rsquo;s discuss licensing or collaborations — Personal and Commercial collections
            are also being prepared.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-9">
            <Link href="/contact" className="inline-flex items-center gap-2 h-12 px-7 rounded-full gradient-accent text-white font-body text-label-md font-medium shadow-glow hover:brightness-110 transition-all duration-200">
              Contact the Creator
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/library" className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-bg-glass border border-border-strong font-body text-label-md text-text hover:bg-white/10 transition-colors duration-200">
              Browse Free Assets
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
