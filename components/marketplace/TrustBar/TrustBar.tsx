import { Sparkles, ShieldCheck, MessageSquare, Globe } from 'lucide-react'

const ITEMS = [
  { icon: Sparkles,      title: 'Curated Original Designs', subtitle: '100% Original & AI-assisted' },
  { icon: ShieldCheck,   title: 'Commercial Licensing',     subtitle: 'Clear. Transparent. Flexible.' },
  { icon: MessageSquare, title: 'Enquiry Based',             subtitle: 'Personalised for Your Brand' },
  { icon: Globe,         title: 'Global Use',                subtitle: 'For Brands Worldwide' },
]

export function TrustBar() {
  return (
    <div className="glass rounded-lg px-6 py-5">
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {ITEMS.map(({ icon: Icon, title, subtitle }) => (
          <div key={title} className="flex items-center gap-3">
            <div className="shrink-0 w-9 h-9 rounded-full bg-accent-subtle flex items-center justify-center text-accent">
              <Icon size={16} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <dt className="font-body text-body-sm font-medium text-text truncate">{title}</dt>
              <dd className="font-body text-caption text-text-tertiary truncate">{subtitle}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  )
}
