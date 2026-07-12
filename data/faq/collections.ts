// data/faq/collections.ts
// Collection-page FAQ, selected by theme rather than duplicated per collection.
// Collections don't carry their own `theme` field yet (see types/marketplace.ts —
// Collection.theme is optional and unpopulated), so `faqForCollectionThemes`
// picks a set from the themes actually present on the collection's assets.
import type { FAQItem } from "./general"

export const BOTANICAL_FAQ: FAQItem[] = [
  {
    id:         "what-is-botanical-illustration",
    question:   "What is botanical illustration?",
    answer:     "Botanical illustration is the practice of depicting plants with close attention to their real structure — growth habit, petal count, seed formation — combined with an artist's visual interpretation. It sits between scientific observation and decorative art.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "botanical-scientifically-accurate",
    question:   "Are these scientifically accurate?",
    answer:     "The studies are built from real plant reference and structure, aiming for botanical plausibility, but they're created as art rather than as scientific field guides — treat them as illustration inspired by nature, not a taxonomic reference.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "botanical-real-plants",
    question:   "Are these inspired by real plants?",
    answer:     "Yes — each piece starts from a specific real species and its documented growth cycle, then develops into an illustrated composition.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "botanical-fabric-use",
    question:   "Can botanical art be used for fabric or interiors?",
    answer:     "Botanical motifs are a natural fit for textile and interior applications. That use requires a Commercial License — see the Pricing page for current availability.",
    entityRefs: [],
    intentType: "commercial",
  },
]

export const SPIRITUAL_FAQ: FAQItem[] = [
  {
    id:         "inspired-by-hindu-mythology",
    question:   "Are these inspired by Hindu mythology?",
    answer:     "Many pieces in this collection draw on Hindu mythology, iconography, and devotional traditions, researched and reinterpreted through original illustration.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "devotional-artwork",
    question:   "Is this devotional artwork?",
    answer:     "It's created as art inspired by devotional and mythological subjects rather than for ritual use — intended for appreciation of the stories, symbolism, and visual traditions behind them.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "spiritual-can-i-print",
    question:   "Can I print these pieces?",
    answer:     "Free pieces can be printed for personal, non-commercial use. Larger-scale or commercial printing requires a license — see Pricing.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "respectful-interpretation",
    question:   "Are these respectful interpretations?",
    answer:     "Each piece is researched with care for the cultural and religious context it draws from, aiming for interpretation that's informed rather than decorative shorthand.",
    entityRefs: [],
    intentType: "informational",
  },
]

export const GENERAL_COLLECTION_FAQ: FAQItem[] = [
  {
    id:         "collection-what-is-it",
    question:   "How are these pieces grouped into a collection?",
    answer:     "Each collection groups artwork by subject, creative direction, or visual language rather than by upload date — so you can browse by what the work is about, not just when it was made.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "collection-licensing",
    question:   "Can I use these pieces commercially?",
    answer:     "Free downloads in this collection are for personal use. Commercial use requires a license — see the Pricing page for current availability.",
    entityRefs: [],
    intentType: "commercial",
  },
]

/** Pick the most relevant FAQ set for a collection, based on the themes of its assets. */
export function faqForCollectionThemes(themes: string[]): FAQItem[] {
  const lower = themes.map(t => t.toLowerCase())
  if (lower.some(t => t.includes("mythology"))) return SPIRITUAL_FAQ
  if (lower.some(t => t.includes("botanical"))) return BOTANICAL_FAQ
  return GENERAL_COLLECTION_FAQ
}
