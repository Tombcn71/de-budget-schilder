import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "Budget Kozijnenshop - Nieuwe Raamkozijnen voor de Laagste Prijs",
  description:
    "Vindt u een goedkopere offerte? Wij betalen u het verschil terug. Direct een prijsindicatie met AI en preview van uw nieuwe kozijnen.",
  generator: "v0.app",
  keywords: "raamkozijnen, kunststof kozijnen, houten kozijnen, aluminium kozijnen, kozijn plaatsen, kozijn prijzen, kunststof ramen",
  authors: [{ name: "Budget Kozijnenshop" }],
  openGraph: {
    title: "Budget Kozijnenshop - Nieuwe Raamkozijnen voor de Laagste Prijs",
    description: "Vindt u een goedkopere offerte? Wij betalen u het verschil terug. Direct een prijsindicatie met AI.",
    url: "https://budgetkozijnenshop.nl",
    siteName: "Budget Kozijnenshop",
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Budget Kozijnenshop - Nieuwe Raamkozijnen voor de Laagste Prijs",
    description: "Vindt u een goedkopere offerte? Wij betalen u het verschil terug.",
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
