import { cn } from '@/lib/cn'

interface BadgeProps {
  children:  React.ReactNode
  variant?:  'default' | 'accent' | 'success' | 'muted'
  size?:     'sm' | 'md'
  className?: string
}

const variants = {
  default: 'bg-bg-muted text-text-secondary border border-border',
  accent:  'bg-accent-subtle text-accent border border-accent/20',
  success: 'bg-green-50 text-green-700 border border-green-200',
  muted:   'bg-bg-subtle text-text-tertiary border border-border',
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center font-body font-medium rounded-sm',
      size === 'sm' ? 'px-2 py-0.5 text-label-sm' : 'px-2.5 py-1 text-label-md',
      variants[variant],
      className,
    )}>
      {children}
    </span>
  )
}
