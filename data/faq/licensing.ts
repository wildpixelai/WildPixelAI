// data/faq/licensing.ts
// Licensing FAQ, split by tier — used on /pricing. Both tiers are currently
// "coming-soon" (see data/licenses.ts), so answers describe how to proceed
// today (contact the studio directly) rather than a self-serve checkout flow
// that doesn't exist yet.
import type { FAQItem } from "./general"

export const PERSONAL_LICENSE_FAQ: FAQItem[] = [
  {
    id:         "personal-wallpaper-use",
    question:   "Can I use a Personal License piece as wallpaper?",
    answer:     "Yes. Personal License artwork is intended for exactly this — desktop and mobile wallpapers, printed for your own home, or used in personal creative projects.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "personal-print-home",
    question:   "Can I print it for my home?",
    answer:     "Yes, printing for personal, non-commercial display in your own home is covered under a Personal License.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "personal-gift",
    question:   "Can I gift a print to someone?",
    answer:     "Yes — a one-off personal gift (for example, a printed piece for a friend or family member) is fine under a Personal License. Reselling or producing gifts at scale requires a Commercial License.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "personal-modify",
    question:   "Can I modify the artwork?",
    answer:     "Minor personal edits — cropping or recolouring for your own use — are generally fine. The license does not permit redistributing modified versions as your own work.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "personal-social-media",
    question:   "Can I upload it to social media?",
    answer:     "Yes, sharing on your personal social media with credit to WildPixelAI is welcome. Using it as branded content for a business account falls under commercial use.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "personal-resell",
    question:   "Can I resell a Personal License piece?",
    answer:     "No — resale, redistribution, or use in products for sale requires a Commercial License.",
    entityRefs: [],
    intentType: "commercial",
  },
]

export const COMMERCIAL_LICENSE_FAQ: FAQItem[] = [
  {
    id:         "commercial-includes",
    question:   "What does a Commercial License include?",
    answer:     "A Commercial License covers business use of a design — products, branding, marketing, or client work — within the scope agreed at the time of licensing (territory, duration, and application). Exact terms are confirmed directly with the studio.",
    entityRefs: [],
    intentType: "commercial",
  },
  {
    id:         "commercial-sell-products",
    question:   "Can I sell products using this artwork?",
    answer:     "Yes, that's the primary purpose of a Commercial License — using the design on products you sell, such as textiles, packaging, or printed goods, within the agreed scope.",
    entityRefs: [],
    intentType: "commercial",
  },
  {
    id:         "commercial-edit",
    question:   "Can I edit the design?",
    answer:     "Reasonable production edits — recolouring, rescaling, or adapting a repeat for a specific substrate — are typically included. Substantial reinterpretation is discussed case by case.",
    entityRefs: [],
    intentType: "commercial",
  },
  {
    id:         "commercial-agencies-clients",
    question:   "Can agencies use these designs for clients?",
    answer:     "Yes — agencies can license work on behalf of a client. Let the studio know the end client and intended use so the license can be scoped correctly.",
    entityRefs: [],
    intentType: "commercial",
  },
  {
    id:         "commercial-branding",
    question:   "Can I use a design for branding?",
    answer:     "Yes, branding and identity use is available under a Commercial License, scoped to the specific application discussed with the studio.",
    entityRefs: [],
    intentType: "commercial",
  },
  {
    id:         "commercial-pod",
    question:   "Can I use designs for print-on-demand products?",
    answer:     "Print-on-demand use is possible but requires a specific licensing conversation, since POD platforms have their own distribution terms. Contact the studio with your platform and product details.",
    entityRefs: [],
    intentType: "commercial",
  },
]
