/**
 * lib/schema.ts
 * Wildpixel.ai — JSON-LD Schema Builders
 *
 * Every schema builder derives from existing data types.
 * Nothing is hardcoded in page components.
 * Add new builders here; import in page server components.
 */
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from './constants'
import type { Asset, Collection, JournalPost } from '@/types/marketplace'
import type { FAQItem } from '@/data/faq/general'

// ── Reusable sub-objects ──────────────────────────────────────────────────────

export const publisherObject = () => ({
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/favicon.svg`,
  },
})

// ── Site-level schemas (homepage) ─────────────────────────────────────────────

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    email: 'wildpixel26@gmail.com',
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.svg`,
      width: 32,
      height: 32,
    },
    description:
      'An independent creative studio producing original illustrations, botanical studies, editorial portraits, and visual stories. Visual Research & Surface Pattern Studio based in Delhi, India.',
    foundingLocation: {
      '@type': 'Place',
      addressLocality: 'Delhi',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://in.pinterest.com/wildpixelartai/',
      'https://in.pinterest.com/wildpixelartaideco/',
      'https://www.instagram.com/wildpixelart.ai/',
      'https://www.facebook.com/wildpixelartai',
    ],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: SITE_TAGLINE,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ── Breadcrumb (reusable) ──────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string
  href: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  }
}

// ── Asset schemas ──────────────────────────────────────────────────────────────

export function assetCreativeWorkSchema(asset: Asset) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: asset.title,
    description: asset.description,
    url: `${SITE_URL}/asset/${asset.id}`,
    keywords: asset.tags.join(', '),
    genre: asset.category,
    creator: publisherObject(),
    datePublished: asset.publishedAt,
    license: asset.license === 'free'
      ? 'https://creativecommons.org/licenses/by/4.0/'
      : `${SITE_URL}/pricing`,
  }
}

export function assetImageObjectSchema(asset: Asset) {
  const [w, h] = asset.resolution.split('x').map(Number)
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: asset.title,
    description: asset.description,
    contentUrl: `${SITE_URL}${asset.image}`,
    url: `${SITE_URL}/asset/${asset.id}`,
    width: w ?? null,
    height: h ?? null,
    encodingFormat: `image/${asset.format.toLowerCase()}`,
    keywords: asset.tags.join(', '),
    creator: publisherObject(),
  }
}

// ── Collection schema ──────────────────────────────────────────────────────────

export function collectionPageSchema(collection: Collection) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.title,
    description: collection.description,
    url: `${SITE_URL}/collections/${collection.slug}`,
    numberOfItems: collection.assetCount,
    provider: publisherObject(),
  }
}

export function collectionItemListSchema(collection: Collection) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${collection.title} — Creative Asset Collection`,
    description: collection.description,
    url: `${SITE_URL}/collections/${collection.slug}`,
    numberOfItems: collection.assetCount,
    itemListElement: collection.assetIds.map((id, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/asset/${id}`,
    })),
  }
}

// ── Journal article schema ────────────────────────────────────────────────────

export function articleSchema(post: JournalPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: publisherObject(),
    publisher: publisherObject(),
    url: `${SITE_URL}/journal/${post.slug}`,
    keywords: post.tags.join(', '),
    articleSection: post.category,
  }
}

// ── FAQ schema ────────────────────────────────────────────────────────────────

export function faqSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

// ── Page-specific schemas ──────────────────────────────────────────────────────

export function aboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'A visual research and surface pattern studio based in Delhi, India, producing original surface patterns, illustrations, and digital art assets for commercial licensing.',
    foundingLocation: {
      '@type': 'Place',
      addressLocality: 'Delhi',
      addressCountry: 'IN',
    },
    knowsAbout: [
      'Surface Pattern Design',
      'Commercial Art Licensing',
      'Botanical Illustration',
      'Indian Art History',
      'Digital Art',
    ],
  }
}

export function contactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact — ${SITE_NAME}`,
    url: `${SITE_URL}/contact`,
    description: 'Business and commercial licensing enquiries for Wildpixelart.ai.',
    provider: publisherObject(),
  }
}

export function searchResultsPageSchema(query?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: query ? `Search results for "${query}" — ${SITE_NAME}` : `Search — ${SITE_NAME}`,
    url: query ? `${SITE_URL}/search?q=${encodeURIComponent(query)}` : `${SITE_URL}/search`,
  }
}

export function webPageSchema(opts: { title: string; path: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.title,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    provider: publisherObject(),
  }
}
