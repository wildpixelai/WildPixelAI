import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { generatePageMetadata }  from '@/lib/metadata'
import { collectionPageSchema, collectionItemListSchema, breadcrumbSchema } from '@/lib/schema'
import { collections, collectionBySlug } from '@/data/collections'
import { assetById } from '@/data/assets'
import { journalPostBySlug } from '@/data/journal'
import { faqForCollectionThemes } from '@/data/faq/collections'
import { FAQSection } from '@/components/seo/FAQSection'
import { AssetCard } from '@/components/marketplace/AssetCard/AssetCard'
import { CollectionStrip } from '@/components/marketplace/CollectionStrip/CollectionStrip'
import { JsonLd } from '@/components/seo/JsonLd'
import { imageSizes } from '@/lib/image-utils'

export function generateStaticParams() {
  return collections.map(c => ({ slug: c.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const collection = collectionBySlug(slug)
  if (!collection) return generatePageMetadata({ title: 'Collection not found', description: '', noindex: true })
  return generatePageMetadata({
    title:       `${collection.title} — ${collection.subtitle}`,
    description: collection.description.slice(0, 160),
    path:        `/collections/${collection.slug}`,
    ogImage:     collection.bannerImage,
  })
}

export default async function CollectionDetailPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const collection = collectionBySlug(slug)
  if (!collection) notFound()

  const collectionAssets = collection.assetIds
    .map(id => assetById(id))
    .filter((a): a is NonNullable<ReturnType<typeof assetById>> => Boolean(a))

  const relatedCollections = collections.filter(c => c.id !== collection.id).slice(0, 3)

  // Related Stories — deduplicated journal posts linked from any asset in this collection.
  const relatedStorySlugs = Array.from(
    new Set(collectionAssets.flatMap(a => a.relatedJournal ?? [])),
  )
  const relatedStories = relatedStorySlugs
    .map(slug => journalPostBySlug(slug))
    .filter((p): p is NonNullable<ReturnType<typeof journalPostBySlug>> => Boolean(p))

  const collectionFAQ = faqForCollectionThemes(collectionAssets.map(a => a.theme))

  const breadcrumbs = [
    { label: 'Home',        href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: collection.title, href: `/collections/${collection.slug}` },
  ]

  return (
    <>
      <JsonLd schema={[
        collectionPageSchema(collection),
        collectionItemListSchema(collection),
        breadcrumbSchema(breadcrumbs),
      ]} />

      {/* Banner */}
      <div className="relative h-[320px] lg:h-[400px] w-full overflow-hidden">
        <Image
          src={collection.bannerImage}
          alt={collection.title}
          fill
          priority
          sizes={imageSizes.banner}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/10" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-site px-6 md:px-8 lg:px-12 pb-10">
          <span className="font-body text-eyebrow font-medium text-accent">Collection</span>
          <h1 className="font-heading font-semibold text-display-lg text-text mt-3">{collection.title}</h1>
          <p className="font-body text-body-lg text-text-secondary mt-2 max-w-[560px]">{collection.subtitle}</p>
        </div>
      </div>

      <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-12">
          <p className="font-body text-body-md text-text-secondary max-w-[640px] flex-1">
            {collection.description}
          </p>
          <dl className="flex gap-8 shrink-0">
            <div>
              <dt className="font-body text-caption text-text-tertiary">Designs</dt>
              <dd className="font-heading text-heading-md text-text">{collection.assetCount}</dd>
            </div>
            <div>
              <dt className="font-body text-caption text-text-tertiary">Tags</dt>
              <dd className="font-body text-body-sm text-text mt-1">{collection.tags.join(', ')}</dd>
            </div>
          </dl>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {collectionAssets.map((asset, i) => (
            <AssetCard key={asset.id} asset={asset} priority={i < 4} />
          ))}
        </div>

        {relatedStories.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border">
            <h2 className="font-heading text-heading-lg text-text mb-8">Related Stories</h2>
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

        {relatedCollections.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border">
            <h2 className="font-heading text-heading-lg text-text mb-8">Related collections</h2>
            <CollectionStrip collections={relatedCollections} />
          </div>
        )}

        <div className="mt-20 pt-12 border-t border-border max-w-[760px]">
          <FAQSection id="collection-faq" heading="Frequently asked questions" items={collectionFAQ} />
        </div>
      </div>
    </>
  )
}
