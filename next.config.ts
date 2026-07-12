import type { NextConfig } from 'next'

const config: NextConfig = {
  // Output: static export compatible with Cloudflare Pages
  // Remove 'export' to enable dynamic routes / API when needed
  // output: 'export',

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Strict mode in development
  reactStrictMode: true,

  // Suppress Next.js x-powered-by header
  poweredByHeader: false,

  // Allow SVG in next/image (placeholder images)
  experimental: {
    // optimizePackageImports: tree-shakes lucide-react
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default config
