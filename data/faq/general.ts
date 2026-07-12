export interface FAQItem {
  id: string
  question: string
  answer: string
  entityRefs: string[]
  intentType: 'informational' | 'commercial' | 'navigational'
}

/**
 * General "getting started" FAQ for the Resources hub page only.
 * Page-specific questions live in their own files: homepage.ts, licensing.ts,
 * collections.ts, journal.ts — this file intentionally does not duplicate them.
 */
export const GENERAL_FAQ: FAQItem[] = [
  {
    id:         'how-do-i-download',
    question:   'How do I download an asset?',
    answer:     'Open any asset marked Free and use the Download button on its page — no account or sign-up required. Downloads are logged locally so you can see your download count on that piece.',
    entityRefs: [],
    intentType: 'navigational',
  },
  {
    id:         'do-i-need-an-account',
    question:   'Do I need an account to use WildPixelAI?',
    answer:     'No. Free downloads and browsing are fully open — no account, no email required.',
    entityRefs: [],
    intentType: 'navigational',
  },
  {
    id:         'how-do-collections-work',
    question:   'How are Collections different from the main Library?',
    answer:     'The Library is every asset, filterable by license, style, colour, and theme. Collections are curated groupings around a specific subject or creative direction — a way to browse by what the work is about.',
    entityRefs: [],
    intentType: 'informational',
  },
  {
    id:         'licensing-status',
    question:   'What is the status of Personal and Commercial licensing?',
    answer:     'Both are in preparation — see the Pricing page for current status and feature details, or contact the studio directly to discuss commercial licensing now.',
    entityRefs: [],
    intentType: 'commercial',
  },
  {
    id:         'how-to-reach-studio',
    question:   'How do I reach the studio?',
    answer:     'Use the Contact page for licensing enquiries, collaborations, or general questions — enquiries are handled directly, not through a support queue.',
    entityRefs: [],
    intentType: 'navigational',
  },
]
