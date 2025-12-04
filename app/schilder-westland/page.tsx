import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroAI } from "@/components/hero-ai"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { Breadcrumb } from "@/components/breadcrumb"
import { GoogleMap } from "@/components/google-map"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schilder Westland met Prijs Match Garantie",
  description: "Schilder Westland nodig? Prijs Match Garantie. Direct prijsindicatie. Naaldwijk, Monster, 's-Gravenzande.",
  keywords: "schilder westland, schilderwerk westland, schilder naaldwijk, schilder monster, schilder 's-gravenzande, schilder de lier, binnen schilderen westland, buiten schilderen westland, kozijnen schilderen westland",
  openGraph: {
    title: "Schilder Westland | De Budgetschilder",
    description: "Schilder in Westland nodig? Prijs match garantie. Direct prijsindicatie.",
    url: "https://debudgetschilder.nl/schilder-westland",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/schilder-westland"
  }
}

export default function WestlandPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Breadcrumb items={[
        { name: "Home", url: "https://debudgetschilder.nl" },
        { name: "Schilder Westland", url: "https://debudgetschilder.nl/schilder-westland" }
      ]} />
      <HeroAI 
        location="Westland"
        title="Schilder Westland met Prijs Match Garantie"
        description="Professioneel schilderwerk in heel Westland: Naaldwijk, Monster, 's-Gravenzande, Wateringen, De Lier en meer. Scherpere prijs gevonden? Wij matchen deze direct!"
      />
      
      <HowItWorks />
      
      {/* SEO Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Professioneel Schilderwerk in Westland
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Westland bestaat uit meerdere kernen: Naaldwijk, Monster, 's-Gravenzande, Wateringen, De Lier, Maasdijk, Kwintsheul, Poeldijk en Ter Heijde. De Budgetschilder is actief in heel Westland voor binnen- en buitenschilderwerk.
            </p>

            <h3 className="text-2xl font-bold mb-4">Kernen in Westland:</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Naaldwijk</h4>
                <p className="text-sm text-muted-foreground">Grootste kern van Westland, centrum van de gemeente.</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Monster</h4>
                <p className="text-sm text-muted-foreground">Dichtbij zee, mix van oude en nieuwe woningen.</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">'s-Gravenzande</h4>
                <p className="text-sm text-muted-foreground">Karakteristieke plaats in het glastuinbouwgebied.</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Wateringen</h4>
                <p className="text-sm text-muted-foreground">Groene kern met diverse woningtypen.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">Prijzen Schilderwerk Westland</h3>
            <p className="text-muted-foreground mb-3">Vaste prijzen binnen schilderwerk:</p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>• <strong>Muren schilderen:</strong> €17 per m²</li>
              <li>• <strong>Plafond schilderen:</strong> €17 per m²</li>
              <li>• <strong>Kozijnen schilderen:</strong> €12,50 per m¹</li>
              <li>• <strong>Plinten schilderen:</strong> €7,50 per m¹</li>
              <li>• <strong>Lijstwerk schilderen:</strong> €7,50 per m¹</li>
              <li>• <strong>Deuren lakken:</strong> €125 per deur</li>
            </ul>
          </div>
        </div>
      </section>
      
      <FAQ 
        location="Westland"
        customFaqs={[
          {
            question: "Wat kost een schilder in Westland?",
            answer: "Vaste prijzen voor Westland: muren €15/m², plafonds €17/m², kozijnen €12,50/m¹, plinten en lijstwerk €7,50/m¹ en deuren lakken €125 per deur. Deze prijzen gelden voor alle kernen."
          },
          {
            question: "Werken jullie in alle kernen van Westland?",
            answer: "Ja, wij werken door heel Westland: Naaldwijk, Monster, 's-Gravenzande, Wateringen, De Lier, Maasdijk, Kwintsheul, Poeldijk en Ter Heijde. Overal dezelfde prijzen."
          },
          {
            question: "Hoeveel kost het om een woonkamer te schilderen in Naaldwijk?",
            answer: "Een gemiddelde woonkamer van 25m² muren kost €375. Met plafond (20m² = €340) en plinten (15m¹ = €112) komt u op circa €827. Vul het formulier in voor uw prijsindicatie."
          },
          {
            question: "Wat kost het om kozijnen te schilderen in Monster?",
            answer: "Kozijnen schilderen kost €12,50 per strekkende meter in heel Westland. Deuren lakken kost €125 per deur."
          },
          {
            question: "Hoe lang duurt het om een huis te schilderen in Westland?",
            answer: "Binnenschilderwerk van één kamer duurt 1-2 dagen. Een complete woning binnenschilderen duurt 3-5 dagen afhankelijk van de grootte."
          },
          {
            question: "Wat kost een plafond schilderen in 's-Gravenzande?",
            answer: "Plafond schilderen kost €17 per m² in heel Westland. Een plafond van 20m² kost dus €340. Vul het formulier in voor uw prijsindicatie."
          },
          {
            question: "Werken jullie ook aan oudere woningen in De Lier?",
            answer: "Jazeker! Wij schilderen zowel oudere als nieuwere woningen in heel Westland, inclusief De Lier."
          },
          {
            question: "Kan ik alleen deuren laten lakken in Wateringen?",
            answer: "Jazeker! Deuren lakken kost €125 per deur. U kunt ook alleen specifieke onderdelen laten schilderen in heel Westland."
          },
          {
            question: "Hoeveel lagen verf zijn nodig voor muren in Westland?",
            answer: "Voor een goede dekking zijn meestal 2 lagen nodig. Bij een forse kleurverandering kunnen 3 lagen nodig zijn. Onze prijzen zijn inclusief 2 lagen."
          },
          {
            question: "Hoe krijg ik een prijsindicatie voor schilderwerk in Westland?",
            answer: "Vul het formulier bovenaan de pagina in met uw oppervlaktes. Binnen 30 seconden ziet u de prijsindicatie voor uw schilderwerk in Westland."
          }
        ]}
      />

      {/* Google Maps */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GoogleMap location="Westland, Nederland" title="Onze Schilders Werken in Heel Westland" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

