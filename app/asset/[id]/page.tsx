import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/lib/metadata'
import {
  assetCreativeWorkSchema,
  assetImageObjectSchema,
  breadcrumbSchema,
} from '@/lib/schema'
import { assets, assetById, relatedAssets } from '@/data/assets'
import { collections }   from '@/data/collections'
import { categoryById }  from '@/data/categories'
import { AssetDetailClient } from './AssetDetailClient'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE_URL } from '@/lib/constants'

export function generateStaticParams() {
  return assets.map(a => ({ id: a.id }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
): Promise<Metadata> {
  const { id } = await params
  const asset = assetById(id)
  if (!asset) return generatePageMetadata({ title: 'Asset not found', description: '', noindex: true })
  return generatePageMetadata({
    title:       `${asset.title} — ${asset.subtitle}`,
    description: asset.description.slice(0, 160),
    path:        `/asset/${asset.id}`,
    ogImage:     asset.image,
    type:        'article',
  })
}

export default async function AssetDetailPage(
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const asset = assetById(id)
  if (!asset) notFound()

  const category   = categoryById(asset.category)
  const collection = collections.find(c => c.id === asset.collection)
  const related    = relatedAssets(asset)

  const breadcrumbs = [
    { label: 'Home',            href: '/' },
    { label: 'Creative Library', href: '/library' },
    ...(category ? [{ label: category.label, href: `/library?category=${category.id}` }] : []),
    { label: asset.title,       href: `/asset/${asset.id}` },
  ]

  return (
    <>
      <JsonLd schema={[
        assetCreativeWorkSchema(asset),
        assetImageObjectSchema(asset),
        breadcrumbSchema(breadcrumbs),
      ]} />
      <AssetDetailClient
        asset={asset}
        category={category}
        collection={collection}
        related={related}
        breadcrumbs={breadcrumbs}
        siteUrl={SITE_URL}
      />
    </>
  )
}
