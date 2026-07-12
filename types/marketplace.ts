// types/marketplace.ts
// Core data models for the Wildpixel creative asset marketplace.
// Every page and component consumes these types. No UI hardcodes content.

// NOTE: LicenseType and Orientation are stored/compared in lowercase ("free", "portrait", etc).
// UI-facing labels (dropdown text, badges) are mapped from these values at render time and are
// unaffected by this — see components/marketplace/AssetCard, AssetDetailClient, data/filters.ts.
// "premium" exists for architectural readiness (badge, filter, and licence-plan support) even
// though no premium assets or pricing exist yet — see data/licenses.ts and data/assets/premium.ts.
export type LicenseType = "free" | "personal" | "commercial" | "premium"
export type Orientation = "portrait" | "landscape" | "square"
export type ImageFormat = "JPEG" | "PNG" | "WEBP"

export interface Asset {
  // Identity
  id: string
  slug: string
  filename: string
  image: string // e.g. "/assets/free/modern-kimono-editorial-portrait.jpeg"

  // Display content
  title: string
  subtitle: string
  description: string
  alt: string          // meaningful image alt text (accessibility)
  caption?: string     // display caption below image on detail page

  // SEO
  seoTitle: string
  metaDescription: string
  keywords: string[]

  // Taxonomy
  category: string
  collection: string
  theme: string        // thematic cluster e.g. "Botanical", "Mythology"
  styles: string[]
  colors: string[]
  tags: string[]
  orientation: Orientation
  format: ImageFormat
  resolution: string

  // Focal point for responsive cropping
  focusX?: number      // 0–1, left to right
  focusY?: number      // 0–1, top to bottom

  // Commerce & publish
  featured: boolean
  hero: boolean        // eligible for hero carousel
  license: LicenseType // behaviour (download vs. license CTA) is inferred from this — no separate boolean
  downloads?: number
  publishedAt: string

  // Relationships
  relatedAssets: string[]   // Asset.id[]  (formerly `related`)
  relatedJournal: string[]  // JournalPost.slug[]  (formerly `relatedStories`)
}

export interface Collection {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  bannerImage: string
  assetIds: string[]
  assetCount: number
  tags: string[]
  featured: boolean
  publishedAt: string

  // Optional — not yet populated for existing collections (see migration summary).
  // Falls back to title/subtitle/description/bannerImage-derived values where unset.
  heroImage?: string
  seoTitle?: string
  metaDescription?: string
  theme?: string
}

export interface Category {
  id: string
  slug: string
  label: string
  description: string
  icon?: string
  order: number
}

export type JournalCategory =
  | "Illustration"
  | "Botanical"
  | "Nature"
  | "History"
  | "Culture"
  | "Mythology"
  | "Mathematics"
  | "Science"
  | "Photography"
  | "Visual Storytelling"

export interface JournalPost {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  coverImage: string
  heroCaption?: string
  category: JournalCategory
  tags: string[]
  author: string
  publishedAt: string
  readingTime: number
  featured: boolean
  seoTitle: string
  metaDescription: string
  relatedAssets: string[]    // Asset.id[]
  previousStory?: string     // JournalPost.slug
  nextStory?: string         // JournalPost.slug
}

export interface LicensePlan {
  id: string
  slug: string
  name: "Personal License" | "Commercial License" | "Premium License"
  tagline: string
  description: string
  features: string[]
  status: "coming-soon" | "available"
  cta: { label: string; href: string }
}

export interface FilterState {
  category?: string
  license?: LicenseType | "All"
  style?: string
  color?: string
  theme?: string
  collection?: string
  sort?: "Latest" | "Popular" | "Trending"
  query?: string
}
