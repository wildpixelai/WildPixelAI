/**
 * components/ui/OrbitalLogo/OrbitalLogo.tsx
 *
 * PLACEHOLDER — NOT CURRENTLY USED ANYWHERE.
 *
 * Context: a request asked to "restore" an original orbital animated logo.
 * A full repository search (component names, animation keyframes, SVG/canvas
 * logo assets, any file or folder containing "orbital", "cursor", or
 * "animated-logo") found no trace of one. It does not exist in this project
 * — not deleted, not renamed, just never present in what's here.
 *
 * Per instruction, this is NOT recreated from memory or invented. What's here
 * instead is a structural placeholder so the real animation can be dropped in
 * later without any other file needing to change:
 *
 *   - components/layout/Header/Header.tsx currently renders the logo as a
 *     static gradient circle (see the `<span>` with `bg-gradient-to-br
 *     from-accent-blue via-accent to-accent-2` right before the site name).
 *     That markup is intentionally left untouched by this placeholder.
 *   - When the real orbital logo asset/animation is available (source file,
 *     Lottie/SVG export, or a description precise enough to reconstruct),
 *     implement it inside this component and swap the `<span>` in Header.tsx
 *     for `<OrbitalLogo />`. No other file needs to know this component exists
 *     until that swap happens.
 *
 * Until then, this renders exactly the same static gradient circle Header.tsx
 * already uses, so importing it is a safe no-op — not a second, competing
 * logo implementation.
 */

interface OrbitalLogoProps {
  className?: string
}

export function OrbitalLogo({ className = '' }: OrbitalLogoProps) {
  return (
    <span
      className={`w-9 h-9 rounded-full bg-gradient-to-br from-accent-blue via-accent to-accent-2 shrink-0 ${className}`}
      aria-hidden="true"
    />
  )
}
