import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { generatePageMetadata } from '@/lib/metadata'
import { aboutPageSchema, breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { OG_IMAGES } from '@/lib/constants'

export const metadata: Metadata = generatePageMetadata({
  title:      'About WildPixel — Visual Research & Surface Pattern Studio',
  description: 'WildPixel is an independent creative studio where research, illustration, and storytelling come together. Every artwork begins with a question about nature, history, mathematics, or culture.',
  path:       '/about',
  ogImage:    OG_IMAGES.about,
  ogImageAlt: 'Sudipta Ganguly — creator of WildPixel',
})

const RESEARCH_AREAS = [
  'Botanical Illustration',
  'Nature',
  'History',
  'Indigenous Cultures',
  'Mythology',
  'Mathematics',
  'Science',
  'Editorial Illustration',
  'Visual Storytelling',
]

export default function AboutPage() {
  const breadcrumbs = [
    { label: 'Home',  href: '/' },
    { label: 'About', href: '/about' },
  ]

  return (
    <>
      <JsonLd schema={[aboutPageSchema(), breadcrumbSchema(breadcrumbs)]} />

      <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12 py-16 lg:py-24">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <header className="max-w-[640px] mb-16">
          <span className="font-body text-eyebrow font-medium text-accent">About</span>
          <h1 className="font-heading font-semibold text-display-lg text-text mt-3">
            About WildPixel
          </h1>
          <p className="font-body text-body-xl text-text-secondary mt-5">
            WildPixel began as an exploration of how illustration can preserve stories, cultures,
            science, mathematics, history, and nature.
          </p>
          <p className="font-body text-body-xl text-text-secondary mt-3">
            Every artwork begins with research before becoming a visual composition.
          </p>
        </header>

        {/* ── Why WildPixel Exists ────────────────────────────────────── */}
        <section className="mb-20 max-w-[700px]" aria-labelledby="why-heading">
          <h2 id="why-heading" className="font-heading text-heading-lg text-text mb-4">
            Why WildPixel Exists
          </h2>
          <p className="font-body text-body-md text-text-secondary leading-relaxed">
            Most stock illustration is made to be generic — flexible enough to fit any brief,
            forgettable enough to blend in. WildPixel exists to do the opposite: start from a
            specific, researched subject and let the artwork carry that specificity through to
            the finished piece, whether it&rsquo;s downloaded as a free wallpaper or licensed for
            a textile run.
          </p>
        </section>

        {/* ── Portrait + Biography ─────────────────────────────────────── */}
        <section
          className="grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 mb-20"
          aria-labelledby="bio-heading"
        >
          {/* Portrait */}
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-border bg-bg-elevated">
            <Image
              src="/images/about/sudipta-ganguly-creator.jpeg"
              alt="Sudipta Ganguly — creator and illustrator at WildPixel"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 380px"
              className="object-cover object-center"
            />
          </div>

          {/* Biography */}
          <div className="flex flex-col justify-center">
            <h2 id="bio-heading" className="font-heading text-heading-lg text-text mb-6">
              Sudipta Ganguly
            </h2>
            <div className="font-body text-body-md text-text-secondary leading-relaxed space-y-4">
              <p>
                I&rsquo;m Sudipta, the creator of WildPixel.
              </p>
              <p>
                WildPixel is where research, illustration, and storytelling come together. Every
                artwork begins with a question — about nature, history, mathematics, culture,
                science, or design — and evolves into a visual narrative intended to spark
                curiosity.
              </p>
              <p>
                My work explores botanical studies, indigenous cultures, editorial illustration,
                mythology, scientific ideas, and historical subjects through carefully researched
                visual storytelling.
              </p>
              <p>
                Rather than creating artwork for decoration alone, I aim to create illustrations
                that encourage people to pause, observe, and learn.
              </p>
              <p>
                I believe thoughtful research gives creative work lasting value.
              </p>
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ────────────────────────────────────────── */}
        <section className="mb-20 grid sm:grid-cols-2 gap-10 max-w-[900px]" aria-labelledby="mission-heading">
          <div>
            <h2 id="mission-heading" className="font-heading text-heading-lg text-text mb-4">
              Mission
            </h2>
            <p className="font-body text-body-lg text-text-secondary leading-relaxed">
              To create visual work that inspires curiosity and preserves knowledge through
              illustration.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-heading-lg text-text mb-4">
              Vision
            </h2>
            <p className="font-body text-body-lg text-text-secondary leading-relaxed">
              A library where every piece of artwork is also a small, well-researched essay on
              its subject — useful to download, and worth reading about.
            </p>
          </div>
        </section>

        {/* ── Research Areas ──────────────────────────────────────────── */}
        <section className="mb-20" aria-labelledby="research-heading">
          <h2 id="research-heading" className="font-heading text-heading-lg text-text mb-6">
            Research Areas
          </h2>
          <ul className="flex flex-wrap gap-3" role="list">
            {RESEARCH_AREAS.map(area => (
              <li key={area}
                className="px-4 py-2 rounded-full bg-bg-elevated border border-border font-body text-body-sm text-text-secondary"
              >
                {area}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Creative Process ────────────────────────────────────────── */}
        <section className="mb-20 max-w-[700px]" aria-labelledby="process-heading">
          <h2 id="process-heading" className="font-heading text-heading-lg text-text mb-6">
            Creative Process
          </h2>
          <ol className="flex flex-col gap-5" role="list">
            {[
              ['Research', 'Every piece starts with a real subject — a plant\u2019s growth cycle, a historical event, a mathematical idea — researched before any visual work begins.'],
              ['Direction', 'Composition, palette, and reference are chosen deliberately, with AI used as a tool within that direction rather than as a shortcut around it.'],
              ['Editing', 'Drafts are reviewed and refined against the original research and intention, not just for visual polish.'],
              ['Documentation', 'The research behind the piece is written up as a Journal article, so the artwork and its context travel together.'],
            ].map(([step, body], i) => (
              <li key={step} className="flex gap-4">
                <span className="font-heading text-heading-sm text-accent shrink-0 w-7">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="font-body text-body-md font-medium text-text">{step}</p>
                  <p className="font-body text-body-sm text-text-secondary mt-1 leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Our Philosophy ──────────────────────────────────────────── */}
        <section className="mb-20 max-w-[700px]" aria-labelledby="philosophy-heading">
          <h2 id="philosophy-heading" className="font-heading text-heading-lg text-text mb-4">
            Our Philosophy
          </h2>
          <blockquote className="border-l-2 border-accent pl-6 mb-8">
            <p className="font-heading text-heading-md text-text italic leading-snug">
              Research first. Illustration second. Story always.
            </p>
          </blockquote>
          <div className="rounded-lg border border-border bg-bg-elevated p-6 sm:p-8">
            <h3 className="font-heading text-heading-sm text-text mb-2">Human + AI</h3>
            <p className="font-body text-body-sm text-text-secondary leading-relaxed">
              AI is used here as a creative tool, not a replacement for research, taste, or
              storytelling — those still come from a person. WildPixel&rsquo;s full position on
              this, including how it relates to traditional artists and craftspeople, is on the
              AI Philosophy page.
            </p>
            <Link href="/about/philosophy" className="inline-flex items-center gap-1.5 font-body text-label-md text-accent hover:text-accent-2 transition-colors mt-4 group">
              Read the AI Philosophy
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* ── Future Direction ────────────────────────────────────────── */}
        <section className="mb-20 max-w-[700px]" aria-labelledby="future-heading">
          <h2 id="future-heading" className="font-heading text-heading-lg text-text mb-4">
            Future Direction
          </h2>
          <p className="font-body text-body-md text-text-secondary leading-relaxed">
            The free library will keep growing alongside new Journal research. Personal and
            Commercial licensing collections are currently in preparation — see{' '}
            <Link href="/pricing" className="text-accent hover:text-accent-2 transition-colors">Pricing</Link>{' '}
            for current status, or{' '}
            <Link href="/contact" className="text-accent hover:text-accent-2 transition-colors">get in touch</Link>{' '}
            about licensing sooner.
          </p>
        </section>

        {/* ── Continue exploring ───────────────────────────────────────── */}
        <nav aria-label="Continue exploring" className="max-w-[760px] mt-20 pt-10 border-t border-border flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/journal" className="inline-flex items-center gap-1.5 font-body text-label-md text-text hover:text-accent transition-colors group">
            Read the Journal
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
