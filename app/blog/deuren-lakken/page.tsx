import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Deuren Lakken | Complete Gids",
  description: "Alles over deuren lakken in Haaglanden. Kosten, technieken en tips voor een perfect resultaat.",
  keywords: "deuren lakken, deur lakken, deuren laten lakken, kosten deuren lakken, deur spuiten",
  openGraph: {
    title: "Deuren Lakken | Complete Gids",
    description: "Alles over deuren lakken in Haaglanden. Kosten en tips.",
    url: "https://debudgetschilder.nl/blog/deuren-lakken",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/blog/deuren-lakken"
  }
}

export default function DeurenLakkenBlog() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Deuren Lakken: Complete Gids voor Haaglanden",
    "description": "Alles over deuren lakken in Haaglanden. Kosten, technieken en tips voor een perfect resultaat.",
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
              Deuren Lakken in Haaglanden: Complete Gids
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                Een gelakte deur geeft je interieur direct een verzorgde, moderne uitstraling. Deuren lakken vraagt om precisie en geduld. In deze gids lees je alles over deuren lakken: de kosten, technieken en wanneer je het beter uit handen geeft.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Waarom deuren lakken?</h2>
              <p>
                Gelakte deuren hebben een strakke, moderne uitstraling. Lak geeft een harder en gladder oppervlak dan normale verf. Deuren lakken is populair bij renovaties en geeft oude deuren een tweede leven.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Zelf doen of laten doen?</h2>
              
              <h3 className="text-2xl font-bold mt-8 mb-4">Uitdagingen bij zelf deuren lakken:</h3>
              <ul className="space-y-2 my-6">
                <li>✗ Lak toont alle oneffenheden - perfecte voorbereiding nodig</li>
                <li>✗ Deur moet van de scharnieren af</li>
                <li>✗ Stofvrije omgeving nodig</li>
                <li>✗ Meerdere dunne lagen met tussendoor schuren</li>
                <li>✗ Lange droogtijd tussen lagen</li>
                <li>✗ Risico op loopstrepen en stofdeeltjes</li>
              </ul>

              <h3 className="text-2xl font-bold mt-8 mb-4">Voordelen van professioneel laten lakken:</h3>
              <p>
                Een professional heeft de ruimte en ervaring om deuren perfect te lakken. Ze weten hoe ze een streeploos resultaat krijgen en kunnen eventueel spuiten voor de meest strakke afwerking.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Wat kost deuren lakken in Haaglanden?</h2>
              <p>
                Bij De Budgetschilder betaal je <strong>€125 per deur</strong> voor het professioneel lakken van deuren in heel Haaglanden. Deze prijs geldt voor alle gemeentes in de regio.
              </p>

              <div className="bg-primary/10 p-6 rounded-lg my-8">
                <h3 className="text-2xl font-bold mb-4">Voorbeeld: 3 binnendeuren</h3>
                <p className="mb-2">Drie standaard binnendeuren lakken:</p>
                <p className="text-2xl font-bold text-primary">3 deuren × €125 = €375</p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Het proces van deuren lakken</h2>
              <p>
                Deuren lakken is een proces van meerdere stappen:
              </p>
              <ol className="space-y-3 my-6 list-decimal list-inside">
                <li>Deur van scharnieren halen</li>
                <li>Grondig schuren en ontvetten</li>
                <li>Eventuele beschadigingen herstellen</li>
                <li>Eerste laag lak aanbrengen</li>
                <li>Laten drogen en licht schuren</li>
                <li>Tweede (en eventueel derde) laag</li>
                <li>Volledig laten uitharden</li>
                <li>Deur terug ophangen</li>
              </ol>

              <h2 className="text-3xl font-bold mt-12 mb-6">Hoelang duurt deuren lakken?</h2>
              <p>
                Een professional kan meerdere deuren op één dag voorbereiden en de eerste laag aanbrengen. Met droogtijd moet je rekenen op 2-3 dagen voor het complete proces. Voor zelfwerkzaamheid kan het langer duren door gebrek aan ervaring en een geschikte ruimte.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Tips voor het beste resultaat</h2>
              <ul className="space-y-3 my-6">
                <li>✓ Werk in een stofvrije ruimte</li>
                <li>✓ Gebruik kwaliteitslak voor duurzaam resultaat</li>
                <li>✓ Schuur tussen elke laag licht bij</li>
                <li>✓ Werk meerdere dunne lagen voor glad resultaat</li>
                <li>✓ Wacht voldoende droogtijd tussen lagen</li>
                <li>✓ Bescherm de lak tijdens het drogen tegen stof</li>
              </ul>

              <div className="bg-muted p-8 rounded-lg my-12">
                <h2 className="text-3xl font-bold mb-4">Deuren laten lakken in Haaglanden?</h2>
                <p className="text-lg mb-6">
                  Vul het formulier in en krijg binnen 30 seconden je prijsindicatie voor het lakken van je deuren. Prijs match garantie in heel Haaglanden!
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
                  <h3 className="text-xl font-bold mb-2">Kan ik een geverfd deur lakken?</h3>
                  <p>Ja, maar de oude verf moet eerst volledig verwijderd of goed geschuurd worden. Lak over verf geeft vaak geen mooi resultaat.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Welke kleur lak is het populairst?</h3>
                  <p>Wit is veruit het populairst voor een moderne, strakke uitstraling. Daarnaast zijn grijstinten en zwart steeds populairder.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Moet ik mijn deuren er altijd af halen?</h3>
                  <p>Voor het beste resultaat wel. Horizontaal lakken voorkomt loopstrepen en je kunt alle kanten goed bereiken.</p>
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

