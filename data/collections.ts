// data/collections.ts
// Collections derived from asset groupings. All image paths use .jpeg extension.

import type { Collection } from "@/types/marketplace"
import { assets } from "./assets"

function buildCollection(
  input: Omit<Collection, "assetIds" | "assetCount" | "bannerImage">,
): Collection {
  const assetIds = assets.filter(a => a.collection === input.id).map(a => a.id)
  const banner   = assets.find(a => a.collection === input.id)
  return {
    ...input,
    assetIds,
    assetCount:  assetIds.length,
    bannerImage: banner?.image ?? "/assets/free/modern-kimono-editorial-portrait.jpeg",
  }
}

export const collections: Collection[] = [
  buildCollection({
    id: "modern-muse",
    slug: "modern-muse",
    title: "Modern Muse",
    subtitle: "Editorial figure studies",
    description:
      "Editorial figurative illustrations exploring portraiture, silhouette, and the relationship between figure, gesture, and ground. Work in this collection begins with the human presence and asks what visual language best honours it.",
    tags: ["editorial", "portrait", "figure study"],
    featured: true,
    publishedAt: "2025-01-10",
  }),
  buildCollection({
    id: "seasonal-botanicals",
    slug: "seasonal-botanicals",
    title: "Seasonal Botanicals",
    subtitle: "Botanical studies through the year",
    description:
      "Botanical illustrations developed through close observation across seasons — watercolour, soft-light photography, and ink studies of flowers, branches, and foliage at different moments in their life cycle.",
    tags: ["botanical", "seasonal", "observation"],
    featured: true,
    publishedAt: "2025-01-12",
  }),
  buildCollection({
    id: "heritage-conservation",
    slug: "heritage-conservation",
    title: "Heritage & Conservation",
    subtitle: "Illustration as witness and record",
    description:
      "Illustrations developed alongside editorial research on cultures, communities, and places under pressure. The visual language draws from archival field-note traditions — ink on parchment grounds — to create records that outlast the urgency of news cycles.",
    tags: ["heritage", "conservation", "research"],
    featured: true,
    publishedAt: "2025-01-08",
  }),
  buildCollection({
    id: "scarlet-ecologies",
    slug: "scarlet-ecologies",
    title: "Scarlet Ecologies",
    subtitle: "Red as a visual study",
    description:
      "An extended study of red across saturations, applications, and subjects — from the deep crimson of cut roses to the warm earth of traditional pigments. Colour as a research subject rather than a stylistic choice.",
    tags: ["colour study", "red", "botanical"],
    featured: false,
    publishedAt: "2025-01-14",
  }),
  buildCollection({
    id: "dreamscapes",
    slug: "dreamscapes",
    title: "Dreamscapes",
    subtitle: "Atmosphere over detail",
    description:
      "Images built around light and atmosphere rather than sharp observation — diffused meadows, frosted leaves, cosmos in motion. The collection asks how much information can be removed from a subject before it ceases to communicate.",
    tags: ["atmospheric", "soft light", "nature"],
    featured: false,
    publishedAt: "2025-01-16",
  }),
  buildCollection({
    id: "macro-botanicals",
    slug: "macro-botanicals",
    title: "Macro Botanicals",
    subtitle: "Botanical structure at close range",
    description:
      "Macro photographic studies of flowers and botanical structure — surfaces, textures, and forms that are invisible at normal viewing distances. Work made from sustained close observation over single sessions.",
    tags: ["macro", "photography", "texture"],
    featured: false,
    publishedAt: "2025-01-18",
  }),
  buildCollection({
    id: "playful-characters",
    slug: "playful-characters",
    title: "Playful Characters",
    subtitle: "Character illustration and graphic design",
    description:
      "Character illustrations and graphic designs with warmth and deliberate playfulness — flat-colour work suited to journal covers, stationery, and print applications where approachability matters as much as craft.",
    tags: ["character", "graphic", "warm"],
    featured: false,
    publishedAt: "2025-01-24",
  }),
  buildCollection({
    id: "devotional-studies",
    slug: "devotional-studies",
    title: "Devotional Studies",
    subtitle: "Sacred iconography and mythic illustration",
    description:
      "Illustrations drawing on Indian devotional visual traditions — folk-art graphic vocabulary, sacred iconography, and the visual language of mythology. Research into pigment history, cultural context, and iconographic meaning precedes every piece.",
    tags: ["devotional", "mythology", "folk art"],
    featured: true,
    publishedAt: "2025-02-03",
  }),
  buildCollection({
    id: "obsidian-glow",
    slug: "obsidian-glow",
    title: "Obsidian Glow",
    subtitle: "Dark abstracts in restrained light",
    description:
      "A series of dark geometric compositions — smooth stones and overlapping discs on black slate, each edge traced with a thin line of light. Built around restraint: most of the frame stays in near-darkness, with light used sparingly to define form rather than flood it. Formatted across landscape, portrait, and lock-screen proportions.",
    tags: ["dark abstract", "geometric", "minimalist", "wallpaper"],
    featured: true,
    publishedAt: "2026-06-02",
  }),
  buildCollection({
    id: "impressionist-moments",
    slug: "impressionist-moments",
    title: "Impressionist Moments",
    subtitle: "Atmosphere, brushwork, and a single moment",
    description:
      "Oil-painted scenes built around a fleeting moment — a child chasing a ball into the surf, mist settling over a mountain valley at dusk. Loose, visible brushwork throughout; the atmosphere and the instant matter more than photographic detail.",
    tags: ["impressionist", "oil painting", "landscape", "atmospheric"],
    featured: false,
    publishedAt: "2026-06-08",
  }),
  buildCollection({
    id: "neon-nights",
    slug: "neon-nights",
    title: "Neon Nights",
    subtitle: "High-contrast geometric colour",
    description:
      "Dark, modern wallpapers built around negative space and controlled neon colour — overlapping circles traced in electric pink and cyan against matte black grounds.",
    tags: ["neon", "geometric", "modern", "wallpaper"],
    featured: false,
    publishedAt: "2026-06-02",
  }),
  buildCollection({
    id: "enchanted-wildlife",
    slug: "enchanted-wildlife",
    title: "Enchanted Wildlife",
    subtitle: "Naturalistic form, ornamental surface",
    description:
      "Wildlife illustrations that keep an animal's real anatomy and pose intact while reimagining its surface as jewelled, gilded, or otherwise ornamental — fantasy without losing the naturalist's eye.",
    tags: ["fantasy", "wildlife", "illustration", "ornamental"],
    featured: false,
    publishedAt: "2026-06-10",
  }),
  buildCollection({
    id: "gilded-medallions",
    slug: "gilded-medallions",
    title: "Gilded Medallions",
    subtitle: "Seamless patterns for textile and wallpaper licensing",
    description:
      "A seamless surface pattern collection built around a shared visual language — gold-lined sunburst medallions and scrolling botanical trellis, in colourways from watercolour indigo to burnt terracotta. Each repeat is engineered for textile, wallpaper, and home-decor production, not just single-image display.",
    tags: ["seamless pattern", "surface design", "medallion", "commercial licensing", "textile"],
    featured: true,
    publishedAt: "2026-06-15",
  }),
  buildCollection({
    id: "heritage-block-prints",
    slug: "heritage-block-prints",
    title: "Heritage Block Prints",
    subtitle: "Small-scale seamless patterns rooted in block-printing tradition",
    description:
      "Small-scale seamless patterns modelled on the rhythm of hand block-printing and classic sprig motifs — designed as supporting prints for mixed textile and home-decor collections, where a quieter repeat is needed alongside a hero print.",
    tags: ["seamless pattern", "block print", "surface design", "commercial licensing", "textile"],
    featured: false,
    publishedAt: "2026-06-15",
  }),
]

export const collectionBySlug  = (slug: string) => collections.find(c => c.slug === slug)
export const featuredCollections = () => collections.filter(c => c.featured)
