import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroAI } from "@/components/hero-ai"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { Breadcrumb } from "@/components/breadcrumb"
import { GoogleMap } from "@/components/google-map"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schilder Wassenaar met Prijs Match Garantie",
  description: "Schilder Wassenaar nodig? Prijs Match Garantie. Direct prijsindicatie. Professioneel schilderwerk.",
  keywords: "schilder wassenaar, schilderwerk wassenaar, binnen schilderen wassenaar, buiten schilderen wassenaar, kozijnen schilderen wassenaar, villa schilderen wassenaar",
  openGraph: {
    title: "Schilder Wassenaar | De Budgetschilder",
    description: "Schilder in Wassenaar nodig? Prijs match garantie. Direct prijsindicatie.",
    url: "https://debudgetschilder.nl/schilder-wassenaar",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/schilder-wassenaar"
  }
}

export default function WassenaarPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Breadcrumb items={[
        { name: "Home", url: "https://debudgetschilder.nl" },
        { name: "Schilder Wassenaar", url: "https://debudgetschilder.nl/schilder-wassenaar" }
      ]} />
      <HeroAI 
        location="Wassenaar"
        title="Schilder Wassenaar met Prijs Match Garantie"
        description="Professioneel schilderwerk in heel Wassenaar. Van villa's tot appartementen, vaste prijzen. Scherpere prijs gevonden? Wij matchen deze direct!"
      />
      
      <HowItWorks />
      
      {/* SEO Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Professioneel Schilderwerk in Wassenaar
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Wassenaar is bekend om zijn groene karakter en luxe villa's. De Budgetschilder levert professioneel schilderwerk aan alle woningtypen in Wassenaar, van villa's tot appartementen.
            </p>

            <h3 className="text-2xl font-bold mb-4">Prijzen Schilderwerk Wassenaar</h3>
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
        location="Wassenaar"
        customFaqs={[
          {
            question: "Wat kost een schilder in Wassenaar?",
            answer: "Vaste prijzen voor Wassenaar: muren €15/m², plafonds €17/m², kozijnen €12,50/m¹, plinten en lijstwerk €7,50/m¹ en deuren lakken €125 per deur. Dezelfde prijzen voor villa's en appartementen."
          },
          {
            question: "Werken jullie ook aan villa's in Wassenaar?",
            answer: "Ja, wij hebben ervaring met schilderwerk aan villa's en grotere woningen in Wassenaar. Onze prijzen per m² blijven hetzelfde, ook voor uitgebreidere projecten."
          },
          {
            question: "Hoeveel kost het om een villa te schilderen in Wassenaar?",
            answer: "De kosten hangen af van de oppervlaktes. Muren €15/m², plafonds €17/m². Een grote villa kan €3.000-€8.000 kosten afhankelijk van de grootte. Vul het formulier in voor uw prijsindicatie."
          },
          {
            question: "Wat kost het om kozijnen te schilderen in Wassenaar?",
            answer: "Kozijnen schilderen kost €12,50 per strekkende meter in Wassenaar. Een standaard raamkozijn van 2 meter kost dus €25. Deuren lakken kost €125 per deur."
          },
          {
            question: "Hoe lang duurt het om een woning te schilderen in Wassenaar?",
            answer: "Een gemiddelde woning binnenschilderen duurt 3-5 dagen. Grotere villa's kunnen 1-2 weken duren. We plannen dit in overleg met u."
          },
          {
            question: "Werken jullie in alle delen van Wassenaar?",
            answer: "Ja, wij werken door heel Wassenaar: van het centrum tot de buitengebieden. Overal dezelfde vaste prijzen."
          },
          {
            question: "Wat kost een plafond schilderen in Wassenaar?",
            answer: "Plafond schilderen kost €17 per m² in Wassenaar. Een plafond van 20m² kost dus €340. Hoge plafonds zijn geen probleem."
          },
          {
            question: "Kunnen jullie ook buitenschilderwerk aan in Wassenaar?",
            answer: "Jazeker! Wij verzorgen zowel binnen- als buitenschilderwerk in Wassenaar. Voor buiten adviseren we de beste seizoenen (april-oktober)."
          },
          {
            question: "Hoeveel lagen verf zijn nodig voor muren in Wassenaar?",
            answer: "Voor een goede dekking zijn meestal 2 lagen nodig. Bij een forse kleurverandering kunnen 3 lagen nodig zijn. Onze prijzen zijn inclusief 2 lagen."
          },
          {
            question: "Hoe krijg ik een prijsindicatie voor schilderwerk in Wassenaar?",
            answer: "Vul het formulier bovenaan de pagina in met uw oppervlaktes. Binnen 30 seconden ziet u de prijsindicatie voor uw schilderwerk in Wassenaar."
          }
        ]}
      />

      {/* Google Maps */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GoogleMap location="Wassenaar, Nederland" title="Onze Schilders Werken in Heel Wassenaar" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

