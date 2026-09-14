import { Header } from "@/components/header"
import { HeroAI } from "@/components/hero-ai"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"
import { FAQ } from "@/components/faq"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroAI
        location="Haaglanden"
        title="Schilder Haaglanden voor de Scherpste Prijs"
        description="Professioneel schilderwerk in heel Haaglanden tegen glasheldere, lage tarieven. Den Haag, Zoetermeer, Westland, Delft, Rijswijk en meer. Geen verborgen kosten, wel direct weten waar u aan toe bent."
        badge="🏆 Vaste Lage Prijzen & Directe Duidelijkheid"
      />

      {/* Diensten & Vaste Tarieven */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-10">
              Diensten & Vaste Tarieven
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                <h3 className="font-bold text-lg mb-2 text-foreground">Binnenschilderwerk</h3>
                <p className="text-sm text-muted-foreground">Muren, plafonds, kozijnen binnen</p>
              </div>
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                <h3 className="font-bold text-lg mb-2 text-foreground">Buitenschilderwerk</h3>
                <p className="text-sm text-muted-foreground">Gevel, kozijnen buiten, deuren</p>
              </div>
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                <h3 className="font-bold text-lg mb-2 text-foreground">Binnen & Buiten</h3>
                <p className="text-sm text-muted-foreground">Compleet schilderwerk binnen en buiten</p>
              </div>
            </div>

            <div className="bg-muted/30 p-6 lg:p-8 rounded-lg border border-border mb-12">
              <h3 className="text-xl font-bold mb-6 text-foreground text-center">Prijsoverzicht</h3>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-muted-foreground">
                <li className="flex justify-between border-b border-border py-2"><span>Muren (m²)</span><strong className="text-foreground">€12,50/m²</strong></li>
                <li className="flex justify-between border-b border-border py-2"><span>Plafond (m²)</span><strong className="text-foreground">€13,50/m²</strong></li>
                <li className="flex justify-between border-b border-border py-2"><span>Plinten (m¹)</span><strong className="text-foreground">€7,50/m¹</strong></li>
                <li className="flex justify-between border-b border-border py-2"><span>Lijstwerk (m¹)</span><strong className="text-foreground">€7,50/m¹</strong></li>
                <li className="flex justify-between border-b border-border py-2"><span>Binnenkozijnen</span><strong className="text-foreground">€100 per stuk</strong></li>
                <li className="flex justify-between border-b border-border py-2"><span>Buitenkozijnen</span><strong className="text-foreground">€125 per stuk</strong></li>
                <li className="flex justify-between border-b border-border py-2"><span>Binnendeuren</span><strong className="text-foreground">€100 per stuk</strong></li>
                <li className="flex justify-between border-b border-border py-2"><span>Buitendeuren</span><strong className="text-foreground">€125 per stuk</strong></li>
                <li className="flex justify-between border-b border-border py-2 sm:col-span-2 sm:max-w-[calc(50%-1rem)]"><span>Deurkozijnen</span><strong className="text-foreground">€40 per stuk</strong></li>
              </ul>
            </div>

            <div className="bg-primary/5 p-8 rounded-lg border border-primary/20 text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Direct Uw Prijs Berekenen</h3>
              <p className="text-lg text-muted-foreground">
                Vul uw gegevens en oppervlaktes in om direct een transparante prijsindicatie per e-mail te ontvangen. Geen langdurig wachten op offertes of ongemakkelijk onderhandelen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Geen Gedoe, Gewoon Scherpe Prijzen */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Geen Gedoe, Gewoon Scherpe Prijzen</h3>
            <div className="bg-background p-8 rounded-lg border border-border">
              <p className="text-lg text-muted-foreground">
                Met onze slimme calculatie tool weet u binnen enkele seconden wat uw schilderklus gaat kosten. Vul de details in en profiteer direct van een eerlijke prijs waar u meteen op kunt beslissen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Sectie */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
              Professioneel Schilderwerk in Heel Haaglanden
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              De Budgetschilder is uw specialist voor binnen- en buitenschilderwerk in alle gemeentes van de regio Haaglanden. Van Den Haag tot Midden-Delfland leveren wij strak schilderwerk voor een betaalbare prijs.
            </p>

            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4 text-foreground">Waarom Kiezen Voor De Budgetschilder?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>✓ <strong className="text-foreground">Direct een prijsindicatie</strong> binnen 30 seconden</li>
                <li>✓ <strong className="text-foreground">Vaste lage prijzen</strong> - Geen verrassingen achteraf</li>
                <li>✓ <strong className="text-foreground">Actief in alle gemeentes</strong> in Haaglanden</li>
                <li>✓ <strong className="text-foreground">Eenvoudig een gratis adviesgesprek</strong> inplannen</li>
                <li>✓ <strong className="text-foreground">Ervaren en betrouwbare</strong> vakmensen</li>
              </ul>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center text-foreground">Onze Diensten</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-background p-4 rounded-lg border border-border">
                  <h4 className="font-bold mb-2 text-foreground">Muren schilderen</h4>
                  <p className="text-sm text-muted-foreground">Professioneel muren schilderen in heel Haaglanden (€12,50/m²).</p>
                </div>
                <div className="bg-background p-4 rounded-lg border border-border">
                  <h4 className="font-bold mb-2 text-foreground">Plafonds schilderen</h4>
                  <p className="text-sm text-muted-foreground">Plafonds vakkundig afgewerkt (€13,50/m²).</p>
                </div>
                <div className="bg-background p-4 rounded-lg border border-border">
                  <h4 className="font-bold mb-2 text-foreground">Plinten & Lijstwerk</h4>
                  <p className="text-sm text-muted-foreground">Netjes afgewerkt (€7,50/m¹).</p>
                </div>
                <div className="bg-background p-4 rounded-lg border border-border">
                  <h4 className="font-bold mb-2 text-foreground">Kozijnen schilderen</h4>
                  <p className="text-sm text-muted-foreground">Vakkundig behandeld (binnen €100/stuk, buiten €125/stuk).</p>
                </div>
                <div className="bg-background p-4 rounded-lg border border-border">
                  <h4 className="font-bold mb-2 text-foreground">Deuren lakken</h4>
                  <p className="text-sm text-muted-foreground">Professioneel gelakt (binnen €100/stuk, buiten €125/stuk).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gemeentes Sectie */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
              Actief in Alle Gemeentes van Haaglanden
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Of u nu woont in Den Haag, Delft of een kleinere gemeente - De Budgetschilder is overal actief met dezelfde lage tarieven en hoge kwaliteit.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/schilder-den-haag" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Den Haag</h3>
                <p className="text-xs text-muted-foreground">Alle wijken</p>
              </Link>
              <Link href="/schilder-zoetermeer" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Zoetermeer</h3>
                <p className="text-xs text-muted-foreground">Moderne stad</p>
              </Link>
              <Link href="/schilder-westland" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Westland</h3>
                <p className="text-xs text-muted-foreground">Naaldwijk e.o.</p>
              </Link>
              <Link href="/schilder-delft" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Delft</h3>
                <p className="text-xs text-muted-foreground">Monumenten & nieuwbouw</p>
              </Link>
              <Link href="/schilder-leidschendam-voorburg" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Leidschendam-Voorburg</h3>
                <p className="text-xs text-muted-foreground">Twee kernen</p>
              </Link>
              <Link href="/schilder-rijswijk" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Rijswijk</h3>
                <p className="text-xs text-muted-foreground">Tussen Den Haag & Delft</p>
              </Link>
              <Link href="/schilder-pijnacker-nootdorp" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Pijnacker-Nootdorp</h3>
                <p className="text-xs text-muted-foreground">Groene omgeving</p>
              </Link>
              <Link href="/schilder-wassenaar" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Wassenaar</h3>
                <p className="text-xs text-muted-foreground">Aan zee</p>
              </Link>
              <Link href="/schilder-midden-delfland" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Midden-Delfland</h3>
                <p className="text-xs text-muted-foreground">Maassluis, Schipluiden</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </main>
  )
}
