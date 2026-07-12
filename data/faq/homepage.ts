// data/faq/homepage.ts
// FAQ for the homepage — answers "What is WildPixelAI?" and the questions a
// first-time visitor has before exploring further. Kept separate from
// data/faq/licensing.ts, data/faq/collections.ts, and data/faq/journal.ts —
// each page answers what's actually relevant to it, not one shared list.
import type { FAQItem } from "./general"

export const HOMEPAGE_FAQ: FAQItem[] = [
  {
    id:         "what-is-wildpixelai",
    question:   "What is WildPixelAI?",
    answer:     "WildPixelAI is an independent creative studio and digital art library run by Sudipta Ganguly. It publishes original illustrations, botanical studies, and surface pattern art — free to download for personal use, with Personal and Commercial licensing collections currently in preparation.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "are-artworks-ai-generated",
    question:   "Are the artworks AI generated?",
    answer:     "AI is used as a creative tool within a human-directed process — research, reference gathering, art direction, and editing all come from the creator. Each piece is developed with a specific subject and intention rather than generated at random. Read more on the About page.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "is-everything-free",
    question:   "Is everything on WildPixelAI free?",
    answer:     "The current library is free to download for personal use — no account or payment required. Personal and Commercial licensing collections, for higher resolution files and business use, are in preparation and can be arranged directly by contacting the studio.",
    entityRefs: [],
    intentType: "commercial",
  },
  {
    id:         "what-can-i-download",
    question:   "What can I download?",
    answer:     "Every asset marked Free can be downloaded directly from its asset page in full resolution, watermark-free, for personal use such as wallpapers, mood boards, or personal projects.",
    entityRefs: [],
    intentType: "navigational",
  },
  {
    id:         "commercial-use",
    question:   "Can I use artwork commercially?",
    answer:     "Not under the free tier — free downloads are for personal use only. Commercial use (products, branding, client work, resale) requires a Commercial License. See the Pricing page or contact the studio directly to discuss current availability.",
    entityRefs: [],
    intentType: "commercial",
  },
  {
    id:         "what-types-of-artwork",
    question:   "What types of artwork are available?",
    answer:     "The library spans botanical illustration, mythology, history, mathematics and science visual essays, and editorial illustration — organised into curated collections and accompanied by research articles in the Journal.",
    entityRefs: [],
    intentType: "informational",
  },
]
