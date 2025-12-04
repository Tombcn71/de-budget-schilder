"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AlertCircle, Download } from "lucide-react"

// Lege prijsmatrix - Provider vult deze in
const LEGE_PRIJSMATRIX = {
  // Binnen werk (basis prijs per eenheid)
  "binnen-muren-m2": 0,          // €/m²
  "binnen-plafond-m2": 0,        // €/m²
  "binnen-kozijnen-m1": 0,       // €/m¹
  "binnen-deuren-m1": 0,         // €/m¹
  "binnen-plinten-m1": 0,        // €/m¹
  "binnen-lijstwerk-m1": 0,      // €/m¹
  
  // Buiten werk (basis prijs per eenheid)
  "buiten-gevel-m2": 0,          // €/m²
  "buiten-kozijnen-m1": 0,       // €/m¹
  "buiten-deuren-m1": 0,         // €/m¹
  
  // Verfkleur toeslagen (percentage van basisprijs)
  "kleur-wit": 0,                // 0%
  "kleur-gebroken-wit": 0,       // 0%
  "kleur-lichtgrijs": 0,         // %
  "kleur-donkergrijs": 0,        // %
  "kleur-beige": 0,              // %
  "kleur-blauw": 0,              // %
  "kleur-groen": 0,              // %
  "kleur-custom": 0,             // %
  
  // Aantal lagen (multiplier)
  "lagen-1": 0.7,                // 70% van basisprijs
  "lagen-2": 1.0,                // 100% (standaard)
  "lagen-3": 1.45,               // 145%
  
  // Voorbereidingswerk (forfait bedragen)
  "voorbereiding-licht": 0,      // Licht reinigen
  "voorbereiding-normaal": 0,    // Schuren + reinigen
  "voorbereiding-intensief": 0,  // Plamuren + schuren + gronden
  
  // Arbeid
  "arbeid-uurloon": 0,           // €/uur
  "arbeid-minuten-per-m2": 0,    // minuten per m² binnen
  "arbeid-minuten-per-m1": 0,    // minuten per m¹
  "arbeid-minuten-per-m2-buiten": 0, // minuten per m² buiten (vaak meer)
  
  // Service
  "minimum-order": 0,            // Minimum orderbedrag
  
  // BTW
  "btw-percentage": 21,
  "prijzen-zijn-inclusief-btw": true,
}

export default function CalculatorDataPage() {
  const [prijzen, setPrijzen] = useState(LEGE_PRIJSMATRIX)
  const [testBerekening, setTestBerekening] = useState({
    projectType: "binnen", // binnen/buiten
    werkType: "muren",     // muren/plafond/kozijnen/deuren/plinten/lijstwerk/gevel
    oppervlakte: 0,        // m² of m¹
    verfkleur: "wit",
    aantalLagen: 2,
    voorbereiding: "normaal",
  })

  // BEREKEN TOTAALPRIJS
  const berekenTotaal = () => {
    // 1. Bepaal basisprijs
    const eenheid = ["muren", "plafond", "gevel"].includes(testBerekening.werkType) ? "m2" : "m1"
    const key = `${testBerekening.projectType}-${testBerekening.werkType}-${eenheid}` as keyof typeof prijzen
    const basisPrijs = (prijzen[key] as number) || 0
    
    // 2. Kleur toeslag (percentage)
    const kleurToeslag = (prijzen[`kleur-${testBerekening.verfkleur}` as keyof typeof prijzen] as number) || 0
    const kleurMultiplier = 1 + (kleurToeslag / 100)
    
    // 3. Aantal lagen multiplier
    const lagenMultiplier = (prijzen[`lagen-${testBerekening.aantalLagen}` as keyof typeof prijzen] as number) || 1.0
    
    // 4. Bereken schilderwerk kosten
    const schilderwerk = testBerekening.oppervlakte * basisPrijs * kleurMultiplier * lagenMultiplier
    
    // 5. Voorbereidingswerk
    const voorbereidingKey = `voorbereiding-${testBerekening.voorbereiding}` as keyof typeof prijzen
    const voorbereiding = (prijzen[voorbereidingKey] as number) || 0
    
    // 6. Arbeid berekenen
    const uurloon = prijzen["arbeid-uurloon"] as number
    const minutenPerEenheid = eenheid === "m2" 
      ? (testBerekening.projectType === "binnen" 
          ? prijzen["arbeid-minuten-per-m2"] 
          : prijzen["arbeid-minuten-per-m2-buiten"])
      : prijzen["arbeid-minuten-per-m1"]
    
    const totaalMinuten = testBerekening.oppervlakte * (minutenPerEenheid as number)
    const arbeidUren = totaalMinuten / 60
    const arbeid = arbeidUren * uurloon
    
    const subtotaal = schilderwerk + voorbereiding + arbeid
    
    // BTW berekening
    const inclusiefBTW = prijzen["prijzen-zijn-inclusief-btw"] as boolean
    const btwPercentage = prijzen["btw-percentage"] as number
    
    let totaalExclBTW = subtotaal
    let btwBedrag = 0
    let totaalInclBTW = subtotaal
    
    if (inclusiefBTW) {
      totaalExclBTW = subtotaal / (1 + btwPercentage / 100)
      btwBedrag = subtotaal - totaalExclBTW
      totaalInclBTW = subtotaal
    } else {
      totaalExclBTW = subtotaal
      btwBedrag = subtotaal * (btwPercentage / 100)
      totaalInclBTW = subtotaal + btwBedrag
    }
    
    const totaal = Math.max(totaalInclBTW, prijzen["minimum-order"] as number)
    
    return {
      basisPrijs,
      kleurToeslag,
      kleurMultiplier,
      lagenMultiplier,
      schilderwerk: Math.round(schilderwerk),
      voorbereiding: Math.round(voorbereiding),
      arbeid: Math.round(arbeid),
      arbeidUren: Math.round(arbeidUren * 10) / 10,
      subtotaal: Math.round(subtotaal),
      totaalExclBTW: Math.round(totaalExclBTW),
      btwBedrag: Math.round(btwBedrag),
      totaalInclBTW: Math.round(totaalInclBTW),
      totaal: Math.round(totaal),
      eenheid,
    }
  }

  const result = berekenTotaal()

  const downloadPrijzen = () => {
    const data = {
      prijsmatrix: prijzen,
      datum: new Date().toISOString(),
      notitie: "Complete prijsmatrix voor schilderwerk - gebruik in calculator"
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `schilderwerk-prijsmatrix-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <p className="font-semibold">INTERN - Prijsmatrix voor Schilder Providers</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-bold text-lg mb-2">Welkom Provider! 👋</h2>
          <p className="text-sm">
            Vul hieronder je prijzen in voor binnen- en buitenschilderwerk. 
            Deze data gebruiken wij om de <strong>online calculator</strong> correct te laten werken voor klanten. 
            Vul je tarieven per m² en m¹ in, test met de calculator rechts of het klopt, en download het bestand als alles goed is!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Prijsmatrix - Schilderwerk</h1>
            <p className="text-gray-600">Vul de basis prijzen in, calculator doet de rest</p>
          </div>
          <button
            onClick={downloadPrijzen}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 font-semibold"
          >
            <Download className="w-5 h-5" />
            Download Matrix
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LINKS: Prijzen Inputs */}
          <div className="xl:col-span-2 space-y-6">
            {/* Binnen Werk */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-600">1. Binnen Schilderwerk - Basis Prijzen</h2>
              <p className="text-sm text-gray-600 mb-4">Per m² of m¹ (basis = 2 lagen, witte verf)</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Muren (m²)</label>
                  <div className="flex items-center gap-1">
                    <span>€</span>
                    <input
                      type="number"
                      value={prijzen["binnen-muren-m2"]}
                      onChange={(e) => setPrijzen({...prijzen, "binnen-muren-m2": parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <span className="text-xs text-gray-500">/m²</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Plafond (m²)</label>
                  <div className="flex items-center gap-1">
                    <span>€</span>
                    <input
                      type="number"
                      value={prijzen["binnen-plafond-m2"]}
                      onChange={(e) => setPrijzen({...prijzen, "binnen-plafond-m2": parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <span className="text-xs text-gray-500">/m²</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Kozijnen (m¹)</label>
                  <div className="flex items-center gap-1">
                    <span>€</span>
                    <input
                      type="number"
                      value={prijzen["binnen-kozijnen-m1"]}
                      onChange={(e) => setPrijzen({...prijzen, "binnen-kozijnen-m1": parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <span className="text-xs text-gray-500">/m¹</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Deuren (m¹)</label>
                  <div className="flex items-center gap-1">
                    <span>€</span>
                    <input
                      type="number"
                      value={prijzen["binnen-deuren-m1"]}
                      onChange={(e) => setPrijzen({...prijzen, "binnen-deuren-m1": parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <span className="text-xs text-gray-500">/m¹</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Plinten (m¹)</label>
                  <div className="flex items-center gap-1">
                    <span>€</span>
                    <input
                      type="number"
                      value={prijzen["binnen-plinten-m1"]}
                      onChange={(e) => setPrijzen({...prijzen, "binnen-plinten-m1": parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <span className="text-xs text-gray-500">/m¹</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Lijstwerk (m¹)</label>
                  <div className="flex items-center gap-1">
                    <span>€</span>
                    <input
                      type="number"
                      value={prijzen["binnen-lijstwerk-m1"]}
                      onChange={(e) => setPrijzen({...prijzen, "binnen-lijstwerk-m1": parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <span className="text-xs text-gray-500">/m¹</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Buiten Werk */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-green-600">2. Buiten Schilderwerk - Basis Prijzen</h2>
              <p className="text-sm text-gray-600 mb-4">Per m² of m¹ (basis = 2 lagen, weerbestendige verf)</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Gevel (m²)</label>
                  <div className="flex items-center gap-1">
                    <span>€</span>
                    <input
                      type="number"
                      value={prijzen["buiten-gevel-m2"]}
                      onChange={(e) => setPrijzen({...prijzen, "buiten-gevel-m2": parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <span className="text-xs text-gray-500">/m²</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Kozijnen (m¹)</label>
                  <div className="flex items-center gap-1">
                    <span>€</span>
                    <input
                      type="number"
                      value={prijzen["buiten-kozijnen-m1"]}
                      onChange={(e) => setPrijzen({...prijzen, "buiten-kozijnen-m1": parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <span className="text-xs text-gray-500">/m¹</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Deuren (m¹)</label>
                  <div className="flex items-center gap-1">
                    <span>€</span>
                    <input
                      type="number"
                      value={prijzen["buiten-deuren-m1"]}
                      onChange={(e) => setPrijzen({...prijzen, "buiten-deuren-m1": parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <span className="text-xs text-gray-500">/m¹</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Verfkleuren */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-purple-600">3. Verfkleur Toeslagen (%)</h2>
                <p className="text-sm text-gray-600 mb-4">Percentage bovenop basisprijs</p>
                <div className="space-y-3">
                  {[
                    { key: "wit", label: "Wit" },
                    { key: "gebroken-wit", label: "Gebroken wit" },
                    { key: "lichtgrijs", label: "Lichtgrijs" },
                    { key: "donkergrijs", label: "Donkergrijs" },
                    { key: "beige", label: "Beige" },
                    { key: "blauw", label: "Blauw" },
                    { key: "groen", label: "Groen" },
                    { key: "custom", label: "Custom kleur" }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{label}</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={prijzen[`kleur-${key}` as keyof typeof prijzen]}
                          onChange={(e) => setPrijzen({...prijzen, [`kleur-${key}`]: parseInt(e.target.value) || 0})}
                          className="w-20 px-2 py-1 border rounded text-sm"
                        />
                        <span>%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aantal Lagen */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-orange-600">4. Aantal Lagen (multiplier)</h2>
                <p className="text-sm text-gray-600 mb-4">Factor t.o.v. standaard (2 lagen)</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">1 Laag</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.05"
                        value={prijzen["lagen-1"]}
                        onChange={(e) => setPrijzen({...prijzen, "lagen-1": parseFloat(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                      <span>×</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">2 Lagen (standaard)</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.05"
                        value={prijzen["lagen-2"]}
                        onChange={(e) => setPrijzen({...prijzen, "lagen-2": parseFloat(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                      <span>×</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">3 Lagen</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.05"
                        value={prijzen["lagen-3"]}
                        onChange={(e) => setPrijzen({...prijzen, "lagen-3": parseFloat(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                      <span>×</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Voorbereidingswerk & Arbeid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-teal-600">5. Voorbereidingswerk (forfait)</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Licht (reinigen)</span>
                    <div className="flex items-center gap-1">
                      <span>€</span>
                      <input
                        type="number"
                        value={prijzen["voorbereiding-licht"]}
                        onChange={(e) => setPrijzen({...prijzen, "voorbereiding-licht": parseInt(e.target.value) || 0})}
                        className="w-24 px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Normaal (schuren)</span>
                    <div className="flex items-center gap-1">
                      <span>€</span>
                      <input
                        type="number"
                        value={prijzen["voorbereiding-normaal"]}
                        onChange={(e) => setPrijzen({...prijzen, "voorbereiding-normaal": parseInt(e.target.value) || 0})}
                        className="w-24 px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Intensief (plamuren)</span>
                    <div className="flex items-center gap-1">
                      <span>€</span>
                      <input
                        type="number"
                        value={prijzen["voorbereiding-intensief"]}
                        onChange={(e) => setPrijzen({...prijzen, "voorbereiding-intensief": parseInt(e.target.value) || 0})}
                        className="w-24 px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-amber-600">6. Arbeid</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uurloon</span>
                    <div className="flex items-center gap-1">
                      <span>€</span>
                      <input
                        type="number"
                        value={prijzen["arbeid-uurloon"]}
                        onChange={(e) => setPrijzen({...prijzen, "arbeid-uurloon": parseInt(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                      <span className="text-xs text-gray-500">/u</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Min/m² (binnen)</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={prijzen["arbeid-minuten-per-m2"]}
                        onChange={(e) => setPrijzen({...prijzen, "arbeid-minuten-per-m2": parseInt(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                      <span className="text-xs text-gray-500">min</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Min/m² (buiten)</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={prijzen["arbeid-minuten-per-m2-buiten"]}
                        onChange={(e) => setPrijzen({...prijzen, "arbeid-minuten-per-m2-buiten": parseInt(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                      <span className="text-xs text-gray-500">min</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Min/m¹</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={prijzen["arbeid-minuten-per-m1"]}
                        onChange={(e) => setPrijzen({...prijzen, "arbeid-minuten-per-m1": parseInt(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                      <span className="text-xs text-gray-500">min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service & BTW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-indigo-600">7. Service</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Minimum order</span>
                    <div className="flex items-center gap-1">
                      <span>€</span>
                      <input
                        type="number"
                        value={prijzen["minimum-order"]}
                        onChange={(e) => setPrijzen({...prijzen, "minimum-order": parseInt(e.target.value) || 0})}
                        className="w-24 px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-200">
                <h2 className="text-xl font-bold mb-4 text-red-600">8. BTW Instellingen</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">BTW percentage</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={prijzen["btw-percentage"]}
                        onChange={(e) => setPrijzen({...prijzen, "btw-percentage": parseInt(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={prijzen["prijzen-zijn-inclusief-btw"] as boolean}
                        onChange={(e) => setPrijzen({...prijzen, "prijzen-zijn-inclusief-btw": e.target.checked})}
                        className="w-5 h-5"
                      />
                      <div>
                        <span className="text-sm font-semibold block">Alle prijzen zijn inclusief BTW</span>
                        <span className="text-xs text-gray-600">Als uitgevinkt, worden prijzen gezien als exclusief BTW</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RECHTS: Live Test */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Test Berekening</h2>
              
              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-xs font-semibold mb-1">Project Type</label>
                  <select
                    value={testBerekening.projectType}
                    onChange={(e) => setTestBerekening({...testBerekening, projectType: e.target.value})}
                    className="w-full px-3 py-2 border rounded text-sm"
                  >
                    <option value="binnen">Binnen</option>
                    <option value="buiten">Buiten</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Werk Type</label>
                  <select
                    value={testBerekening.werkType}
                    onChange={(e) => setTestBerekening({...testBerekening, werkType: e.target.value})}
                    className="w-full px-3 py-2 border rounded text-sm"
                  >
                    {testBerekening.projectType === "binnen" ? (
                      <>
                        <option value="muren">Muren (m²)</option>
                        <option value="plafond">Plafond (m²)</option>
                        <option value="kozijnen">Kozijnen (m¹)</option>
                        <option value="deuren">Deuren (m¹)</option>
                        <option value="plinten">Plinten (m¹)</option>
                        <option value="lijstwerk">Lijstwerk (m¹)</option>
                      </>
                    ) : (
                      <>
                        <option value="gevel">Gevel (m²)</option>
                        <option value="kozijnen">Kozijnen (m¹)</option>
                        <option value="deuren">Deuren (m¹)</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Oppervlakte ({result.eenheid === "m2" ? "m²" : "m¹"})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={testBerekening.oppervlakte || ""}
                    onChange={(e) => setTestBerekening({...testBerekening, oppervlakte: parseFloat(e.target.value) || 0})}
                    placeholder="0"
                    className="w-full px-3 py-2 border rounded text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Verfkleur</label>
                  <select
                    value={testBerekening.verfkleur}
                    onChange={(e) => setTestBerekening({...testBerekening, verfkleur: e.target.value})}
                    className="w-full px-3 py-2 border rounded text-sm"
                  >
                    <option value="wit">Wit</option>
                    <option value="gebroken-wit">Gebroken wit</option>
                    <option value="lichtgrijs">Lichtgrijs</option>
                    <option value="donkergrijs">Donkergrijs</option>
                    <option value="beige">Beige</option>
                    <option value="blauw">Blauw</option>
                    <option value="groen">Groen</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Aantal Lagen</label>
                  <select
                    value={testBerekening.aantalLagen}
                    onChange={(e) => setTestBerekening({...testBerekening, aantalLagen: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border rounded text-sm"
                  >
                    <option value={1}>1 Laag</option>
                    <option value={2}>2 Lagen (standaard)</option>
                    <option value={3}>3 Lagen</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Voorbereiding</label>
                  <select
                    value={testBerekening.voorbereiding}
                    onChange={(e) => setTestBerekening({...testBerekening, voorbereiding: e.target.value})}
                    className="w-full px-3 py-2 border rounded text-sm"
                  >
                    <option value="licht">Licht (reinigen)</option>
                    <option value="normaal">Normaal (schuren)</option>
                    <option value="intensief">Intensief (plamuren)</option>
                  </select>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4 text-white">
                <h3 className="font-bold mb-3">Berekening Breakdown</h3>
                <div className="space-y-2 text-xs">
                  <div className="bg-white/10 rounded p-2">
                    <p className="font-semibold mb-1">1. Schilderwerk</p>
                    <div className="pl-2 space-y-0.5 font-mono">
                      <div className="flex justify-between">
                        <span>Basisprijs:</span>
                        <span>€{result.basisPrijs}/{result.eenheid}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kleur toeslag:</span>
                        <span>+{result.kleurToeslag}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lagen multiplier:</span>
                        <span>×{result.lagenMultiplier}</span>
                      </div>
                      <div className="flex justify-between text-yellow-300">
                        <span>= {testBerekening.oppervlakte}{result.eenheid} × €{result.basisPrijs} × {result.kleurMultiplier.toFixed(2)} × {result.lagenMultiplier}</span>
                      </div>
                      <div className="flex justify-between text-yellow-300 font-bold">
                        <span>Totaal schilderwerk:</span>
                        <span>€{result.schilderwerk}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 font-mono">
                    <div className="flex justify-between">
                      <span>2. Voorbereiding:</span>
                      <span>€{result.voorbereiding}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3. Arbeid ({result.arbeidUren}u):</span>
                      <span>€{result.arbeid}</span>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-2 mt-2 space-y-1 font-mono">
                    <div className="flex justify-between text-sm">
                      <span>Subtotaal:</span>
                      <span>€{result.subtotaal}</span>
                    </div>
                    {prijzen["prijzen-zijn-inclusief-btw"] ? (
                      <>
                        <div className="flex justify-between text-yellow-200 text-xs">
                          <span>Waarvan BTW ({prijzen["btw-percentage"]}%):</span>
                          <span>€{result.btwBedrag}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Excl BTW zou zijn:</span>
                          <span>€{result.totaalExclBTW}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between text-yellow-200">
                        <span>+ BTW ({prijzen["btw-percentage"]}%):</span>
                        <span>€{result.btwBedrag}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between border-t-2 border-white/40 pt-2 mt-2 text-lg font-bold">
                    <span>KLANT BETAALT:</span>
                    <span className="text-yellow-300">€{result.totaal}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
              <p className="font-bold text-yellow-900 mb-2">✅ Klaar?</p>
              <p className="text-sm text-yellow-800">Klik op groene "Download Matrix" knop bovenaan en bewaar het bestand!</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}







