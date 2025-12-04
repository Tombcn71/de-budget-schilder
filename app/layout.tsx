import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { localBusinessSchema, faqSchema, websiteSchema } from "@/lib/schema"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "Schilder Haaglanden met Prijs Match Garantie",
  description:
    "Schilder Haaglanden nodig? Prijs Match Garantie. Direct prijsindicatie. Actief in Den Haag, Delft, Zoetermeer en meer.",
  generator: "v0.app",
  keywords: "schilder den haag, schilderwerk den haag, schilder haaglanden, schilder delft, schilder zoetermeer, schilder rijswijk, schilder westland, schilder scheveningen, binnen schilderen den haag, buiten schilderen den haag, kozijnen schilderen den haag, schilder prijzen den haag, goedkope schilder den haag, schildersbedrijf den haag, huis laten schilderen den haag, woning schilderen den haag, muren verven den haag, plafond schilderen den haag, schilder leidschendam, schilder voorburg",
  authors: [{ name: "De Budgetschilder" }],
  openGraph: {
    title: "Schilder Haaglanden | De Budgetschilder - Prijs Match Garantie",
    description: "Schilder in Haaglanden nodig? Scherpere prijs gevonden? Wij matchen deze direct! Direct prijsindicatie. Actief in 23 gemeentes: Den Haag, Delft, Leiden, Zoetermeer, Rijswijk en heel Haaglanden.",
    url: "https://debudgetschilder.nl",
    siteName: "De Budgetschilder Haaglanden",
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schilder Haaglanden | De Budgetschilder - Prijs Match Garantie",
    description: "Schilder in Haaglanden nodig? 23 gemeentes, één prijs match garantie. Den Haag, Delft, Leiden, Zoetermeer en meer!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://debudgetschilder.nl"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        
        {/* Structured Data for SEO and AI Overviews */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        {/* Facebook Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '625546493283016');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=625546493283016&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://assets.calendly.com/assets/external/widget.css';
                document.head.appendChild(link);
                
                var script = document.createElement('script');
                script.src = 'https://assets.calendly.com/assets/external/widget.js';
                script.async = true;
                document.body.appendChild(script);
              });
            `
          }}
        />
      </body>
    </html>
  )
}
