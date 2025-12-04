import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kozijnen Schilderen | Complete Gids",
  description: "Alles over kozijnen schilderen in Haaglanden. Kosten, tips en wanneer je het het beste laat doen.",
  keywords: "kozijnen schilderen, kozijnen laten schilderen, kozijnen verven, kosten kozijnen schilderen, houten kozijnen",
  openGraph: {
    title: "Kozijnen Schilderen | Complete Gids",
    description: "Alles over kozijnen schilderen in Haaglanden. Kosten en tips.",
    url: "https://debudgetschilder.nl/blog/kozijnen-schilderen",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/blog/kozijnen-schilderen"
  }
}

export default function KozijnenSchilderenBlog() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Kozijnen Schilderen: Complete Gids voor Haaglanden",
    "description": "Alles over kozijnen schilderen in Haaglanden. Kosten, tips en wanneer je het het beste laat doen.",
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
              Kozijnen Schilderen in Haaglanden: Complete Gids
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                Kozijnen schilderen is essentieel onderhoud voor je woning. Goed geschilderde kozijnen beschermen het hout tegen weersinvloeden en geven je huis een verzorgde uitstraling. Lees hier alles wat je moet weten.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Waarom kozijnen schilderen belangrijk is</h2>
              <p>
                Houten kozijnen zijn constant blootgesteld aan weer en wind. Zonder goede verflaag kan het hout gaan rotten, scheuren of verkleuren. Regelmatig schilderen verlengt de levensduur van je kozijnen enorm en voorkomt kostbare reparaties.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Hoe vaak moet je kozijnen schilderen?</h2>
              <p>
                In het Nederlandse klimaat is het aan te raden om kozijnen elke 5-8 jaar te schilderen. Dit hangt af van de ligging (zon, wind, regen) en de kwaliteit van de vorige schilderbeurt. Kozijnen op het zuiden en westen hebben vaker onderhoud nodig.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Zelf doen of laten doen?</h2>
              
              <h3 className="text-2xl font-bold mt-8 mb-4">Uitdagingen bij zelf kozijnen schilderen:</h3>
              <ul className="space-y-2 my-6">
                <li>✗ Veel voorbereidend werk (schuren, ontvetten)</li>
                <li>✗ Nauwkeurig afplakken van glas nodig</li>
                <li>✗ Meerdere dunne lagen voor beste resultaat</li>
                <li>✗ Buitenkozijnen: werken op hoogte en weersafhankelijk</li>
                <li>✗ Risico op strepen en doorschemering</li>
              </ul>

              <h3 className="text-2xl font-bold mt-8 mb-4">Voordelen van professioneel laten doen:</h3>
              <p>
                Een professional heeft de ervaring om kozijnen vlot en netjes te schilderen. Geen gedoe met ladders, geen verfspatjes op je glas, en geen dagen werk. Het resultaat is strak en duurzaam.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Wat kost kozijnen schilderen in Haaglanden?</h2>
              <p>
                Bij De Budgetschilder betaal je <strong>€12,50 per strekkende meter</strong> voor het professioneel schilderen van kozijnen in heel Haaglanden. Deze prijs geldt voor alle gemeentes in de regio.
              </p>

              <div className="bg-primary/10 p-6 rounded-lg my-8">
                <h3 className="text-2xl font-bold mb-4">Voorbeeld: Raamkozijn</h3>
                <p className="mb-2">Een standaard raamkozijn van 6 meter (rondom):</p>
                <p className="text-2xl font-bold text-primary">6m × €12,50 = €75</p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Binnen of buitenkozijnen schilderen?</h2>
              <p>
                Buitenkozijnen hebben prioriteit omdat ze blootstaan aan weer en wind. Binnenkozijnen hoeven minder vaak, meestal alleen als je de kleur wilt aanpassen of bij renovatie.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Tips voor optimaal resultaat</h2>
              <ul className="space-y-3 my-6">
                <li>✓ Schuur oude verf goed af voor goede hechting</li>
                <li>✓ Ontvetten voor het schilderen</li>
                <li>✓ Gebruik kozijnverf (flexibel en weerbestendig)</li>
                <li>✓ Werk meerdere dunne lagen in plaats van één dikke</li>
                <li>✓ Schilder alleen bij droog weer (buitenkozijnen)</li>
              </ul>

              <div className="bg-muted p-8 rounded-lg my-12">
                <h2 className="text-3xl font-bold mb-4">Kozijnen laten schilderen in Haaglanden?</h2>
                <p className="text-lg mb-6">
                  Vul het formulier in en krijg binnen 30 seconden je prijsindicatie voor het schilderen van je kozijnen. Prijs match garantie in heel Haaglanden!
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
                  <h3 className="text-xl font-bold mb-2">Kan ik kunststof kozijnen schilderen?</h3>
                  <p>Kunststof kozijnen schilderen wordt niet aangeraden. Ze zijn onderhoudsvrij en verf hecht slecht op kunststof. Houten kozijnen zijn wel geschikt voor schilderen.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Hoelang moet ik wachten tussen de lagen?</h3>
                  <p>Dit staat op de verpakking van de verf, maar meestal tussen 4-12 uur. Te snel overschilderen geeft een slecht resultaat.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Wanneer is het beste seizoen voor kozijnen schilderen?</h3>
                  <p>Voorjaar en nazomer zijn ideaal. Tussen 10-25 graden, droog weer en niet in direct zonlicht.</p>
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

