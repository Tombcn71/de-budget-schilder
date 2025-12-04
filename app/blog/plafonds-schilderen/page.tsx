import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Plafonds Schilderen | Complete Gids",
  description: "Alles over plafonds schilderen in Haaglanden. Tips, kosten en waarom je het beter kunt laten doen.",
  keywords: "plafond schilderen, plafond verven, plafond laten schilderen, kosten plafond schilderen, plafond wit maken",
  openGraph: {
    title: "Plafonds Schilderen | Complete Gids",
    description: "Alles over plafonds schilderen in Haaglanden. Tips en kosten.",
    url: "https://debudgetschilder.nl/blog/plafonds-schilderen",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/blog/plafonds-schilderen"
  }
}

export default function PlafondsSchilderenBlog() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Plafonds Schilderen: Complete Gids voor Haaglanden",
    "description": "Alles over plafonds schilderen in Haaglanden. Tips, kosten en waarom je het beter kunt laten doen.",
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
              Plafonds Schilderen in Haaglanden: Complete Gids
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                Een plafond schilderen is fysiek zwaar werk dat om precisie vraagt. In deze gids lees je alles over plafonds schilderen: de kosten, het proces en waarom veel mensen ervoor kiezen om het uit handen te geven.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Waarom je plafond schilderen?</h2>
              <p>
                Een plafond wordt vaak vergeten bij het opknappen van een ruimte, maar een fris wit plafond maakt een enorm verschil. Plafonds verkleuren door rook, vocht en stof. Een nieuw geschilderd plafond geeft je kamer direct een schone, frisse uitstraling.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">De uitdaging van zelf plafond schilderen</h2>
              <p>
                Plafond schilderen is één van de meest uitdagende klussen in huis. Je moet constant omhoog kijken en werken, wat zwaar is voor nek en armen. Daarnaast is het lastig om strepen en oneffenheden te voorkomen. Veel doe-het-zelvers onderschatten deze klus.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Veelvoorkomende problemen bij zelf doen:</h3>
              <ul className="space-y-2 my-6">
                <li>✗ Verfstrepen die zichtbaar blijven</li>
                <li>✗ Ongelijkmatige dekking</li>
                <li>✗ Verfspatten op muren en vloer</li>
                <li>✗ Pijn aan nek, rug en armen</li>
                <li>✗ Veel tijdsverlies</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6">Plafond laten schilderen: de voordelen</h2>
              <p>
                Een professional schildert je plafond snel, netjes en zonder strepen. Met de juiste technieken en gereedschap zorgt een vakman voor een perfect egaal resultaat. Je bespaart jezelf tijd, moeite en het risico op een teleurstellend eindresultaat.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Wat kost plafond schilderen in Haaglanden?</h2>
              <p>
                Bij De Budgetschilder betaal je <strong>€13,50 per m²</strong> voor het professioneel schilderen van plafonds in heel Haaglanden. Deze prijs geldt voor alle gemeentes: Den Haag, Delft, Zoetermeer, Rijswijk, Westland en meer.
              </p>

              <div className="bg-primary/10 p-6 rounded-lg my-8">
                <h3 className="text-2xl font-bold mb-4">Voorbeeld: Slaapkamer plafond</h3>
                <p className="mb-2">Een gemiddelde slaapkamer van 15m² plafondoppervlak:</p>
                <p className="text-2xl font-bold text-primary">15m² × €13,50 = €225</p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Hoe lang duurt plafond schilderen?</h2>
              <p>
                Een professional kan een gemiddeld plafond (15-20m²) in enkele uren schilderen, inclusief voorbereiding en opruimen. Voor zelfwerkzaamheid moet je rekenen op een volledige dag, vooral als je weinig ervaring hebt.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Tips als je het zelf doet</h2>
              <ul className="space-y-3 my-6">
                <li>✓ Gebruik een telescopische roller voor beter bereik</li>
                <li>✓ Werk in stroken, niet in losse stukken</li>
                <li>✓ Gebruik plafondverf (dikker en minder spatten)</li>
                <li>✓ Dek alles goed af - plafond schilderen spat!</li>
                <li>✓ Zorg voor goede verlichting om strepen te zien</li>
              </ul>

              <div className="bg-muted p-8 rounded-lg my-12">
                <h2 className="text-3xl font-bold mb-4">Plafond laten schilderen in Haaglanden?</h2>
                <p className="text-lg mb-6">
                  Vul het formulier in en krijg binnen 30 seconden je prijsindicatie voor het schilderen van je plafond. Prijs match garantie in heel Haaglanden!
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
                  <h3 className="text-xl font-bold mb-2">Moet ik mijn plafond altijd wit schilderen?</h3>
                  <p>Wit is de meest gebruikelijke kleur omdat het licht reflecteert en ruimtes groter laat lijken. Maar je kunt ook kiezen voor een lichte tint voor meer sfeer.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Hoe vaak moet ik mijn plafond schilderen?</h3>
                  <p>Een plafond hoeft gemiddeld maar elke 5-10 jaar geschilderd te worden, tenzij er specifieke vervuiling of beschadiging is.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Kan ik over een oud plafond heen schilderen?</h3>
                  <p>Ja, mits het plafond schoon, droog en in goede staat is. Loszittende verf moet eerst verwijderd worden.</p>
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

