import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { searchResultsPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { SearchClient } from './SearchClient'
import { assets } from '@/data/assets'
import { journalPosts } from '@/data/journal'
import { collections } from '@/data/collections'

export const metadata: Metadata = generatePageMetadata({
  title:   'Search — Creative Assets',
  description: 'Search the full creative library, journal, and collections by title, tag, category, style, theme, colour, or license type.',
  path:    '/search',
  noindex: true,
})

const TRENDING = ['Botanical', 'Devotional', 'Macro', 'Editorial', 'Watercolor', 'Minimal']
const POPULAR  = ['Cherry Blossom', 'Kimono', 'Lotus', 'Sunflower', 'Rose']

export default function SearchPage() {
  return (
    <>
      <JsonLd schema={searchResultsPageSchema()} />
      <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12 py-12 lg:py-16">
        <SearchClient assets={assets} journalPosts={journalPosts} collections={collections} trending={TRENDING} popular={POPULAR} />
      </div>
    </>
  )
}
