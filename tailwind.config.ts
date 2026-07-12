import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT:  'var(--color-bg)',
          elevated: 'var(--color-bg-elevated)',
          glass:    'var(--color-bg-glass)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          strong:  'var(--color-border-strong)',
          focus:   'var(--color-border-focus)',
        },
        text: {
          DEFAULT:   'var(--color-text)',
          secondary: 'var(--color-text-secondary)',
          tertiary:  'var(--color-text-tertiary)',
          inverse:   'var(--color-text-inverse)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          2:       'var(--color-accent-2)',
          blue:    'var(--color-accent-blue)',
          subtle:  'var(--color-accent-subtle)',
        },
        free: 'var(--color-free)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem',   { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'display-xl':  ['3.5rem',   { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        'display-lg':  ['2.75rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'heading-xl':  ['2.25rem',  { lineHeight: '1.2',  letterSpacing: '-0.02em' }],
        'heading-lg':  ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        'heading-md':  ['1.5rem',   { lineHeight: '1.3',  letterSpacing: '-0.01em' }],
        'heading-sm':  ['1.25rem',  { lineHeight: '1.35' }],
        'body-xl':     ['1.25rem',  { lineHeight: '1.65' }],
        'body-lg':     ['1.125rem', { lineHeight: '1.65' }],
        'body-md':     ['1rem',     { lineHeight: '1.6'  }],
        'body-sm':     ['0.9375rem',{ lineHeight: '1.55' }],
        'label-lg':    ['0.9375rem',{ lineHeight: '1.4', letterSpacing: '0.02em' }],
        'label-md':    ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'label-sm':    ['0.8125rem',{ lineHeight: '1.4', letterSpacing: '0.04em' }],
        'caption':     ['0.8125rem',{ lineHeight: '1.5'  }],
        'eyebrow':     ['0.8125rem',{ lineHeight: '1.4', letterSpacing: '0.18em' }],
      },
      borderRadius: {
        'sm':  '8px',
        'md':  '14px',
        'lg':  '20px',
        'xl':  '28px',
        '2xl': '36px',
      },
      boxShadow: {
        'glass':   '0 8px 32px -8px rgba(0,0,0,0.5)',
        'glow':    '0 0 40px -10px rgba(124,92,252,0.4)',
        'lift':    '0 16px 48px -12px rgba(0,0,0,0.6)',
      },
      maxWidth: {
        'site': '1440px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}

export default config
