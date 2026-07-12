import Link from 'next/link'
import { SITE_NAME, SOCIAL, CONTACT } from '@/lib/constants'

const NAV_COLUMNS = [
  {
    heading: 'Library',
    links: [
      { label: 'Creative Library', href: '/library' },
      { label: 'Collections',      href: '/collections' },
      { label: 'Search',           href: '/search' },
    ],
  },
  {
    heading: 'Licensing',
    links: [
      { label: 'Pricing',            href: '/pricing' },
      { label: 'Personal License',   href: '/pricing#personal' },
      { label: 'Commercial License', href: '/pricing#commercial' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Journal',  href: '/journal' },
      { label: 'FAQ',      href: '/resources#faq' },
      { label: 'About',    href: '/about' },
      { label: 'Contact',  href: '/contact' },
    ],
  },
]

// Inline SVG icons — no external icon library needed in a Server Component
const PinterestIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
)

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border mt-auto" role="contentinfo">
      <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label={`${SITE_NAME} — Home`}
            >
              <span
                className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue via-accent to-accent-2 shrink-0"
                aria-hidden="true"
              />
              <span className="font-heading text-heading-sm text-text">{SITE_NAME}</span>
            </Link>

            <p className="font-body text-body-sm text-text-secondary mt-3 max-w-[280px]">
              Original illustrations, visual research, and creative storytelling by WildPixel.
            </p>

            {/* Follow section */}
            <div className="mt-6">
              <h3 className="font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-3">
                Follow
              </h3>

              {/* Primary social icons — Pinterest (main), Instagram, Facebook */}
              <div className="flex items-center gap-3">
                <a
                  href={SOCIAL.pinterest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={SOCIAL.pinterest.ariaLabel}
                  className="w-9 h-9 rounded-full bg-bg-glass border border-border flex items-center justify-center text-text-secondary hover:text-text hover:border-border-strong transition-colors duration-150"
                >
                  <PinterestIcon />
                </a>

                <a
                  href={SOCIAL.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={SOCIAL.instagram.ariaLabel}
                  className="w-9 h-9 rounded-full bg-bg-glass border border-border flex items-center justify-center text-text-secondary hover:text-text hover:border-border-strong transition-colors duration-150"
                >
                  <InstagramIcon />
                </a>

                <a
                  href={SOCIAL.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={SOCIAL.facebook.ariaLabel}
                  className="w-9 h-9 rounded-full bg-bg-glass border border-border flex items-center justify-center text-text-secondary hover:text-text hover:border-border-strong transition-colors duration-150"
                >
                  <FacebookIcon />
                </a>
              </div>

              {/* Deco Pinterest — text link only, below primary icons, not beside them */}
              <a
                href={SOCIAL.pinterestDeco.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={SOCIAL.pinterestDeco.ariaLabel}
                className="inline-block font-body text-caption text-text-tertiary hover:text-accent transition-colors duration-150 mt-2.5 underline underline-offset-2 decoration-text-tertiary hover:decoration-accent"
              >
                {SOCIAL.pinterestDeco.footerLabel}
              </a>
            </div>

            {/* Email */}
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-block font-body text-caption text-text-tertiary hover:text-text transition-colors duration-150 mt-4"
            >
              {CONTACT.email}
            </a>
          </div>

          {/* Nav columns */}
          {NAV_COLUMNS.map(col => (
            <div key={col.heading}>
              <h3 className="font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-4">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-body-sm text-text-secondary hover:text-text transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-body text-caption text-text-tertiary">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p className="font-body text-caption text-text-tertiary">Delhi, India</p>
        </div>
      </div>
    </footer>
  )
}
