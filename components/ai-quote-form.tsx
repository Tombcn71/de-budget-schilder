"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Loader2, Check, Sparkles, X, ZoomIn, Share2 } from "lucide-react"
import { PhotoUpload } from "@/components/photo-upload"

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface PriceRange {
  min: number
  max: number
}

type ProjectType = 'binnen' | 'buiten' | 'binnen_buiten'
type SchilderwerkType = 'muren' | 'plafond' | 'kozijnen' | 'deuren' | 'plinten' | 'lijstwerk' | 'volledige_kamer' | 'gevel'
type MeasurementUnit = 'm2' | 'm1' // m² of strekkende meter

// ============================================================================
// CONSTANTEN - Prijzen per m² of strekkende meter
// ============================================================================

// Schilderwerk berekend per VIERKANTE METER (m²)
const PRIJZEN_PER_M2 = {
  binnen: {
    muren: { min: 12.50, max: 12.50 },           // €12,50 per m² (incl. schuren + 2 lagen)
    plafond: { min: 12.50, max: 12.50 },         // €12,50 per m² (incl. schuren + 2 lagen)
    volledige_kamer: { min: 450, max: 750 }      // €450-750 per kamer (flat rate)
  },
  buiten: {
    gevel: { min: 25, max: 40 },                 // €25-40 per m²
  }
} as const

// Schilderwerk berekend per STREKKENDE METER (m¹)
const PRIJZEN_PER_M1 = {
  binnen: {
    kozijnen: { min: 7.50, max: 7.50 },          // €7,50 per meter (incl. schuren + 2 lagen)
    deuren: { min: 65, max: 65 },                // €65 per stuk (incl. schuren + 2 lagen)
    plinten: { min: 7.50, max: 7.50 },           // €7,50 per strekkende meter
    lijstwerk: { min: 7.50, max: 7.50 },         // €7,50 per strekkende meter
  },
  buiten: {
    kozijnen: { min: 12.50, max: 12.50 },        // €12,50 per meter (incl. schuren + 2 lagen)
    deuren: { min: 65, max: 65 },                // €65 per stuk (incl. schuren + 2 lagen)
  }
} as const

// Helper: bepaal welke eenheid gebruikt moet worden
const MEASUREMENT_UNITS: Record<SchilderwerkType, MeasurementUnit> = {
  muren: 'm2',
  plafond: 'm2',
  gevel: 'm2',
  volledige_kamer: 'm2',
  kozijnen: 'm1',
  deuren: 'm1',
  plinten: 'm1',
  lijstwerk: 'm1',
}

// Helper: formateer prijs naar euro formaat
const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Verfkleuren opties
const VERFKLEUREN = [
  { value: 'wit', label: 'Wit (RAL 9010)', hex: '#F1EDE4' },
  { value: 'gebroken-wit', label: 'Gebroken Wit (RAL 9001)', hex: '#E9E0D2' },
  { value: 'lichtgrijs', label: 'Lichtgrijs (RAL 7035)', hex: '#CBD0CC' },
  { value: 'grijs', label: 'Grijs (RAL 7016)', hex: '#383E42' },
  { value: 'antraciet', label: 'Antraciet (RAL 7021)', hex: '#2E3234' },
  { value: 'zwart', label: 'Zwart (RAL 9005)', hex: '#0E0E10' },
  { value: 'beige', label: 'Beige (RAL 1015)', hex: '#E6D2B5' },
  { value: 'zandgeel', label: 'Zandgeel (RAL 1002)', hex: '#D0B084' },
  { value: 'groen', label: 'Donkergroen (RAL 6009)', hex: '#26392F' },
  { value: 'blauw', label: 'Blauw (RAL 5014)', hex: '#6C7C98' },
] as const

// ============================================================================
// CALCULATIE FUNCTIES
// ============================================================================

function calculateMultiItemPrice(
  projectType: ProjectType,
  items: any
): PriceRange | null {
  let totalMin = 0
  let totalMax = 0
  let hasItems = false
  
  // Muren (binnen)
  if (items.muren.enabled && items.muren.m2) {
    const m2 = parseFloat(items.muren.m2)
    if (m2 > 0) {
      totalMin += m2 * PRIJZEN_PER_M2.binnen.muren.min
      totalMax += m2 * PRIJZEN_PER_M2.binnen.muren.max
      hasItems = true
    }
  }
  
  // Plafond (binnen)
  if (items.plafond.enabled && items.plafond.m2) {
    const m2 = parseFloat(items.plafond.m2)
    if (m2 > 0) {
      totalMin += m2 * PRIJZEN_PER_M2.binnen.plafond.min
      totalMax += m2 * PRIJZEN_PER_M2.binnen.plafond.max
      hasItems = true
    }
  }
  
  // Plinten (binnen)
  if (items.plinten.enabled && items.plinten.m1) {
    const m1 = parseFloat(items.plinten.m1)
    if (m1 > 0) {
      totalMin += m1 * PRIJZEN_PER_M1.binnen.plinten.min
      totalMax += m1 * PRIJZEN_PER_M1.binnen.plinten.max
      hasItems = true
    }
  }
  
  // Lijstwerk (binnen)
  if (items.lijstwerk.enabled && items.lijstwerk.m1) {
    const m1 = parseFloat(items.lijstwerk.m1)
    if (m1 > 0) {
      totalMin += m1 * PRIJZEN_PER_M1.binnen.lijstwerk.min
      totalMax += m1 * PRIJZEN_PER_M1.binnen.lijstwerk.max
      hasItems = true
    }
  }
  
  // Kozijnen (binnen/buiten afhankelijk van projectType)
  if (items.kozijnen.enabled && items.kozijnen.m1) {
    const m1 = parseFloat(items.kozijnen.m1)
    if (m1 > 0) {
      if (projectType === 'buiten') {
        totalMin += m1 * PRIJZEN_PER_M1.buiten.kozijnen.min
        totalMax += m1 * PRIJZEN_PER_M1.buiten.kozijnen.max
      } else {
        totalMin += m1 * PRIJZEN_PER_M1.binnen.kozijnen.min
        totalMax += m1 * PRIJZEN_PER_M1.binnen.kozijnen.max
      }
      hasItems = true
    }
  }
  
  // Deuren (€65 per stuk)
  if (items.deuren.enabled && items.deuren.aantal) {
    const aantal = parseInt(items.deuren.aantal)
    if (aantal > 0) {
      totalMin += aantal * PRIJZEN_PER_M1.binnen.deuren.min
      totalMax += aantal * PRIJZEN_PER_M1.binnen.deuren.max
      hasItems = true
    }
  }
  
  if (!hasItems) return null
  
  return { min: Math.round(totalMin), max: Math.round(totalMax) }
}

// ============================================================================
// COMPONENT
// ============================================================================

interface AIQuoteFormProps {
  className?: string
}

export function AIQuoteForm({ className = "" }: AIQuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(1) // Altijd 1, geen stappen meer
  const [photos, setPhotos] = useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any[]>([])
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const [formData, setFormData] = useState({
    projectType: "" as ProjectType | "",
    naam: "",
    email: "",
    telefoon: "",
    // Multi-item systeem
    items: {
      muren: { enabled: false, m2: "", verfkleur: "" },
      plafond: { enabled: false, m2: "", verfkleur: "" },
      plinten: { enabled: false, m1: "", verfkleur: "" },
      lijstwerk: { enabled: false, m1: "", verfkleur: "" },
      kozijnen: { enabled: false, m1: "", verfkleur: "" },
      deuren: { enabled: false, aantal: "", verfkleur: "" },
    }
  })

  // Bereken prijs automatisch voor alle geselecteerde items
  const priceRange = formData.projectType
    ? calculateMultiItemPrice(formData.projectType, formData.items)
    : null

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [currentStep])

  const handleShare = async (imageUrl: string, title: string) => {
    try {
      if (navigator.share) {
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const file = new File([blob], 'schilderwerk.jpg', { type: 'image/jpeg' })
        
        await navigator.share({
          title: title,
          text: `Bekijk mijn huis in ${formData.verfkleur}!`,
          files: [file]
        })
      } else {
        await navigator.clipboard.writeText(imageUrl)
        alert('Link gekopieerd naar clipboard!')
      }
    } catch (error) {
      console.log('Share cancelled or failed:', error)
    }
  }

  const handleSubmitQuote = async () => {
    if (!formData.naam || !formData.email) {
      alert('Vul alstublieft uw naam en e-mail in')
      return
    }

    // Email format validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Vul een geldig email adres in (bijvoorbeeld: naam@voorbeeld.nl)')
      return
    }

    setIsSendingEmail(true)

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: {
            naam: formData.naam,
            email: formData.email,
            telefoon: formData.telefoon,
            projectType: formData.projectType,
            items: formData.items,
            aantalLagen: 2,
            voorbereiding: true,
          },
          analysisResults,
          priceRange,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Kon offerte niet verzenden')
      }

      const data = await response.json()
      setEmailSent(true)
      console.log('✅ Prijsindicatie verzonden:', data)

    } catch (error: any) {
      console.error('❌ Offerte verzenden mislukt:', error)
      const errorMessage = error.message || 'Er is iets misgegaan bij het verzenden.'
      alert(`${errorMessage}\n\nProbeer het opnieuw of neem contact op via budgetgroep.nl@gmail.com`)
    } finally {
      setIsSendingEmail(false)
    }
  }

  const handleNext = async () => {
    if (currentStep === 1) {
      setCurrentStep(2)
    }
  }

  const analyzePhotos = async () => {
    setIsAnalyzing(true)
    const results = []

    try {
      if (photos.length === 0) {
        console.log('⏭️ Geen foto\'s geüpload - sla AI preview over')
        setAnalysisResults([])
        setIsAnalyzing(false)
        return
      }

      const schilderwerkSpecs = {
        verfkleur: formData.verfkleur,
        projectType: formData.projectType,
        schilderwerkType: formData.schilderwerkType,
      }

      console.log('🎨 AI: Genereren van schilderwerk previews...')

      for (const photo of photos) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', photo)
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        })
        const { url } = await uploadRes.json()

        try {
          const generateRes = await fetch('/api/generate-schilderwerk-preview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              imageUrl: url,
              specs: schilderwerkSpecs 
            }),
          })
          
          if (!generateRes.ok) {
            console.warn('⚠️ AI preview generatie mislukt - gebruik originele foto')
            results.push({ 
              url, 
              previewUrl: url, 
              analysis: { 
                notes: 'Preview niet beschikbaar (AI API key vereist)'
              } 
            })
          } else {
            const responseData = await generateRes.json()
            console.log('✅ AI preview succesvol gegenereerd!')
            results.push({ 
              url, 
              previewUrl: responseData.previewImage, 
              analysis: {
                notes: 'AI preview gegenereerd'
              }
            })
          }
        } catch (error) {
          console.error('❌ AI preview error:', error)
          results.push({ 
            url, 
            previewUrl: url, 
            analysis: {
              notes: 'Preview fout - originele foto getoond'
            }
          })
        }
      }

      setAnalysisResults(results)
      console.log('✅ AI previews gereed!')
    } catch (error) {
      console.error('Analysis error:', error)
      alert('Er ging iets mis bij het genereren van de preview. Probeer opnieuw.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progressPercentage = 100 // Altijd 100%, geen stappen

  return (
    <Card className={`p-4 sm:p-6 lg:p-8 bg-white shadow-2xl border-0 ${className}`}>
      {!emailSent ? (
        <>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
            <h2 className="font-bold text-base sm:text-lg lg:text-xl text-foreground">
              Direct een prijsindicatie en AI preview van uw geschilderde huis.
            </h2>
          </div>
          <p className="text-xs sm:text-sm italic text-muted-foreground mb-3">
            Selecteer uw schilderwerk, vul uw gegevens in en ontvang direct uw prijs + AI preview
          </p>

          <form className="space-y-4">
            {currentStep === 1 && (
              <div className="space-y-4">
                {/* Project Type */}
                <div>
                  <Label className="text-foreground text-sm font-semibold mb-3 block">
                    Waar wilt u laten schilderen? *
                  </Label>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, projectType: 'binnen' })}
                      className={`p-3 border-2 rounded-lg text-left transition-all ${
                        formData.projectType === 'binnen'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-semibold text-foreground text-sm">Binnenschilderwerk</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Muren, plafonds, kozijnen binnen
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, projectType: 'buiten' })}
                      className={`p-3 border-2 rounded-lg text-left transition-all ${
                        formData.projectType === 'buiten'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-semibold text-foreground text-sm">Buitenschilderwerk</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Gevel, kozijnen buiten, deuren
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, projectType: 'binnen_buiten' })}
                      className={`p-3 border-2 rounded-lg text-left transition-all ${
                        formData.projectType === 'binnen_buiten'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-semibold text-foreground text-sm">Binnen & Buiten</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Compleet schilderwerk binnen en buiten
                      </div>
                    </button>
                  </div>
                </div>

                {/* Schilderwerk Items - Multi-select met checkboxes */}
                {formData.projectType && (
                  <div>
                    <Label className="text-foreground text-sm font-semibold mb-3 block">
                      Wat wilt u laten schilderen? * (Meerdere mogelijk)
                    </Label>
                    <div className="space-y-3">
                      {/* Muren */}
                      {(formData.projectType === 'binnen' || formData.projectType === 'binnen_buiten') && (
                        <div className={`p-3 border-2 rounded-lg ${formData.items.muren.enabled ? 'border-primary bg-primary/5' : 'border-border'}`}>
                          <div className="flex items-start gap-3">
                            <Checkbox 
                              checked={formData.items.muren.enabled}
                              onCheckedChange={(checked) => {
                                setFormData({
                                  ...formData,
                                  items: {
                                    ...formData.items,
                                    muren: { ...formData.items.muren, enabled: !!checked }
                                  }
                                })
                              }}
                              className="mt-1 border-2 border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="font-semibold text-foreground text-sm">Muren (m²) - €12,50/m²</div>
                              {formData.items.muren.enabled && (
                                <>
                                  <Input
                                    type="number"
                                    placeholder="Aantal m²"
                                    value={formData.items.muren.m2}
                                    onChange={(e) => {
                                      setFormData({
                                        ...formData,
                                        items: {
                                          ...formData.items,
                                          muren: { ...formData.items.muren, m2: e.target.value }
                                        }
                                      })
                                    }}
                                    className="bg-background border h-9 text-sm"
                                    min="1"
                                  />
                                  <Select
                                    value={formData.items.muren.verfkleur}
                                    onValueChange={(value) => {
                                      setFormData({
                                        ...formData,
                                        items: {
                                          ...formData.items,
                                          muren: { ...formData.items.muren, verfkleur: value }
                                        }
                                      })
                                    }}
                                  >
                                    <SelectTrigger className="bg-background border h-9 text-sm">
                                      <SelectValue placeholder="Kies verfkleur" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {VERFKLEUREN.map((kleur) => (
                                        <SelectItem key={kleur.value} value={kleur.value}>
                                          <div className="flex items-center gap-2">
                                            <div 
                                              className="w-3 h-3 rounded border border-gray-300" 
                                              style={{ backgroundColor: kleur.hex }}
                                            />
                                            <span className="text-xs">{kleur.label}</span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Plafond */}
                      {(formData.projectType === 'binnen' || formData.projectType === 'binnen_buiten') && (
                        <div className={`p-3 border-2 rounded-lg ${formData.items.plafond.enabled ? 'border-primary bg-primary/5' : 'border-border'}`}>
                          <div className="flex items-start gap-3">
                            <Checkbox 
                              checked={formData.items.plafond.enabled}
                              onCheckedChange={(checked) => {
                                setFormData({
                                  ...formData,
                                  items: {
                                    ...formData.items,
                                    plafond: { ...formData.items.plafond, enabled: !!checked }
                                  }
                                })
                              }}
                              className="mt-1 border-2 border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="font-semibold text-foreground text-sm">Plafond (m²) - €12,50/m²</div>
                              {formData.items.plafond.enabled && (
                                <>
                                  <Input
                                    type="number"
                                    placeholder="Aantal m²"
                                    value={formData.items.plafond.m2}
                                    onChange={(e) => {
                                      setFormData({
                                        ...formData,
                                        items: {
                                          ...formData.items,
                                          plafond: { ...formData.items.plafond, m2: e.target.value }
                                        }
                                      })
                                    }}
                                    className="bg-background border h-9 text-sm"
                                    min="1"
                                  />
                                  <Select
                                    value={formData.items.plafond.verfkleur}
                                    onValueChange={(value) => {
                                      setFormData({
                                        ...formData,
                                        items: {
                                          ...formData.items,
                                          plafond: { ...formData.items.plafond, verfkleur: value }
                                        }
                                      })
                                    }}
                                  >
                                    <SelectTrigger className="bg-background border h-9 text-sm">
                                      <SelectValue placeholder="Kies verfkleur" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {VERFKLEUREN.map((kleur) => (
                                        <SelectItem key={kleur.value} value={kleur.value}>
                                          <div className="flex items-center gap-2">
                                            <div 
                                              className="w-3 h-3 rounded border border-gray-300" 
                                              style={{ backgroundColor: kleur.hex }}
                                            />
                                            <span className="text-xs">{kleur.label}</span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Plinten */}
                      {(formData.projectType === 'binnen' || formData.projectType === 'binnen_buiten') && (
                        <div className={`p-3 border-2 rounded-lg ${formData.items.plinten.enabled ? 'border-primary bg-primary/5' : 'border-border'}`}>
                          <div className="flex items-start gap-3">
                            <Checkbox 
                              checked={formData.items.plinten.enabled}
                              onCheckedChange={(checked) => {
                                setFormData({
                                  ...formData,
                                  items: {
                                    ...formData.items,
                                    plinten: { ...formData.items.plinten, enabled: !!checked }
                                  }
                                })
                              }}
                              className="mt-1 border-2 border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="font-semibold text-foreground text-sm">Plinten (m¹) - €7,50/m</div>
                              {formData.items.plinten.enabled && (
                                <>
                                  <Input
                                    type="number"
                                    placeholder="Strekkende meter"
                                    value={formData.items.plinten.m1}
                                    onChange={(e) => {
                                      setFormData({
                                        ...formData,
                                        items: {
                                          ...formData.items,
                                          plinten: { ...formData.items.plinten, m1: e.target.value }
                                        }
                                      })
                                    }}
                                    className="bg-background border h-9 text-sm"
                                    min="1"
                                  />
                                  <Select
                                    value={formData.items.plinten.verfkleur}
                                    onValueChange={(value) => {
                                      setFormData({
                                        ...formData,
                                        items: {
                                          ...formData.items,
                                          plinten: { ...formData.items.plinten, verfkleur: value }
                                        }
                                      })
                                    }}
                                  >
                                    <SelectTrigger className="bg-background border h-9 text-sm">
                                      <SelectValue placeholder="Kies verfkleur" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {VERFKLEUREN.map((kleur) => (
                                        <SelectItem key={kleur.value} value={kleur.value}>
                                          <div className="flex items-center gap-2">
                                            <div 
                                              className="w-3 h-3 rounded border border-gray-300" 
                                              style={{ backgroundColor: kleur.hex }}
                                            />
                                            <span className="text-xs">{kleur.label}</span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </>
                              )}
                            </div>
                    </div>
                  </div>
                )}

                      {/* Lijstwerk */}
                      {(formData.projectType === 'binnen' || formData.projectType === 'binnen_buiten') && (
                        <div className={`p-3 border-2 rounded-lg ${formData.items.lijstwerk.enabled ? 'border-primary bg-primary/5' : 'border-border'}`}>
                          <div className="flex items-start gap-3">
                            <Checkbox 
                              checked={formData.items.lijstwerk.enabled}
                              onCheckedChange={(checked) => {
                                setFormData({
                                  ...formData,
                                  items: {
                                    ...formData.items,
                                    lijstwerk: { ...formData.items.lijstwerk, enabled: !!checked }
                                  }
                                })
                              }}
                              className="mt-1 border-2 border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="font-semibold text-foreground text-sm">Lijstwerk (m¹) - €7,50/m</div>
                              {formData.items.lijstwerk.enabled && (
                                <>
                                  <Input
                                    type="number"
                                    placeholder="Strekkende meter"
                                    value={formData.items.lijstwerk.m1}
                                    onChange={(e) => {
                                      setFormData({
                                        ...formData,
                                        items: {
                                          ...formData.items,
                                          lijstwerk: { ...formData.items.lijstwerk, m1: e.target.value }
                                        }
                                      })
                                    }}
                                    className="bg-background border h-9 text-sm"
                                    min="1"
                                  />
                                  <Select
                                    value={formData.items.lijstwerk.verfkleur}
                                    onValueChange={(value) => {
                                      setFormData({
                                        ...formData,
                                        items: {
                                          ...formData.items,
                                          lijstwerk: { ...formData.items.lijstwerk, verfkleur: value }
                                        }
                                      })
                                    }}
                                  >
                                    <SelectTrigger className="bg-background border h-9 text-sm">
                                      <SelectValue placeholder="Kies verfkleur" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {VERFKLEUREN.map((kleur) => (
                                        <SelectItem key={kleur.value} value={kleur.value}>
                                          <div className="flex items-center gap-2">
                                            <div 
                                              className="w-3 h-3 rounded border border-gray-300" 
                                              style={{ backgroundColor: kleur.hex }}
                                            />
                                            <span className="text-xs">{kleur.label}</span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </>
                              )}
                            </div>
                    </div>
              </div>
            )}

                      {/* Kozijnen */}
                      <div className={`p-3 border-2 rounded-lg ${formData.items.kozijnen.enabled ? 'border-primary bg-primary/5' : 'border-border'}`}>
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            checked={formData.items.kozijnen.enabled}
                            onCheckedChange={(checked) => {
                              setFormData({
                                ...formData,
                                items: {
                                  ...formData.items,
                                  kozijnen: { ...formData.items.kozijnen, enabled: !!checked }
                                }
                              })
                            }}
                            className="mt-1 border-2 border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <div className="flex-1 space-y-2">
                            <div className="font-semibold text-foreground text-sm">
                              Kozijnen (m¹) - {formData.projectType === 'buiten' ? '€12,50/m' : '€7,50/m'}
              </div>
                            {formData.items.kozijnen.enabled && (
                              <>
                  <Input
                    type="number"
                                  placeholder="Strekkende meter"
                                  value={formData.items.kozijnen.m1}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      items: {
                                        ...formData.items,
                                        kozijnen: { ...formData.items.kozijnen, m1: e.target.value }
                                      }
                                    })
                                  }}
                                  className="bg-background border h-9 text-sm"
                    min="1"
                  />
                                <Select
                                  value={formData.items.kozijnen.verfkleur}
                                  onValueChange={(value) => {
                                    setFormData({
                                      ...formData,
                                      items: {
                                        ...formData.items,
                                        kozijnen: { ...formData.items.kozijnen, verfkleur: value }
                                      }
                                    })
                                  }}
                                >
                                  <SelectTrigger className="bg-background border h-9 text-sm">
                                    <SelectValue placeholder="Kies verfkleur" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {VERFKLEUREN.map((kleur) => (
                                      <SelectItem key={kleur.value} value={kleur.value}>
                                        <div className="flex items-center gap-2">
                                          <div 
                                            className="w-3 h-3 rounded border border-gray-300" 
                                            style={{ backgroundColor: kleur.hex }}
                                          />
                                          <span className="text-xs">{kleur.label}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </>
                            )}
                          </div>
                        </div>
                </div>

                      {/* Deuren */}
                      <div className={`p-3 border-2 rounded-lg ${formData.items.deuren.enabled ? 'border-primary bg-primary/5' : 'border-border'}`}>
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            checked={formData.items.deuren.enabled}
                            onCheckedChange={(checked) => {
                              setFormData({
                                ...formData,
                                items: {
                                  ...formData.items,
                                  deuren: { ...formData.items.deuren, enabled: !!checked }
                                }
                              })
                            }}
                            className="mt-1 border-2 border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <div className="flex-1 space-y-2">
                            <div className="font-semibold text-foreground text-sm">Deuren - €65 per stuk</div>
                            {formData.items.deuren.enabled && (
                              <>
                  <Input
                    type="number"
                                  placeholder="Aantal deuren"
                                  value={formData.items.deuren.aantal}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      items: {
                                        ...formData.items,
                                        deuren: { ...formData.items.deuren, aantal: e.target.value }
                                      }
                                    })
                                  }}
                                  className="bg-background border h-9 text-sm"
                    min="1"
                  />
                  <Select
                                  value={formData.items.deuren.verfkleur}
                                  onValueChange={(value) => {
                                    setFormData({
                                      ...formData,
                                      items: {
                                        ...formData.items,
                                        deuren: { ...formData.items.deuren, verfkleur: value }
                                      }
                                    })
                                  }}
                                >
                                  <SelectTrigger className="bg-background border h-9 text-sm">
                                    <SelectValue placeholder="Kies verfkleur" />
                    </SelectTrigger>
                    <SelectContent>
                      {VERFKLEUREN.map((kleur) => (
                        <SelectItem key={kleur.value} value={kleur.value}>
                          <div className="flex items-center gap-2">
                            <div 
                                            className="w-3 h-3 rounded border border-gray-300" 
                              style={{ backgroundColor: kleur.hex }}
                            />
                                          <span className="text-xs">{kleur.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                              </>
                            )}
                </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Prijs Indicatie */}
                {priceRange && (
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 border-2 border-primary/20">
                    <h3 className="font-bold text-xl text-foreground mb-3">Uw Instant Prijs Indicatie</h3>
                    <div className="text-center mb-4">
                      <p className="text-4xl font-bold text-primary">
                        {formatPrice(priceRange.min)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Inclusief alle geselecteerde items</p>
                    </div>
                    <div className="bg-background rounded-lg p-3 space-y-1 text-left text-xs">
                      <p className="text-muted-foreground font-semibold mb-2">Inbegrepen:</p>
                      <p className="text-muted-foreground">✓ Professioneel schilderwerk</p>
                      <p className="text-muted-foreground">✓ A-merk verf per item</p>
                      <p className="text-muted-foreground">✓ Schuren + voorbehandeling</p>
                      <p className="text-muted-foreground">✓ 2 lagen afwerking</p>
                      <p className="text-muted-foreground text-xs mt-2">💡 Meerwerk: Houtrot reparatie vanaf €35/uur</p>
                    </div>
                  </div>
                )}

                {/* Contactgegevens */}
                {formData.projectType && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-foreground">Uw contactgegevens</h3>
                    <p className="text-sm text-muted-foreground">Vul uw gegevens in om deze prijs indicatie per email te ontvangen + gratis AI preview</p>

                    <div>
                      <Label className="text-foreground text-sm mb-2 block">Naam *</Label>
                      <Input
                        type="text"
                        placeholder="Uw volledige naam"
                        value={formData.naam}
                        onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
                        className="bg-background border h-11"
                        required
                      />
                  </div>

                    <div>
                      <Label className="text-foreground text-sm mb-2 block">Email *</Label>
                      <Input
                        type="email"
                        placeholder="uw@email.nl"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-background border h-11"
                        required
                      />
                  </div>

                    <div>
                      <Label className="text-foreground text-sm mb-2 block">Telefoon (optioneel)</Label>
                      <Input
                        type="tel"
                        placeholder="06 12345678"
                        value={formData.telefoon}
                        onChange={(e) => setFormData({ ...formData, telefoon: e.target.value })}
                        className="bg-background border h-11"
                      />
                </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2 pt-2 sm:pt-3">
                <Button
                  type="button"
                onClick={handleSubmitQuote}
                disabled={isSendingEmail || !formData.naam || !formData.email || !priceRange}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-base disabled:opacity-50"
              >
                {isSendingEmail ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verzenden...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Ontvang Prijs per Email + Gratis AI Preview
                  </>
                )}
              </Button>
            </div>
          </form>
        </>
      ) : (
        <div className="space-y-6">
          {/* Success Banner */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center gap-3 text-green-700 mb-3">
              <Check className="w-8 h-8" />
              <h2 className="font-bold text-2xl">Prijsindicatie Verzonden!</h2>
            </div>
            <p className="text-green-700 text-base mb-1">
              Check uw inbox: <strong>{formData.email}</strong>
            </p>
            <p className="text-green-600 text-sm">
              U ontvangt uw persoonlijke prijsindicatie + gratis AI preview per email
            </p>
          </div>

          {/* Prijsindicatie & Opbouw */}
          {priceRange && (
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 border-2 border-primary/20 text-left">
              <h3 className="font-bold text-xl text-foreground mb-4">Uw Prijs Indicatie</h3>
              <div className="text-center mb-4">
                <p className="text-5xl font-bold text-primary">
                  {formatPrice(priceRange.min)}
                </p>
              </div>
              
              {/* Prijsopbouw */}
              <div className="bg-background rounded-lg p-4 space-y-2">
                <p className="font-semibold text-sm text-foreground mb-3">Prijsopbouw:</p>
                
                {formData.items.muren.enabled && formData.items.muren.m2 && (
                  <div className="flex justify-between text-sm border-b border-border pb-2">
                    <span className="text-muted-foreground">
                      Muren: {formData.items.muren.m2} m² × €12,50
                    </span>
                    <span className="font-medium text-foreground">
                      {formatPrice(parseFloat(formData.items.muren.m2) * 12.50)}
                    </span>
                  </div>
                )}
                
                {formData.items.plafond.enabled && formData.items.plafond.m2 && (
                  <div className="flex justify-between text-sm border-b border-border pb-2">
                    <span className="text-muted-foreground">
                      Plafond: {formData.items.plafond.m2} m² × €12,50
                    </span>
                    <span className="font-medium text-foreground">
                      {formatPrice(parseFloat(formData.items.plafond.m2) * 12.50)}
                    </span>
                  </div>
                )}
                
                {formData.items.plinten.enabled && formData.items.plinten.m1 && (
                  <div className="flex justify-between text-sm border-b border-border pb-2">
                    <span className="text-muted-foreground">
                      Plinten: {formData.items.plinten.m1} m¹ × €7,50
                    </span>
                    <span className="font-medium text-foreground">
                      {formatPrice(parseFloat(formData.items.plinten.m1) * 7.50)}
                    </span>
                  </div>
                )}
                
                {formData.items.lijstwerk.enabled && formData.items.lijstwerk.m1 && (
                  <div className="flex justify-between text-sm border-b border-border pb-2">
                    <span className="text-muted-foreground">
                      Lijstwerk: {formData.items.lijstwerk.m1} m¹ × €7,50
                    </span>
                    <span className="font-medium text-foreground">
                      {formatPrice(parseFloat(formData.items.lijstwerk.m1) * 7.50)}
                    </span>
                  </div>
                )}
                
                {formData.items.kozijnen.enabled && formData.items.kozijnen.m1 && (
                  <div className="flex justify-between text-sm border-b border-border pb-2">
                    <span className="text-muted-foreground">
                      Kozijnen: {formData.items.kozijnen.m1} m¹ × {formData.projectType === 'buiten' ? '€12,50' : '€7,50'}
                    </span>
                    <span className="font-medium text-foreground">
                      {formatPrice(parseFloat(formData.items.kozijnen.m1) * (formData.projectType === 'buiten' ? 12.50 : 7.50))}
                    </span>
                  </div>
                )}
                
                {formData.items.deuren.enabled && formData.items.deuren.aantal && (
                  <div className="flex justify-between text-sm border-b border-border pb-2">
                    <span className="text-muted-foreground">
                      Deuren: {formData.items.deuren.aantal} × €65
                    </span>
                    <span className="font-medium text-foreground">
                      {formatPrice(parseInt(formData.items.deuren.aantal) * 65)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between text-base font-bold pt-3 border-t-2 border-primary">
                  <span className="text-foreground">Totaal:</span>
                  <span className="text-primary text-xl">{formatPrice(priceRange.min)}</span>
                </div>
              </div>

              <div className="mt-4 bg-background rounded-lg p-3 space-y-1 text-xs">
                <p className="text-muted-foreground">✓ Inclusief: Schuren + voorbehandeling</p>
                <p className="text-muted-foreground">✓ Inclusief: 2 lagen afwerking</p>
                <p className="text-muted-foreground">✓ Inclusief: A-merk verf</p>
                <p className="text-muted-foreground mt-2">💡 Meerwerk: Houtrot reparatie vanaf €35/uur + materiaal</p>
              </div>
            </div>
          )}

          {/* Actie Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => {
                setPhotos([])
                setAnalysisResults([])
                setEmailSent(false)
                setFormData({
                  projectType: "",
                  naam: "",
                  email: "",
                  telefoon: "",
                  items: {
                    muren: { enabled: false, m2: "", verfkleur: "" },
                    plafond: { enabled: false, m2: "", verfkleur: "" },
                    plinten: { enabled: false, m1: "", verfkleur: "" },
                    lijstwerk: { enabled: false, m1: "", verfkleur: "" },
                    kozijnen: { enabled: false, m1: "", verfkleur: "" },
                    deuren: { enabled: false, aantal: "", verfkleur: "" },
                  }
                })
              }}
              variant="outline"
              className="w-full h-12 font-semibold"
            >
              Nieuwe Prijsindicatie Maken
            </Button>

            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-base"
              asChild
            >
              <a 
                href="https://calendly.com/budgetgroep/30min?month=2025-11"
                target="_blank"
                rel="noopener noreferrer"
              >
                📞 Plan Gratis Adviesgesprek
              </a>
            </Button>
          </div>

          <div className="bg-primary/10 rounded-lg p-4 text-center">
            <p className="text-foreground font-bold text-base mb-1">💰 Laagste Prijs Garantie</p>
            <p className="text-foreground text-sm">
              Vindt u hetzelfde schilderwerk elders goedkoper? Dan gaan wij eronder!
            </p>
          </div>

        </div>
      )}

      {/* Lightbox Modal */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <div className="absolute -top-12 right-0 flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleShare(enlargedImage, 'Mijn schilderwerk')
                }}
                className="text-white hover:text-gray-300 flex items-center gap-2 text-lg"
              >
                <Share2 className="w-5 h-5" />
                Delen
              </button>
              <button
                onClick={() => setEnlargedImage(null)}
                className="text-white hover:text-gray-300 flex items-center gap-2 text-lg"
              >
                <X className="w-6 h-6" />
                Sluiten
              </button>
            </div>
            <img
              src={enlargedImage}
              alt="Vergrote weergave"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-center mt-4 text-sm">
              Klik buiten de foto om te sluiten
            </p>
          </div>
        </div>
      )}
    </Card>
  )
}
