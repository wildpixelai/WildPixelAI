import type { MetadataRoute } from 'next'
import { SITE_URL }    from '@/lib/constants'
import { assets }      from '@/data/assets'
import { collections } from '@/data/collections'
import { journalPosts } from '@/data/journal'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,            lastModified: now, priority: 1.0, changeFrequency: 'weekly'  },
    { url: `${SITE_URL}/library`,     lastModified: now, priority: 0.9, changeFrequency: 'daily'   },
    { url: `${SITE_URL}/collections`, lastModified: now, priority: 0.8, changeFrequency: 'weekly'  },
    { url: `${SITE_URL}/journal`,     lastModified: now, priority: 0.8, changeFrequency: 'weekly'  },
    { url: `${SITE_URL}/pricing`,     lastModified: now, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/resources`,   lastModified: now, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/about`,       lastModified: now, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/about/philosophy`, lastModified: now, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/contact`,     lastModified: now, priority: 0.6, changeFrequency: 'monthly' },
    // /search is noindex — excluded intentionally
  ]

  const assetPages: MetadataRoute.Sitemap = assets.map(a => ({
    url:             `${SITE_URL}/asset/${a.id}`,
    lastModified:    new Date(a.publishedAt),
    priority:        a.featured ? 0.8 : 0.6,
    changeFrequency: 'monthly' as const,
  }))

  const collectionPages: MetadataRoute.Sitemap = collections.map(c => ({
    url:             `${SITE_URL}/collections/${c.slug}`,
    lastModified:    new Date(c.publishedAt),
    priority:        c.featured ? 0.8 : 0.7,
    changeFrequency: 'weekly' as const,
  }))

  const journalPages: MetadataRoute.Sitemap = journalPosts.map(p => ({
    url:             `${SITE_URL}/journal/${p.slug}`,
    lastModified:    new Date(p.publishedAt),
    priority:        p.featured ? 0.8 : 0.5,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPages, ...assetPages, ...collectionPages, ...journalPages]
}
