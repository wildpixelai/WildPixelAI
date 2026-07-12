'use client'
import { cn } from '@/lib/cn'
import type { Category } from '@/types/marketplace'

interface CategoryTabsProps {
  categories: Category[]
  active: string
  onChange: (id: string) => void
}

export function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Asset categories"
      className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
    >
      {categories.map(cat => {
        const isActive = active === cat.id
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.id)}
            className={cn(
              'shrink-0 px-4 py-2 rounded-full font-body text-label-md font-medium whitespace-nowrap',
              'border transition-all duration-200',
              isActive
                ? 'bg-text text-text-inverse border-text'
                : 'bg-bg-glass text-text-secondary border-border hover:border-border-strong hover:text-text',
            )}
          >
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
