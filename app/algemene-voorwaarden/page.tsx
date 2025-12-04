import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Algemene Voorwaarden | De Budgetschilder",
  description: "Lees de algemene voorwaarden van De Budgetschilder. Een marketingplatform voor professionele schilders in Haaglanden.",
  alternates: {
    canonical: "https://debudgetschilder.nl/algemene-voorwaarden"
  }
}

export default function AlgemeneVoorwaardenPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
            Algemene Voorwaarden
          </h1>
          
          <Card>
            <CardContent className="prose prose-slate max-w-none p-6 lg:p-8">
              <p className="text-sm text-muted-foreground mb-6">
                Laatste update: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Identiteit en Rol van De Budgetschilder</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">De Budgetschilder is een marketingplatform</strong> dat zich richt op het verbinden van klanten met professionele schilders. Wij zijn geen uitvoerende partij van schilderwerk, maar fungeren uitsluitend als marketingkanaal.
                  </p>
                  <p>
                    De Budgetschilder:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Verzorgt marketing en leadgeneratie voor aangesloten schildersbedrijven</li>
                    <li>Faciliteert contact tussen klanten en schilders</li>
                    <li>Voert geen schilderwerk uit</li>
                    <li>Stuurt geen rekeningen voor uitgevoerd schilderwerk</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Contractuele Relatie en Facturering</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Belangrijk:</strong> Wanneer u via ons platform contact legt met een schilder en een opdracht verstrekt, komt de overeenkomst <strong className="text-foreground">direct tot stand tussen u en het uitvoerende schildersbedrijf</strong>.
                  </p>
                  <p>
                    Dit betekent:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-foreground">Rekeningen worden verstuurd door het schildersbedrijf</strong> dat het werk uitvoert, niet door De Budgetschilder</li>
                    <li>Het schildersbedrijf is verantwoordelijk voor de kwaliteit van het uitgevoerde werk</li>
                    <li>Garanties en waarborgen worden verstrekt door het uitvoerende schildersbedrijf</li>
                    <li>Betalingen dienen rechtstreeks aan het schildersbedrijf te worden voldaan</li>
                    <li>Eventuele klachten of geschillen over het uitgevoerde werk dienen rechtstreeks met het schildersbedrijf te worden afgehandeld</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Dienstverlening De Budgetschilder</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Onze diensten omvatten:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Het online presenteren van schildersbedrijven</li>
                    <li>Het faciliteren van offerteaanvragen</li>
                    <li>Het doorgeven van contactgegevens aan aangesloten schilders</li>
                    <li>Het verstrekken van informatieve content over schilderwerk</li>
                    <li>Het bieden van een AI-preview tool voor visualisatie (indicatief)</li>
                  </ul>
                  <p>
                    Al onze marketingdiensten zijn <strong className="text-foreground">kosteloos voor de klant</strong>. U betaalt enkel voor het daadwerkelijk uitgevoerde schilderwerk aan het schildersbedrijf.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Aansprakelijkheid</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">De Budgetschilder is niet aansprakelijk voor:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>De kwaliteit van uitgevoerd schilderwerk</li>
                    <li>Schade ontstaan tijdens of na het schilderwerk</li>
                    <li>Niet-nakoming van afspraken door het schildersbedrijf</li>
                    <li>Geschillen tussen klant en schildersbedrijf over prijzen, werkzaamheden of resultaten</li>
                    <li>Vertragingen in de uitvoering van werkzaamheden</li>
                    <li>Onjuiste informatie verstrekt door het schildersbedrijf</li>
                  </ul>
                  <p>
                    De Budgetschilder streeft ernaar alleen met betrouwbare en professionele schildersbedrijven samen te werken, maar kan niet instaan voor hun handelingen.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Offertes en Prijzen</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Prijsindicaties en offertes die via ons platform worden gegenereerd zijn:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Indicatief en vrijblijvend</li>
                    <li>Onder voorbehoud van een definitieve offerte door het schildersbedrijf</li>
                    <li>Gebaseerd op de door u verstrekte informatie</li>
                    <li>Niet bindend zonder een formele offerte van het schildersbedrijf</li>
                  </ul>
                  <p>
                    De uiteindelijke prijs wordt vastgesteld door het uitvoerende schildersbedrijf en kan afwijken van de indicatie op ons platform.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Privacy en Gegevensbescherming</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Door gebruik te maken van ons platform stemt u ermee in dat uw contactgegevens en projectinformatie worden gedeeld met aangesloten schildersbedrijven voor het doel van het uitbrengen van een offerte.
                  </p>
                  <p>
                    Voor meer informatie over hoe wij met uw persoonsgegevens omgaan, verwijzen wij naar ons privacybeleid.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Klachten</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Klachten over uitgevoerd werk:</strong> Neem rechtstreeks contact op met het schildersbedrijf dat het werk heeft uitgevoerd.
                  </p>
                  <p>
                    <strong className="text-foreground">Klachten over ons platform of service:</strong> U kunt contact met ons opnemen via ons contactformulier of via info@debudgetschilder.nl
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Wijzigingen</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    De Budgetschilder behoudt zich het recht voor deze algemene voorwaarden te wijzigen. Wijzigingen worden op deze pagina gepubliceerd en zijn van kracht vanaf de datum van publicatie.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Prijs Match Garantie</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">De Budgetschilder biedt een prijs match garantie</strong> voor onze prijsindicaties. Dit betekent dat als u elders een scherpere offerte krijgt voor vergelijkbaar werk, wij deze prijs matchen.
                  </p>
                  <p>
                    <strong className="text-foreground">Voorwaarden voor de prijs match garantie:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-foreground">Officiële offerte vereist:</strong> U dient ons de concurrent offerte toe te sturen zodat we deze kunnen vergelijken.</li>
                    <li><strong className="text-foreground">Erkend bedrijf met KVK:</strong> De offerte moet afkomstig zijn van een officieel geregistreerd bedrijf met een geldig KVK-nummer. Illegale constructies of cowboys worden uitgesloten.</li>
                    <li><strong className="text-foreground">Vergelijkbaar werk:</strong> De offerte moet betrekking hebben op dezelfde werkzaamheden, kwaliteit en materialen.</li>
                    <li><strong className="text-foreground">Tijdigheid:</strong> De concurrent offerte moet ingediend worden voordat het werk aanvangt.</li>
                  </ul>
                  <p>
                    Wij werken alleen met vakbekwame, verzekerde schilders die volgens de regels opereren. Prijzen van illegale constructies kunnen we niet matchen – dit ter bescherming van u als klant.
                  </p>
                  <p>
                    Voor meer informatie, zie onze uitgebreide pagina over de <a href="/laagste-prijs-garantie" className="text-primary hover:underline">Prijs Match Garantie</a>.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Toepasselijk Recht</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Op deze algemene voorwaarden is Nederlands recht van toepassing.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Voor vragen over deze algemene voorwaarden kunt u contact met ons opnemen:
                  </p>
                  <p>
                    <strong className="text-foreground">De Budgetschilder</strong><br />
                    E-mail: info@debudgetschilder.nl
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}

