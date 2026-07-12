/**
 * lib/search.ts
 * WildPixel — Weighted Full-Text Search Engine
 *
 * Ranks assets by relevance score. Indexes all Sprint 2 + Sprint 3 metadata fields.
 * Field weights follow the specification. New fields (keywords, theme, relatedJournal,
 * alt, caption, seoTitle) are indexed without changing the scoring contract.
 *
 * searchJournal() and searchCollections() extend the same weighted approach to
 * Journal posts and Collections, so the global /search page can surface all three
 * content types from one query — additive to searchAssets, no existing behaviour changed.
 *
 * To migrate to Algolia: replace the searchAssets export with an API call
 * returning the same SearchResult[] shape — consumers require zero changes.
 */

import type { Asset, JournalPost, Collection } from "@/types/marketplace"

export interface SearchResult {
  asset:         Asset
  score:         number
  matchedFields: string[]
}

export interface JournalSearchResult {
  post:          JournalPost
  score:         number
  matchedFields: string[]
}

export interface CollectionSearchResult {
  collection:    Collection
  score:         number
  matchedFields: string[]
}

const WEIGHTS = {
  title:          100,
  tags:            60,
  collection:      40,
  subtitle:        30,
  keywords:        25,   // new: explicit keyword array
  seoTitle:        20,
  description:     20,
  theme:           15,   // new: thematic cluster
  styles:          15,
  category:        25,
  alt:             12,   // new: image alt text is descriptive
  colors:          10,
  orientation:      5,
  license:          5,
  caption:          8,   // new: caption text
  relatedJournal:   5,   // new: slug terms are searchable
} as const

function normalise(s: string): string {
  return s.toLowerCase().trim()
}

function scoreField(
  fieldValue: string | string[],
  tokens:     string[],
  weight:     number,
): { score: number; matched: boolean } {
  const haystack = Array.isArray(fieldValue)
    ? fieldValue.map(normalise).join(" ")
    : normalise(String(fieldValue ?? ""))

  let score   = 0
  let matched = false

  for (const token of tokens) {
    if (!token) continue
    if (haystack === token) {
      score += weight * 1.5
      matched = true
    } else if (haystack.startsWith(token)) {
      score += weight * 1.2
      matched = true
    } else if (haystack.includes(token)) {
      score += weight
      matched = true
    }
  }
  return { score, matched }
}

export function searchAssets(assets: Asset[], rawQuery: string): SearchResult[] {
  if (!rawQuery.trim()) return []

  const tokens = rawQuery
    .toLowerCase()
    .split(/\s+/)
    .filter(t => t.length > 1)

  const results: SearchResult[] = []

  for (const asset of assets) {
    let   totalScore    = 0
    const matchedFields: string[] = []

    const fields: Array<{ key: string; value: string | string[]; weight: number }> = [
      { key: "title",          value: asset.title,                              weight: WEIGHTS.title },
      { key: "tags",           value: asset.tags,                               weight: WEIGHTS.tags },
      { key: "collection",     value: asset.collection,                         weight: WEIGHTS.collection },
      { key: "subtitle",       value: asset.subtitle,                           weight: WEIGHTS.subtitle },
      { key: "keywords",       value: asset.keywords ?? [],                     weight: WEIGHTS.keywords },
      { key: "seoTitle",       value: asset.seoTitle ?? "",                     weight: WEIGHTS.seoTitle },
      { key: "description",    value: asset.description,                        weight: WEIGHTS.description },
      { key: "theme",          value: asset.theme ?? "",                        weight: WEIGHTS.theme },
      { key: "styles",         value: asset.styles,                             weight: WEIGHTS.styles },
      { key: "category",       value: asset.category,                           weight: WEIGHTS.category },
      { key: "alt",            value: asset.alt ?? "",                          weight: WEIGHTS.alt },
      { key: "colors",         value: asset.colors,                             weight: WEIGHTS.colors },
      { key: "orientation",    value: asset.orientation,                        weight: WEIGHTS.orientation },
      { key: "license",        value: asset.license,                            weight: WEIGHTS.license },
      { key: "caption",        value: asset.caption ?? "",                      weight: WEIGHTS.caption },
      { key: "relatedJournal", value: asset.relatedJournal ?? [],               weight: WEIGHTS.relatedJournal },
    ]

    for (const field of fields) {
      const { score, matched } = scoreField(field.value, tokens, field.weight)
      if (matched) {
        totalScore += score
        matchedFields.push(field.key)
      }
    }

    if (totalScore > 0) {
      results.push({ asset, score: totalScore, matchedFields })
    }
  }

  return results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return b.asset.publishedAt.localeCompare(a.asset.publishedAt)
  })
}

const JOURNAL_WEIGHTS = {
  title:           100,
  tags:             60,
  category:         40,
  excerpt:          30,
  keywords:            0, // JournalPost has no keywords field — reserved, unused
  metaDescription:  20,
  seoTitle:         20,
  body:             10,
} as const

export function searchJournal(posts: JournalPost[], rawQuery: string): JournalSearchResult[] {
  if (!rawQuery.trim()) return []
  const tokens = rawQuery.toLowerCase().split(/\s+/).filter(t => t.length > 1)
  const results: JournalSearchResult[] = []

  for (const post of posts) {
    let totalScore = 0
    const matchedFields: string[] = []
    const fields: Array<{ key: string; value: string | string[]; weight: number }> = [
      { key: "title",           value: post.title,                    weight: JOURNAL_WEIGHTS.title },
      { key: "tags",            value: post.tags,                     weight: JOURNAL_WEIGHTS.tags },
      { key: "category",        value: post.category,                 weight: JOURNAL_WEIGHTS.category },
      { key: "excerpt",         value: post.excerpt,                  weight: JOURNAL_WEIGHTS.excerpt },
      { key: "metaDescription", value: post.metaDescription ?? "",     weight: JOURNAL_WEIGHTS.metaDescription },
      { key: "seoTitle",        value: post.seoTitle ?? "",            weight: JOURNAL_WEIGHTS.seoTitle },
      { key: "body",            value: post.body,                     weight: JOURNAL_WEIGHTS.body },
    ]
    for (const field of fields) {
      const { score, matched } = scoreField(field.value, tokens, field.weight)
      if (matched) { totalScore += score; matchedFields.push(field.key) }
    }
    if (totalScore > 0) results.push({ post, score: totalScore, matchedFields })
  }

  return results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return b.post.publishedAt.localeCompare(a.post.publishedAt)
  })
}

const COLLECTION_WEIGHTS = {
  title:       100,
  tags:         60,
  subtitle:     30,
  description:  20,
} as const

export function searchCollections(collections: Collection[], rawQuery: string): CollectionSearchResult[] {
  if (!rawQuery.trim()) return []
  const tokens = rawQuery.toLowerCase().split(/\s+/).filter(t => t.length > 1)
  const results: CollectionSearchResult[] = []

  for (const collection of collections) {
    let totalScore = 0
    const matchedFields: string[] = []
    const fields: Array<{ key: string; value: string | string[]; weight: number }> = [
      { key: "title",       value: collection.title,       weight: COLLECTION_WEIGHTS.title },
      { key: "tags",        value: collection.tags,        weight: COLLECTION_WEIGHTS.tags },
      { key: "subtitle",    value: collection.subtitle,    weight: COLLECTION_WEIGHTS.subtitle },
      { key: "description", value: collection.description, weight: COLLECTION_WEIGHTS.description },
    ]
    for (const field of fields) {
      const { score, matched } = scoreField(field.value, tokens, field.weight)
      if (matched) { totalScore += score; matchedFields.push(field.key) }
    }
    if (totalScore > 0) results.push({ collection, score: totalScore, matchedFields })
  }

  return results.sort((a, b) => b.score - a.score)
}

export interface FilterOptions {
  category?: string
  license?:  string
  style?:    string
  color?:    string
  theme?:    string
  sort?:     string
}

export function filterAssets(assets: Asset[], opts: FilterOptions): Asset[] {
  let result = [...assets]
  if (opts.category && opts.category !== "all")
    result = result.filter(a => a.category === opts.category)
  if (opts.license && opts.license !== "All")
    result = result.filter(a => a.license.toLowerCase() === opts.license!.toLowerCase())
  if (opts.style && opts.style !== "All")
    result = result.filter(a => a.styles.includes(opts.style!))
  if (opts.color && opts.color !== "All")
    result = result.filter(a => a.colors.includes(opts.color!))
  if (opts.theme && opts.theme !== "All")
    result = result.filter(a => a.theme === opts.theme)
  if (opts.sort === "Latest")
    result.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  return result
}
