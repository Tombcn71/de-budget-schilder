import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroAI } from "@/components/hero-ai"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { Breadcrumb } from "@/components/breadcrumb"
import { GoogleMap } from "@/components/google-map"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schilder Haaglanden met Prijs Match Garantie",
  description: "Schilder Haaglanden nodig? Prijs Match Garantie. Direct prijsindicatie. Den Haag, Delft, Zoetermeer en meer.",
  keywords: "schilder haaglanden, schilderwerk haaglanden, schilder den haag, schilder delft, schilder zoetermeer, schilder rijswijk, schilder westland, schilder leidschendam, schilder voorburg, schilder pijnacker, schilder nootdorp, schilder wassenaar, schilder midden-delfland",
  openGraph: {
    title: "Schilder Haaglanden | De Budgetschilder - Prijs Match Garantie",
    description: "Schilder in Haaglanden nodig? Scherpere prijs gevonden? Wij matchen deze direct! Direct prijsindicatie. Actief in Den Haag, Delft, Zoetermeer, Rijswijk en heel Haaglanden.",
    url: "https://debudgetschilder.nl/schilder-haaglanden",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/schilder-haaglanden"
  }
}

export default function HaaglandenPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Breadcrumb items={[
        { name: "Home", url: "https://debudgetschilder.nl" },
        { name: "Schilder Haaglanden", url: "https://debudgetschilder.nl/schilder-haaglanden" }
      ]} />
      <HeroAI 
        location="Haaglanden"
        title="Schilder Haaglanden met Prijs Match Garantie"
        description="Professioneel schilderwerk in heel Haaglanden tegen de scherpste prijs. Den Haag, Zoetermeer, Westland, Delft, Rijswijk en meer. Scherpere prijs gevonden? Wij matchen deze direct!"
      />
      
      {/* Gemeentes sectie */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
              Actief in heel Haaglanden - 23 Gemeentes
            </h2>
            <p className="text-center text-muted-foreground mb-8 text-lg">
              De Budgetschilder is uw partner voor professioneel schilderwerk in alle 23 gemeentes van de regio Haaglanden. Van Den Haag tot Leiden, van Delft tot Alphen aan den Rijn - overal dezelfde prijs match garantie!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Belangrijkste steden - met links */}
              <Link href="/schilder-den-haag" className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border hover:border-primary">
                <h3 className="font-bold text-xl mb-2">Den Haag</h3>
                <p className="text-muted-foreground text-sm">Schilderwerk in alle wijken van Den Haag</p>
              </Link>
              
              <Link href="/schilder-delft" className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border hover:border-primary">
                <h3 className="font-bold text-xl mb-2">Delft</h3>
                <p className="text-muted-foreground text-sm">Professioneel schilderwerk in Delft</p>
              </Link>
              
              <Link href="/schilder-zoetermeer" className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border hover:border-primary">
                <h3 className="font-bold text-xl mb-2">Zoetermeer</h3>
                <p className="text-muted-foreground text-sm">Schilders in Zoetermeer</p>
              </Link>
              
              <Link href="/schilder-rijswijk" className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border hover:border-primary">
                <h3 className="font-bold text-xl mb-2">Rijswijk</h3>
                <p className="text-muted-foreground text-sm">Schilderwerk in Rijswijk</p>
              </Link>
              
              {/* Rest van Haaglanden */}
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Leiden</h3>
                <p className="text-muted-foreground text-sm">Schilders in Leiden</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Westland</h3>
                <p className="text-muted-foreground text-sm">Naaldwijk, Monster, 's-Gravenzande</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Leidschendam-Voorburg</h3>
                <p className="text-muted-foreground text-sm">Schilderwerk in Leidschendam en Voorburg</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Pijnacker-Nootdorp</h3>
                <p className="text-muted-foreground text-sm">Schilders in Pijnacker en Nootdorp</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Lansingerland</h3>
                <p className="text-muted-foreground text-sm">Berkel en Rodenrijs, Bleiswijk, Bergschenhoek</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Wassenaar</h3>
                <p className="text-muted-foreground text-sm">Professioneel schilderwerk in Wassenaar</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Voorschoten</h3>
                <p className="text-muted-foreground text-sm">Schilders in Voorschoten</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Leiderdorp</h3>
                <p className="text-muted-foreground text-sm">Schilderwerk in Leiderdorp</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Oegstgeest</h3>
                <p className="text-muted-foreground text-sm">Schilders in Oegstgeest</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Katwijk</h3>
                <p className="text-muted-foreground text-sm">Schilderwerk in Katwijk</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Noordwijk</h3>
                <p className="text-muted-foreground text-sm">Schilders in Noordwijk</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Alphen aan den Rijn</h3>
                <p className="text-muted-foreground text-sm">Schilderwerk in Alphen aan den Rijn</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Waddinxveen</h3>
                <p className="text-muted-foreground text-sm">Schilders in Waddinxveen</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Midden-Delfland</h3>
                <p className="text-muted-foreground text-sm">Maassluis, Schipluiden</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Teylingen</h3>
                <p className="text-muted-foreground text-sm">Voorhout, Sassenheim, Warmond</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Hillegom</h3>
                <p className="text-muted-foreground text-sm">Schilderwerk in Hillegom</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Lisse</h3>
                <p className="text-muted-foreground text-sm">Schilders in Lisse</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Nieuwkoop</h3>
                <p className="text-muted-foreground text-sm">Schilderwerk in Nieuwkoop</p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold text-xl mb-2">Bodegraven-Reeuwijk</h3>
                <p className="text-muted-foreground text-sm">Schilders in Bodegraven en Reeuwijk</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FAQ />

      {/* Google Maps */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GoogleMap location="Haaglanden, Nederland" title="Onze Schilders Werken in Heel Haaglanden" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

