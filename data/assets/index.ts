// data/assets/index.ts
// Barrel module — combines all license tiers into a single `assets` array and
// exposes the same helper API previously exported from data/assets.ts.
// Every consumer in the app imports from "@/data/assets" (no file extension),
// so this directory transparently replaces the old single file with zero
// import changes required anywhere else in the project.

import type { Asset } from "@/types/marketplace"
import { freeAssetRecords }       from "./free"
import { personalAssetRecords }   from "./personal"
import { commercialAssetRecords } from "./commercial"
import { premiumAssetRecords }    from "./premium"

export const assets: Asset[] = [
  ...freeAssetRecords,
  ...personalAssetRecords,
  ...commercialAssetRecords,
  ...premiumAssetRecords,
]

// ── Helpers ───────────────────────────────────────────────────────────────────

export const assetById        = (id: string)   => assets.find(a => a.id === id)
export const assetBySlug      = (slug: string) => assets.find(a => a.slug === slug)
export const assetsByCategory = (cat: string) =>
  cat === "all" ? assets : assets.filter(a => a.category === cat)
export const featuredAssets   = () => assets.filter(a => a.featured)
export const freeAssets       = () => assets.filter(a => a.license === "free")
export const heroAssets       = () => assets.filter(a => a.hero)
export const relatedAssets    = (asset: Asset) =>
  asset.relatedAssets.map(id => assetById(id)).filter((a): a is Asset => Boolean(a))

/**
 * Similar Artwork for the asset page "Continue Exploring" section.
 * Starts from the curated `relatedAssets` list, then backfills — same collection,
 * then same theme, then same category — until it has between 3 and 6 items
 * (or runs out of eligible assets). Used by app/asset/[id]/page.tsx only.
 */
export const similarAssets = (asset: Asset, max = 6): Asset[] => {
  const seen = new Set<string>([asset.id])
  const pool: Asset[] = []

  const addFrom = (candidates: Asset[]) => {
    for (const c of candidates) {
      if (pool.length >= max) break
      if (!seen.has(c.id)) { pool.push(c); seen.add(c.id) }
    }
  }

  addFrom(relatedAssets(asset))
  if (pool.length < 3) addFrom(assets.filter(a => a.collection === asset.collection))
  if (pool.length < 3) addFrom(assets.filter(a => a.theme === asset.theme))
  if (pool.length < 3) addFrom(assets.filter(a => a.category === asset.category))

  return pool
}
