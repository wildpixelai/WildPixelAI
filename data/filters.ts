// data/filters.ts
// Filter option sets derived from asset metadata — never hardcoded per-component.
import { assets } from "./assets"

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean))).sort()
}

export const filterOptions = {
  licenses:    ["All", "Free", "Personal", "Commercial", "Premium"] as const,
  styles:      uniqueSorted(assets.flatMap(a => a.styles)),
  colors:      uniqueSorted(assets.flatMap(a => a.colors)),
  themes:      uniqueSorted(assets.map(a => a.theme).filter(Boolean)),  // uses new theme field
  tags:        uniqueSorted(assets.flatMap(a => a.tags)),
  collections: uniqueSorted(assets.map(a => a.collection)),
  keywords:    uniqueSorted(assets.flatMap(a => a.keywords ?? [])),
  sort:        ["Latest", "Popular", "Trending"] as const,
}
