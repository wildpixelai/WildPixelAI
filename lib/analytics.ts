/**
 * lib/analytics.ts
 * Wildpixel.ai — Analytics Event Helpers
 *
 * All analytics calls are gated on window.gtag / window.clarity existing.
 * No IDs are hardcoded — they are injected via the AnalyticsProvider component.
 * Add new event helpers here following the same pattern.
 *
 * Event taxonomy:
 *   view_asset       — user lands on an asset detail page
 *   download_asset   — user initiates a download
 *   view_collection  — user lands on a collection page
 *   search           — user submits a search query
 *   filter           — user changes a filter
 *   license_click    — user clicks a license CTA
 *   contact_submit   — user submits the contact form
 */


// ── Type declarations ─────────────────────────────────────────────────────────

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void
    clarity?: (command: string, ...args: unknown[]) => void
  }
}

// ── Base event dispatcher ────────────────────────────────────────────────────

function fireEvent(eventName: string, params: Record<string, unknown>) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
  // Microsoft Clarity custom events
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity('set', eventName, JSON.stringify(params))
  }
  // Development: log events to console
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[analytics] ${eventName}`, params)
  }
}

// ── Event helpers ──────────────────────────────────────────────────────────────

/** Fired when a user views an asset detail page. */
export function trackViewAsset(assetId: string, assetTitle: string, category: string, license: string) {
  fireEvent('view_asset', {
    asset_id:    assetId,
    asset_title: assetTitle,
    category,
    license,
  })
}

/**
 * Fired when a user initiates a download.
 * The download_count is mocked client-side; connect NEXT_PUBLIC_DOWNLOAD_API_URL
 * in .env.local to wire a real backend counter without changing this call site.
 */
export function trackDownloadAsset(assetId: string, assetTitle: string, license: string) {
  fireEvent('download_asset', {
    asset_id:    assetId,
    asset_title: assetTitle,
    license,
  })
  // Backend counter — no-op if env var not set
  const apiUrl = process.env.NEXT_PUBLIC_DOWNLOAD_API_URL
  if (apiUrl) {
    fetch(`${apiUrl}/${assetId}`, { method: 'POST', keepalive: true }).catch(() => {
      // Silently fail — analytics should never break the UI
    })
  }
}

/** Fired when a user views a collection page. */
export function trackViewCollection(collectionId: string, collectionTitle: string) {
  fireEvent('view_collection', {
    collection_id:    collectionId,
    collection_title: collectionTitle,
  })
}

/** Fired when a user submits a search query. */
export function trackSearch(query: string, resultCount: number) {
  fireEvent('search', {
    search_term:   query,
    result_count:  resultCount,
  })
}

/** Fired when a user changes a filter value. */
export function trackFilter(filterName: string, filterValue: string) {
  fireEvent('filter', {
    filter_name:  filterName,
    filter_value: filterValue,
  })
}

/** Fired when a user clicks a license CTA (Pricing, Contact). */
export function trackLicenseClick(tierName: string, source: string) {
  fireEvent('license_click', {
    tier:   tierName,
    source,
  })
}

/** Fired when a user submits the contact form. */
export function trackContactSubmit(enquiryType: string) {
  fireEvent('contact_submit', {
    enquiry_type: enquiryType,
  })
}
