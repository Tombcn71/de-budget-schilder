import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Plinten Schilderen | Complete Gids",
  description: "Alles over plinten schilderen in Haaglanden. Kosten, tips en waarom het vaak uitbesteed wordt.",
  keywords: "plinten schilderen, plint schilderen, plinten laten schilderen, kosten plinten schilderen",
  openGraph: {
    title: "Plinten Schilderen | Complete Gids",
    description: "Alles over plinten schilderen in Haaglanden.",
    url: "https://debudgetschilder.nl/blog/plinten-schilderen",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/blog/plinten-schilderen"
  }
}

export default function PlintenSchilderenBlog() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Plinten Schilderen: Complete Gids voor Haaglanden",
    "description": "Alles over plinten schilderen in Haaglanden. Kosten, tips en waarom het vaak uitbesteed wordt.",
    "datePublished": "2024-01-15",
    "dateModified": "2024-01-15",
    "author": {
      "@type": "Organization",
      "name": "De Budgetschilder"
    }
  }

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      
      <article className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Plinten Schilderen in Haaglanden: Complete Gids
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                Plinten lijken een klein detail, maar ze maken een groot verschil in de uitstraling van je kamer. Fris geschilderde plinten geven je interieur een verzorgde afwerking. Lees hier alles over plinten schilderen.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Waarom plinten schilderen?</h2>
              <p>
                Plinten krijgen veel te verduren: stotzuiger aanstoten, voetstappen, schoonmaakmiddelen. Ze verkleuren sneller dan muren en plafonds. Nieuw geschilderde plinten geven je kamer direct een nettere uitstraling.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">De uitdaging van plinten schilderen</h2>
              <p>
                Plinten schilderen lijkt eenvoudig, maar vraagt veel geduld en precisie. Je moet nauwkeurig afplakken langs de vloer en de muur. Het is gebukt werk en je moet oppassen dat je niet tegen de muur komt.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Veelvoorkomende problemen:</h3>
              <ul className="space-y-2 my-6">
                <li>✗ Verf op de vloer of muur</li>
                <li>✗ Onregelmatige afwerking langs de randen</li>
                <li>✗ Rugpijn door gebukt werken</li>
                <li>✗ Veel tijdrovend afplakwerk</li>
                <li>✗ Moeite met hoeken en overgangen</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6">Waarom laten doen?</h2>
              <p>
                Een professional schildert plinten snel en netjes. Ze hebben de ervaring om strak af te plakken en vlot te werken. Het bespaart je tijd, rugpijn en het risico op een rommelig resultaat.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Wat kost plinten schilderen in Haaglanden?</h2>
              <p>
                Bij De Budgetschilder betaal je <strong>€7,50 per strekkende meter</strong> voor het professioneel schilderen van plinten in heel Haaglanden. Deze prijs geldt voor alle gemeentes in de regio.
              </p>

              <div className="bg-primary/10 p-6 rounded-lg my-8">
                <h3 className="text-2xl font-bold mb-4">Voorbeeld: Woonkamer</h3>
                <p className="mb-2">Een gemiddelde woonkamer met 20 meter plint:</p>
                <p className="text-2xl font-bold text-primary">20m × €7,50 = €150</p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Tips voor het beste resultaat</h2>
              <ul className="space-y-3 my-6">
                <li>✓ Plak nauwkeurig af met kwaliteitsafplaktape</li>
                <li>✓ Gebruik een kleine kwast voor precision</li>
                <li>✓ Werk systematisch van links naar rechts</li>
                <li>✓ Verwijder afplaktape terwijl de verf nog nat is</li>
                <li>✓ Bescherm de vloer met afdekfolie</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6">Welke kleur voor plinten?</h2>
              <p>
                Wit is de klassieke keuze voor plinten omdat het fris en tijdloos is. Steeds populairder worden grijze en zwarte plinten voor een moderne uitstraling. Je kunt ook kiezen voor dezelfde kleur als de deur voor een eenheid look.
              </p>

              <div className="bg-muted p-8 rounded-lg my-12">
                <h2 className="text-3xl font-bold mb-4">Plinten laten schilderen in Haaglanden?</h2>
                <p className="text-lg mb-6">
                  Vul het formulier in en krijg binnen 30 seconden je prijsindicatie voor het schilderen van je plinten. Prijs match garantie in heel Haaglanden!
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link 
                    href="/#hero" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Direct prijsindicatie
                  </Link>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-background border-2 border-primary text-foreground rounded-lg font-semibold hover:bg-muted transition-colors"
                  >
                    Stel een vraag
                  </Link>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Veelgestelde vragen</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Moet ik plinten lakken of schilderen?</h3>
                  <p>Beide kan. Lak geeft een gladder, duurzamer resultaat maar is duurder. Normale plintenverf is prima en makkelijker bij te werken.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Kan ik plinten schilderen zonder af te plakken?</h3>
                  <p>Met veel ervaring kan het, maar voor de meeste mensen geeft afplakken een netter resultaat zonder vlekken op muur of vloer.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Hoelang duren plinten voor ze droog zijn?</h3>
                  <p>De meeste verf is aanraakdroog na 1-2 uur, maar laat het liefst een dag uitharden voordat je er tegenaan komt met de stofzuiger.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}

