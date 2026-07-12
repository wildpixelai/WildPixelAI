import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ShieldCheck, HelpCircle, Users, Mail, ArrowRight } from 'lucide-react'
import { generatePageMetadata } from '@/lib/metadata'
import { webPageSchema, breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { GENERAL_FAQ } from '@/data/faq/general'
import { FAQSection } from '@/components/seo/FAQSection'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = generatePageMetadata({
  title:       'Resources — Journal, Licenses, FAQ & About',
  description: 'Journal research and visual essays, licensing information, frequently asked questions, and ways to reach WildPixel studio.',
  path:        '/resources',
})

const LINKS = [
  { icon: BookOpen,    title: 'Journal',  body: 'Research, observations, and visual essays that inspired every collection.',     href: '/journal' },
  { icon: ShieldCheck, title: 'Licenses', body: 'Personal and Commercial licensing options.',                                     href: '/pricing' },
  { icon: HelpCircle,  title: 'FAQ',      body: 'Answers to common questions about licensing and creative assets.',               href: '/resources#faq' },
  { icon: Users,       title: 'About',    body: 'The studio, creative process, and the research behind the work.',               href: '/about' },
  { icon: Mail,        title: 'Contact',  body: 'Licensing, collaborations, commissions, and future collections.',               href: '/contact' },
]

export default function ResourcesPage() {
  const breadcrumbs = [
    { label: 'Home',      href: '/' },
    { label: 'Resources', href: '/resources' },
  ]

  return (
    <>
      <JsonLd schema={[
        webPageSchema({ title: `Resources — ${SITE_NAME}`, path: '/resources', description: 'Journal, licensing information, and ways to reach WildPixel.' }),
        breadcrumbSchema(breadcrumbs),
      ]} />

      <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12 py-12 lg:py-16">
        <header className="mb-12 max-w-[640px]">
          <span className="font-body text-eyebrow font-medium text-accent">Resources</span>
          <h1 className="font-heading font-semibold text-display-lg text-text mt-3">Resources</h1>
          <p className="font-body text-body-lg text-text-secondary mt-3">
            Everything outside the library — journal research, licensing information, and ways
            to reach the studio.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {LINKS.map(({ icon: Icon, title, body, href }) => (
            <Link
              key={title}
              href={href}
              className="group flex flex-col gap-4 p-6 rounded-lg border border-border hover:border-border-strong bg-bg-elevated transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-md bg-accent-subtle flex items-center justify-center text-accent">
                <Icon size={18} aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-heading text-heading-sm text-text flex items-center gap-1.5">
                  {title}
                  <ArrowRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                    aria-hidden="true"
                  />
                </h2>
                <p className="font-body text-body-sm text-text-secondary mt-1.5">{body}</p>
              </div>
            </Link>
          ))}
        </div>

        <section id="faq" className="max-w-[760px]" aria-labelledby="faq-heading">
          <FAQSection id="general-faq" heading="Frequently asked questions" items={GENERAL_FAQ} />
          <p className="font-body text-body-sm text-text-tertiary mt-8">
            Looking for licensing details? See the FAQ on the{' '}
            <Link href="/pricing" className="text-accent hover:text-accent-2 transition-colors">Pricing page</Link>.
            Questions about a specific collection appear on that{' '}
            <Link href="/collections" className="text-accent hover:text-accent-2 transition-colors">collection&rsquo;s page</Link>.
          </p>
        </section>
      </div>
    </>
  )
}
