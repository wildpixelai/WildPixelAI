'use client'
/**
 * HeroCarousel
 * Wildpixel.ai — Configurable hero card fan carousel.
 *
 * Asset IDs and primaryIndex come from lib/hero-config.ts via props.
 * No asset IDs are hardcoded in this component.
 */
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { assetById } from '@/data/assets'
import { imageSizes } from '@/lib/image-utils'
import type { HeroConfig } from '@/lib/hero-config'

interface HeroCarouselProps {
  config: HeroConfig
}

export function HeroCarousel({ config }: HeroCarouselProps) {
  const heroAssets = config.assetIds
    .map(id => assetById(id))
    .filter((a): a is NonNullable<ReturnType<typeof assetById>> => Boolean(a))

  const primaryIndex = Math.min(config.primaryIndex, Math.max(0, heroAssets.length - 1))
  const [index, setIndex] = useState(primaryIndex)
  const reduce = useReducedMotion()

  const next = useCallback(
    () => setIndex(i => (i + 1) % heroAssets.length),
    [heroAssets.length],
  )
  const prev = useCallback(
    () => setIndex(i => (i - 1 + heroAssets.length) % heroAssets.length),
    [heroAssets.length],
  )

  useEffect(() => {
    if (reduce || heroAssets.length < 2) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [next, reduce, heroAssets.length])

  if (heroAssets.length === 0) return null

  const fan = heroAssets
    .map((asset, i) => {
      const offset = i - index
      const wrapped =
        offset > heroAssets.length / 2 ? offset - heroAssets.length :
        offset < -heroAssets.length / 2 ? offset + heroAssets.length : offset
      return { asset, offset: wrapped }
    })
    .filter(c => Math.abs(c.offset) <= 2)

  return (
    <div className="relative w-full" role="region" aria-roledescription="carousel" aria-label={config.label ?? 'Featured creative assets'}>
      <div className="relative h-[420px] sm:h-[460px] lg:h-[520px] w-full">
        <AnimatePresence initial={false}>
          {fan.map(({ asset, offset }) => (
            <motion.div
              key={asset.id}
              className="absolute top-1/2 left-1/2 w-[200px] sm:w-[230px] lg:w-[260px]"
              style={{ aspectRatio: asset.orientation === 'landscape' ? '4/3' : '3/4' }}
              initial={false}
              animate={{
                x:       `calc(-50% + ${offset * (reduce ? 0 : 150)}px)`,
                y:       '-50%',
                scale:   offset === 0 ? 1 : 0.86 - Math.abs(offset) * 0.04,
                rotate:  reduce ? 0 : offset * 4,
                opacity: Math.abs(offset) > 2 ? 0 : 1,
                zIndex:  10 - Math.abs(offset),
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link
                href={`/asset/${asset.id}`}
                className="group block w-full h-full rounded-lg overflow-hidden relative border border-border-strong shadow-glass transition-shadow duration-300 hover:shadow-glow"
                tabIndex={offset === 0 ? 0 : -1}
                aria-hidden={offset !== 0}
                aria-label={offset === 0 ? asset.title : undefined}
              >
                <Image
                  src={asset.image}
                  alt={offset === 0 ? asset.title : ''}
                  fill
                  sizes={imageSizes.heroCard}
                  priority={offset === 0}
                  className="object-cover object-center"
                />
                {/* Glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5 pointer-events-none" aria-hidden="true" />
                {offset === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="font-body text-label-md font-medium text-white truncate">{asset.title}</p>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {heroAssets.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            aria-label="Previous asset"
            onClick={prev}
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-text hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <span className="font-body text-caption text-text-tertiary tabular-nums" aria-live="polite" aria-atomic="true">
            {index + 1} / {heroAssets.length}
          </span>
          <button
            type="button"
            aria-label="Next asset"
            onClick={next}
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-text hover:bg-white/10 transition-colors"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
