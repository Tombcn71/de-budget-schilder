import { TopBanner } from "@/components/top-banner"
import { Header } from "@/components/header"
import { HeroAI } from "@/components/hero-ai"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"
import { FAQ } from "@/components/faq"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen">
      <TopBanner />
      <Header />
      <HeroAI 
        location="Haaglanden"
        title="Schilder Haaglanden met Prijs Match Garantie"
        description="Professioneel schilderwerk in heel Haaglanden tegen de scherpste prijs. Den Haag, Zoetermeer, Westland, Delft, Rijswijk en meer. Scherpere prijs gevonden? Wij matchen deze direct!"
      />
      
      <HowItWorks />

      {/* Waarom Zo Scherp? Sectie */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-center">
              Hoe kunnen wij zo scherp prijzen?
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl font-semibold text-center mb-12">
                Ons geheim? Tevreden schilders die vol aan het werk zijn.
              </p>

              <div className="bg-background p-8 rounded-lg mb-8">
                <p className="text-lg mb-4">
                  Bij Budget Schilder doen we het anders dan andere platforms. Waar veel platforms hun netwerk volproppen met honderden schilders die vervolgens om schaarse klussen vechten, kiezen wij bewust voor kwaliteit boven kwantiteit. We werken samen met een selecte groep vakbekwame schilders en zorgen dat zij continu voldoende werk hebben.
                </p>
                <p className="text-lg">
                  Dit simpele principe maakt het verschil. Een schilder die wekenlang wacht op die ene klus, moet bij elke opdracht flink verdienen om zijn vaste kosten te dekken. Maar een schilder die door ons een gestage stroom aan werk krijgt? Die kan scherper calculeren, want zijn agenda staat vol en zijn inkomen is voorspelbaar.
                </p>
              </div>

              <h3 className="text-2xl font-bold mb-4">Direct prijs, geen gedoe</h3>
              <div className="bg-primary/5 p-8 rounded-lg border border-primary/20 mb-8">
                <p className="text-lg mb-4">
                  Vergeet langdurig wachten op offertes of ongemakkelijk onderhandelen. Met onze slimme calculatie tool weet u binnen enkele seconden wat uw schilderklus gaat kosten. Vul de details in, en u krijgt meteen een transparante prijsindicatie. Geen verrassingen, geen gedoe, gewoon een eerlijke prijs waar u direct op kunt beslissen.
                </p>
                <p className="text-lg font-semibold">
                  Onze schilders weten precies waar ze aan toe zijn, en u ook. Wat u ziet, is wat u betaalt.
                </p>
              </div>

              <div className="text-center bg-background p-8 rounded-lg">
                <p className="text-2xl font-bold mb-4">
                  Kwaliteit hoeft niet duur te zijn – als je het slim aanpakt.
                </p>
                <p className="text-lg text-muted-foreground">
                  Door deze aanpak creëren we een win-win situatie: onze schilders zijn blij met hun volle agenda en kunnen daarom scherpe tarieven hanteren, en u profiteert van professioneel schilderwerk tegen eerlijke prijzen. Zo simpel kan het zijn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* SEO Content Sectie */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
              Professioneel Schilderwerk in Heel Haaglanden
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              De Budgetschilder is uw specialist voor binnen- en buitenschilderwerk in alle gemeentes van Haaglanden. Van Den Haag tot Midden-Delfland leveren wij professioneel schilderwerk met onze unieke prijs match garantie.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                <h3 className="text-xl font-bold mb-4 text-foreground">Waarom De Budgetschilder?</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>✓ <strong className="text-foreground">Prijs match garantie</strong> - Scherpere prijs gevonden? Wij matchen deze direct!</li>
                  <li>✓ <strong className="text-foreground">Direct prijsindicatie</strong> met AI preview</li>
                  <li>✓ <strong className="text-foreground">Alle gemeentes</strong> in Haaglanden</li>
                  <li>✓ <strong className="text-foreground">Plan een gratis adviesgesprek</strong> via onze planner</li>
                  <li>✓ <strong className="text-foreground">Professionele schilders</strong> - Ervaren en betrouwbaar</li>
                  <li>✓ <strong className="text-foreground">Transparante prijzen</strong> - Geen verrassingen achteraf</li>
                </ul>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-4 text-foreground">Vaste Prijzen Binnen Schilderwerk</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex justify-between"><span>Muren schilderen</span><strong className="text-foreground">€15/m²</strong></li>
                  <li className="flex justify-between"><span>Plafond schilderen</span><strong className="text-foreground">€17/m²</strong></li>
                  <li className="flex justify-between"><span>Kozijnen schilderen</span><strong className="text-foreground">€12,50/m¹</strong></li>
                  <li className="flex justify-between"><span>Plinten schilderen</span><strong className="text-foreground">€7,50/m¹</strong></li>
                  <li className="flex justify-between"><span>Lijstwerk schilderen</span><strong className="text-foreground">€7,50/m¹</strong></li>
                  <li className="flex justify-between"><span>Deuren lakken</span><strong className="text-foreground">€125/deur</strong></li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center text-foreground">Onze Diensten in Haaglanden</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-background p-4 rounded-lg border border-border">
                  <h4 className="font-bold mb-2 text-foreground">Muren schilderen</h4>
                  <p className="text-sm text-muted-foreground">Professioneel muren schilderen in heel Haaglanden.</p>
                </div>
                <div className="bg-background p-4 rounded-lg border border-border">
                  <h4 className="font-bold mb-2 text-foreground">Plafonds schilderen</h4>
                  <p className="text-sm text-muted-foreground">Plafonds vakkundig afgewerkt.</p>
                </div>
                <div className="bg-background p-4 rounded-lg border border-border">
                  <h4 className="font-bold mb-2 text-foreground">Plinten schilderen</h4>
                  <p className="text-sm text-muted-foreground">Plinten netjes afgewerkt.</p>
                </div>
                <div className="bg-background p-4 rounded-lg border border-border">
                  <h4 className="font-bold mb-2 text-foreground">Lijstwerk schilderen</h4>
                  <p className="text-sm text-muted-foreground">Lijstwerk professioneel geschilderd.</p>
                </div>
                <div className="bg-background p-4 rounded-lg border border-border">
                  <h4 className="font-bold mb-2 text-foreground">Kozijnen schilderen</h4>
                  <p className="text-sm text-muted-foreground">Kozijnen vakkundig behandeld.</p>
                </div>
                <div className="bg-background p-4 rounded-lg border border-border">
                  <h4 className="font-bold mb-2 text-foreground">Deuren lakken</h4>
                  <p className="text-sm text-muted-foreground">Deuren professioneel gelakt.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gemeentes Sectie */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
              Schilderwerk in Alle Gemeentes van Haaglanden
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Of u nu woont in Den Haag, Delft of een kleinere gemeente - De Budgetschilder is overal actief in Haaglanden met dezelfde lage prijzen en hoge kwaliteit.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/schilder-den-haag" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Den Haag</h3>
                <p className="text-xs text-muted-foreground">Alle wijken</p>
              </Link>
              <Link href="/schilder-zoetermeer" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Zoetermeer</h3>
                <p className="text-xs text-muted-foreground">Moderne stad</p>
              </Link>
              <Link href="/schilder-westland" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Westland</h3>
                <p className="text-xs text-muted-foreground">Naaldwijk e.o.</p>
              </Link>
              <Link href="/schilder-delft" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Delft</h3>
                <p className="text-xs text-muted-foreground">Monumenten & nieuwbouw</p>
              </Link>
              <Link href="/schilder-leidschendam-voorburg" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Leidschendam-Voorburg</h3>
                <p className="text-xs text-muted-foreground">Twee kernen</p>
              </Link>
              <Link href="/schilder-rijswijk" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Rijswijk</h3>
                <p className="text-xs text-muted-foreground">Tussen Den Haag & Delft</p>
              </Link>
              <Link href="/schilder-pijnacker-nootdorp" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Pijnacker-Nootdorp</h3>
                <p className="text-xs text-muted-foreground">Groene omgeving</p>
              </Link>
              <Link href="/schilder-wassenaar" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Wassenaar</h3>
                <p className="text-xs text-muted-foreground">Aan zee</p>
              </Link>
              <Link href="/schilder-midden-delfland" className="bg-background p-4 rounded-lg shadow-sm border border-border hover:border-primary hover:shadow-md transition-all">
                <h3 className="font-bold">Midden-Delfland</h3>
                <p className="text-xs text-muted-foreground">Maassluis, Schipluiden</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <FAQ />
      <Footer />
    </main>
  )
}
