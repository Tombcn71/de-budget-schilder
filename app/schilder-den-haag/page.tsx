import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroAI } from "@/components/hero-ai"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { Breadcrumb } from "@/components/breadcrumb"
import { GoogleMap } from "@/components/google-map"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schilder Den Haag met Prijs Match Garantie",
  description: "Schilder Den Haag nodig? Prijs Match Garantie. Direct prijsindicatie. Actief in alle wijken van Den Haag.",
  keywords: "schilder den haag, schilderwerk den haag, schilder scheveningen, schilder centrum den haag, binnen schilderen den haag, buiten schilderen den haag, kozijnen schilderen den haag, schilder prijzen den haag, goedkope schilder den haag, schildersbedrijf den haag, huis laten schilderen den haag, woning schilderen den haag, muren verven den haag, plafond schilderen den haag, schilder benoordenhout, schilder bezuidenhout, schilder escamp, schilder haagse hout, schilder loosduinen, schilder segbroek, schilder statenkwartier",
  openGraph: {
    title: "Schilder Den Haag | De Budgetschilder - Prijs Match Garantie",
    description: "Schilder in Den Haag nodig? Scherpere prijs gevonden? Wij matchen deze direct! Direct prijsindicatie. Actief in alle wijken van Den Haag.",
    url: "https://debudgetschilder.nl/schilder-den-haag",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/schilder-den-haag"
  }
}

export default function DenHaagPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Breadcrumb items={[
        { name: "Home", url: "https://debudgetschilder.nl" },
        { name: "Schilder Den Haag", url: "https://debudgetschilder.nl/schilder-den-haag" }
      ]} />
      <HeroAI 
        location="Den Haag"
        title="Schilder Den Haag met Prijs Match Garantie"
        description="Professioneel schilderwerk in alle wijken van Den Haag: Scheveningen, Centrum, Benoordenhout, Statenkwartier en meer. Scherpere prijs gevonden? Wij matchen deze direct!"
      />
      
      <HowItWorks />
      
      {/* SEO Content sectie */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Professioneel Schilderwerk in Den Haag
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Op zoek naar een betrouwbare schilder in Den Haag? De Budgetschilder is uw specialist voor binnen- en buitenschilderwerk in alle wijken van Den Haag. Van het karakteristieke Scheveningen tot het sfeervolle Statenkwartier, van het historische Centrum tot het moderne Leidschenveen-Ypenburg - overal in Den Haag leveren wij professioneel schilderwerk met onze prijs match garantie.
            </p>

            <h3 className="text-2xl font-bold mb-4">Waarom kiezen voor een schilder in Den Haag via De Budgetschilder?</h3>
            <ul className="space-y-2 text-muted-foreground mb-8">
              <li>✓ <strong>Prijs match garantie</strong> - Scherpere prijs gevonden? Wij matchen deze direct!</li>
              <li>✓ <strong>Direct prijsindicatie</strong> met AI preview van uw geverfde woning</li>
              <li>✓ <strong>Actief in alle wijken</strong> van Den Haag</li>
              <li>✓ <strong>Professionele schilders</strong> - Ervaren en vakbekwaam</li>
              <li>✓ <strong>Plan een gratis adviesgesprek</strong> - Bespreek uw wensen</li>
              <li>✓ <strong>Transparante prijzen</strong> - Geen verrassingen achteraf</li>
            </ul>

            <h3 className="text-2xl font-bold mb-4">Onze diensten in Den Haag</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-bold mb-2">Binnen schilderwerk</h4>
                <p className="text-muted-foreground text-sm">
                  Muren, plafonds, deuren en kozijnen vakkundig schilderen. Perfect voor renovatie of opfrissing van uw woning in Den Haag.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Buiten schilderwerk</h4>
                <p className="text-muted-foreground text-sm">
                  Gevels, kozijnen en houtwerk beschermen tegen het Haagse zeeklimaat. Duurzame afwerking met hoogwaardige buitenverf.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Kozijnen schilderen</h4>
                <p className="text-muted-foreground text-sm">
                  Specialist in het renoveren en schilderen van houten kozijnen. Populair in de monumentale panden van Den Haag.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wijken sectie */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
              Schilderwerk in alle wijken van Den Haag
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Of u nu woont in het bruisende centrum of in een rustige buitenwijk, De Budgetschilder is actief in heel Den Haag met dezelfde lage prijzen en hoge kwaliteit.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Scheveningen</h3>
                <p className="text-xs text-muted-foreground">Badplaats & Vissershaven</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Centrum</h3>
                <p className="text-xs text-muted-foreground">Historisch hart</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Benoordenhout</h3>
                <p className="text-xs text-muted-foreground">Groene villawijk</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Bezuidenhout</h3>
                <p className="text-xs text-muted-foreground">Rond Centraal Station</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Duindorp</h3>
                <p className="text-xs text-muted-foreground">Aan zee</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Escamp</h3>
                <p className="text-xs text-muted-foreground">Zuidwest Den Haag</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Haagse Hout</h3>
                <p className="text-xs text-muted-foreground">Bosrijk & Groen</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Laak</h3>
                <p className="text-xs text-muted-foreground">Multicultureel</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Leidschenveen-Ypenburg</h3>
                <p className="text-xs text-muted-foreground">Nieuwbouwwijk</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Loosduinen</h3>
                <p className="text-xs text-muted-foreground">Kijkduin & Ockenburg</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Mariahoeve</h3>
                <p className="text-xs text-muted-foreground">Gezinsvriendelijk</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Moerwijk</h3>
                <p className="text-xs text-muted-foreground">Levendige wijk</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Schilderswijk</h3>
                <p className="text-xs text-muted-foreground">Multicultureel centrum</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Segbroek</h3>
                <p className="text-xs text-muted-foreground">Regentessekwartier</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Statenkwartier</h3>
                <p className="text-xs text-muted-foreground">Trendy & Populair</p>
              </div>
              <div className="bg-background p-4 rounded-lg shadow-sm border border-border">
                <h3 className="font-bold mb-1">Transvaal</h3>
                <p className="text-xs text-muted-foreground">Bloemenbuurt</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Extra SEO Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h3 className="text-2xl font-bold mb-4">Schilderen in Den Haag: Wat maakt het bijzonder?</h3>
            <p className="text-muted-foreground mb-6">
              Den Haag kent een uniek zeeklimaat dat extra uitdagingen stelt aan schilderwerk. De zilte zeelucht, wind en regen vragen om hoogwaardige materialen en vakkundige toepassing. Of u nu een monumentaal pand in het Centrum laat schilderen, een karakteristieke jaren '30 woning in Benoordenhout opknapt, of een modern appartement in Leidschenveen-Ypenburg een nieuwe kleur geeft - wij weten precies welke materialen en technieken geschikt zijn voor uw woning in Den Haag.
            </p>
            
            <h3 className="text-2xl font-bold mb-4">Wat kost een schilder in Den Haag?</h3>
            <p className="text-muted-foreground mb-4">
              Transparante prijzen voor binnen schilderwerk in Den Haag:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>• <strong>Muren schilderen:</strong> €15 per m²</li>
              <li>• <strong>Plafond schilderen:</strong> €17 per m²</li>
              <li>• <strong>Kozijnen schilderen:</strong> €12,50 per m¹</li>
              <li>• <strong>Plinten schilderen:</strong> €7,50 per m¹</li>
              <li>• <strong>Lijstwerk schilderen:</strong> €7,50 per m¹</li>
              <li>• <strong>Deuren lakken:</strong> €125 per deur</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              <strong>Direct uw prijs weten?</strong> Vul het formulier in en krijg binnen 30 seconden uw prijsindicatie. Zie met AI hoe uw woning eruit ziet na het schilderen - altijd de scherpste prijs in Den Haag dankzij onze prijs match garantie!
            </p>

            <h3 className="text-2xl font-bold mb-4">Schilder nodig in Den Haag? Zo werkt het</h3>
            <ol className="space-y-3 text-muted-foreground mb-6">
              <li><strong>1. Vul het formulier in</strong> met uw oppervlaktes en wensen</li>
              <li><strong>2. Bekijk AI preview</strong> van het eindresultaat met uw gekozen kleur</li>
              <li><strong>3. Ontvang direct prijsindicatie</strong> voor uw schilderwerk in Den Haag</li>
              <li><strong>4. Schilder neemt contact op</strong> voor een gratis en vrijblijvend adviesgesprek</li>
              <li><strong>5. Planning & uitvoering</strong> van uw schilderwerk op een geschikt moment</li>
            </ol>
          </div>
        </div>
      </section>
      
      <FAQ 
        location="Den Haag"
        customFaqs={[
          {
            question: "Wat kost een schilder in Den Haag?",
            answer: "Bij De Budgetschilder hanteren wij vaste prijzen voor Den Haag: muren €15/m², plafonds €17/m², kozijnen €12,50/m¹, plinten en lijstwerk €7,50/m¹ en deuren lakken €125 per stuk. Vul het formulier in en krijg binnen 30 seconden een prijsindicatie."
          },
          {
            question: "Welke schilder is het goedkoopst in Den Haag?",
            answer: "De Budgetschilder heeft de prijs match garantie in Den Haag. Scherpere prijs gevonden? Wij matchen deze direct! Vul het formulier in en krijg binnen 30 seconden uw prijsindicatie."
          },
          {
            question: "In welke wijken van Den Haag werken jullie?",
            answer: "Wij werken in alle wijken van Den Haag: Scheveningen, Centrum, Benoordenhout, Bezuidenhout, Escamp, Haagse Hout, Laak, Leidschenveen-Ypenburg, Loosduinen, Segbroek, Statenkwartier en alle andere wijken. Overal dezelfde lage prijzen."
          },
          {
            question: "Hoeveel kost het om een woonkamer te schilderen in Den Haag?",
            answer: "Een gemiddelde woonkamer kost voor muren €15/m² en plafond €17/m². Inclusief plinten en lijstwerk €7,50/m¹. Vul het formulier in voor uw prijsindicatie."
          },
          {
            question: "Kan ik ook alleen kozijnen laten schilderen in Den Haag?",
            answer: "Jazeker! Kozijnen schilderen kost €12,50 per meter. Deuren lakken kost €125 per deur. U kunt ook alleen specifieke onderdelen laten schilderen."
          },
          {
            question: "Hoe krijg ik een prijsindicatie voor mijn huis in Den Haag?",
            answer: "Vul het formulier bovenaan de pagina in met uw oppervlaktes. Binnen 30 seconden ziet u de prijsindicatie voor uw schilderwerk in Den Haag."
          },
          {
            question: "Werken jullie ook in Scheveningen?",
            answer: "Ja, Scheveningen is onderdeel van Den Haag en wij werken daar veel. Dezelfde vaste prijzen: €15/m² voor muren, €17/m² voor plafonds, €12,50/m voor kozijnen en €125 per deur."
          },
          {
            question: "Wat is de prijs match garantie?",
            answer: "Vindt u hetzelfde schilderwerk in Den Haag elders voor een scherpere prijs? Wij matchen deze direct! Onze prijs match garantie geldt voor heel Den Haag."
          }
        ]}
      />

      {/* Google Maps */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GoogleMap location="Den Haag, Nederland" title="Onze Schilders Werken in Heel Den Haag" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

