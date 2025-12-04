import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroAI } from "@/components/hero-ai"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { Breadcrumb } from "@/components/breadcrumb"
import { GoogleMap } from "@/components/google-map"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schilder Midden-Delfland met Prijs Match Garantie",
  description: "Schilder Midden-Delfland nodig? Prijs Match Garantie. Direct prijsindicatie. Maassluis, Schipluiden.",
  keywords: "schilder midden-delfland, schilderwerk midden-delfland, schilder maassluis, schilder schipluiden, binnen schilderen midden-delfland, buiten schilderen midden-delfland",
  openGraph: {
    title: "Schilder Midden-Delfland",
    description: "Schilder in Midden-Delfland nodig? Prijs match garantie. Direct prijsindicatie.",
    url: "https://debudgetschilder.nl/schilder-midden-delfland",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/schilder-midden-delfland"
  }
}

export default function MiddenDelflandPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Breadcrumb items={[
        { name: "Home", url: "https://debudgetschilder.nl" },
        { name: "Schilder Midden-Delfland", url: "https://debudgetschilder.nl/schilder-midden-delfland" }
      ]} />
      <HeroAI 
        location="Midden-Delfland"
        title="Schilder Midden-Delfland met Prijs Match Garantie"
        description="Professioneel schilderwerk in Maassluis, Schipluiden en Den Hoorn. Alle kernen, één scherpe prijs. Scherpere prijs gevonden? Wij matchen deze direct!"
      />
      
      <HowItWorks />
      
      {/* SEO Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Schilderwerk in Midden-Delfland
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Midden-Delfland bestaat uit de kernen Maassluis, Schipluiden en Den Hoorn. De Budgetschilder werkt door heel Midden-Delfland voor professioneel binnen- en buitenschilderwerk.
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
        location="Midden-Delfland"
        customFaqs={[
          {
            question: "Wat kost een schilder in Midden-Delfland?",
            answer: "Vaste prijzen voor Midden-Delfland: muren €15/m², plafonds €17/m², kozijnen €12,50/m¹, plinten en lijstwerk €7,50/m¹ en deuren lakken €125 per stuk. Voor alle kernen: Maassluis, Schipluiden en Den Hoorn."
          },
          {
            question: "Werken jullie in Maassluis, Schipluiden en Den Hoorn?",
            answer: "Ja, wij werken in alle kernen van Midden-Delfland. Of u nu in Maassluis, Schipluiden of Den Hoorn woont, wij leveren professioneel schilderwerk tegen dezelfde prijzen."
          },
          {
            question: "Hoeveel kost het om een woonkamer te schilderen in Midden-Delfland?",
            answer: "Een gemiddelde woonkamer van 25m² muren kost €375. Met plafond (20m² = €340) en plinten (15m¹ = €112) komt u op circa €827. Vul het formulier in voor uw prijsindicatie."
          },
          {
            question: "Wat kost het om kozijnen te schilderen in Maassluis?",
            answer: "Kozijnen schilderen kost €12,50 per strekkende meter in heel Midden-Delfland, inclusief Maassluis. Deuren lakken kost €125 per deur."
          },
          {
            question: "Hoe lang duurt het om een huis te schilderen in Midden-Delfland?",
            answer: "Binnenschilderwerk van één kamer duurt 1-2 dagen. Een complete woning binnenschilderen duurt 3-5 dagen afhankelijk van de grootte."
          },
          {
            question: "Wat kost een plafond schilderen in Schipluiden?",
            answer: "Plafond schilderen kost €17 per m² in heel Midden-Delfland. Een plafond van 20m² kost dus €340. Vul het formulier in voor uw prijsindicatie."
          },
          {
            question: "Werken jullie ook aan nieuwbouw in Midden-Delfland?",
            answer: "Jazeker! Wij schilderen zowel bestaande woningen als nieuwbouw in Midden-Delfland. Nieuwbouwwoningen vereisen vaak andere voorbereidingen."
          },
          {
            question: "Hoeveel lagen verf zijn nodig voor muren in Midden-Delfland?",
            answer: "Voor een goede dekking zijn meestal 2 lagen nodig. Bij een forse kleurverandering kunnen 3 lagen nodig zijn. Onze prijzen zijn inclusief 2 lagen."
          },
          {
            question: "Kan ik alleen plinten laten schilderen in Den Hoorn?",
            answer: "Jazeker! Plinten schilderen kost €7,50 per strekkende meter. U kunt ook alleen specifieke onderdelen laten schilderen in heel Midden-Delfland."
          },
          {
            question: "Hoe krijg ik een prijsindicatie voor schilderwerk in Midden-Delfland?",
            answer: "Vul het formulier bovenaan de pagina in met uw oppervlaktes. Binnen 30 seconden ziet u de prijsindicatie voor uw schilderwerk in Midden-Delfland."
          }
        ]}
      />

      {/* Google Maps */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GoogleMap location="Midden-Delfland, Nederland" title="Onze Schilders Werken in Midden-Delfland" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

