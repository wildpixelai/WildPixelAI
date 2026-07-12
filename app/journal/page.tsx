import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { generatePageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { journalPosts } from '@/data/journal'
import { JOURNAL_FAQ } from '@/data/faq/journal'
import { FAQSection } from '@/components/seo/FAQSection'
import { OG_IMAGES, SITE_NAME } from '@/lib/constants'
import { imageSizes } from '@/lib/image-utils'

export const metadata: Metadata = generatePageMetadata({
  title:       'Journal — Research, Observations & Visual Essays',
  description: 'Research, observations, and visual essays that inspired every collection and illustration. History, science, culture, mathematics, and nature through a creative lens.',
  path:        '/journal',
  ogImage:     OG_IMAGES.journal,
})

export default function JournalIndexPage() {
  const sorted = [...journalPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  const featured = sorted.filter(p => p.featured)
  const rest     = sorted.filter(p => !p.featured)

  const breadcrumbs = [
    { label: 'Home',    href: '/' },
    { label: 'Journal', href: '/journal' },
  ]

  return (
    <>
      <JsonLd schema={[
        webPageSchema({ title: `Journal — ${SITE_NAME}`, path: '/journal', description: 'Research, observations, and visual essays that inspired every collection and illustration.' }),
        breadcrumbSchema(breadcrumbs),
      ]} />

      <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12 py-12 lg:py-16">
        <header className="mb-12 max-w-[640px]">
          <span className="font-body text-eyebrow font-medium text-accent">Journal</span>
          <h1 className="font-heading font-semibold text-display-lg text-text mt-3">Journal</h1>
          <p className="font-body text-body-lg text-text-secondary mt-3">
            Research, observations, and visual essays that inspired every collection and illustration.
          </p>
        </header>

        {/* Featured stories */}
        {featured.length > 0 && (
          <section className="mb-16" aria-labelledby="featured-stories-heading">
            <h2 id="featured-stories-heading" className="font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-6">
              Featured Stories
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {featured.slice(0, 2).map(post => (
                <JournalCard key={post.id} post={post} featured />
              ))}
            </div>
            {featured.length > 2 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
                {featured.slice(2).map(post => (
                  <JournalCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* All stories */}
        {rest.length > 0 && (
          <section aria-labelledby="all-stories-heading">
            <h2 id="all-stories-heading" className="font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-6">
              Technique & Practice
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map(post => (
                <JournalCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-20 pt-12 border-t border-border max-w-[760px]">
          <FAQSection id="journal-faq" heading="Frequently asked questions" items={JOURNAL_FAQ} />
        </div>
      </div>
    </>
  )
}

function JournalCard({ post, featured = false }: { post: (typeof journalPosts)[0]; featured?: boolean }) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="group flex flex-col rounded-lg overflow-hidden border border-border hover:border-border-strong bg-bg-elevated transition-colors duration-200"
    >
      <div className={`relative overflow-hidden bg-bg ${featured ? 'aspect-[16/9]' : 'aspect-[16/9]'}`}>
        <Image
          src={post.coverImage}
          alt={post.heroCaption ?? post.title}
          fill
          sizes={imageSizes.gridCard3}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <span className="font-body text-label-sm text-accent uppercase tracking-wider mb-2">
          {post.category}
        </span>
        <h2 className="font-heading text-heading-sm text-text leading-snug flex-1">
          {post.title}
        </h2>
        <p className="font-body text-body-sm text-text-secondary mt-2.5 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
          <time dateTime={post.publishedAt} className="font-body text-caption text-text-tertiary">
            {date}
          </time>
          <span aria-hidden="true">·</span>
          <span className="font-body text-caption text-text-tertiary">
            {post.readingTime} min read
          </span>
        </div>
      </div>
    </Link>
  )
}
