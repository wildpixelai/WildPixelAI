import type { Metadata } from 'next'
import { Check, Clock } from 'lucide-react'
import { generatePageMetadata } from '@/lib/metadata'
import { webPageSchema, breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { licensePlans } from '@/data/licenses'
import { PERSONAL_LICENSE_FAQ, COMMERCIAL_LICENSE_FAQ } from '@/data/faq/licensing'
import { FAQSection } from '@/components/seo/FAQSection'
import { OG_IMAGES, SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = generatePageMetadata({
  title:       'Pricing — Personal & Commercial Licensing',
  description: 'Personal and Commercial licensing collections are currently being prepared. Browse free assets in the meantime.',
  path:        '/pricing',
  ogImage:     OG_IMAGES.pricing,
})

export default function PricingPage() {
  const breadcrumbs = [
    { label: 'Home',    href: '/' },
    { label: 'Pricing', href: '/pricing' },
  ]

  return (
    <>
      <JsonLd schema={[
        webPageSchema({ title: `Pricing — ${SITE_NAME}`, path: '/pricing', description: 'Personal and Commercial licensing for WildPixel creative assets.' }),
        breadcrumbSchema(breadcrumbs),
      ]} />

      <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12 py-16 lg:py-24">
        <header className="text-center max-w-[600px] mx-auto mb-14">
          <span className="font-body text-eyebrow font-medium text-accent">Pricing</span>
          <h1 className="font-heading font-semibold text-display-lg text-text mt-3">
            Coming Soon
          </h1>
          <p className="font-body text-body-lg text-text-secondary mt-4">
            Personal and Commercial licensing collections are currently being prepared.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-6 max-w-[800px] mx-auto">
          {licensePlans.map(plan => (
            <div key={plan.id} id={plan.slug}
              className="relative flex flex-col rounded-lg border border-border-strong bg-bg-elevated p-8">
              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg-glass border border-border">
                <Clock size={11} className="text-text-tertiary" aria-hidden="true" />
                <span className="font-body text-label-sm text-text-tertiary">Coming Soon</span>
              </div>
              <h2 className="font-heading text-heading-md text-text pr-24">{plan.name}</h2>
              <p className="font-body text-body-sm text-text-secondary mt-2">{plan.tagline}</p>
              <p className="font-body text-body-sm text-text-secondary mt-5 leading-relaxed">{plan.description}</p>
              <ul className="flex flex-col gap-2.5 mt-6 mb-8 flex-1" aria-label={`${plan.name} features`}>
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check size={15} className="text-accent mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="font-body text-body-sm text-text-secondary">{f}</span>
                  </li>
                ))}
              </ul>
              <button type="button" disabled aria-disabled="true"
                className="w-full h-12 rounded-full bg-bg-glass border border-border font-body text-label-md text-text-tertiary cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          ))}
        </div>

        <p className="text-center font-body text-body-sm text-text-tertiary mt-12 max-w-[500px] mx-auto">
          Need commercial licensing now?{' '}
          <a href="/contact" className="text-accent hover:text-accent-2 transition-colors">Get in touch</a>
          {' '}— we handle enquiries directly.
        </p>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-16 max-w-[800px] mx-auto mt-20 pt-16 border-t border-border">
          <FAQSection id="personal-faq" heading="Personal License — FAQ" items={PERSONAL_LICENSE_FAQ} />
          <FAQSection id="commercial-faq" heading="Commercial License — FAQ" items={COMMERCIAL_LICENSE_FAQ} />
        </div>
      </div>
    </>
  )
}
