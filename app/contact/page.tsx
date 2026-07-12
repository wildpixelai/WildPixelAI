import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import { generatePageMetadata } from '@/lib/metadata'
import { contactPageSchema, breadcrumbSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { ContactForm } from './ContactForm'
import { OG_IMAGES, CONTACT, SOCIAL } from '@/lib/constants'

export const metadata: Metadata = generatePageMetadata({
  title:       "Let's Talk — Licensing, Commissions & Collaborations",
  description: "Questions about licensing, collaborations, commissions, or future collections are always welcome. Get in touch with WildPixel.",
  path:        '/contact',
  ogImage:     OG_IMAGES.contact,
})

export default function ContactPage() {
  const breadcrumbs = [
    { label: 'Home',    href: '/' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <JsonLd schema={[contactPageSchema(), breadcrumbSchema(breadcrumbs)]} />

      <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16">

          {/* Left column — contact info */}
          <div>
            <span className="font-body text-eyebrow font-medium text-accent">Contact</span>
            <h1 className="font-heading font-semibold text-display-lg text-text mt-3">
              Let&rsquo;s Talk
            </h1>
            <p className="font-body text-body-lg text-text-secondary mt-4 max-w-[420px]">
              Questions about licensing, collaborations, commissions, or future collections are
              always welcome.
            </p>

            {/* Email */}
            <div className="flex flex-col gap-4 mt-10">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center text-accent shrink-0">
                  <Mail size={16} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-body text-caption text-text-tertiary">Email</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="font-body text-body-md text-text hover:text-accent transition-colors duration-150"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Social profiles */}
            <div className="mt-10">
              <h2 className="font-body text-label-sm font-semibold text-text uppercase tracking-widest mb-5">
                Follow WildPixel
              </h2>

              <ul className="flex flex-col gap-4" role="list">

                {/* Primary Pinterest */}
                <li>
                  <a
                    href={SOCIAL.pinterest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL.pinterest.ariaLabel}
                    className="flex items-start gap-3 group"
                  >
                    <span className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center text-accent shrink-0 mt-0.5">
                      {/* Pinterest icon — inline SVG, no external library dependency */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                      </svg>
                    </span>
                    <div>
                      <p className="font-body text-body-md text-text group-hover:text-accent transition-colors duration-150">
                        {SOCIAL.pinterest.name}
                      </p>
                      <p className="font-body text-caption text-text-tertiary mt-0.5">
                        {SOCIAL.pinterest.description}
                      </p>
                    </div>
                  </a>
                </li>

                {/* Secondary Pinterest — deco extension, clearly labelled */}
                <li>
                  <a
                    href={SOCIAL.pinterestDeco.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL.pinterestDeco.ariaLabel}
                    className="flex items-start gap-3 group"
                  >
                    <span className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center text-accent shrink-0 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                      </svg>
                    </span>
                    <div>
                      <p className="font-body text-body-md text-text group-hover:text-accent transition-colors duration-150">
                        {SOCIAL.pinterestDeco.name}
                        <span className="font-body text-caption text-text-tertiary ml-2 font-normal">
                          Home &amp; Decor Collection
                        </span>
                      </p>
                      <p className="font-body text-caption text-text-tertiary mt-0.5">
                        {SOCIAL.pinterestDeco.description}
                      </p>
                    </div>
                  </a>
                </li>

                {/* Instagram */}
                <li>
                  <a
                    href={SOCIAL.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL.instagram.ariaLabel}
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center text-accent shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <circle cx="12" cy="12" r="4"/>
                        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                      </svg>
                    </span>
                    <div>
                      <p className="font-body text-body-md text-text group-hover:text-accent transition-colors duration-150">
                        {SOCIAL.instagram.name}
                      </p>
                      <p className="font-body text-caption text-text-tertiary">Instagram</p>
                    </div>
                  </a>
                </li>

                {/* Facebook */}
                <li>
                  <a
                    href={SOCIAL.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL.facebook.ariaLabel}
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center text-accent shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </span>
                    <div>
                      <p className="font-body text-body-md text-text group-hover:text-accent transition-colors duration-150">
                        {SOCIAL.facebook.name}
                      </p>
                      <p className="font-body text-caption text-text-tertiary">Facebook</p>
                    </div>
                  </a>
                </li>

              </ul>
            </div>
          </div>

          {/* Right column — contact form */}
          <ContactForm />
        </div>

        {/* ── Continue exploring ───────────────────────────────────────── */}
        <nav aria-label="Continue exploring" className="mt-20 pt-10 border-t border-border flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/collections" className="inline-flex items-center gap-1.5 font-body text-label-md text-text hover:text-accent transition-colors group">
            Browse Collections
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
          <Link href="/journal" className="inline-flex items-center gap-1.5 font-body text-label-md text-text hover:text-accent transition-colors group">
            Read the Journal
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
          <Link href="/resources" className="inline-flex items-center gap-1.5 font-body text-label-md text-text hover:text-accent transition-colors group">
            Explore Resources
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </>
  )
}
