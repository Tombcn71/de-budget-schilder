import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lijstwerk Schilderen | Complete Gids",
  description: "Alles over lijstwerk schilderen in Haaglanden. Kosten, tips en waarom precisiewerk loont.",
  keywords: "lijstwerk schilderen, lijsten schilderen, sierlijsten schilderen, kosten lijstwerk schilderen",
  openGraph: {
    title: "Lijstwerk Schilderen | Complete Gids",
    description: "Alles over lijstwerk schilderen in Haaglanden.",
    url: "https://debudgetschilder.nl/blog/lijstwerk-schilderen",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/blog/lijstwerk-schilderen"
  }
}

export default function LijstwerkSchilderenBlog() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Lijstwerk Schilderen: Complete Gids voor Haaglanden",
    "description": "Alles over lijstwerk schilderen in Haaglanden. Kosten, tips en waarom precisiewerk loont.",
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
              Lijstwerk Schilderen in Haaglanden: Complete Gids
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                Lijstwerk geeft karakter aan je interieur. Fris geschilderd lijstwerk versterkt de uitstraling van je kamer. Maar lijstwerk schilderen is precisiewerk. Lees hier waarom veel mensen het uitbesteden.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Wat is lijstwerk?</h2>
              <p>
                Lijstwerk zijn de sierlijsten die je aantreft op de overgang van muur naar plafond (plafondlijsten), rondom deuren (deuromlijstingen) of als decoratie op de muur. Ze geven een kamer meer allure en zijn vooral te vinden in oudere woningen.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Waarom is lijstwerk schilderen lastig?</h2>
              <p>
                Lijstwerk heeft vaak details, versieringen en onregelmatige vormen. Het vereist precisiewerk met een kwast. Je moet vaak boven je hoofd werken (plafondlijsten) en nauwkeurig afplakken om geen verf op muur of plafond te krijgen.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Uitdagingen bij zelf doen:</h3>
              <ul className="space-y-2 my-6">
                <li>✗ Precisiewerk in moeilijke houdingen</li>
                <li>✗ Details en versieringen goed bereiken</li>
                <li>✗ Nauwkeurig afplakken nodig</li>
                <li>✗ Risico op verfvlekken op muur/plafond</li>
                <li>✗ Veel tijd per meter door details</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6">Waarom lijstwerk laten schilderen?</h2>
              <p>
                Een professional heeft de ervaring en het gereedschap om lijstwerk snel en netjes te schilderen. Ze weten hoe ze versieringen bereiken zonder vlekken en kunnen ook hoog lijstwerk veilig behandelen. Het resultaat is strak en professioneel.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Wat kost lijstwerk schilderen in Haaglanden?</h2>
              <p>
                Bij De Budgetschilder betaal je <strong>€7,50 per strekkende meter</strong> voor het professioneel schilderen van lijstwerk in heel Haaglanden. Deze prijs geldt voor alle gemeentes in de regio.
              </p>

              <div className="bg-primary/10 p-6 rounded-lg my-8">
                <h3 className="text-2xl font-bold mb-4">Voorbeeld: Plafondlijsten woonkamer</h3>
                <p className="mb-2">Een woonkamer met 18 meter plafondlijst rondom:</p>
                <p className="text-2xl font-bold text-primary">18m × €7,50 = €135</p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-6">Welke kleur voor lijstwerk?</h2>
              <p>
                Klassiek is wit lijstwerk, wat fris en tijdloos is. Steeds populairder wordt lijstwerk in dezelfde kleur als het plafond voor een subtiele uitstraling. Je kunt ook kiezen voor een contrasterende kleur om het lijstwerk extra te benadrukken.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Tips voor het beste resultaat</h2>
              <ul className="space-y-3 my-6">
                <li>✓ Gebruik een kleine, puntige kwast voor details</li>
                <li>✓ Plak zorgvuldig af langs muur en plafond</li>
                <li>✓ Werk van boven naar beneden</li>
                <li>✓ Neem de tijd voor versieringen en hoeken</li>
                <li>✓ Gebruik een stabiele ladder voor plafondlijsten</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6">Lijstwerk in oude vs nieuwe woningen</h2>
              <p>
                Oudere woningen hebben vaak uitgebreid lijstwerk met veel details. Dit vraagt extra tijd en precisie. Moderne woningen hebben eenvoudiger lijstwerk of soms alleen strakke plafondlijsten. Het type lijstwerk bepaalt hoeveel werk het is.
              </p>

              <div className="bg-muted p-8 rounded-lg my-12">
                <h2 className="text-3xl font-bold mb-4">Lijstwerk laten schilderen in Haaglanden?</h2>
                <p className="text-lg mb-6">
                  Vul het formulier in en krijg binnen 30 seconden je prijsindicatie voor het schilderen van je lijstwerk. Prijs match garantie in heel Haaglanden!
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
                  <h3 className="text-xl font-bold mb-2">Moet lijstwerk dezelfde kleur als het plafond?</h3>
                  <p>Nee, dit is persoonlijke voorkeur. Wit lijstwerk is klassiek en valt op. Lijstwerk in plafondkleur geeft een rustige, moderne uitstraling.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Kan ik polyurethaan lijstwerk schilderen?</h3>
                  <p>Ja, moderne polyurethaan lijsten kunnen geschilderd worden. Ze zijn vaak al wit, maar je kunt ze in elke gewenste kleur schilderen.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Hoe voorkom ik verfstrepen in versieringen?</h3>
                  <p>Gebruik een kleine kwast en werk meerdere dunne lagen in plaats van één dikke laag. Zo bereik je alle details zonder ophopingen.</p>
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

