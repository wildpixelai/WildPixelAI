/**
 * components/ui/CustomCursor/CustomCursor.tsx
 *
 * PLACEHOLDER — NOT CURRENTLY USED ANYWHERE.
 *
 * Context: a request asked to restore an original custom cursor. A full
 * repository search (cursor state, mousemove handlers, any file or folder
 * containing "cursor") found no trace of one. It does not exist in this
 * project — not deleted, not renamed, just never present in what's here.
 *
 * Per instruction, this is NOT invented from scratch. What's here instead is
 * a structural placeholder with the one piece of real, non-fabricated logic
 * the brief specifically called for — disabling on touch devices — wired up
 * and ready, but rendering nothing until real cursor visuals exist.
 *
 * To finish this component: replace the `return null` below with the actual
 * cursor visual (dot, ring, trail — whatever the original was), driven by the
 * `position` state already tracked here. Then mount `<CustomCursor />` once,
 * near the root of app/layout.tsx, alongside <Header> and <Footer>.
 */
'use client'
import { useEffect, useState } from 'react'

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isTouchDevice()) return // never enable on touch devices, per spec
    setEnabled(true)

    const handleMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  if (!enabled) return null

  // Intentionally renders nothing yet — see file header. `position` is
  // tracked and ready; only the visual is missing.
  void position
  return null
}
