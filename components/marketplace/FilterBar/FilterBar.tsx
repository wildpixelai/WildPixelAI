'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/cn'

interface FilterDropdownProps {
  label: string
  options: readonly string[]
  value: string
  onChange: (value: string) => void
}

function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className={cn(
          'flex items-center gap-2 px-4 py-2.5 rounded-full',
          'bg-bg-glass border border-border hover:border-border-strong',
          'font-body text-label-md text-text-secondary hover:text-text',
          'transition-colors duration-150 whitespace-nowrap',
        )}
      >
        {label}{value !== 'All' && value ? `: ${value}` : ''}
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute top-full mt-2 left-0 z-30 min-w-[180px] max-h-64 overflow-y-auto glass rounded-md shadow-glass p-1.5"
        >
          {options.map(opt => (
            <li key={opt}>
              <button
                type="button"
                role="option"
                aria-selected={value === opt}
                onClick={() => { onChange(opt); setOpen(false) }}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-sm font-body text-body-sm transition-colors duration-150',
                  value === opt ? 'bg-accent-subtle text-accent' : 'text-text-secondary hover:bg-white/5 hover:text-text',
                )}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

interface FilterBarProps {
  license: string
  style: string
  color: string
  theme: string
  sort: string
  onLicenseChange: (v: string) => void
  onStyleChange: (v: string) => void
  onColorChange: (v: string) => void
  onThemeChange: (v: string) => void
  onSortChange: (v: string) => void
  licenseOptions: readonly string[]
  styleOptions: readonly string[]
  colorOptions: readonly string[]
  themeOptions: readonly string[]
  sortOptions: readonly string[]
}

export function FilterBar(props: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
      <FilterDropdown label="License" options={props.licenseOptions} value={props.license} onChange={props.onLicenseChange} />
      <FilterDropdown label="Style"   options={props.styleOptions}   value={props.style}   onChange={props.onStyleChange} />
      <FilterDropdown label="Color"   options={props.colorOptions}   value={props.color}   onChange={props.onColorChange} />
      <FilterDropdown label="Theme"   options={props.themeOptions}   value={props.theme}   onChange={props.onThemeChange} />
      <FilterDropdown label="Sort"    options={props.sortOptions}    value={props.sort}    onChange={props.onSortChange} />
      <button
        type="button"
        aria-label="More filters"
        className="shrink-0 w-10 h-10 rounded-full bg-bg-glass border border-border hover:border-border-strong flex items-center justify-center text-text-secondary hover:text-text transition-colors duration-150"
      >
        <SlidersHorizontal size={15} />
      </button>
    </div>
  )
}
