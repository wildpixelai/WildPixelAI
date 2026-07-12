// data/faq/journal.ts
// FAQ for the Journal (blog) listing page — process questions, not licensing
// questions, which live in data/faq/licensing.ts instead.
import type { FAQItem } from "./general"

export const JOURNAL_FAQ: FAQItem[] = [
  {
    id:         "how-is-artwork-created",
    question:   "How is the artwork created?",
    answer:     "Each piece starts with research into its subject — a plant's growth cycle, a historical event, a mathematical idea — before any visual work begins. AI is used as a tool within that process; the direction, editing, and final composition are human decisions.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "how-is-research-performed",
    question:   "How is the research performed?",
    answer:     "Research draws on primary sources, subject-matter references, and — where relevant — direct observation, and is documented in the accompanying Journal article for that piece.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "why-combine-ai-human-creativity",
    question:   "Why combine AI with human creativity?",
    answer:     "AI extends what's possible to render and iterate on quickly, but taste, research, and storytelling still have to come from a person. Read the full position on the AI Philosophy page.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "how-are-collections-organized",
    question:   "How are collections organized?",
    answer:     "Collections group artwork by subject and creative direction — botanical, mythology, editorial, and so on — rather than by upload date, so related pieces sit together.",
    entityRefs: [],
    intentType: "informational",
  },
  {
    id:         "why-document-inspiration",
    question:   "Why document the inspiration behind each piece?",
    answer:     "The research is often as interesting as the final image — documenting it gives the artwork context and lets readers go deeper into the subject if they want to.",
    entityRefs: [],
    intentType: "informational",
  },
]
