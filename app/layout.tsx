import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header }            from '@/components/layout/Header/Header'
import { Footer }            from '@/components/layout/Footer/Footer'
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider'
import { JsonLd }            from '@/components/seo/JsonLd'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import { SITE_URL, SITE_NAME, SITE_TAGLINE, OG_IMAGES } from '@/lib/constants'

// PRODUCTION: Replace system stacks with next/font/google
// import { Cormorant_Garamond, Inter } from 'next/font/google'
// Then add font variables to <html> className

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'Original illustrations, visual research, and creative storytelling. Botanical studies, editorial portraits, cultural artworks, and visual essays — from an independent studio in Delhi, India.',
  keywords: [
    'illustration',
    'botanical illustration',
    'editorial portrait',
    'visual research',
    'creative assets',
    'surface pattern',
    'India',
  ],
  authors:   [{ name: SITE_NAME, url: SITE_URL }],
  creator:   SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type:        'website',
    locale:      'en_IN',
    url:         SITE_URL,
    siteName:    SITE_NAME,
    title:       `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: 'Original illustrations, visual research, and creative storytelling by WildPixel.',
    images: [{
      url:    `${SITE_URL}${OG_IMAGES.homepage}`,
      width:  1200,
      height: 630,
      alt:    `${SITE_NAME} — original illustration and visual research`,
    }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: 'Original illustrations, visual research, and creative storytelling by WildPixel.',
    images:      [`${SITE_URL}${OG_IMAGES.homepage}`],
  },
  icons: {
    icon:  [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width:        'device-width',
  initialScale: 1,
  themeColor:   '#07070C',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />
        <AnalyticsProvider />
      </head>
      <body className="font-body text-text bg-bg min-h-screen flex flex-col antialiased">
        <a href="#main-content" className="skip-nav">Skip to main content</a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
