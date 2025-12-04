import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroAI } from "@/components/hero-ai"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { Breadcrumb } from "@/components/breadcrumb"
import { GoogleMap } from "@/components/google-map"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schilder Zoetermeer met Prijs Match Garantie",
  description: "Schilder Zoetermeer nodig? Prijs Match Garantie. Direct prijsindicatie. Alle wijken van Zoetermeer.",
  keywords: "schilder zoetermeer, schilderwerk zoetermeer, binnen schilderen zoetermeer, buiten schilderen zoetermeer, kozijnen schilderen zoetermeer, schilder prijzen zoetermeer, goedkope schilder zoetermeer, schildersbedrijf zoetermeer, huis laten schilderen zoetermeer",
  openGraph: {
    title: "Schilder Zoetermeer | De Budgetschilder - Prijs Match Garantie",
    description: "Schilder in Zoetermeer nodig? Scherpere prijs gevonden? Wij matchen deze direct! Direct prijsindicatie.",
    url: "https://debudgetschilder.nl/schilder-zoetermeer",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/schilder-zoetermeer"
  }
}

export default function ZoetermeerPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Breadcrumb items={[
        { name: "Home", url: "https://debudgetschilder.nl" },
        { name: "Schilder Zoetermeer", url: "https://debudgetschilder.nl/schilder-zoetermeer" }
      ]} />
      <HeroAI 
        location="Zoetermeer"
        title="Schilder Zoetermeer met Prijs Match Garantie"
        description="Professioneel schilderwerk in heel Zoetermeer: Meerzicht, Rokkeveen, Oosterheem, Palenstein en meer. Scherpere prijs gevonden? Wij matchen deze direct!"
      />
      
      <HowItWorks />
      
      {/* Wijken sectie */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
              Schilderwerk in alle wijken van Zoetermeer
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Van Meerzicht tot Oosterheem, van Dorp tot Rokkeveen - De Budgetschilder is actief in heel Zoetermeer met dezelfde lage prijzen en hoge kwaliteit.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Meerzicht</h3>
                <p className="text-xs text-muted-foreground">Oudste wijk</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Driemanspolder</h3>
                <p className="text-xs text-muted-foreground">Jaren '70 wijk</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Palenstein</h3>
                <p className="text-xs text-muted-foreground">Centrumwijk</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Buytenwegh</h3>
                <p className="text-xs text-muted-foreground">Sportpark</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Seghwaert</h3>
                <p className="text-xs text-muted-foreground">Ruime opzet</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Rokkeveen</h3>
                <p className="text-xs text-muted-foreground">Populaire woonwijk</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Oosterheem</h3>
                <p className="text-xs text-muted-foreground">Groene wijk</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Dorp (Oud-Zoetermeer)</h3>
                <p className="text-xs text-muted-foreground">Historisch centrum</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Buytenpark</h3>
                <p className="text-xs text-muted-foreground">Moderne nieuwbouw</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Noordhove</h3>
                <p className="text-xs text-muted-foreground">Bedrijventerrein</p>
              </div>
            </div>

            <div className="prose prose-slate max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Professioneel Schilderwerk in Zoetermeer</h3>
              <p className="text-muted-foreground mb-6">
                Zoetermeer is een relatief jonge stad met vooral naoorlogse architectuur. De meeste woningen zijn gebouwd tussen 1970 en 2000, met moderne nieuwbouw in wijken als Oosterheem en Buytenpark. Dit betekent dat veel woningen nu toe zijn aan renovatie en een nieuwe verflaag. De Budgetschilder helpt u met professioneel binnen- en buitenschilderwerk in heel Zoetermeer.
              </p>

              <h4 className="text-xl font-bold mb-3">Prijzen Schilderwerk Zoetermeer</h4>
              <p className="text-muted-foreground mb-3">Binnen schilderwerk met vaste prijzen:</p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li>• <strong>Muren:</strong> €17 per m²</li>
                <li>• <strong>Plafond:</strong> €17 per m²</li>
                <li>• <strong>Kozijnen:</strong> €12,50 per m¹</li>
                <li>• <strong>Plinten:</strong> €7,50 per m¹</li>
                <li>• <strong>Lijstwerk:</strong> €7,50 per m¹</li>
                <li>• <strong>Deuren:</strong> €125 per stuk</li>
              </ul>
              <p className="text-muted-foreground mb-6">
                <strong>Diensten:</strong> Muren, plafonds, kozijnen, plinten, lijstwerk en deuren schilderen. Vul het formulier in en krijg binnen 30 seconden uw complete prijsindicatie!
              </p>

              <h4 className="text-xl font-bold mb-3">Waarom De Budgetschilder in Zoetermeer?</h4>
              <p className="text-muted-foreground mb-4">
                Als specialist in schilderwerk in Zoetermeer weten wij precies welke verfsoorten en technieken geschikt zijn voor de woningtypen in deze stad. Of u nu een jaren '70 woning in Meerzicht opknapt, een jaren '80 huis in Rokkeveen moderniseert, of een nieuwbouwwoning in Oosterheem personaliseert - wij leveren altijd vakwerk tegen de scherpste prijs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <FAQ 
        location="Zoetermeer"
        customFaqs={[
          {
            question: "Wat kost een schilder in Zoetermeer?",
            answer: "Onze vaste prijzen voor Zoetermeer: muren €15/m², plafonds €17/m², kozijnen €12,50/m¹, plinten en lijstwerk €7,50/m¹ en deuren lakken €125 per stuk. Deze prijzen gelden voor alle wijken van Zoetermeer."
          },
          {
            question: "In welke wijken van Zoetermeer werken jullie?",
            answer: "Wij werken in alle wijken van Zoetermeer: Meerzicht, Driemanspolder, Palenstein, Buytenwegh, Seghwaert, Rokkeveen, Oosterheem, Dorp (Oud-Zoetermeer), Buytenpark en Noordhove. Overal dezelfde scherpe prijzen!"
          },
          {
            question: "Zijn jaren '70 woningen in Zoetermeer geschikt voor overschilderen?",
            answer: "Ja zeker! Veel woningen in Meerzicht en Driemanspolder zijn uit de jaren '70 en zijn vaak toe aan onderhoud. Na 40-50 jaar is renovatie vaak nodig. Wij beoordelen de staat van het houtwerk en adviseren over de beste aanpak."
          },
          {
            question: "Hoe plan ik een afspraak met een schilder in Zoetermeer?",
            answer: "Vul het formulier in en krijg binnen 30 seconden een directe prijsindicatie. Plan een gratis adviesgesprek."
          },
          {
            question: "Werken jullie ook aan appartementen in Zoetermeer?",
            answer: "Absoluut! Zoetermeer heeft veel appartementencomplexen, vooral in Palenstein en Stadshart. We hebben ervaring met zowel binnen- als buitenschilderwerk aan appartementen. Voor VvE's maken we graag een collectieve offerte."
          },
          {
            question: "Is jullie prijs match garantie ook geldig in Zoetermeer?",
            answer: "Ja! Scherpere prijs gevonden in Zoetermeer? Wij matchen deze direct. Onze prijs match garantie geldt voor alle wijken van Zoetermeer. Vul het formulier in en krijg binnen 30 seconden direct uw concurrerende prijsindicatie."
          },
          {
            question: "Hoelang duurt het om een huis te schilderen in Zoetermeer?",
            answer: "Een gemiddelde tussenwoning in Zoetermeer buitenschilderen duurt 5-7 werkdagen. Binnenschilderwerk van één kamer duurt 1-2 dagen. Grote projecten plannen we in overleg."
          },
          {
            question: "Hoe snel kan een schilder beginnen in Zoetermeer?",
            answer: "Vul het formulier in voor een directe prijsindicatie en plan vervolgens een gratis adviesgesprek in via onze planner."
          }
        ]}
      />

      {/* Google Maps */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GoogleMap location="Zoetermeer, Nederland" title="Onze Schilders Werken in Heel Zoetermeer" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

