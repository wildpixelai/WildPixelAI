'use client'
import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search as SearchIcon, Clock, TrendingUp, BookOpen, FolderOpen } from 'lucide-react'
import { AssetGrid }  from '@/components/marketplace/AssetGrid/AssetGrid'
import { searchAssets, searchJournal, searchCollections } from '@/lib/search'
import { trackSearch } from '@/lib/analytics'
import type { Asset, JournalPost, Collection } from '@/types/marketplace'

function SearchInner({
  assets, journalPosts, collections, trending, popular,
}: { assets: Asset[]; journalPosts: JournalPost[]; collections: Collection[]; trending: string[]; popular: string[] }) {
  const params  = useSearchParams()
  const [query,  setQuery]  = useState(params.get('q') ?? '')
  const [recent, setRecent] = useState<string[]>([])

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? sessionStorage.getItem('recentSearches') : null
    if (stored) setRecent(JSON.parse(stored))
  }, [])

  const results = useMemo(() => {
    if (!query.trim()) return []
    return searchAssets(assets, query).map(r => r.asset)
  }, [assets, query])

  const journalResults = useMemo(() => {
    if (!query.trim()) return []
    return searchJournal(journalPosts, query).map(r => r.post)
  }, [journalPosts, query])

  const collectionResults = useMemo(() => {
    if (!query.trim()) return []
    return searchCollections(collections, query).map(r => r.collection)
  }, [collections, query])

  const totalResults = results.length + journalResults.length + collectionResults.length

  useEffect(() => {
    if (query.trim()) trackSearch(query, totalResults)
  }, [query, totalResults])

  const submitSearch = (term: string) => {
    setQuery(term)
    if (typeof window !== 'undefined' && term.trim()) {
      const updated = [term, ...recent.filter(r => r !== term)].slice(0, 5)
      setRecent(updated)
      sessionStorage.setItem('recentSearches', JSON.stringify(updated))
    }
  }

  const pillClass = "px-3.5 py-2 rounded-full bg-bg-glass border border-border text-text-secondary hover:text-text hover:border-border-strong font-body text-label-md transition-colors duration-150"

  return (
    <>
      <form
        role="search"
        onSubmit={e => { e.preventDefault(); submitSearch(query) }}
        className="relative max-w-[640px] mx-auto mb-12"
      >
        <SearchIcon size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none" aria-hidden="true" />
        <label htmlFor="site-search" className="sr-only">Search by subject, collection, colour, style, or theme</label>
        <input
          id="site-search"
          type="search"
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by subject, collection, colour, style, or theme…"
          className="w-full h-14 pl-14 pr-5 rounded-full bg-bg-glass border border-border-strong
            font-body text-body-lg text-text placeholder:text-text-tertiary
            focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-border-focus/20
            transition-colors duration-150"
        />
      </form>

      {!query.trim() ? (
        <div className="max-w-[640px] mx-auto flex flex-col gap-8">
          {recent.length > 0 && (
            <div>
              <h2 className="flex items-center gap-2 font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-3">
                <Clock size={14} aria-hidden="true" /> Recent searches
              </h2>
              <div className="flex flex-wrap gap-2">
                {recent.map(term => (
                  <button key={term} type="button" onClick={() => submitSearch(term)} className={pillClass}>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div>
            <h2 className="flex items-center gap-2 font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-3">
              <TrendingUp size={14} aria-hidden="true" /> Trending searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {trending.map(term => (
                <button key={term} type="button" onClick={() => submitSearch(term)} className={pillClass}>{term}</button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-3">Popular searches</h2>
            <div className="flex flex-wrap gap-2">
              {popular.map(term => (
                <button key={term} type="button" onClick={() => submitSearch(term)} className={pillClass}>{term}</button>
              ))}
            </div>
          </div>
        </div>
      ) : totalResults === 0 ? (
        /* Empty state — spec copy */
        <div className="text-center py-20" role="status" aria-live="polite">
          <h2 className="font-heading text-heading-xl text-text mb-3">Nothing Found Yet</h2>
          <p className="font-body text-body-lg text-text-secondary max-w-[400px] mx-auto">
            Try searching by subject, collection, colour, style, or theme.
          </p>
        </div>
      ) : (
        <>
          <p className="font-body text-body-sm text-text-tertiary mb-6" role="status" aria-live="polite" aria-atomic="true">
            {totalResults} result{totalResults !== 1 ? 's' : ''} for &ldquo;{query}&rdquo; — ranked by relevance
          </p>

          {collectionResults.length > 0 && (
            <section className="mb-10" aria-labelledby="search-collections-heading">
              <h2 id="search-collections-heading" className="flex items-center gap-2 font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-4">
                <FolderOpen size={14} aria-hidden="true" /> Collections
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {collectionResults.map(c => (
                  <Link key={c.id} href={`/collections/${c.slug}`}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-border-strong bg-bg-elevated transition-colors duration-150 group">
                    <div>
                      <p className="font-body text-body-md font-medium text-text">{c.title}</p>
                      <p className="font-body text-caption text-text-tertiary mt-0.5">{c.assetCount} pieces</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {journalResults.length > 0 && (
            <section className="mb-10" aria-labelledby="search-journal-heading">
              <h2 id="search-journal-heading" className="flex items-center gap-2 font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-4">
                <BookOpen size={14} aria-hidden="true" /> Journal
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {journalResults.map(post => (
                  <Link key={post.id} href={`/journal/${post.slug}`}
                    className="flex flex-col p-4 rounded-lg border border-border hover:border-border-strong bg-bg-elevated transition-colors duration-150">
                    <p className="font-body text-caption text-text-tertiary mb-1">{post.category} · {post.readingTime} min</p>
                    <p className="font-body text-body-sm font-medium text-text leading-snug line-clamp-2">{post.title}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.length > 0 && (
            <section aria-labelledby="search-assets-heading">
              {(collectionResults.length > 0 || journalResults.length > 0) && (
                <h2 id="search-assets-heading" className="font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-4">
                  Assets
                </h2>
              )}
              <AssetGrid assets={results} initialCount={18} columns={5} />
            </section>
          )}
        </>
      )}
    </>
  )
}

export function SearchClient(props: { assets: Asset[]; journalPosts: JournalPost[]; collections: Collection[]; trending: string[]; popular: string[] }) {
  return (
    <Suspense fallback={<div className="h-20" aria-label="Loading search" />}>
      <SearchInner {...props} />
    </Suspense>
  )
}
