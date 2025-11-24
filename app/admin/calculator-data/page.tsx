"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AlertCircle, Download, Save } from "lucide-react"

// Lege prijsmatrix - Bart vult deze in
const LEGE_PRIJSMATRIX = {
  // Materiaal + Glas combinaties (prijs per m²)
  "kunststof-hr++": 0,
  "kunststof-hr+++": 0,
  "hout-hr++": 0,
  "hout-hr+++": 0,
  "aluminium-hr++": 0,
  "aluminium-hr+++": 0,
  
  // Kozijn profielen (toeslag per m²)
  "profiel-60mm": 0,
  "profiel-70mm": 0,
  "profiel-80mm": 0,
  
  // Type multipliers
  "type-draai": 1.0,
  "type-draai-kiep": 1.0,
  "type-schuif": 1.0,
  "type-vast": 1.0,
  
  // Kleur toeslagen (per raam)
  "kleur-wit": 0,
  "kleur-creme": 0,
  "kleur-grijs": 0,
  "kleur-antraciet": 0,
  "kleur-zwart": 0,
  "kleur-houtkleur": 0,
  
  // Service
  "montage-per-raam": 0,
  "afvoer-forfait": 0,
  "minimum-order": 0,
  
  // Arbeid
  "arbeid-uurloon": 0,
  "arbeid-uren-per-raam": 0,
  "arbeid-inmeten": 0,
  
  // BTW
  "btw-percentage": 21,
  "prijzen-zijn-inclusief-btw": true,
}

export default function CalculatorDataPage() {
  const [prijzen, setPrijzen] = useState(LEGE_PRIJSMATRIX)
  const [testBerekening, setTestBerekening] = useState({
    materiaal: "",
    glas: "",
    profiel: "",
    type: "",
    kleur: "",
    m2: 0,
    aantalRamen: 0,
    metMontage: true,
    metAfvoer: true,
  })

  // BEREKEN TOTAALPRIJS
  const berekenTotaal = () => {
    const key = `${testBerekening.materiaal}-${testBerekening.glas}`
    const basisPrijs = prijzen[key as keyof typeof prijzen] as number
    const profielToeslag = prijzen[`profiel-${testBerekening.profiel}` as keyof typeof prijzen] as number
    const typeMultiplier = prijzen[`type-${testBerekening.type}` as keyof typeof prijzen] as number
    
    // Kozijn
    const kozijn = testBerekening.m2 * (basisPrijs + profielToeslag) * typeMultiplier
    
    // Kleur
    const kleurToeslag = prijzen[`kleur-${testBerekening.kleur}` as keyof typeof prijzen] as number
    const kleur = testBerekening.aantalRamen * kleurToeslag
    
    // Montage
    const montage = testBerekening.metMontage ? testBerekening.aantalRamen * (prijzen["montage-per-raam"] as number) : 0
    
    // Arbeid (inmeten + plaatsen)
    const uurloon = prijzen["arbeid-uurloon"] as number
    const urenPerRaam = prijzen["arbeid-uren-per-raam"] as number
    const inmeten = prijzen["arbeid-inmeten"] as number
    const arbeid = testBerekening.metMontage ? (inmeten + (testBerekening.aantalRamen * urenPerRaam * uurloon)) : 0
    
    // Afvoer
    const afvoer = testBerekening.metAfvoer ? prijzen["afvoer-forfait"] as number : 0
    
    const subtotaal = kozijn + kleur + montage + arbeid + afvoer
    
    // BTW berekening
    const inclusiefBTW = prijzen["prijzen-zijn-inclusief-btw"] as boolean
    const btwPercentage = prijzen["btw-percentage"] as number
    
    let totaalExclBTW = subtotaal
    let btwBedrag = 0
    let totaalInclBTW = subtotaal
    
    if (inclusiefBTW) {
      // Prijzen zijn al inclusief BTW, bereken exclusief
      totaalExclBTW = subtotaal / (1 + btwPercentage / 100)
      btwBedrag = subtotaal - totaalExclBTW
      totaalInclBTW = subtotaal
    } else {
      // Prijzen zijn exclusief, bereken inclusief
      totaalExclBTW = subtotaal
      btwBedrag = subtotaal * (btwPercentage / 100)
      totaalInclBTW = subtotaal + btwBedrag
    }
    
    const totaal = Math.max(totaalInclBTW, prijzen["minimum-order"] as number)
    
    return {
      kozijn: Math.round(kozijn),
      kleur: Math.round(kleur),
      montage: Math.round(montage),
      arbeid: Math.round(arbeid),
      afvoer: Math.round(afvoer),
      subtotaal: Math.round(subtotaal),
      totaalExclBTW: Math.round(totaalExclBTW),
      btwBedrag: Math.round(btwBedrag),
      totaalInclBTW: Math.round(totaalInclBTW),
      totaal: Math.round(totaal),
      basisPrijs,
      profielToeslag,
      typeMultiplier,
      kleurToeslag,
      uurloon,
      urenPerRaam,
    }
  }

  const result = berekenTotaal()

  const downloadPrijzen = () => {
    const data = {
      prijsmatrix: prijzen,
      datum: new Date().toISOString(),
      notitie: "Complete prijsmatrix - kopieer naar lib/pricing/ai-calculator.ts"
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kozijn-prijsmatrix-${new Date().toISOString().split('T')[0]}.json`
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
            <p className="font-semibold">INTERN - Prijsmatrix voor Bart</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-bold text-lg mb-2">Hey Bart! 👋</h2>
          <p className="text-sm">
            Vul hieronder je prijzen in voor alle materialen, glas types en opties. 
            Deze data gebruiken wij om de <strong>online calculator</strong> correct te laten werken voor klanten. 
            Als jij hier invult "Kunststof + HR++ = €360/m²", dan berekent de website automatisch de juiste prijs voor klanten.
            Test met de calculator rechts of het klopt, en download het bestand als alles goed is!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Prijsmatrix - Bart's Kozijnen</h1>
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
          {/* LINKS: Materiaal + Glas Matrix */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-600">1. Materiaal + Glas Prijzen (per m²)</h2>
              <p className="text-sm text-gray-600 mb-4">De basis prijs voor elk kozijn type</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Materiaal</th>
                      <th className="px-4 py-3 text-left font-semibold">HR++ Glas</th>
                      <th className="px-4 py-3 text-left font-semibold">HR+++ Glas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-3 font-medium">Kunststof</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span>€</span>
                          <input
                            type="number"
                            value={prijzen["kunststof-hr++"]}
                            onChange={(e) => setPrijzen({...prijzen, "kunststof-hr++": parseInt(e.target.value) || 0})}
                            className="w-24 px-2 py-1 border rounded"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span>€</span>
                          <input
                            type="number"
                            value={prijzen["kunststof-hr+++"]}
                            onChange={(e) => setPrijzen({...prijzen, "kunststof-hr+++": parseInt(e.target.value) || 0})}
                            className="w-24 px-2 py-1 border rounded"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Hout</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span>€</span>
                          <input
                            type="number"
                            value={prijzen["hout-hr++"]}
                            onChange={(e) => setPrijzen({...prijzen, "hout-hr++": parseInt(e.target.value) || 0})}
                            className="w-24 px-2 py-1 border rounded"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span>€</span>
                          <input
                            type="number"
                            value={prijzen["hout-hr+++"]}
                            onChange={(e) => setPrijzen({...prijzen, "hout-hr+++": parseInt(e.target.value) || 0})}
                            className="w-24 px-2 py-1 border rounded"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Aluminium</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span>€</span>
                          <input
                            type="number"
                            value={prijzen["aluminium-hr++"]}
                            onChange={(e) => setPrijzen({...prijzen, "aluminium-hr++": parseInt(e.target.value) || 0})}
                            className="w-24 px-2 py-1 border rounded"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span>€</span>
                          <input
                            type="number"
                            value={prijzen["aluminium-hr+++"]}
                            onChange={(e) => setPrijzen({...prijzen, "aluminium-hr+++": parseInt(e.target.value) || 0})}
                            className="w-24 px-2 py-1 border rounded"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profiel Dikte */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-purple-600">2. Profiel Dikte (toeslag/m²)</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">60mm (basis)</span>
                    <div className="flex items-center gap-1">
                      <span>€</span>
                      <input
                        type="number"
                        value={prijzen["profiel-60mm"]}
                        onChange={(e) => setPrijzen({...prijzen, "profiel-60mm": parseInt(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">70mm (standaard)</span>
                    <div className="flex items-center gap-1">
                      <span>€</span>
                      <input
                        type="number"
                        value={prijzen["profiel-70mm"]}
                        onChange={(e) => setPrijzen({...prijzen, "profiel-70mm": parseInt(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">80mm (premium)</span>
                    <div className="flex items-center gap-1">
                      <span>€</span>
                      <input
                        type="number"
                        value={prijzen["profiel-80mm"]}
                        onChange={(e) => setPrijzen({...prijzen, "profiel-80mm": parseInt(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Type Multipliers */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-orange-600">3. Type Multipliers</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Draai</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.1"
                        value={prijzen["type-draai"]}
                        onChange={(e) => setPrijzen({...prijzen, "type-draai": parseFloat(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                      <span>×</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Draai-kiep</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.1"
                        value={prijzen["type-draai-kiep"]}
                        onChange={(e) => setPrijzen({...prijzen, "type-draai-kiep": parseFloat(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                      <span>×</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Schuif</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.1"
                        value={prijzen["type-schuif"]}
                        onChange={(e) => setPrijzen({...prijzen, "type-schuif": parseFloat(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                      <span>×</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Vast glas</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.1"
                        value={prijzen["type-vast"]}
                        onChange={(e) => setPrijzen({...prijzen, "type-vast": parseFloat(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                      <span>×</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Kleuren */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-green-600">4. Kleur Toeslagen (per raam)</h2>
                <div className="space-y-3">
                  {["wit", "creme", "grijs", "antraciet", "zwart", "houtkleur"].map((kleur) => (
                    <div key={kleur} className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">{kleur}</span>
                      <div className="flex items-center gap-1">
                        <span>€</span>
                        <input
                          type="number"
                          value={prijzen[`kleur-${kleur}` as keyof typeof prijzen]}
                          onChange={(e) => setPrijzen({...prijzen, [`kleur-${kleur}`]: parseInt(e.target.value) || 0})}
                          className="w-20 px-2 py-1 border rounded text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arbeid */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-amber-600">5. Arbeid</h2>
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
                      <span className="text-xs text-gray-500">/uur</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uren/raam</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.5"
                        value={prijzen["arbeid-uren-per-raam"]}
                        onChange={(e) => setPrijzen({...prijzen, "arbeid-uren-per-raam": parseFloat(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                      <span className="text-xs text-gray-500">uur</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Inmeten</span>
                    <div className="flex items-center gap-1">
                      <span>€</span>
                      <input
                        type="number"
                        value={prijzen["arbeid-inmeten"]}
                        onChange={(e) => setPrijzen({...prijzen, "arbeid-inmeten": parseInt(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Service */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-teal-600">6. Service Kosten</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Montage/raam</span>
                    <div className="flex items-center gap-1">
                      <span>€</span>
                      <input
                        type="number"
                        value={prijzen["montage-per-raam"]}
                        onChange={(e) => setPrijzen({...prijzen, "montage-per-raam": parseInt(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Afvoer (forfait)</span>
                    <div className="flex items-center gap-1">
                      <span>€</span>
                      <input
                        type="number"
                        value={prijzen["afvoer-forfait"]}
                        onChange={(e) => setPrijzen({...prijzen, "afvoer-forfait": parseInt(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Minimum order</span>
                    <div className="flex items-center gap-1">
                      <span>€</span>
                      <input
                        type="number"
                        value={prijzen["minimum-order"]}
                        onChange={(e) => setPrijzen({...prijzen, "minimum-order": parseInt(e.target.value) || 0})}
                        className="w-20 px-2 py-1 border rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BTW Sectie */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-200">
              <h2 className="text-xl font-bold mb-4 text-red-600">7. BTW Instellingen</h2>
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

          {/* RECHTS: Live Test */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Test Berekening</h2>
              
              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-xs font-semibold mb-1">Materiaal</label>
                  <select
                    value={testBerekening.materiaal}
                    onChange={(e) => setTestBerekening({...testBerekening, materiaal: e.target.value})}
                    className="w-full px-3 py-2 border rounded text-sm"
                  >
                    <option value="">Kies materiaal</option>
                    <option value="kunststof">Kunststof</option>
                    <option value="hout">Hout</option>
                    <option value="aluminium">Aluminium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Glas</label>
                  <select
                    value={testBerekening.glas}
                    onChange={(e) => setTestBerekening({...testBerekening, glas: e.target.value})}
                    className="w-full px-3 py-2 border rounded text-sm"
                  >
                    <option value="">Kies glas</option>
                    <option value="hr++">HR++</option>
                    <option value="hr+++">HR+++</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Profiel</label>
                  <select
                    value={testBerekening.profiel}
                    onChange={(e) => setTestBerekening({...testBerekening, profiel: e.target.value})}
                    className="w-full px-3 py-2 border rounded text-sm"
                  >
                    <option value="">Kies profiel</option>
                    <option value="60mm">60mm</option>
                    <option value="70mm">70mm</option>
                    <option value="80mm">80mm</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Type</label>
                  <select
                    value={testBerekening.type}
                    onChange={(e) => setTestBerekening({...testBerekening, type: e.target.value})}
                    className="w-full px-3 py-2 border rounded text-sm"
                  >
                    <option value="">Kies type</option>
                    <option value="draai">Draai</option>
                    <option value="draai-kiep">Draai-kiep</option>
                    <option value="schuif">Schuif</option>
                    <option value="vast">Vast glas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Kleur</label>
                  <select
                    value={testBerekening.kleur}
                    onChange={(e) => setTestBerekening({...testBerekening, kleur: e.target.value})}
                    className="w-full px-3 py-2 border rounded text-sm"
                  >
                    <option value="">Kies kleur</option>
                    <option value="wit">Wit</option>
                    <option value="creme">Creme</option>
                    <option value="grijs">Grijs</option>
                    <option value="antraciet">Antraciet</option>
                    <option value="zwart">Zwart</option>
                    <option value="houtkleur">Houtkleur</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold mb-1">m²</label>
                    <input
                      type="number"
                      step="0.1"
                      value={testBerekening.m2 || ""}
                      onChange={(e) => setTestBerekening({...testBerekening, m2: parseFloat(e.target.value) || 0})}
                      placeholder="0"
                      className="w-full px-3 py-2 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Ramen</label>
                    <input
                      type="number"
                      value={testBerekening.aantalRamen || ""}
                      onChange={(e) => setTestBerekening({...testBerekening, aantalRamen: parseInt(e.target.value) || 0})}
                      placeholder="0"
                      className="w-full px-3 py-2 border rounded text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={testBerekening.metMontage}
                      onChange={(e) => setTestBerekening({...testBerekening, metMontage: e.target.checked})}
                    />
                    <span>Montage</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={testBerekening.metAfvoer}
                      onChange={(e) => setTestBerekening({...testBerekening, metAfvoer: e.target.checked})}
                    />
                    <span>Afvoer</span>
                  </label>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4 text-white">
                <h3 className="font-bold mb-3">Berekening Breakdown</h3>
                <div className="space-y-2 text-xs">
                  <div className="bg-white/10 rounded p-2">
                    <p className="font-semibold mb-1">1. Kozijn Materiaal</p>
                    <div className="pl-2 space-y-0.5 font-mono">
                      <div className="flex justify-between">
                        <span>Basis {testBerekening.materiaal} + {testBerekening.glas}:</span>
                        <span>€{result.basisPrijs}/m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span>+ Profiel {testBerekening.profiel}:</span>
                        <span>€{result.profielToeslag}/m²</span>
                      </div>
                      <div className="flex justify-between text-yellow-300">
                        <span>= €{result.basisPrijs + result.profielToeslag}/m² × {testBerekening.m2}m² × {result.typeMultiplier}</span>
                        <span className="font-bold">€{result.kozijn}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 font-mono">
                    <div className="flex justify-between">
                      <span>2. Kleur ({testBerekening.aantalRamen} × €{result.kleurToeslag}):</span>
                      <span>€{result.kleur}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3. Montage materiaal ({testBerekening.aantalRamen}×):</span>
                      <span>€{result.montage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4. Arbeid (inmeten + {testBerekening.aantalRamen}×{result.urenPerRaam}u×€{result.uurloon}):</span>
                      <span>€{result.arbeid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>5. Afvoer:</span>
                      <span>€{result.afvoer}</span>
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
              <p className="font-bold text-yellow-900 mb-2">✅ Klaar, Bart?</p>
              <p className="text-sm text-yellow-800">Klik op groene "Download Matrix" knop bovenaan en stuur het bestand naar Tom via WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
