import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { webPageSchema, breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { CollectionStrip } from '@/components/marketplace/CollectionStrip/CollectionStrip'
import { collections } from '@/data/collections'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = generatePageMetadata({
  title:       'Collections — Curated Groups of Original Illustration',
  description: 'Carefully curated groups of illustrations connected through a shared visual language — from botanical studies to devotional art and editorial portraits.',
  path:        '/collections',
})

export default function CollectionsPage() {
  const breadcrumbs = [
    { label: 'Home',        href: '/' },
    { label: 'Collections', href: '/collections' },
  ]

  return (
    <>
      <JsonLd schema={[
        webPageSchema({ title: `Collections — ${SITE_NAME}`, path: '/collections', description: 'Carefully curated groups of illustrations connected through a shared visual language.' }),
        breadcrumbSchema(breadcrumbs),
      ]} />

      <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12 py-12 lg:py-16">
        <header className="mb-10 max-w-[640px]">
          <span className="font-body text-eyebrow font-medium text-accent">Collections</span>
          <h1 className="font-heading font-semibold text-display-lg text-text mt-3">
            All collections
          </h1>
          <p className="font-body text-body-lg text-text-secondary mt-3">
            Carefully curated groups of illustrations connected through a shared visual language.
          </p>
        </header>
        <CollectionStrip collections={collections} />
      </div>
    </>
  )
}
