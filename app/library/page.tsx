import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { webPageSchema, breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { LibraryClient } from './LibraryClient'
import { assets } from '@/data/assets'
import { categories } from '@/data/categories'
import { OG_IMAGES, SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = generatePageMetadata({
  title:       'Creative Library — Browse Original Illustrations',
  description: 'Browse artwork by category, collection, colour, style, orientation, and theme. Original illustrations, botanical studies, editorial portraits, and visual art.',
  path:        '/library',
  ogImage:     OG_IMAGES.library,
})

export default function LibraryPage() {
  const breadcrumbs = [
    { label: 'Home',            href: '/' },
    { label: 'Creative Library', href: '/library' },
  ]

  return (
    <>
      <JsonLd schema={[
        webPageSchema({ title: `Creative Library — ${SITE_NAME}`, path: '/library', description: 'Browse artwork by category, collection, colour, style, orientation, and theme.' }),
        breadcrumbSchema(breadcrumbs),
      ]} />

      <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12 py-12 lg:py-16">
        <header className="mb-10 max-w-[640px]">
          <span className="font-body text-eyebrow font-medium text-accent">Creative Library</span>
          <h1 className="font-heading font-semibold text-display-lg text-text mt-3">
            Creative Library
          </h1>
          <p className="font-body text-body-lg text-text-secondary mt-3">
            Browse artwork by category, collection, colour, style, orientation, and theme.
          </p>
        </header>
        <LibraryClient assets={assets} categories={categories} />
      </div>
    </>
  )
}
