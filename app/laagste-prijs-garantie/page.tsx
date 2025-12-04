import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prijs Match Garantie | De Budgetschilder",
  description: "Scherpere prijs gevonden? Wij matchen deze direct! Lees alles over onze prijs match garantie voor schilderwerk in Haaglanden.",
  keywords: "prijs match garantie, beste prijs schilderwerk, schilder garantie, prijsmatch",
  openGraph: {
    title: "Prijs Match Garantie | De Budgetschilder",
    description: "Scherpere prijs gevonden? Wij matchen deze direct! Onze prijs match garantie.",
    url: "https://debudgetschilder.nl/laagste-prijs-garantie",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/laagste-prijs-garantie"
  }
}

export default function LaagstePrijsGarantiePage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Onze Prijs Match Garantie
            </h1>
            
            <p className="text-2xl font-semibold text-muted-foreground mb-12">
              Zo zeker zijn we van onze scherpe prijzen.
            </p>

            <div className="prose prose-lg max-w-none">
              <div className="bg-muted p-8 rounded-lg mb-8">
                <p className="text-lg">
                  Dankzij onze unieke aanpak – waarbij we onze schilders veel werk leveren zodat zij scherp kunnen calculeren – zijn we ervan overtuigd dat u nergens anders een betere deal vindt voor hetzelfde professionele schilderwerk. Zo overtuigd zelfs, dat we u onze prijs match garantie bieden.
                </p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Hoe werkt het?</h2>
              <div className="bg-primary/5 p-8 rounded-lg border-2 border-primary/20 mb-8">
                <p className="text-xl font-semibold mb-4">
                  Heeft u via onze calculatie tool een prijsindicatie ontvangen, maar krijgt u elders een lagere offerte? Dan matchen we die prijs. Zo simpel is het.
                </p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">De spelregels</h2>
              <p className="text-lg mb-6">
                Om eerlijke concurrentie te waarborgen en u te beschermen, stellen we wel een paar logische voorwaarden:
              </p>

              <div className="space-y-6 mb-8">
                <div className="bg-background p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-bold mb-3 flex items-start gap-3">
                    <span className="text-primary">✓</span>
                    <span>Officiële offerte vereist</span>
                  </h3>
                  <p className="text-muted-foreground ml-8">
                    Stuur ons de concurrent offerte toe, zodat we deze kunnen vergelijken.
                  </p>
                </div>

                <div className="bg-background p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-bold mb-3 flex items-start gap-3">
                    <span className="text-primary">✓</span>
                    <span>Erkend bedrijf met KVK</span>
                  </h3>
                  <p className="text-muted-foreground ml-8">
                    De offerte moet afkomstig zijn van een officieel geregistreerd bedrijf. Geen cowboys of illegale constructies.
                  </p>
                </div>

                <div className="bg-background p-6 rounded-lg border border-border">
                  <h3 className="text-xl font-bold mb-3 flex items-start gap-3">
                    <span className="text-primary">✓</span>
                    <span>Vergelijkbaar werk</span>
                  </h3>
                  <p className="text-muted-foreground ml-8">
                    De offerte moet betrekking hebben op dezelfde werkzaamheden en kwaliteit.
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg mb-8">
                <p className="text-lg">
                  Wij werken alleen met vakbekwame, verzekerde schilders die volgens de regels opereren. Prijzen van illegale constructies kunnen we uiteraard niet matchen – daar wilt u zelf ook niet mee te maken hebben.
                </p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Zekerheid van A tot Z</h2>
              <div className="bg-primary/10 p-8 rounded-lg mb-12">
                <p className="text-xl font-semibold">
                  Met Budget Schilder krijgt u niet alleen de beste prijs, maar ook de zekerheid van professioneel werk, correcte afhandeling en geen verrassingen. Dat is pas echt voordelig.
                </p>
              </div>

              <div className="bg-muted p-8 rounded-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Klaar om te starten?</h2>
                <p className="text-lg mb-6">
                  Vul het formulier in en krijg binnen 30 seconden je prijsindicatie. Scherpere prijs gevonden? Wij matchen deze direct!
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link 
                    href="/#hero" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Direct prijsindicatie
                  </Link>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-background border-2 border-primary text-foreground rounded-lg font-semibold hover:bg-muted transition-colors"
                  >
                    Stel een vraag
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

