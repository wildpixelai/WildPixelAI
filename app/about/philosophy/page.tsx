import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { generatePageMetadata } from '@/lib/metadata'
import { webPageSchema, breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { OG_IMAGES } from '@/lib/constants'

export const metadata: Metadata = generatePageMetadata({
  title:       'AI Philosophy — Human Creativity, AI as a Tool',
  description: 'WildPixel\u2019s position on AI-assisted art: human research, taste, and storytelling remain the source of the work — AI is a tool, not a replacement for artists.',
  path:        '/about/philosophy',
  ogImage:     OG_IMAGES.about,
})

const PRINCIPLES = [
  {
    title: 'Human creativity remains irreplaceable',
    body:  'A tool can render an image quickly. It can\u2019t decide what\u2019s worth making, why a subject matters, or when a composition is actually finished — those are still human judgment calls, made piece by piece.',
  },
  {
    title: 'AI is neither automatically good nor automatically bad',
    body:  'Treating AI as inherently suspect, or inherently superior to traditional methods, are both oversimplifications. What matters is how it\u2019s used and what it\u2019s used for — the same as any tool in a creative process.',
  },
  {
    title: 'AI is a creative tool',
    body:  'Here, it sits alongside research and reference-gathering as part of how a piece gets made — closer to a very capable brush than to an artist working independently.',
  },
  {
    title: 'The work still comes from a person',
    body:  'Research, taste, composition, storytelling, editing, and intent are directed by a person at every stage. AI extends what can be rendered quickly; it doesn\u2019t decide what the piece is about.',
  },
  {
    title: 'Traditional artists and craftspeople are respected, not dismissed',
    body:  'Illustration, textile design, and craft traditions developed over generations of human skill. Nothing here is intended to suggest that skill is obsolete — the two can inform each other.',
  },
  {
    title: 'The goal is collaboration, not replacement',
    body:  'AI as part of the toolkit, not the whole of it — used to extend a research-led process, not to bypass it.',
  },
]

export default function AIPhilosophyPage() {
  const breadcrumbs = [
    { label: 'Home',           href: '/' },
    { label: 'About',          href: '/about' },
    { label: 'AI Philosophy',  href: '/about/philosophy' },
  ]

  return (
    <>
      <JsonLd schema={[
        webPageSchema({
          title: 'AI Philosophy — WildPixel',
          path: '/about/philosophy',
          description: 'WildPixel\u2019s position on AI-assisted art and human creativity.',
        }),
        breadcrumbSchema(breadcrumbs),
      ]} />

      <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12 py-16 lg:py-24">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <header className="max-w-[700px] mb-16">
          <span className="font-body text-eyebrow font-medium text-accent">About · Philosophy</span>
          <h1 className="font-heading font-semibold text-display-lg text-text mt-3">
            AI Philosophy
          </h1>
          <p className="font-body text-body-xl text-text-secondary mt-5">
            Many people assume AI art and human art are opposing forces. That framing doesn&rsquo;t
            hold up well in practice — here is where WildPixel actually stands.
          </p>
        </header>

        {/* ── Principles ──────────────────────────────────────────────── */}
        <section className="mb-20 max-w-[760px]" aria-labelledby="principles-heading">
          <h2 id="principles-heading" className="sr-only">Core principles</h2>
          <div className="flex flex-col divide-y divide-border">
            {PRINCIPLES.map(p => (
              <div key={p.title} className="py-7">
                <h3 className="font-heading text-heading-sm text-text mb-2">{p.title}</h3>
                <p className="font-body text-body-md text-text-secondary leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Context matters ─────────────────────────────────────────── */}
        <section className="mb-20 max-w-[700px]" aria-labelledby="context-heading">
          <h2 id="context-heading" className="font-heading text-heading-lg text-text mb-4">
            Why context comes with the art
          </h2>
          <p className="font-body text-body-md text-text-secondary leading-relaxed">
            Wherever possible, the inspiration, history, culture, or science behind a piece is
            documented alongside it in the Journal — not as a disclaimer, but because that
            context is often what makes the piece worth making in the first place. The artwork
            and its research are meant to be read together.
          </p>
          <Link href="/journal" className="inline-flex items-center gap-1.5 font-body text-label-md text-accent hover:text-accent-2 transition-colors mt-5 group">
            Read the Journal
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </section>

        {/* ── Continue exploring ──────────────────────────────────────── */}
        <nav aria-label="Continue exploring" className="max-w-[760px] pt-10 border-t border-border flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/about" className="inline-flex items-center gap-1.5 font-body text-label-md text-text hover:text-accent transition-colors group">
            About WildPixel
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
          <Link href="/collections" className="inline-flex items-center gap-1.5 font-body text-label-md text-text hover:text-accent transition-colors group">
            Browse Collections
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-1.5 font-body text-label-md text-text hover:text-accent transition-colors group">
            Contact the Creator
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </nav>

      </div>
    </>
  )
}
