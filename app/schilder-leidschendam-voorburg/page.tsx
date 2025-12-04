import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroAI } from "@/components/hero-ai"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { Breadcrumb } from "@/components/breadcrumb"
import { GoogleMap } from "@/components/google-map"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schilder Leidschendam-Voorburg met Prijs Match Garantie",
  description: "Schilder Leidschendam-Voorburg nodig? Prijs Match Garantie. Direct prijsindicatie. Beide kernen.",
  keywords: "schilder leidschendam, schilder voorburg, schilderwerk leidschendam-voorburg, binnen schilderen leidschendam, buiten schilderen voorburg, kozijnen schilderen leidschendam",
  openGraph: {
    title: "Schilder Leidschendam-Voorburg",
    description: "Schilder in Leidschendam-Voorburg nodig? Prijs match garantie. Direct prijsindicatie.",
    url: "https://debudgetschilder.nl/schilder-leidschendam-voorburg",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/schilder-leidschendam-voorburg"
  }
}

export default function Leidschendam_VoorburgPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Breadcrumb items={[
        { name: "Home", url: "https://debudgetschilder.nl" },
        { name: "Schilder Leidschendam-Voorburg", url: "https://debudgetschilder.nl/schilder-leidschendam-voorburg" }
      ]} />
      <HeroAI 
        location="Leidschendam-Voorburg"
        title="Schilder Leidschendam-Voorburg met Prijs Match Garantie"
        description="Professioneel schilderwerk in Leidschendam én Voorburg. Beide kernen, één scherpe prijs. Scherpere prijs gevonden? Wij matchen deze direct!"
      />
      
      <HowItWorks />
      
      {/* SEO Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Schilderwerk in Leidschendam en Voorburg
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Leidschendam-Voorburg is een gemeente bestaande uit twee kernen tussen Den Haag en Leiden. De Budgetschilder werkt in beide kernen voor professioneel binnen- en buitenschilderwerk.
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
        location="Leidschendam-Voorburg"
        customFaqs={[
          {
            question: "Wat kost een schilder in Leidschendam-Voorburg?",
            answer: "Vaste prijzen voor Leidschendam-Voorburg: muren €15/m², plafonds €17/m², kozijnen €12,50/m¹, plinten en lijstwerk €7,50/m¹ en deuren lakken €125 per deur. Geldt voor beide kernen."
          },
          {
            question: "Werken jullie in Leidschendam én Voorburg?",
            answer: "Ja, wij werken in beide kernen van de gemeente. Of u nu in Leidschendam of Voorburg woont, wij leveren hetzelfde professionele schilderwerk tegen dezelfde prijzen."
          },
          {
            question: "Hoeveel kost het om een woonkamer te schilderen in Voorburg?",
            answer: "Een gemiddelde woonkamer van 25m² muren kost €375. Met plafond (20m² = €340) en plinten (15m¹ = €112) komt u op circa €827. Vul het formulier in voor uw prijsindicatie."
          },
          {
            question: "Wat kost het om kozijnen te schilderen in Leidschendam?",
            answer: "Kozijnen schilderen kost €12,50 per strekkende meter in heel Leidschendam-Voorburg. Deuren lakken kost €125 per deur."
          },
          {
            question: "Hoe lang duurt het om een huis te schilderen in Leidschendam-Voorburg?",
            answer: "Binnenschilderwerk van één kamer duurt 1-2 dagen. Een complete woning binnenschilderen duurt 3-5 dagen afhankelijk van de grootte."
          },
          {
            question: "Werken jullie ook in Stompwijk?",
            answer: "Ja, wij werken in heel de gemeente Leidschendam-Voorburg, inclusief Stompwijk. Overal dezelfde vaste prijzen."
          },
          {
            question: "Wat kost een plafond schilderen in Voorburg?",
            answer: "Plafond schilderen kost €17 per m² in Leidschendam-Voorburg. Een plafond van 20m² kost dus €340. Vul het formulier in voor uw prijsindicatie."
          },
          {
            question: "Kan ik alleen plinten laten schilderen in Leidschendam?",
            answer: "Jazeker! Plinten schilderen kost €7,50 per strekkende meter. U kunt ook alleen specifieke onderdelen laten schilderen."
          },
          {
            question: "Hoeveel lagen verf zijn nodig voor muren?",
            answer: "Voor een goede dekking zijn meestal 2 lagen nodig. Bij een forse kleurverandering kunnen 3 lagen nodig zijn. Onze prijzen zijn inclusief 2 lagen."
          },
          {
            question: "Hoe krijg ik een prijsindicatie voor schilderwerk in Leidschendam-Voorburg?",
            answer: "Vul het formulier bovenaan de pagina in met uw oppervlaktes. Binnen 30 seconden ziet u de prijsindicatie voor uw schilderwerk in Leidschendam-Voorburg."
          }
        ]}
      />

      {/* Google Maps */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GoogleMap location="Leidschendam-Voorburg, Nederland" title="Onze Schilders Werken in Leidschendam en Voorburg" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

