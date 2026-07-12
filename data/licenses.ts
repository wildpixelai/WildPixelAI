// data/licenses.ts
import type { LicensePlan } from "@/types/marketplace"

export const licensePlans: LicensePlan[] = [
  {
    id: "personal",
    slug: "personal",
    name: "Personal License",
    tagline: "For individual, non-commercial use.",
    description:
      "Use assets in personal projects — wallpapers, personal stationery, gifts, and non-commercial print. Personal license assets and pricing are being finalized.",
    features: [
      "Personal, non-commercial use only",
      "Single-user license",
      "No resale or redistribution",
      "Standard resolution downloads",
    ],
    status: "coming-soon",
    cta: { label: "Coming Soon", href: "/pricing" },
  },
  {
    id: "commercial",
    slug: "commercial",
    name: "Commercial License",
    tagline: "For brands, products, and commercial production.",
    description:
      "Use assets in commercial products, apparel, packaging, interiors, and brand applications. Commercial licensing is enquiry-based and handled directly by the studio.",
    features: [
      "Commercial use across approved markets",
      "Production-ready file formats",
      "Defined territory and duration",
      "Direct enquiry — terms agreed before transfer",
    ],
    status: "coming-soon",
    cta: { label: "Coming Soon", href: "/pricing" },
  },
  {
    id: "premium",
    slug: "premium",
    name: "Premium License",
    tagline: "For flagship, exclusive, or high-value applications.",
    description:
      "A higher tier for exclusive or limited-availability work — details, scope, and pricing are still being defined and will be published here once finalised.",
    features: [
      "Exclusive or limited-availability designs",
      "Scope, features, and pricing to be finalised",
    ],
    status: "coming-soon",
    cta: { label: "Coming Soon", href: "/pricing" },
  },
]

export const licensePlanBySlug = (slug: string) => licensePlans.find(l => l.slug === slug)
