/**
 * lib/hero-config.ts
 * WildPixel — Hero Carousel Configuration
 *
 * All asset IDs reference assets with hero: true in data/assets.ts.
 * Pages load from this config; HeroCarousel receives it as props.
 * To change hero content: edit here only — no component changes needed.
 */

export interface HeroConfig {
  assetIds:     string[]
  primaryIndex: number
  label?:       string
}

export const heroConfig: Record<string, HeroConfig> = {
  /** Homepage — kimono is primary (index 1) per spec */
  homepage: {
    assetIds: [
      "cherry-blossom-watercolor-gold",
      "modern-kimono-editorial-portrait",      // PRIMARY
      "shompen-heritage-conservation-art",
      "ethereal-meadow-dreamscape",
      "purple-gomphrena-macro",
      "dark-red-rose-bouquet",
    ],
    primaryIndex: 1,
    label: "Featured creative assets",
  },

  /** Free library section */
  free: {
    assetIds: [
      "ethereal-frosted-leaf-bokeh",
      "cherry-blossom-watercolor-gold",
      "purple-gomphrena-macro",
      "wildflower-duo-forest-mood",
      "soft-pink-cosmos-motion",
      "golden-lily-soft-light",
    ],
    primaryIndex: 0,
    label: "Free creative assets",
  },

  /** Personal license — placeholder, populated when personal assets are ready */
  personal: {
    assetIds: [],
    primaryIndex: 0,
    label: "Personal license assets — coming soon",
  },

  /** Commercial license — placeholder */
  commercial: {
    assetIds: [],
    primaryIndex: 0,
    label: "Commercial license assets — coming soon",
  },

  /** Botanical theme */
  botanical: {
    assetIds: [
      "cherry-blossom-watercolor-gold",
      "golden-lily-soft-light",
      "wildflower-duo-forest-mood",
      "purple-gomphrena-macro",
      "soft-pink-cosmos-motion",
    ],
    primaryIndex: 0,
    label: "Botanical illustration and photography",
  },

  /** Devotional / mythology theme */
  devotional: {
    assetIds: [
      "minimal-shiva-folk-art",
      "mythic-burning-trishul",
    ],
    primaryIndex: 0,
    label: "Devotional and mythological illustration",
  },

  /** Editorial portraits */
  editorial: {
    assetIds: [
      "modern-kimono-editorial-portrait",
      "poetic-black-dress-rose-illustration",
      "shompen-heritage-conservation-art",
    ],
    primaryIndex: 0,
    label: "Editorial illustration",
  },
}

export function getHeroConfig(key: string): HeroConfig {
  return heroConfig[key] ?? heroConfig.homepage
}
