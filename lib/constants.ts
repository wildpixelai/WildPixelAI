export const SITE_URL     = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wildpixelai-site.pages.dev"
export const SITE_NAME    = "WildPixel"
export const SITE_TAGLINE = "Visual Research & Surface Pattern Studio"

// OG image map — per CONTENT_GUIDE.md
export const OG_IMAGES = {
  default:    "/assets/free/modern-kimono-editorial-portrait.jpeg",
  homepage:   "/assets/free/modern-kimono-editorial-portrait.jpeg",
  library:    "/assets/free/cherry-blossom-watercolor-gold.jpeg",
  journal:    "/assets/free/shompen-heritage-conservation-art.jpeg",
  about:      "/images/about/sudipta-ganguly-creator.jpeg",
  contact:    "/assets/free/modern-kimono-editorial-portrait.jpeg",
  pricing:    "/assets/free/modern-kimono-editorial-portrait.jpeg",
  search:     "/assets/free/modern-kimono-editorial-portrait.jpeg",
} as const

export const DEFAULT_OG_IMAGE = OG_IMAGES.default

// ── Contact & Social ─────────────────────────────────────────────────────────
// Single source of truth for all contact info and social URLs.
// Consumed by: contact page, footer, Organization JSON-LD schema.

export const CONTACT = {
  email: "wildpixel26@gmail.com",
} as const

export const SOCIAL = {
  /** Primary Pinterest — main brand presence */
  pinterest: {
    name:        "WildPixel Art",
    url:         "https://in.pinterest.com/wildpixelartai/",
    ariaLabel:   "Visit WildPixel Art on Pinterest",
    description: "Our primary Pinterest profile featuring illustrations, botanical studies, cultural artwork, editorials, wallpapers, and visual stories.",
  },
  /** Secondary Pinterest — themed decor extension, NOT a separate brand */
  pinterestDeco: {
    name:        "WildPixel Deco",
    url:         "https://in.pinterest.com/wildpixelartaideco/",
    ariaLabel:   "Visit WildPixel Deco on Pinterest",
    description: "Home & Decor Collection — wallpapers, printable wall art, surface patterns, and interior inspiration.",
    footerLabel: "Explore our Home & Decor Pinterest Collection",
  },
  instagram: {
    name:      "@wildpixelart.ai",
    url:       "https://www.instagram.com/wildpixelart.ai/",
    ariaLabel: "Visit WildPixel on Instagram",
  },
  facebook: {
    name:      "WildPixel Art AI",
    url:       "https://www.facebook.com/wildpixelartai",
    ariaLabel: "Visit WildPixel on Facebook",
  },
} as const
