/**
 * AnalyticsProvider
 * Wildpixel.ai — Injects analytics scripts and GSC verification.
 *
 * Rendered in app/layout.tsx inside <head>.
 * All IDs come from environment variables — nothing hardcoded.
 * If an env var is empty, that script is simply not rendered.
 * Uses Next.js <Script> with strategy="afterInteractive" to avoid
 * blocking LCP or INP.
 */
import Script from 'next/script'

const GA_ID       = process.env.NEXT_PUBLIC_GA_ID ?? ''
const CLARITY_ID  = process.env.NEXT_PUBLIC_CLARITY_ID ?? ''
const GSC_TOKEN   = process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? ''

export function AnalyticsProvider() {
  return (
    <>
      {/* Google Search Console site verification */}
      {GSC_TOKEN && (
        <meta name="google-site-verification" content={GSC_TOKEN} />
      )}

      {/* Google Analytics 4 */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `}
          </Script>
        </>
      )}

      {/* Microsoft Clarity */}
      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}
    </>
  )
}
