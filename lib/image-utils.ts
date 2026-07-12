/**
 * lib/image-utils.ts
 * Wildpixel.ai — Image System Utilities
 *
 * Responsive sizes strings, focal-point support, and next/image helpers.
 *
 * FOCAL POINT ARCHITECTURE:
 *   Assets can specify focusX and focusY (0-1 range, origin = top-left).
 *   These map to CSS object-position values.
 *   When a CMS is added, populate focusX/focusY from it — no consumer changes.
 *
 * RESPONSIVE SIZES:
 *   Pre-defined sizes strings for all card and layout contexts.
 *   Always use these rather than ad-hoc sizes strings in components.
 *
 * DIRECTORIES:
 *   /public/assets/free/       — Free license assets
 *   /public/assets/personal/   — Personal license assets (coming soon)
 *   /public/assets/commercial/ — Commercial license assets (coming soon)
 */

// ── Focal point ───────────────────────────────────────────────────────────────

export interface FocalPoint {
  focusX?: number  // 0–1, left to right
  focusY?: number  // 0–1, top to bottom
}

/**
 * Converts a focal point to a CSS object-position value.
 * Falls back to 'center' when no focal point is specified.
 */
export function focalPointToObjectPosition(fp?: FocalPoint): string {
  if (!fp || (fp.focusX === undefined && fp.focusY === undefined)) {
    return 'center'
  }
  const x = fp.focusX !== undefined ? `${(fp.focusX * 100).toFixed(1)}%` : '50%'
  const y = fp.focusY !== undefined ? `${(fp.focusY * 100).toFixed(1)}%` : '50%'
  return `${x} ${y}`
}

// ── Responsive sizes strings ──────────────────────────────────────────────────

/**
 * sizes strings for each visual context.
 * These match the grid breakpoints defined in tailwind.config.ts.
 */
export const imageSizes = {
  /** 5-column asset grid (homepage, library) */
  gridCard5:   '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1440px) 20vw, 288px',
  /** 4-column asset grid (collection detail, related) */
  gridCard4:   '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1440px) 25vw, 360px',
  /** 3-column grid (collections, journal) */
  gridCard3:   '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 480px',
  /** 6-column feature grid (free assets strip) */
  gridCard6:   '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1440px) 16vw, 240px',
  /** Hero carousel cards */
  heroCard:    '(max-width: 640px) 200px, (max-width: 1024px) 230px, 260px',
  /** Asset detail — primary large image */
  assetDetail: '(max-width: 1024px) 100vw, 60vw',
  /** Collection banner */
  banner:      '100vw',
  /** Journal article cover (full width in reading container) */
  articleCover:'(max-width: 768px) 100vw, 760px',
  /** OG image (used via absolute URL — not a sizes string) */
  og:          '1200x630',
} as const

// ── Asset path helpers ────────────────────────────────────────────────────────

export type AssetDirectory = 'free' | 'personal' | 'commercial'

/**
 * Builds the public path for an asset.
 * Used when constructing asset paths that aren't already stored in asset.image.
 */
export function assetPath(filename: string, dir: AssetDirectory = 'free'): string {
  return `/assets/${dir}/${filename}`
}

// ── OG image URL builder ──────────────────────────────────────────────────────

/**
 * Resolves the best OG image URL for a given page context.
 * Falls back through: provided image → context default → site default.
 */
export function resolveOgImage(
  provided: string | undefined,
  siteUrl: string,
  defaultImage: string,
): string {
  const raw = provided ?? defaultImage
  return raw.startsWith('http') ? raw : `${siteUrl}${raw}`
}
