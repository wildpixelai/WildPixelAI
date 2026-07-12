import Link from 'next/link'
import { cn } from '@/lib/cn'
import { ArrowRight } from 'lucide-react'

interface SectionHeaderProps {
  id?: string
  eyebrow?: string
  heading: string
  headingLevel?: 'h1' | 'h2' | 'h3'
  subheading?: string
  cta?: { label: string; href: string }
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  id, eyebrow, heading, headingLevel: Tag = 'h2',
  subheading, cta, align = 'left', className,
}: SectionHeaderProps) {
  return (
    <div className={cn(
      'flex flex-col gap-3',
      align === 'center' && 'items-center text-center',
      align === 'left'   && 'items-start',
      className,
    )}>
      {eyebrow && (
        <span className="font-body text-eyebrow font-medium uppercase text-text-tertiary">
          {eyebrow}
        </span>
      )}

      <Tag id={id} className="font-heading font-semibold text-heading-xl text-text max-w-[640px]">
        {heading}
      </Tag>

      {subheading && (
        <p className="font-body text-body-lg text-text-secondary max-w-[540px]">
          {subheading}
        </p>
      )}

      {cta && (
        <Link
          href={cta.href}
          className="inline-flex items-center gap-1.5 text-label-md font-medium mt-1 text-accent hover:text-accent-2 transition-colors duration-150 group"
        >
          {cta.label}
          <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
