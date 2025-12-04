import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroAI } from "@/components/hero-ai"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { Breadcrumb } from "@/components/breadcrumb"
import { GoogleMap } from "@/components/google-map"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schilder Rijswijk met Prijs Match Garantie",
  description: "Schilder Rijswijk nodig? Prijs Match Garantie. Direct prijsindicatie. Professioneel schilderwerk in Rijswijk.",
  keywords: "schilder rijswijk, schilderwerk rijswijk, binnen schilderen rijswijk, buiten schilderen rijswijk, kozijnen schilderen rijswijk, schilder prijzen rijswijk, goedkope schilder rijswijk, schildersbedrijf rijswijk, huis laten schilderen rijswijk",
  openGraph: {
    title: "Schilder Rijswijk | De Budgetschilder - Prijs Match Garantie",
    description: "Schilder in Rijswijk nodig? Scherpere prijs gevonden? Wij matchen deze direct! Direct prijsindicatie.",
    url: "https://debudgetschilder.nl/schilder-rijswijk",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/schilder-rijswijk"
  }
}

export default function RijswijkPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Breadcrumb items={[
        { name: "Home", url: "https://debudgetschilder.nl" },
        { name: "Schilder Rijswijk", url: "https://debudgetschilder.nl/schilder-rijswijk" }
      ]} />
      <HeroAI 
        location="Rijswijk"
        title="Schilder Rijswijk met Prijs Match Garantie"
        description="Professioneel schilderwerk in heel Rijswijk: Centrum, Sion, Steenvoorde, Elsenburgerbos en meer. Scherpere prijs gevonden? Wij matchen deze direct!"
      />
      
      <HowItWorks />
      
      {/* SEO Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Schilder Rijswijk - Alle Wijken & Buurten
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Rijswijk is een compacte stad tussen Den Haag en Delft met een rijke mix van oud en nieuw. Van historische panden in het oude centrum tot moderne nieuwbouw bij Station Rijswijk - De Budgetschilder verzorgt professioneel schilderwerk in heel Rijswijk tegen de scherpste prijs.
            </p>

            <h3 className="text-2xl font-bold mb-4">Schilderwerk in Rijswijk wijken:</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Rijswijk-Centrum</h4>
                <p className="text-sm text-muted-foreground">
                  Historisch centrum met mix van oude en nieuwe panden. Karakteristieke architectuur en winkelgebied.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Sion & Steenvoorde</h4>
                <p className="text-sm text-muted-foreground">
                  Grote nieuwbouwlocaties met moderne appartementen en woningen. Populair bij jonge gezinnen.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Elsenburgerbos</h4>
                <p className="text-sm text-muted-foreground">
                  Groene woonwijk met rijtjeswoningen en flats uit de jaren '70 en '80.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Kerketuinen</h4>
                <p className="text-sm text-muted-foreground">
                  Rustige woonwijk met vooral eengezinswoningen en goed onderhouden straten.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Plaspoelpolder</h4>
                <p className="text-sm text-muted-foreground">
                  Groene wijk met water, ideaal voor gezinnen. Mix van huur en koop.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Geestbrugkwartier</h4>
                <p className="text-sm text-muted-foreground">
                  Diverse architectuur met appartementen en eengezinswoningen.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">Wat kost een schilder in Rijswijk?</h3>
            <p className="text-muted-foreground mb-3">Transparante prijzen binnen schilderwerk:</p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>• <strong>Muren schilderen:</strong> €17 per m²</li>
              <li>• <strong>Plafond schilderen:</strong> €17 per m²</li>
              <li>• <strong>Kozijnen schilderen:</strong> €12,50 per m¹</li>
              <li>• <strong>Plinten schilderen:</strong> €7,50 per m¹</li>
              <li>• <strong>Lijstwerk schilderen:</strong> €7,50 per m¹</li>
              <li>• <strong>Deuren lakken:</strong> €125 per deur</li>
            </ul>
            <p className="text-muted-foreground mb-8">
              Deze scherpe prijzen gelden voor alle wijken in Rijswijk - van centrum tot Sion en Elsenburgerbos. <strong>Vul het formulier in en krijg binnen 30 seconden uw complete prijsindicatie!</strong>
            </p>

            <h3 className="text-2xl font-bold mb-4">Onze diensten in Rijswijk</h3>
            <p className="text-muted-foreground mb-4">
              ✓ Binnen schilderwerk - Wanden, plafonds, deuren<br/>
              ✓ Buiten schilderwerk - Gevels, kozijnen, houtwerk<br/>
              ✓ Renovatie & onderhoud - Voor oudere woningen<br/>
              ✓ Nieuwbouw afwerking - Voor nieuwe projecten<br/>
              ✓ AI Preview - Zie direct hoe het eruit ziet
            </p>
          </div>
        </div>
      </section>
      
      <FAQ 
        location="Rijswijk"
        customFaqs={[
          {
            question: "Wat kost een schilder in Rijswijk?",
            answer: "Vaste prijzen voor Rijswijk: muren €15/m², plafonds €17/m², kozijnen €12,50/m¹, plinten en lijstwerk €7,50/m¹ en deuren lakken €125 per deur. Deze prijzen gelden voor heel Rijswijk."
          },
          {
            question: "Werken jullie in alle wijken van Rijswijk?",
            answer: "Ja, wij werken door heel Rijswijk: Centrum, Sion, Steenvoorde, Elsenburgerbos, Kerketuinen, Plaspoelpolder en Geestbrugkwartier."
          },
          {
            question: "Hoeveel kost het om een woonkamer te schilderen in Rijswijk?",
            answer: "Een gemiddelde woonkamer van 25m² muren kost €375. Met plafond (20m² = €340) en plinten (15m¹ = €112) komt u op circa €827. Vul het formulier in voor uw prijsindicatie."
          },
          {
            question: "Wat kost het om kozijnen te schilderen in Rijswijk?",
            answer: "Kozijnen schilderen kost €12,50 per strekkende meter in Rijswijk. Deuren lakken kost €125 per deur."
          },
          {
            question: "Hoe lang duurt het om een huis te schilderen in Rijswijk?",
            answer: "Binnenschilderwerk van één kamer duurt 1-2 dagen. Een complete woning binnenschilderen duurt 3-5 dagen afhankelijk van de grootte."
          },
          {
            question: "Wat kost een plafond schilderen in Rijswijk?",
            answer: "Plafond schilderen kost €17 per m² in Rijswijk. Een plafond van 20m² kost dus €340. Vul het formulier in voor uw prijsindicatie."
          },
          {
            question: "Werken jullie ook in de nieuwbouw Sion en Steenvoorde?",
            answer: "Jazeker! De nieuwbouwwijken Sion en Steenvoorde kennen we goed. Wij adviseren over de beste afwerking voor nieuwbouwwoningen."
          },
          {
            question: "Kan ik alleen deuren laten lakken in Rijswijk?",
            answer: "Jazeker! Deuren lakken kost €125 per deur. U kunt ook alleen specifieke onderdelen laten schilderen in heel Rijswijk."
          },
          {
            question: "Hoeveel lagen verf zijn nodig voor muren in Rijswijk?",
            answer: "Voor een goede dekking zijn meestal 2 lagen nodig. Bij een forse kleurverandering kunnen 3 lagen nodig zijn. Onze prijzen zijn inclusief 2 lagen."
          },
          {
            question: "Hoe krijg ik een prijsindicatie voor schilderwerk in Rijswijk?",
            answer: "Vul het formulier bovenaan de pagina in met uw oppervlaktes. Binnen 30 seconden ziet u de prijsindicatie voor uw schilderwerk in Rijswijk."
          }
        ]}
      />

      {/* Google Maps */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GoogleMap location="Rijswijk, Nederland" title="Onze Schilders Werken in Heel Rijswijk" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

