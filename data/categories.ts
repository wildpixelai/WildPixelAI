// data/categories.ts
import type { Category } from "@/types/marketplace"

export const categories: Category[] = [
  { id: "all",              slug: "all",               label: "All",               description: "Every asset in the library.",                       order: 0 },
  { id: "patterns",         slug: "patterns",          label: "Patterns",          description: "Seamless surface patterns and repeats.",            order: 1 },
  { id: "illustrations",    slug: "illustrations",     label: "Illustrations",     description: "Original illustrated artwork and editorial pieces.", order: 2 },
  { id: "wall-art",         slug: "wall-art",          label: "Wall Art",          description: "Printable fine art for framing and display.",       order: 3 },
  { id: "phone-wallpapers", slug: "phone-wallpapers",  label: "Phone Wallpapers",  description: "Mobile-ready wallpapers and lock screen art.",      order: 4 },
  { id: "journal-covers",   slug: "journal-covers",    label: "Journal Covers",    description: "Cover art for notebooks, planners, and journals.",  order: 5 },
  { id: "surface-design",   slug: "surface-design",    label: "Surface Design",    description: "Repeat-ready textile and product surface designs.", order: 6 },
  { id: "spiritual-art",    slug: "spiritual-art",     label: "Spiritual Art",     description: "Devotional and folk-art inspired illustration.",    order: 7 },
  { id: "photography",      slug: "photography",       label: "Photography",      description: "Original photographic studies and macro work.",    order: 8 },
]

export const categoryById = (id: string) => categories.find(c => c.id === id)
