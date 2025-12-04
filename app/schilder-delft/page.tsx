import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroAI } from "@/components/hero-ai"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { Breadcrumb } from "@/components/breadcrumb"
import { GoogleMap } from "@/components/google-map"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schilder Delft met Prijs Match Garantie",
  description: "Schilder Delft nodig? Prijs Match Garantie. Direct prijsindicatie. Professioneel schilderwerk in heel Delft.",
  keywords: "schilder delft, schilderwerk delft, binnen schilderen delft, buiten schilderen delft, kozijnen schilderen delft, schilder prijzen delft, goedkope schilder delft, schildersbedrijf delft, huis laten schilderen delft",
  openGraph: {
    title: "Schilder Delft | De Budgetschilder - Prijs Match Garantie",
    description: "Schilder in Delft nodig? Scherpere prijs gevonden? Wij matchen deze direct! Direct prijsindicatie.",
    url: "https://debudgetschilder.nl/schilder-delft",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/schilder-delft"
  }
}

export default function DelftPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Breadcrumb items={[
        { name: "Home", url: "https://debudgetschilder.nl" },
        { name: "Schilder Delft", url: "https://debudgetschilder.nl/schilder-delft" }
      ]} />
      <HeroAI 
        location="Delft"
        title="Schilder Delft met Prijs Match Garantie"
        description="Professioneel schilderwerk in heel Delft: Centrum, Voorhof, Tanthof, Hof van Delft, TU-wijk en meer. Scherpere prijs gevonden? Wij matchen deze direct!"
      />
      
      <HowItWorks />
      
      {/* SEO Content sectie */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Professioneel Schilderwerk in Delft
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Op zoek naar een betrouwbare schilder in Delft? De Budgetschilder is uw specialist voor binnen- en buitenschilderwerk in heel Delft. Van het historische centrum met de Oude en Nieuwe Kerk tot de moderne nieuwbouwwijken zoals Tanthof-Oost en Voorhof - overal in Delft leveren wij professioneel schilderwerk met onze prijs match garantie.
            </p>

            <h3 className="text-2xl font-bold mb-4">Schilderwerk in Delft: Wijken & Buurten</h3>
            <p className="text-muted-foreground mb-4">
              Delft kent diverse wijken, elk met hun eigen karakter en type woningen. De Budgetschilder is actief in:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Centrum & Historisch Delft</h4>
                <p className="text-sm text-muted-foreground">
                  Monumentale panden, grachtenpanden en karakteristieke Delftse architectuur. Specialistische kennis vereist voor historisch schilderwerk.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Voorhof & Tanthof</h4>
                <p className="text-sm text-muted-foreground">
                  Moderne nieuwbouwwijken met eigentijdse woningen en appartementen. Perfect voor fris en modern schilderwerk.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Hof van Delft</h4>
                <p className="text-sm text-muted-foreground">
                  Nieuwere woonwijk met gevarieerde woningtypen, van rijtjeswoningen tot vrijstaande villa's.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Buitenhof & Wippolder</h4>
                <p className="text-sm text-muted-foreground">
                  Ruime wijken met verschillende woningtypen, populair bij gezinnen en starters.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Zuidpoort & Vrijenban</h4>
                <p className="text-sm text-muted-foreground">
                  Groene wijken met veel eengezinswoningen en goede voorzieningen.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2">TU-wijk & Schieweg</h4>
                <p className="text-sm text-muted-foreground">
                  Studentenwoningen, starters en jonge gezinnen. Vaak behoefte aan opknapwerk en opfrissing.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">Wat kost een schilder in Delft?</h3>
            <p className="text-muted-foreground mb-4">
              Vaste prijzen voor binnen schilderwerk in Delft:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>• <strong>Muren schilderen:</strong> €17 per m²</li>
              <li>• <strong>Plafond schilderen:</strong> €17 per m²</li>
              <li>• <strong>Kozijnen schilderen:</strong> €12,50 per m¹</li>
              <li>• <strong>Plinten schilderen:</strong> €7,50 per m¹</li>
              <li>• <strong>Lijstwerk schilderen:</strong> €7,50 per m¹</li>
              <li>• <strong>Deuren lakken:</strong> €125 per deur</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              Deze scherpe prijzen gelden voor alle wijken in Delft - van monumentaal centrum tot moderne nieuwbouw in Voorhof en Tanthof. Vul het formulier in en krijg binnen 30 seconden een directe volledige prijsindicatie!
            </p>

            <h3 className="text-2xl font-bold mb-4">Waarom kiezen voor De Budgetschilder in Delft?</h3>
            <ul className="space-y-2 text-muted-foreground mb-8">
              <li>✓ <strong>Kennis van Delftse architectuur</strong> - Van monumenten tot nieuwbouw</li>
              <li>✓ <strong>Prijs match garantie</strong> - Scherpere prijs gevonden? Wij matchen deze direct!</li>
              <li>✓ <strong>AI Preview</strong> - Zie direct hoe uw woning eruit ziet na het schilderen</li>
              <li>✓ <strong>Plan een gratis adviesgesprek</strong> - Bespreek uw wensen</li>
              <li>✓ <strong>Vakkundige schilders</strong> - Ervaring met alle woningtypen in Delft</li>
            </ul>
          </div>
        </div>
      </section>
      
      <FAQ 
        location="Delft"
        customFaqs={[
          {
            question: "Wat kost een schilder in Delft?",
            answer: "Bij De Budgetschilder hanteren wij vaste prijzen voor Delft: muren €15/m², plafonds €17/m², kozijnen €12,50/m¹, plinten en lijstwerk €7,50/m¹ en deuren lakken €125 per stuk. Deze prijzen gelden voor alle wijken van Delft."
          },
          {
            question: "Werken jullie in alle wijken van Delft?",
            answer: "Ja, wij werken door heel Delft: het historische Centrum, Voorhof, Tanthof, Hof van Delft, Buitenhof, Wippolder, Zuidpoort, Vrijenban en de TU-wijk. Van monumentale panden tot moderne nieuwbouw."
          },
          {
            question: "Hebben jullie ervaring met monumentaal schilderwerk in Delft?",
            answer: "Absoluut! Het historische centrum van Delft kent veel monumentale panden. Wij hebben ruime ervaring met schilderwerk aan monumenten en werken volgens de juiste technieken en in overleg met Monumentenzorg waar nodig."
          },
          {
            question: "Hoe plan ik een afspraak met een schilder in Delft?",
            answer: "Vul het formulier in en krijg binnen 30 seconden een directe prijsindicatie, of plan direct een gratis adviesgesprek."
          },
          {
            question: "Zijn de prijzen voor monumentale panden in Delft hoger?",
            answer: "Onze basisprijzen blijven hetzelfde. Monumentaal schilderwerk kan iets meer tijd vragen door speciale technieken, maar we berekenen dit eerlijk. Vul het formulier in en krijg binnen 30 seconden een prijsindicatie voor uw monumentale pand in Delft."
          },
          {
            question: "Werken jullie ook in de nieuwbouwwijken van Delft?",
            answer: "Jazeker! We werken veel in de moderne wijken zoals Voorhof, Tanthof-Oost en Hof van Delft. Nieuwbouwwoningen hebben vaak andere behoeften dan oudere panden, en daar zijn we op ingespeeld."
          },
          {
            question: "Hoelang duurt het om een huis te schilderen in Delft?",
            answer: "Een gemiddelde tussenwoning in Delft buitenschilderen duurt 5-7 werkdagen. Binnenschilderwerk van één kamer is vaak binnen 1-2 dagen klaar. Grote projecten plannen we in overleg."
          },
          {
            question: "Hoeveel kost het om een studentenkamer te schilderen in Delft?",
            answer: "Een gemiddelde studentenkamer (15-20m²) schilderen kost ongeveer €200-€350 inclusief plafond, muren en plinten. Perfect voor studenten die hun kamer willen opknappen."
          },
          {
            question: "Welke schilder is het goedkoopst in Delft?",
            answer: "De Budgetschilder heeft de prijs match garantie in Delft. Scherpere prijs gevonden bij een concurrent? Wij matchen deze direct! Vul het formulier in en krijg binnen 30 seconden een directe prijsindicatie."
          }
        ]}
      />

      {/* Google Maps */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GoogleMap location="Delft, Nederland" title="Onze Schilders Werken in Heel Delft" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

