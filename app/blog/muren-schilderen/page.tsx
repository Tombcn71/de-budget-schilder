import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Muren Schilderen | Complete Gids",
  description: "Alles over muren schilderen in Haaglanden. Hoe doe je het? Wat kost het? Tips en tricks voor perfect resultaat.",
  keywords: "muren schilderen, muur verven, muren laten schilderen, kosten muren schilderen, muren schilderen haaglanden",
  openGraph: {
    title: "Muren Schilderen | Complete Gids",
    description: "Alles over muren schilderen in Haaglanden. Hoe doe je het? Wat kost het?",
    url: "https://debudgetschilder.nl/blog/muren-schilderen",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/blog/muren-schilderen"
  }
}

export default function MurenSchilderenBlog() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Muren Schilderen: Complete Gids voor Haaglanden",
    "description": "Alles over muren schilderen in Haaglanden. Hoe doe je het? Wat kost het? Tips en tricks voor perfect resultaat.",
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
              Muren Schilderen in Haaglanden: Complete Gids
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                Muren schilderen is één van de meest effectieve manieren om een ruimte een nieuwe uitstraling te geven. Of je nu zelf aan de slag gaat of het laat doen door een professional, in deze gids lees je alles wat je moet weten.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Waarom muren schilderen?</h2>
              <p>
                Muren schilderen geeft je woning direct een frisse, nieuwe uitstraling. Het is een relatief eenvoudige manier om je interieur te vernieuwen zonder grote verbouwingen. Een nieuwe kleur kan een ruimte groter, lichter of juist gezelliger maken.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Zelf doen of laten doen?</h2>
              
              <h3 className="text-2xl font-bold mt-8 mb-4">Zelf muren schilderen</h3>
              <p>
                Zelf muren schilderen kan kostenbesparend zijn, maar vraagt wel tijd en de juiste voorbereiding. Je hebt gereedschap nodig zoals kwasten, rollers, afplaktape en afdekfolie. Het voorbereiden van de muren (schoonmaken, gaten vullen, schuren) is essentieel voor een mooi eindresultaat.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Muren laten schilderen door een professional</h3>
              <p>
                Een professional heeft de ervaring en het gereedschap om je muren snel en netjes te schilderen. Het voordeel: geen gedoe met voorbereiding, materiaal inkopen en opruimen. Je krijgt gegarandeerd een strak resultaat zonder strepen of vlekken.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Wat kost muren schilderen in Haaglanden?</h2>
              <p>
                Bij De Budgetschilder betaal je <strong>€12,50 per m²</strong> voor het professioneel schilderen van muren in heel Haaglanden. Deze prijs geldt voor Den Haag, Delft, Zoetermeer, Rijswijk, Westland en alle andere gemeentes in de regio.
              </p>

              <div className="bg-primary/10 p-6 rounded-lg my-8">
                <h3 className="text-2xl font-bold mb-4">Voorbeeld: Woonkamer schilderen</h3>
                <p className="mb-2">Een gemiddelde woonkamer van 25m² muuroppervlak:</p>
                <p className="text-2xl font-bold text-primary">25m² × €12,50 = €312,50</p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Tips voor het beste resultaat</h2>
              <ul className="space-y-3 my-6">
                <li>✓ Kies de juiste verf voor je type muur (latex voor woonruimtes)</li>
                <li>✓ Breng altijd een grondlaag aan op nieuwe of gerepareerde muren</li>
                <li>✓ Werk van boven naar beneden</li>
                <li>✓ Gebruik kwaliteitsverf voor beter dekvermogen</li>
                <li>✓ Zorg voor goede ventilatie tijdens het schilderen</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6">Hoelang duurt muren schilderen?</h2>
              <p>
                Een gemiddelde kamer (4 muren van circa 20-30m²) kan in 1 dag geschilderd worden door een professional. Dit is inclusief voorbereiden en opruimen. Voor zelfwerkzaamheid moet je rekenen op 1-2 dagen, afhankelijk van je ervaring.
              </p>

              <div className="bg-muted p-8 rounded-lg my-12">
                <h2 className="text-3xl font-bold mb-4">Muren laten schilderen in Haaglanden?</h2>
                <p className="text-lg mb-6">
                  Vul het formulier in en krijg binnen 30 seconden je prijsindicatie voor het schilderen van je muren. Prijs match garantie in heel Haaglanden!
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
                  <h3 className="text-xl font-bold mb-2">Hoeveel lagen verf heb ik nodig?</h3>
                  <p>Voor de meeste muren zijn 2 lagen voldoende. Bij een groot kleurverschil (bijvoorbeeld van donker naar licht) kan een extra laag nodig zijn.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Kan ik over behang heen schilderen?</h3>
                  <p>Dit hangt af van het type behang. Vliesbehang kan meestal beschilderd worden, maar traditioneel behang moet je eerst verwijderen voor het beste resultaat.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Welke kleur maakt een kamer groter?</h3>
                  <p>Lichte kleuren zoals wit, beige of lichtgrijs reflecteren meer licht en laten een ruimte groter lijken. Donkere kleuren kunnen een ruimte juist intiemer maken.</p>
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

