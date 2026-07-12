import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { generatePageMetadata }     from '@/lib/metadata'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { journalPosts, journalPostBySlug, getAdjacentPosts } from '@/data/journal'
import { assetById } from '@/data/assets'
import { AssetCard } from '@/components/marketplace/AssetCard/AssetCard'
import { imageSizes } from '@/lib/image-utils'

export function generateStaticParams() {
  return journalPosts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const post = journalPostBySlug(slug)
  if (!post) return generatePageMetadata({ title: 'Story not found', description: '', noindex: true })
  return generatePageMetadata({
    title:       post.seoTitle,
    description: post.metaDescription,
    path:        `/journal/${post.slug}`,
    ogImage:     post.coverImage,
    ogImageAlt:  post.heroCaption ?? post.title,
    type:        'article',
    publishedAt: post.publishedAt,
  })
}

export default async function JournalPostPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const post = journalPostBySlug(slug)
  if (!post) notFound()

  const { previous, next } = getAdjacentPosts(post.slug)
  const relatedAssetItems = (post.relatedAssets ?? [])
    .map(id => assetById(id))
    .filter((a): a is NonNullable<ReturnType<typeof assetById>> => Boolean(a))

  const date = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const breadcrumbs = [
    { label: 'Home',    href: '/' },
    { label: 'Journal', href: '/journal' },
    { label: post.title, href: `/journal/${post.slug}` },
  ]

  return (
    <>
      <JsonLd schema={[articleSchema(post), breadcrumbSchema(breadcrumbs)]} />

      <article>
        {/* Hero image */}
        <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-bg-elevated">
          <Image
            src={post.coverImage}
            alt={post.heroCaption ?? post.title}
            fill
            priority
            sizes={imageSizes.banner}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" aria-hidden="true" />
          {post.heroCaption && (
            <p className="absolute bottom-4 left-6 md:left-8 lg:left-12 font-body text-caption text-white/60 max-w-[500px]">
              {post.heroCaption}
            </p>
          )}
        </div>

        <div className="mx-auto max-w-[760px] px-6 md:px-8 py-12 lg:py-16">

          {/* Back link */}
          <Link
            href="/journal"
            className="inline-flex items-center gap-1.5 font-body text-label-md text-text-tertiary hover:text-text transition-colors mb-8"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Journal
          </Link>

          {/* Header */}
          <header className="mb-10">
            <span className="font-body text-label-sm text-accent uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="font-heading font-semibold text-display-lg text-text mt-3 leading-[1.08]">
              {post.title}
            </h1>
            <p className="font-body text-body-xl text-text-secondary mt-4 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 mt-6 font-body text-caption text-text-tertiary">
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>{date}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
            </div>
          </header>

          {/* Body — render paragraphs from body text */}
          <div className="prose-wildpixel space-y-6 mb-16">
            {post.body.split('\n\n').map((block, i) => {
              const trimmed = block.trim()
              if (!trimmed) return null

              // Heading: lines starting with **text**
              if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.slice(2).includes('**')) {
                return (
                  <h2 key={i} className="font-heading text-heading-md text-text mt-10 mb-2">
                    {trimmed.slice(2, -2)}
                  </h2>
                )
              }

              // Bold inline — render paragraphs with **bold** inline
              const parts = trimmed.split(/(\*\*[^*]+\*\*)/)
              return (
                <p key={i} className="font-body text-body-lg text-text-secondary leading-relaxed">
                  {parts.map((part, j) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={j} className="font-semibold text-text">{part.slice(2, -2)}</strong>
                    }
                    return part
                  })}
                </p>
              )
            })}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-16 pt-8 border-t border-border">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 rounded-full bg-bg-glass border border-border text-text-secondary hover:text-text hover:border-border-strong font-body text-label-sm transition-colors duration-150"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Related assets */}
          {relatedAssetItems.length > 0 && (
            <section className="mb-16" aria-labelledby="related-assets-heading">
              <h2 id="related-assets-heading" className="font-heading text-heading-md text-text mb-6">
                You may also like
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {relatedAssetItems.map(a => (
                  <AssetCard key={a.id} asset={a} context="grid3" />
                ))}
              </div>
            </section>
          )}

          {/* Previous / Next navigation */}
          {(previous || next) && (
            <nav
              aria-label="Story navigation"
              className="flex flex-col sm:flex-row gap-4 pt-10 border-t border-border"
            >
              {previous && (
                <Link
                  href={`/journal/${previous.slug}`}
                  className="flex-1 flex items-start gap-3 p-4 rounded-lg border border-border hover:border-border-strong bg-bg-elevated transition-colors duration-200 group"
                >
                  <ArrowLeft size={16} className="text-text-tertiary mt-0.5 shrink-0 group-hover:text-text transition-colors" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="font-body text-caption text-text-tertiary mb-1">Previous</p>
                    <p className="font-body text-body-sm font-medium text-text line-clamp-2">{previous.title}</p>
                  </div>
                </Link>
              )}
              {next && (
                <Link
                  href={`/journal/${next.slug}`}
                  className="flex-1 flex items-start gap-3 p-4 rounded-lg border border-border hover:border-border-strong bg-bg-elevated transition-colors duration-200 group text-right sm:text-left sm:flex-row-reverse"
                >
                  <ArrowRight size={16} className="text-text-tertiary mt-0.5 shrink-0 group-hover:text-text transition-colors" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-caption text-text-tertiary mb-1">Next</p>
                    <p className="font-body text-body-sm font-medium text-text line-clamp-2">{next.title}</p>
                  </div>
                </Link>
              )}
            </nav>
          )}

        </div>
      </article>
    </>
  )
}
