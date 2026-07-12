'use client'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface ButtonProps {
  variant?:     'primary' | 'secondary' | 'ghost'
  size?:        'sm' | 'md' | 'lg'
  href?:        string
  target?:      '_blank'
  icon?:        ReactNode
  iconPosition?: 'left' | 'right'
  disabled?:    boolean
  fullWidth?:   boolean
  onClick?:     () => void
  children:     ReactNode
  className?:   string
  type?:        'button' | 'submit'
}

const variants = {
  primary:   'gradient-accent text-white hover:brightness-110 active:scale-[0.98] shadow-glow',
  secondary: 'bg-bg-glass border border-border-strong text-text hover:bg-white/10 active:scale-[0.98]',
  ghost:     'text-text-secondary hover:text-text hover:bg-white/5 active:scale-[0.98]',
}

const sizes = {
  sm: 'h-9  px-4 text-label-sm gap-1.5 rounded-full',
  md: 'h-11 px-5 text-label-md gap-2   rounded-full',
  lg: 'h-12 px-7 text-label-md gap-2.5 rounded-full',
}

export function Button({
  variant = 'primary', size = 'md',
  href, target, icon, iconPosition = 'right',
  disabled, fullWidth, onClick,
  children, className, type = 'button',
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-body font-medium',
    'transition-all duration-200 ease-smooth select-none whitespace-nowrap',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
    'min-h-[44px] min-w-[44px]',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    disabled && 'opacity-50 pointer-events-none',
    className,
  )

  const content = (
    <>
      {icon && iconPosition === 'left' && <span aria-hidden="true">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span aria-hidden="true">{icon}</span>}
    </>
  )

  if (href) {
    return (
      <Link href={href} target={target} className={classes} onClick={onClick}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  )
}
