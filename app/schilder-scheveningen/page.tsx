import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroAI } from "@/components/hero-ai"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { Breadcrumb } from "@/components/breadcrumb"
import { GoogleMap } from "@/components/google-map"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schilder Scheveningen met Prijs Match Garantie",
  description: "Schilder Scheveningen nodig? Prijs Match Garantie. Direct prijsindicatie. Specialist in zeeklimaat.",
  keywords: "schilder scheveningen, schilderwerk scheveningen, binnen schilderen scheveningen, buiten schilderen scheveningen, kozijnen schilderen scheveningen, schilder prijzen scheveningen, goedkope schilder scheveningen, schildersbedrijf scheveningen, huis laten schilderen scheveningen",
  openGraph: {
    title: "Schilder Scheveningen | De Budgetschilder - Prijs Match Garantie",
    description: "Schilder in Scheveningen nodig? Scherpere prijs gevonden? Wij matchen deze direct! Direct prijsindicatie.",
    url: "https://debudgetschilder.nl/schilder-scheveningen",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/schilder-scheveningen"
  }
}

export default function ScheveningenPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Breadcrumb items={[
        { name: "Home", url: "https://debudgetschilder.nl" },
        { name: "Schilder Scheveningen", url: "https://debudgetschilder.nl/schilder-scheveningen" }
      ]} />
      <HeroAI 
        location="Scheveningen"
        title="Schilder Scheveningen met Prijs Match Garantie"
        description="Professioneel schilderwerk in heel Scheveningen: Bad, Haven, Duindorp, Bosjes van Pex. Scherpere prijs gevonden? Wij matchen deze direct!"
      />
      
      <HowItWorks />
      
      {/* SEO Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Schilder Scheveningen - Expert in Zeeklimaat
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Scheveningen is de populaire badplaats van Den Haag aan de Noordzee. Het zeeklimaat stelt extra eisen aan schilderwerk: zilte zeelucht, wind en vocht vragen om speciale materialen en technieken. De Budgetschilder is specialist in schilderwerk voor Scheveningen en omgeving.
            </p>

            <h3 className="text-2xl font-bold mb-4">Buurten in Scheveningen:</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Scheveningen-Bad</h4>
                <p className="text-sm text-muted-foreground">
                  Direct aan zee met boulevard, pier en karakteristieke badplaatsarchitectuur. Extra onderhoud nodig door zeeklimaat.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Scheveningen Haven</h4>
                <p className="text-sm text-muted-foreground">
                  Vissersdorp met authentieke sfeer. Mix van oude vissershuisjes en moderne appartementen.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Duindorp</h4>
                <p className="text-sm text-muted-foreground">
                  Volkse wijk direct aan zee. Hechte gemeenschap met veel rijtjeswoningen.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Bosjes van Pex</h4>
                <p className="text-sm text-muted-foreground">
                  Groene woonwijk tussen Scheveningen en Den Haag centrum.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">Waarom specialist voor Scheveningen?</h3>
            <p className="text-muted-foreground mb-4">
              Het zeeklimaat in Scheveningen is agressief voor verflagen. Zilte zeelucht, UV-straling en vocht zorgen voor snellere slijtage. Daarom gebruiken wij:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-8">
              <li>✓ <strong>Speciale zeewater-resistente verven</strong> voor buiten schilderwerk</li>
              <li>✓ <strong>Extra beschermlagen</strong> tegen zoute lucht</li>
              <li>✓ <strong>UV-bestendige lakken</strong> die niet verbleken</li>
              <li>✓ <strong>Vochtregulerende primers</strong> voor optimale hechting</li>
              <li>✓ <strong>Meerjaren garantie</strong> op ons werk</li>
            </ul>

            <h3 className="text-2xl font-bold mb-4">Prijzen Schilderwerk Scheveningen</h3>
            <p className="text-muted-foreground mb-3">Vaste prijzen binnen schilderwerk:</p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>• <strong>Muren schilderen:</strong> €13,50 per m²</li>
              <li>• <strong>Plafond schilderen:</strong> €13,50 per m²</li>
              <li>• <strong>Kozijnen schilderen:</strong> €12,50 per m¹</li>
              <li>• <strong>Plinten schilderen:</strong> €7,50 per m¹</li>
              <li>• <strong>Lijstwerk schilderen:</strong> €7,50 per m¹</li>
              <li>• <strong>Deuren lakken:</strong> €125 per deur</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              Voor buiten schilderwerk in Scheveningen adviseren wij zee-bestendige materialen vanwege het zilte klimaat. Vul het formulier in en krijg binnen 30 seconden een complete prijsindicatie inclusief advies over de beste materialen voor het zeeklimaat.
            </p>
          </div>
        </div>
      </section>
      
      <FAQ 
        location="Scheveningen"
        customFaqs={[
          {
            question: "Wat kost een schilder in Scheveningen?",
            answer: "Vaste prijzen voor binnen schilderwerk in Scheveningen: muren €12,50/m², plafonds €13,50/m², kozijnen €12,50/m¹, plinten en lijstwerk €7,50/m¹ en deuren lakken €125 per deur."
          },
          {
            question: "Werken jullie in alle delen van Scheveningen?",
            answer: "Ja, wij werken door heel Scheveningen: Scheveningen-Bad (aan de boulevard), Scheveningen Haven (het oude vissersdorp), Duindorp en Bosjes van Pex."
          },
          {
            question: "Hoeveel kost het om een woonkamer te schilderen in Scheveningen?",
            answer: "Een gemiddelde woonkamer van 25m² muren kost €312. Met plafond (20m² = €270) en plinten (15m¹ = €112) komt u op circa €694. Vul het formulier in voor uw prijsindicatie."
          },
          {
            question: "Wat kost het om kozijnen te schilderen in Scheveningen?",
            answer: "Kozijnen schilderen kost €12,50 per strekkende meter in Scheveningen. Deuren lakken kost €125 per deur."
          },
          {
            question: "Hoe lang duurt het om een appartement te schilderen in Scheveningen?",
            answer: "Een gemiddeld appartement binnenschilderen duurt 2-4 dagen afhankelijk van de grootte en het aantal kamers."
          },
          {
            question: "Wat kost een plafond schilderen in Scheveningen?",
            answer: "Plafond schilderen kost €13,50 per m² in Scheveningen. Een plafond van 20m² kost dus €270. Vul het formulier in voor uw prijsindicatie."
          },
          {
            question: "Werken jullie ook in Duindorp?",
            answer: "Ja, Duindorp is onderdeel van Scheveningen en wij werken daar veel. Dezelfde vaste prijzen: €12,50/m² voor muren, €13,50/m² voor plafonds."
          },
          {
            question: "Kan ik alleen plinten laten schilderen in Scheveningen?",
            answer: "Jazeker! Plinten schilderen kost €7,50 per strekkende meter. U kunt ook alleen specifieke onderdelen laten schilderen."
          },
          {
            question: "Hoeveel lagen verf zijn nodig voor muren in Scheveningen?",
            answer: "Voor een goede dekking zijn meestal 2 lagen nodig. Bij een forse kleurverandering kunnen 3 lagen nodig zijn. Onze prijzen zijn inclusief 2 lagen."
          },
          {
            question: "Hoe krijg ik een prijsindicatie voor schilderwerk in Scheveningen?",
            answer: "Vul het formulier bovenaan de pagina in met uw oppervlaktes. Binnen 30 seconden ziet u de prijsindicatie voor uw schilderwerk in Scheveningen."
          }
        ]}
      />

      {/* Google Maps */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GoogleMap location="Scheveningen, Den Haag, Nederland" title="Onze Schilders Werken in Heel Scheveningen" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

