'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/constants'

const NAV = [
  { label: 'Creative Library', href: '/library' },
  { label: 'Collections',      href: '/collections' },
  { label: 'Pricing',          href: '/pricing' },
  { label: 'Resources',        href: '/resources' },
  { label: 'About',            href: '/about' },
  { label: 'Contact',          href: '/contact' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-glass border-b border-border">
        <div className="mx-auto max-w-site px-6 md:px-8 lg:px-12 h-[72px] flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <span className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-blue via-accent to-accent-2 shrink-0" aria-hidden="true" />
            <span className="flex flex-col leading-none">
              <span className="font-heading text-heading-sm text-text">{SITE_NAME}</span>
              <span className="font-body text-[10px] text-text-tertiary tracking-wide mt-0.5 hidden sm:block">{SITE_TAGLINE}</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1">
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={cn(
                  'px-3.5 py-2 rounded-full font-body text-label-md transition-colors duration-150',
                  pathname === item.href
                    ? 'text-text bg-white/5'
                    : 'text-text-secondary hover:text-text hover:bg-white/5',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              aria-label="Search"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-text transition-colors duration-150"
            >
              <Search size={16} />
            </button>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-bg-glass border border-border-strong
                font-body text-label-md text-text hover:bg-white/10 transition-colors duration-150"
            >
              View Licensing
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(v => !v)}
            className="lg:hidden w-10 h-10 rounded-full glass flex items-center justify-center text-text"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 bg-bg flex flex-col pt-[72px]"
        >
          <nav className="flex flex-col p-6 gap-1" aria-label="Mobile navigation">
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={cn(
                  'px-4 py-3.5 rounded-lg font-body text-body-lg transition-colors duration-150',
                  pathname === item.href ? 'text-text bg-white/5 font-medium' : 'text-text-secondary hover:text-text hover:bg-white/5',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
