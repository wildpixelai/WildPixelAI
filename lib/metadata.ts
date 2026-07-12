/**
 * lib/metadata.ts
 * WildPixel — Page Metadata Generator
 * Derives title, description, canonical, OG, Twitter from a single options object.
 */
import type { Metadata } from "next"
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "./constants"

interface PageMetadataOptions {
  title:        string
  description:  string
  path?:        string
  ogImage?:     string
  ogImageAlt?:  string
  type?:        "website" | "article"
  noindex?:     boolean
  publishedAt?: string
}

export function generatePageMetadata(opts: PageMetadataOptions): Metadata {
  const canonical = opts.path ? `${SITE_URL}${opts.path}` : SITE_URL
  const ogImage   = opts.ogImage ?? DEFAULT_OG_IMAGE
  const fullOg    = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`

  return {
    title:       { default: opts.title, template: `%s — ${SITE_NAME}` },
    description: opts.description,
    robots:      opts.noindex ? "noindex,nofollow" : "index,follow",
    alternates:  { canonical },
    openGraph: {
      title:       opts.title,
      description: opts.description,
      url:         canonical,
      siteName:    SITE_NAME,
      locale:      "en_IN",
      type:        opts.type ?? "website",
      images: [{
        url:    fullOg,
        width:  1200,
        height: 630,
        alt:    opts.ogImageAlt ?? opts.title,
      }],
      ...(opts.type === "article" && opts.publishedAt
        ? { publishedTime: opts.publishedAt }
        : {}),
    },
    twitter: {
      card:        "summary_large_image",
      title:       opts.title,
      description: opts.description,
      images:      [fullOg],
    },
  }
}
