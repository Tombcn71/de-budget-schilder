import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroAI } from "@/components/hero-ai"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { Breadcrumb } from "@/components/breadcrumb"
import { GoogleMap } from "@/components/google-map"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schilder Pijnacker-Nootdorp met Prijs Match Garantie",
  description: "Schilder Pijnacker-Nootdorp nodig? Prijs Match Garantie. Direct prijsindicatie. Beide kernen.",
  keywords: "schilder pijnacker, schilder nootdorp, schilderwerk pijnacker-nootdorp, binnen schilderen pijnacker, buiten schilderen nootdorp, kozijnen schilderen pijnacker",
  openGraph: {
    title: "Schilder Pijnacker-Nootdorp",
    description: "Schilder in Pijnacker-Nootdorp nodig? Prijs match garantie. Direct prijsindicatie.",
    url: "https://debudgetschilder.nl/schilder-pijnacker-nootdorp",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/schilder-pijnacker-nootdorp"
  }
}

export default function Pijnacker_NootdorpPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Breadcrumb items={[
        { name: "Home", url: "https://debudgetschilder.nl" },
        { name: "Schilder Pijnacker-Nootdorp", url: "https://debudgetschilder.nl/schilder-pijnacker-nootdorp" }
      ]} />
      <HeroAI 
        location="Pijnacker-Nootdorp"
        title="Schilder Pijnacker-Nootdorp met Prijs Match Garantie"
        description="Professioneel schilderwerk in Pijnacker én Nootdorp. Beide kernen, één scherpe prijs. Scherpere prijs gevonden? Wij matchen deze direct!"
      />
      
      <HowItWorks />
      
      {/* SEO Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Schilderwerk in Pijnacker en Nootdorp
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Pijnacker-Nootdorp is een groene gemeente tussen Delft en Zoetermeer. De Budgetschilder werkt in beide kernen voor professioneel schilderwerk.
            </p>

            <h3 className="text-2xl font-bold mb-4">Prijzen Schilderwerk</h3>
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
        location="Pijnacker-Nootdorp"
        customFaqs={[
          {
            question: "Wat kost een schilder in Pijnacker-Nootdorp?",
            answer: "Vaste prijzen voor Pijnacker-Nootdorp: muren €15/m², plafonds €17/m², kozijnen €12,50/m¹, plinten en lijstwerk €7,50/m¹ en deuren lakken €125 per deur. Voor beide kernen."
          },
          {
            question: "Werken jullie in Pijnacker én Nootdorp?",
            answer: "Ja, wij werken in beide kernen van de gemeente. Of u nu in Pijnacker of Nootdorp woont, wij leveren hetzelfde professionele schilderwerk tegen dezelfde prijzen."
          },
          {
            question: "Hoeveel kost het om een woonkamer te schilderen in Pijnacker?",
            answer: "Een gemiddelde woonkamer van 25m² muren kost €375. Met plafond (20m² = €340) en plinten (15m¹ = €112) komt u op circa €827. Vul het formulier in voor uw prijsindicatie."
          },
          {
            question: "Wat kost het om kozijnen te schilderen in Nootdorp?",
            answer: "Kozijnen schilderen kost €12,50 per strekkende meter in heel Pijnacker-Nootdorp. Deuren lakken kost €125 per deur."
          },
          {
            question: "Hoe lang duurt het om een huis te schilderen in Pijnacker-Nootdorp?",
            answer: "Binnenschilderwerk van één kamer duurt 1-2 dagen. Een complete woning binnenschilderen duurt 3-5 dagen afhankelijk van de grootte."
          },
          {
            question: "Werken jullie aan nieuwbouw in Pijnacker-Nootdorp?",
            answer: "Jazeker! Pijnacker-Nootdorp kent veel nieuwbouwwijken. Wij hebben ervaring met het schilderen van nieuwbouwwoningen en adviseren over de beste aanpak."
          },
          {
            question: "Wat kost een plafond schilderen in Pijnacker?",
            answer: "Plafond schilderen kost €17 per m² in Pijnacker-Nootdorp. Een plafond van 20m² kost dus €340. Vul het formulier in voor uw prijsindicatie."
          },
          {
            question: "Kan ik alleen deuren laten lakken in Nootdorp?",
            answer: "Jazeker! Deuren lakken kost €125 per deur. U kunt ook alleen specifieke onderdelen laten schilderen in heel Pijnacker-Nootdorp."
          },
          {
            question: "Hoeveel lagen verf zijn nodig voor muren?",
            answer: "Voor een goede dekking zijn meestal 2 lagen nodig. Bij een forse kleurverandering kunnen 3 lagen nodig zijn. Onze prijzen zijn inclusief 2 lagen."
          },
          {
            question: "Hoe krijg ik een prijsindicatie voor schilderwerk in Pijnacker-Nootdorp?",
            answer: "Vul het formulier bovenaan de pagina in met uw oppervlaktes. Binnen 30 seconden ziet u de prijsindicatie voor uw schilderwerk in Pijnacker-Nootdorp."
          }
        ]}
      />

      {/* Google Maps */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GoogleMap location="Pijnacker-Nootdorp, Nederland" title="Onze Schilders Werken in Pijnacker en Nootdorp" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

