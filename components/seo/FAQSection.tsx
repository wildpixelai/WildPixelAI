import { JsonLd } from '@/components/seo/JsonLd'
import { faqSchema } from '@/lib/schema'
import type { FAQItem } from '@/data/faq/general'

interface FAQSectionProps {
  id:       string
  heading:  string
  items:    FAQItem[]
  intro?:   string
  className?: string
}

/**
 * Renders a visible FAQ block and its matching FAQPage schema together.
 * Schema-only FAQ (structured data with no corresponding visible text) is
 * against Google's FAQ rich-result guidelines — this component makes that
 * mistake structurally impossible by always pairing the two.
 */
export function FAQSection({ id, heading, items, intro, className = '' }: FAQSectionProps) {
  if (items.length === 0) return null

  return (
    <section id={id} className={className} aria-labelledby={`${id}-heading`}>
      <JsonLd schema={faqSchema(items)} />
      <h2 id={`${id}-heading`} className="font-heading text-heading-lg text-text mb-2">
        {heading}
      </h2>
      {intro && (
        <p className="font-body text-body-sm text-text-secondary mb-6 max-w-[640px]">{intro}</p>
      )}
      <dl className={`divide-y divide-border ${intro ? '' : 'mt-8'}`}>
        {items.map(item => (
          <div key={item.id} className="py-6">
            <dt className="font-body text-body-md font-medium text-text mb-2">
              {item.question}
            </dt>
            <dd className="font-body text-body-sm text-text-secondary leading-relaxed">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
