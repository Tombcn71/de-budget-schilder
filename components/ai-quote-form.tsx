"use client"

import { useState, useEffect, useRef } from "react"
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
type SchilderwerkType = 'muren' | 'plafond' | 'plinten' | 'lijstwerk' | 'binnenkozijn' | 'binnendeur' | 'buitenkozijn' | 'deurkozijn' | 'volledige_kamer' | 'gevel'
type MeasurementUnit = 'm2' | 'm1' // m² of strekkende meter

// ============================================================================
// CONSTANTEN - Prijzen per m² of strekkende meter
// ============================================================================

// Schilderwerk berekend per VIERKANTE METER (m²)
const PRIJZEN_PER_M2 = {
  binnen: {
    muren: { min: 12.50, max: 12.50 },           // €12,50 per m² (incl. schuren + 2 lagen)
    plafond: { min: 13.50, max: 13.50 },         // €13,50 per m² (incl. schuren + 2 lagen)
    volledige_kamer: { min: 450, max: 750 }      // €450-750 per kamer (flat rate)
  },
  buiten: {
    gevel: { min: 25, max: 40 },                 // €25-40 per m²
  }
} as const

// Schilderwerk berekend per STREKKENDE METER (m¹) of per STUK
const PRIJZEN_PER_M1 = {
  binnen: {
    plinten: { min: 7.50, max: 7.50 },           // €7,50 per strekkende meter
    lijstwerk: { min: 7.50, max: 7.50 },         // €7,50 per strekkende meter
    binnenkozijn: { min: 100, max: 100 },        // €100 per stuk
    binnendeur: { min: 100, max: 100 },          // €100 per stuk
    deurkozijn: { min: 40, max: 40 },            // €40 per stuk
  },
  buiten: {
    buitenkozijn: { min: 125, max: 125 },        // €125 per stuk
    buitendeur: { min: 125, max: 125 },          // €125 per stuk
  }
} as const

// Helper: bepaal welke eenheid gebruikt moet worden
const MEASUREMENT_UNITS: Record<SchilderwerkType, MeasurementUnit> = {
  muren: 'm2',
  plafond: 'm2',
  gevel: 'm2',
  volledige_kamer: 'm2',
  plinten: 'm1',
  lijstwerk: 'm1',
  binnenkozijn: 'm1',
  binnendeur: 'm1',
  buitenkozijn: 'm1',
  deurkozijn: 'm1',
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
  { value: 'creme', label: 'Crème (RAL 9001)', hex: '#F7EFE2' },
  { value: 'lichtbeige', label: 'Lichtbeige (RAL 1013)', hex: '#E3D9C6' },
  { value: 'beige', label: 'Beige (RAL 1015)', hex: '#E6D2B5' },
  { value: 'zandgeel', label: 'Zandgeel (RAL 1002)', hex: '#D0B084' },
  { value: 'lichtgrijs', label: 'Lichtgrijs (RAL 7035)', hex: '#CBD0CC' },
  { value: 'grijs', label: 'Grijs (RAL 7016)', hex: '#383E42' },
  { value: 'donkergrijs', label: 'Donkergrijs (RAL 7024)', hex: '#45494E' },
  { value: 'antraciet', label: 'Antraciet (RAL 7021)', hex: '#2E3234' },
  { value: 'zwart', label: 'Zwart (RAL 9005)', hex: '#0E0E10' },
  { value: 'lichtblauw', label: 'Lichtblauw (RAL 5024)', hex: '#6093AC' },
  { value: 'blauw', label: 'Blauw (RAL 5014)', hex: '#6C7C98' },
  { value: 'donkerblauw', label: 'Donkerblauw (RAL 5011)', hex: '#1A2B3C' },
  { value: 'mintgroen', label: 'Mintgroen (RAL 6019)', hex: '#B7D9B1' },
  { value: 'groen', label: 'Groen (RAL 6009)', hex: '#26392F' },
  { value: 'olijfgroen', label: 'Olijfgroen (RAL 6003)', hex: '#4F5243' },
  { value: 'roze', label: 'Roze/Oudroze (RAL 3015)', hex: '#E2A5A5' },
  { value: 'bordeaux', label: 'Bordeaux (RAL 3005)', hex: '#5E2028' },
  { value: 'zachtgeel', label: 'Zachtgeel (RAL 1014)', hex: '#DCC896' },
  { value: 'oker', label: 'Oker (RAL 1024)', hex: '#B89C50' },
  { value: 'terracotta', label: 'Terracotta (RAL 8023)', hex: '#A05030' },
  { value: 'bruin', label: 'Bruin (RAL 8014)', hex: '#4A3526' },
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
  
  // Binnenkozijnen (€100 per stuk) - alleen binnen
  if (items.binnenkozijnen?.enabled && items.binnenkozijnen?.aantal) {
    const aantal = parseInt(items.binnenkozijnen.aantal)
    if (aantal > 0) {
      totalMin += aantal * PRIJZEN_PER_M1.binnen.binnenkozijn.min
      totalMax += aantal * PRIJZEN_PER_M1.binnen.binnenkozijn.max
      hasItems = true
    }
  }
  
  // Binnendeuren (€125 per stuk) - alleen binnen
  if (items.binnendeuren?.enabled && items.binnendeuren?.aantal) {
    const aantal = parseInt(items.binnendeuren.aantal)
    if (aantal > 0) {
      totalMin += aantal * PRIJZEN_PER_M1.binnen.binnendeur.min
      totalMax += aantal * PRIJZEN_PER_M1.binnen.binnendeur.max
      hasItems = true
    }
  }
  
  // Deurkozijnen (€40 per stuk) - alleen binnen
  if (items.deurkozijnen?.enabled && items.deurkozijnen?.aantal) {
    const aantal = parseInt(items.deurkozijnen.aantal)
    if (aantal > 0) {
      totalMin += aantal * PRIJZEN_PER_M1.binnen.deurkozijn.min
      totalMax += aantal * PRIJZEN_PER_M1.binnen.deurkozijn.max
      hasItems = true
    }
  }
  
  // Buitenkozijnen (€125 per stuk) - alleen buiten
  if (items.buitenkozijnen?.enabled && items.buitenkozijnen?.aantal) {
    const aantal = parseInt(items.buitenkozijnen.aantal)
    if (aantal > 0) {
      totalMin += aantal * PRIJZEN_PER_M1.buiten.buitenkozijn.min
      totalMax += aantal * PRIJZEN_PER_M1.buiten.buitenkozijn.max
      hasItems = true
    }
  }
  
  // Buitendeuren (€150 per stuk) - alleen buiten
  if (items.buitendeuren?.enabled && items.buitendeuren?.aantal) {
    const aantal = parseInt(items.buitendeuren.aantal)
    if (aantal > 0) {
      totalMin += aantal * PRIJZEN_PER_M1.buiten.buitendeur.min
      totalMax += aantal * PRIJZEN_PER_M1.buiten.buitendeur.max
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
  const scrollPositionRef = useRef<number>(0)
  const formRef = useRef<HTMLDivElement>(null)

  // Facebook Pixel: Track ViewContent when component loads
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_name: 'Schilderwerk Prijsindicatie Form',
        content_category: 'Quote Form'
      })
    }
  }, [])

  const [formData, setFormData] = useState({
    projectType: "" as ProjectType | "",
    naam: "",
    email: "",
    telefoon: "",
    // Multi-item systeem
    items: {
      // Binnen opties
      muren: { enabled: false, m2: "", verfkleur: "" },
      plafond: { enabled: false, m2: "", verfkleur: "" },
      plinten: { enabled: false, m1: "", verfkleur: "" },
      lijstwerk: { enabled: false, m1: "", verfkleur: "" },
      binnenkozijnen: { enabled: false, aantal: "", verfkleur: "" },
      binnendeuren: { enabled: false, aantal: "", verfkleur: "" },
      deurkozijnen: { enabled: false, aantal: "", verfkleur: "" },
      // Buiten opties
      buitenkozijnen: { enabled: false, aantal: "", verfkleur: "" },
      buitendeuren: { enabled: false, aantal: "", verfkleur: "" },
    }
  })

  // Bereken prijs automatisch voor alle geselecteerde items
  const priceRange = formData.projectType
    ? calculateMultiItemPrice(formData.projectType, formData.items)
    : null

  // Facebook Pixel: Track InitiateCheckout when price is calculated
  useEffect(() => {
    if (priceRange && typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Schilderwerk Quote Started',
        value: priceRange.min,
        currency: 'EUR',
        num_items: [
          formData.items.muren.enabled,
          formData.items.plafond.enabled,
          formData.items.plinten.enabled,
          formData.items.lijstwerk.enabled,
          formData.items.binnenkozijnen.enabled,
          formData.items.binnendeuren.enabled,
          formData.items.deurkozijnen.enabled,
          formData.items.buitenkozijnen.enabled,
          formData.items.buitendeuren.enabled
        ].filter(Boolean).length
      })
    }
  }, [priceRange?.min]) // Only track when price changes

  // Verwijderd - veroorzaakte frozen scherm

  const handleShare = async (imageUrl: string, title: string) => {
    try {
      if (navigator.share) {
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const file = new File([blob], 'schilderwerk.jpg', { type: 'image/jpeg' })
        
        await navigator.share({
          title: title,
          text: `Bekijk mijn schilderwerk preview!`,
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
      // Als er foto's zijn EN nog geen AI preview, genereer deze eerst
      let finalAnalysisResults = analysisResults
      if (photos.length > 0 && analysisResults.length === 0) {
        console.log('🎨 Genereren van AI previews voor verzenden...')
        setIsAnalyzing(true)
        
        try {
          finalAnalysisResults = await generatePreviews()
          // Update de state zodat het success scherm de previews kan tonen
          setAnalysisResults(finalAnalysisResults)
          console.log('✅ Analysis results geupdated:', finalAnalysisResults.length)
        } catch (error) {
          console.warn('⚠️ AI preview kon niet gegenereerd worden, verzend zonder preview')
          finalAnalysisResults = []
        } finally {
          setIsAnalyzing(false)
        }
      }

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
          analysisResults: finalAnalysisResults,
          priceRange,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Kon offerte niet verzenden')
      }

      const data = await response.json()
      
      // Bewaar scroll positie DIRECT
      scrollPositionRef.current = window.scrollY

      setEmailSent(true)
      console.log('✅ Prijsindicatie verzonden:', data)
      
      // Facebook Pixel: Track Lead conversion
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Schilderwerk Offerte',
          value: priceRange?.min || 0,
          currency: 'EUR',
          content_category: 'Schilderwerk'
        })
      }
      
      // Scroll naar de top van het formulier na DOM update
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 0)

    } catch (error: any) {
      console.error('❌ Offerte verzenden mislukt:', error)
      const errorMessage = error.message || 'Er is iets misgegaan bij het verzenden.'
      alert(`${errorMessage}\n\nProbeer het opnieuw of neem contact op via budgetgroep.nl@gmail.com`)
    } finally {
      setIsSendingEmail(false)
      setIsAnalyzing(false)
    }
  }

  // Helper functie om previews te genereren en resultaat te returnen
  const generatePreviews = async () => {
    const results = []

    try {
      if (photos.length === 0) {
        return []
      }

      // Verzamel alle gekozen verfkleuren en werkzaamheden
      const selectedColors: string[] = []
      const selectedTypes: string[] = []
      
      Object.entries(formData.items).forEach(([key, item]) => {
        if (item.enabled) {
          selectedTypes.push(key)
          if (item.verfkleur) {
            selectedColors.push(item.verfkleur)
          }
        }
      })

      const verfkleur = selectedColors[0] || 'wit'
      const schilderwerkType = selectedTypes.join(', ') || 'muren'

      const schilderwerkSpecs = {
        verfkleur,
        projectType: formData.projectType,
        schilderwerkType,
        items: formData.items,
      }

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
            results.push({ url, previewUrl: url })
          } else {
            const genData = await generateRes.json()
            console.log('✅ AI preview ontvangen, heeft previewImage:', !!genData.previewImage)
            results.push({ 
              url, 
              previewUrl: genData.previewImage || url,  // API returned previewImage, niet previewUrl!
            })
          }
        } catch (error) {
          console.warn('⚠️ Preview error:', error)
          results.push({ url, previewUrl: url })
        }
      }

      console.log('✅ Preview generatie voltooid, aantal results:', results.length)
      return results
    } catch (error) {
      console.error('❌ Preview generatie mislukt:', error)
      return []
    }
  }

  const handleNext = async () => {
    if (currentStep === 1) {
      setCurrentStep(2)
    }
  }


  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progressPercentage = 100 // Altijd 100%, geen stappen

  return (
    <div ref={formRef}>
    <Card className={`p-4 sm:p-6 lg:p-8 bg-white shadow-2xl border-0 ${className}`}>
      {!emailSent ? (
        <>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
            <h2 className="font-bold text-base sm:text-lg lg:text-xl text-foreground">
              <span className="sm:hidden">Direct prijsindicatie + AI preview</span>
              <span className="hidden sm:inline">Direct een prijsindicatie en gratis AI preview</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm italic text-muted-foreground mb-3">
            💡 Tip: Zorg dat je foto's hebt van de ruimtes voor je AI preview
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
                                  <div className="space-y-2">
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
                  </div>
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
                              <div className="font-semibold text-foreground text-sm">Plafond (m²) - €13,50/m²</div>
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
                                  <div className="space-y-2">
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
                  </div>
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
                                  <div className="space-y-2">
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
                </div>
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
                                  <div className="space-y-2">
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
                                  </div>
                                </>
                              )}
                  </div>
                </div>
              </div>
            )}

                      {/* Binnenkozijnen - alleen bij binnen of binnen_buiten */}
                      {(formData.projectType === 'binnen' || formData.projectType === 'binnen_buiten') && (
                        <div className={`p-3 border-2 rounded-lg ${formData.items.binnenkozijnen.enabled ? 'border-primary bg-primary/5' : 'border-border'}`}>
                        <div className="flex items-start gap-3">
                    <Checkbox
                              checked={formData.items.binnenkozijnen.enabled}
                            onCheckedChange={(checked) => {
                              setFormData({
                                ...formData,
                                items: {
                                  ...formData.items,
                                    binnenkozijnen: { ...formData.items.binnenkozijnen, enabled: !!checked }
                                }
                              })
                            }}
                            className="mt-1 border-2 border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <div className="flex-1 space-y-2">
                              <div className="font-semibold text-foreground text-sm">Binnenkozijnen - €100 per stuk</div>
                              {formData.items.binnenkozijnen.enabled && (
                              <>
                  <Input
                    type="number"
                                    placeholder="Aantal kozijnen"
                                    value={formData.items.binnenkozijnen.aantal}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      items: {
                                        ...formData.items,
                                          binnenkozijnen: { ...formData.items.binnenkozijnen, aantal: e.target.value }
                                      }
                                    })
                                  }}
                                  className="bg-background border h-9 text-sm"
                    min="1"
                  />
                                  <Select
                                    value={formData.items.binnenkozijnen.verfkleur}
                                    onValueChange={(value) => {
                                      setFormData({
                                        ...formData,
                                        items: {
                                          ...formData.items,
                                          binnenkozijnen: { ...formData.items.binnenkozijnen, verfkleur: value }
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
                                            <div className="w-3 h-3 rounded border border-gray-300" style={{ backgroundColor: kleur.hex }} />
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

                      {/* Binnendeuren - alleen bij binnen of binnen_buiten */}
                      {(formData.projectType === 'binnen' || formData.projectType === 'binnen_buiten') && (
                        <div className={`p-3 border-2 rounded-lg ${formData.items.binnendeuren.enabled ? 'border-primary bg-primary/5' : 'border-border'}`}>
                        <div className="flex items-start gap-3">
                          <Checkbox 
                              checked={formData.items.binnendeuren.enabled}
                            onCheckedChange={(checked) => {
                              setFormData({
                                ...formData,
                                items: {
                                  ...formData.items,
                                    binnendeuren: { ...formData.items.binnendeuren, enabled: !!checked }
                                }
                              })
                            }}
                            className="mt-1 border-2 border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <div className="flex-1 space-y-2">
                              <div className="font-semibold text-foreground text-sm">Binnendeuren - €100 per stuk</div>
                              {formData.items.binnendeuren.enabled && (
                              <>
                  <Input
                    type="number"
                                  placeholder="Aantal deuren"
                                    value={formData.items.binnendeuren.aantal}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      items: {
                                        ...formData.items,
                                          binnendeuren: { ...formData.items.binnendeuren, aantal: e.target.value }
                                      }
                                    })
                                  }}
                                  className="bg-background border h-9 text-sm"
                    min="1"
                  />
                    <Select
                                    value={formData.items.binnendeuren.verfkleur}
                      onValueChange={(value) => {
                        setFormData({
                          ...formData,
                          items: {
                            ...formData.items,
                                          binnendeuren: { ...formData.items.binnendeuren, verfkleur: value }
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
                                            <div className="w-3 h-3 rounded border border-gray-300" style={{ backgroundColor: kleur.hex }} />
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

                      {/* Buitenkozijnen - alleen bij buiten of binnen_buiten */}
                      {(formData.projectType === 'buiten' || formData.projectType === 'binnen_buiten') && (
                        <div className={`p-3 border-2 rounded-lg ${formData.items.buitenkozijnen.enabled ? 'border-primary bg-primary/5' : 'border-border'}`}>
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={formData.items.buitenkozijnen.enabled}
                              onCheckedChange={(checked) => {
                                setFormData({
                                  ...formData,
                                  items: {
                                    ...formData.items,
                                    buitenkozijnen: { ...formData.items.buitenkozijnen, enabled: !!checked }
                                  }
                                })
                              }}
                              className="mt-1 border-2 border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="font-semibold text-foreground text-sm">Buitenkozijnen - €125 per stuk</div>
                              {formData.items.buitenkozijnen.enabled && (
                                <>
                                  <Input
                                    type="number"
                                    placeholder="Aantal kozijnen"
                                    value={formData.items.buitenkozijnen.aantal}
                                    onChange={(e) => {
                                      setFormData({
                                        ...formData,
                                        items: {
                                          ...formData.items,
                                          buitenkozijnen: { ...formData.items.buitenkozijnen, aantal: e.target.value }
                                        }
                                      })
                                    }}
                                    className="bg-background border h-9 text-sm"
                                    min="1"
                                  />
                                  <Select
                                    value={formData.items.buitenkozijnen.verfkleur}
                                    onValueChange={(value) => {
                                      setFormData({
                                        ...formData,
                                        items: {
                                          ...formData.items,
                                          buitenkozijnen: { ...formData.items.buitenkozijnen, verfkleur: value }
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
                                            <div className="w-3 h-3 rounded border border-gray-300" style={{ backgroundColor: kleur.hex }} />
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

                      {/* Deurkozijnen - alleen bij binnen of binnen_buiten */}
                      {(formData.projectType === 'binnen' || formData.projectType === 'binnen_buiten') && (
                        <div className={`p-3 border-2 rounded-lg ${formData.items.deurkozijnen.enabled ? 'border-primary bg-primary/5' : 'border-border'}`}>
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={formData.items.deurkozijnen.enabled}
                              onCheckedChange={(checked) => {
                                setFormData({
                                  ...formData,
                                  items: {
                                    ...formData.items,
                                    deurkozijnen: { ...formData.items.deurkozijnen, enabled: !!checked }
                                  }
                                })
                              }}
                              className="mt-1 border-2 border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="font-semibold text-foreground text-sm">Deurkozijnen - €40 per stuk</div>
                              {formData.items.deurkozijnen.enabled && (
                                <>
                                  <Input
                                    type="number"
                                    placeholder="Aantal deurkozijnen"
                                    value={formData.items.deurkozijnen.aantal}
                                    onChange={(e) => {
                                      setFormData({
                                        ...formData,
                                        items: {
                                          ...formData.items,
                                          deurkozijnen: { ...formData.items.deurkozijnen, aantal: e.target.value }
                                        }
                                      })
                                    }}
                                    className="bg-background border h-9 text-sm"
                                    min="1"
                                  />
                                  <Select
                                    value={formData.items.deurkozijnen.verfkleur}
                                    onValueChange={(value) => {
                                      setFormData({
                                        ...formData,
                                        items: {
                                          ...formData.items,
                                          deurkozijnen: { ...formData.items.deurkozijnen, verfkleur: value }
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
                                            <div className="w-3 h-3 rounded border border-gray-300" style={{ backgroundColor: kleur.hex }} />
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

                      {/* Buitendeuren - alleen bij buiten of binnen_buiten */}
                      {(formData.projectType === 'buiten' || formData.projectType === 'binnen_buiten') && (
                        <div className={`p-3 border-2 rounded-lg ${formData.items.buitendeuren.enabled ? 'border-primary bg-primary/5' : 'border-border'}`}>
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={formData.items.buitendeuren.enabled}
                              onCheckedChange={(checked) => {
                                setFormData({
                                  ...formData,
                                  items: {
                                    ...formData.items,
                                    buitendeuren: { ...formData.items.buitendeuren, enabled: !!checked }
                                  }
                                })
                              }}
                              className="mt-1 border-2 border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="font-semibold text-foreground text-sm">Buitendeuren - €125 per stuk</div>
                              {formData.items.buitendeuren.enabled && (
                                <>
                                  <Input
                                    type="number"
                                    placeholder="Aantal buitendeuren"
                                    value={formData.items.buitendeuren.aantal}
                                    onChange={(e) => {
                                      setFormData({
                                        ...formData,
                                        items: {
                                          ...formData.items,
                                          buitendeuren: { ...formData.items.buitendeuren, aantal: e.target.value }
                                        }
                                      })
                                    }}
                                    className="bg-background border h-9 text-sm"
                                    min="1"
                                  />
                                  <Select
                                    value={formData.items.buitendeuren.verfkleur}
                                    onValueChange={(value) => {
                                      setFormData({
                                        ...formData,
                                        items: {
                                          ...formData.items,
                                          buitendeuren: { ...formData.items.buitendeuren, verfkleur: value }
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
                                            <div className="w-3 h-3 rounded border border-gray-300" style={{ backgroundColor: kleur.hex }} />
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
                    </div>
                  </div>
                )}

                {/* Prijs Indicatie */}
                {priceRange && (
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 sm:p-6 border-2 border-primary/20">
                    <h3 className="font-bold text-lg sm:text-xl text-foreground mb-3">Uw Directe Prijs Indicatie</h3>
                    <div className="text-center mb-4">
                      <p className="text-3xl sm:text-4xl font-bold text-primary">
                        {formatPrice(priceRange.min)}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">Inclusief alle geselecteerde items</p>
                    </div>
                    <div className="bg-background rounded-lg p-3 space-y-1 text-left text-xs">
                      <p className="text-muted-foreground font-semibold mb-2">Inbegrepen:</p>
                      <p className="text-muted-foreground">✓ Professioneel schilderwerk</p>
                      <p className="text-muted-foreground">✓ Verf en materialen</p>
                      <p className="text-muted-foreground">✓ Schuren + voorbehandeling</p>
                      <p className="text-muted-foreground">✓ 2 lagen afwerking</p>
                    </div>
                  </div>
                )}

          {/* AI Preview Upload Sectie */}
                {formData.projectType && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-base text-foreground mb-1">
                            🎨 Gratis AI Preview (Optioneel)
                  </h3>
                  <p className="text-xs text-muted-foreground">
                            Wilt u zien hoe het eruit gaat zien? Upload foto's van uw ruimte en ontvang automatisch een AI preview in uw gekozen kleuren!
                  </p>
                </div>
              </div>

                      <div className="space-y-3">
                  <PhotoUpload 
                    onPhotosChange={setPhotos}
                    maxPhotos={5}
                    minPhotos={0}
                  />

                {photos.length > 0 && (
                          <div className="bg-white rounded-lg p-3 border border-green-300">
                            <p className="text-xs text-green-700 font-medium">
                              ✨ {photos.length} foto{photos.length > 1 ? "'s" : ""} geselecteerd - AI preview wordt automatisch gegenereerd bij verzenden
                            </p>
                          </div>
                )}
              </div>
            </div>
            </div>
          )}

                {/* Contactgegevens */}
                {formData.projectType && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-foreground">Uw contactgegevens</h3>
                    <p className="text-sm text-muted-foreground">Vul uw gegevens in om deze prijsindicatie per email te ontvangen</p>

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
                disabled={isSendingEmail || isAnalyzing || !formData.naam || !formData.email || !priceRange}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-base disabled:opacity-50"
              >
                {isSendingEmail || isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isAnalyzing ? 'AI Preview Genereren...' : 'Verzenden...'}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                    {photos.length > 0 
                      ? `Verzenden met AI Preview (${photos.length} foto's)` 
                      : 'Ontvang Prijsindicatie per Email'}
                      </>
                    )}
                  </Button>
            </div>

            {/* Loading tekst tijdens AI generatie */}
            {isAnalyzing && photos.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
                  <div>
                    <p className="text-blue-900 font-semibold text-sm">AI Preview wordt gegenereerd...</p>
                    <p className="text-blue-700 text-xs mt-1">Dit duurt ongeveer 30 seconden per foto</p>
            </div>
            </div>
              </div>
            )}
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
              {analysisResults.length > 0 
                ? 'U ontvangt uw prijsindicatie per email + ziet hieronder uw AI preview'
                : 'U ontvangt uw prijsindicatie per email'}
            </p>
          </div>

          {/* AI Preview Sectie (als er previews zijn gegenereerd) */}
          {analysisResults.length > 0 && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-xl text-foreground">✨ Uw AI Preview</h3>
              </div>
              
              <div className="space-y-4">
                {analysisResults.map((result, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 space-y-3">
                    <p className="text-sm font-semibold text-muted-foreground">Preview {idx + 1}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Voor */}
                      <div className="space-y-2">
                        <div 
                          className="relative rounded-lg overflow-hidden border-2 border-border group cursor-pointer"
                          onClick={() => setEnlargedImage(result.url)}
                        >
                          <img
                            src={result.url}
                            alt={`Voor - Foto ${idx + 1}`}
                            className="w-full h-auto object-contain max-h-64"
                          />
                          <div className="absolute top-2 right-2 flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleShare(result.url, 'Huidige situatie')
                              }}
                              className="bg-black/60 p-1.5 rounded-full hover:bg-black/80 transition-colors"
                              aria-label="Deel foto"
                            >
                              <Share2 className="w-4 h-4 text-white" />
                            </button>
                            <button
                              onClick={() => setEnlargedImage(result.url)}
                              className="bg-black/60 p-1.5 rounded-full hover:bg-black/80 transition-colors"
                              aria-label="Vergroot foto"
                            >
                              <ZoomIn className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-center text-muted-foreground font-medium">
                          📸 Voor
                        </p>
                      </div>

                      {/* Na */}
                      <div className="space-y-2">
                        <div 
                          className="relative rounded-lg overflow-hidden border-2 border-primary group cursor-pointer"
                          onClick={() => setEnlargedImage(result.previewUrl || result.url)}
                        >
                          <img
                            src={result.previewUrl || result.url}
                            alt={`Na - Foto ${idx + 1}`}
                            className="w-full h-auto object-contain max-h-64"
                          />
                          <div className="absolute top-2 right-2 flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleShare(result.previewUrl || result.url, 'Na schilderwerk')
                              }}
                              className="bg-black/60 p-1.5 rounded-full hover:bg-black/80 transition-colors"
                              aria-label="Deel preview"
                            >
                              <Share2 className="w-4 h-4 text-white" />
                            </button>
                            <button
                              onClick={() => setEnlargedImage(result.previewUrl || result.url)}
                              className="bg-black/60 p-1.5 rounded-full hover:bg-black/80 transition-colors"
                              aria-label="Vergroot preview"
                            >
                              <ZoomIn className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-center text-primary font-medium">
                          ✨ Na
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-white rounded-lg">
                <p className="text-xs text-center text-muted-foreground">
                  ✨ <strong>Powered by AI</strong> - Deze previews zijn gegenereerd door AI op basis van uw gekozen specificaties.
                </p>
              </div>
            </div>
          )}

          {/* Prijsindicatie & Opbouw */}
          {priceRange && (
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 sm:p-6 border-2 border-primary/20 text-left">
              <h3 className="font-bold text-lg sm:text-xl text-foreground mb-4">Uw Directe Prijs Indicatie</h3>
              <div className="text-center mb-4">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                    {formatPrice(priceRange.min)}
                </p>
          </div>

              {/* Prijsopbouw */}
              <div className="bg-background rounded-lg p-4 space-y-2">
                <p className="font-semibold text-sm text-foreground mb-3">Prijsopbouw:</p>
                
                {formData.items.muren.enabled && formData.items.muren.m2 && (
                  <div className="border-b border-border pb-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Muren: {formData.items.muren.m2} m² × €12,50
                      </span>
                      <span className="font-medium text-foreground">
                        {formatPrice(parseFloat(formData.items.muren.m2) * 12.50)}
                      </span>
          </div>
                    {formData.items.muren.verfkleur && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Kleur: {formData.items.muren.verfkleur}
                      </p>
                    )}
                </div>
                )}
                
                {formData.items.plafond.enabled && formData.items.plafond.m2 && (
                  <div className="border-b border-border pb-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Plafond: {formData.items.plafond.m2} m² × €13,50
                      </span>
                      <span className="font-medium text-foreground">
                        {formatPrice(parseFloat(formData.items.plafond.m2) * 13.50)}
                      </span>
            </div>
                    {formData.items.plafond.verfkleur && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Kleur: {formData.items.plafond.verfkleur}
              </p>
                    )}
            </div>
          )}

                {formData.items.plinten.enabled && formData.items.plinten.m1 && (
                  <div className="border-b border-border pb-2">
            <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Plinten: {formData.items.plinten.m1} m¹ × €7,50
                      </span>
                      <span className="font-medium text-foreground">
                        {formatPrice(parseFloat(formData.items.plinten.m1) * 7.50)}
                      </span>
          </div>
                    {formData.items.plinten.verfkleur && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Kleur: {formData.items.plinten.verfkleur}
                      </p>
                    )}
            </div>
                )}

                {formData.items.lijstwerk.enabled && formData.items.lijstwerk.m1 && (
                  <div className="border-b border-border pb-2">
            <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Lijstwerk: {formData.items.lijstwerk.m1} m¹ × €7,50
                      </span>
                      <span className="font-medium text-foreground">
                        {formatPrice(parseFloat(formData.items.lijstwerk.m1) * 7.50)}
                      </span>
          </div>
                    {formData.items.lijstwerk.verfkleur && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Kleur: {formData.items.lijstwerk.verfkleur}
                      </p>
                    )}
              </div>
            )}
                
                {formData.items.binnenkozijnen.enabled && formData.items.binnenkozijnen.aantal && (
                  <div className="border-b border-border pb-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Binnenkozijnen: {formData.items.binnenkozijnen.aantal} × €100
                      </span>
                      <span className="font-medium text-foreground">
                        {formatPrice(parseInt(formData.items.binnenkozijnen.aantal) * 100)}
                      </span>
              </div>
                    {formData.items.binnenkozijnen.verfkleur && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Kleur: {formData.items.binnenkozijnen.verfkleur}
              </p>
                    )}
            </div>
          )}

                {formData.items.binnendeuren.enabled && formData.items.binnendeuren.aantal && (
                  <div className="border-b border-border pb-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Binnendeuren: {formData.items.binnendeuren.aantal} × €100
                      </span>
                      <span className="font-medium text-foreground">
                        {formatPrice(parseInt(formData.items.binnendeuren.aantal) * 100)}
                      </span>
                    </div>
                    {formData.items.binnendeuren.verfkleur && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Kleur: {formData.items.binnendeuren.verfkleur}
                      </p>
                    )}
                  </div>
                )}

                {formData.items.buitenkozijnen.enabled && formData.items.buitenkozijnen.aantal && (
                  <div className="border-b border-border pb-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Buitenkozijnen: {formData.items.buitenkozijnen.aantal} × €125
                      </span>
                      <span className="font-medium text-foreground">
                        {formatPrice(parseInt(formData.items.buitenkozijnen.aantal) * 125)}
                      </span>
                    </div>
                    {formData.items.buitenkozijnen.verfkleur && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Kleur: {formData.items.buitenkozijnen.verfkleur}
                      </p>
                    )}
                  </div>
                )}

                {formData.items.deurkozijnen.enabled && formData.items.deurkozijnen.aantal && (
                  <div className="border-b border-border pb-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Deurkozijnen: {formData.items.deurkozijnen.aantal} × €40
                      </span>
                      <span className="font-medium text-foreground">
                        {formatPrice(parseInt(formData.items.deurkozijnen.aantal) * 40)}
                      </span>
                    </div>
                    {formData.items.deurkozijnen.verfkleur && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Kleur: {formData.items.deurkozijnen.verfkleur}
                      </p>
                    )}
                  </div>
                )}

                {formData.items.buitendeuren.enabled && formData.items.buitendeuren.aantal && (
                  <div className="border-b border-border pb-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Buitendeuren: {formData.items.buitendeuren.aantal} × €125
                      </span>
                      <span className="font-medium text-foreground">
                        {formatPrice(parseInt(formData.items.buitendeuren.aantal) * 125)}
                      </span>
                    </div>
                    {formData.items.buitendeuren.verfkleur && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Kleur: {formData.items.buitendeuren.verfkleur}
                      </p>
                    )}
                  </div>
                )}
                
                <div className="flex justify-between text-sm sm:text-base font-bold pt-3 border-t-2 border-primary">
                  <span className="text-foreground">Totaal:</span>
                  <span className="text-primary text-lg sm:text-xl">{formatPrice(priceRange.min)}</span>
            </div>
          </div>

              <div className="mt-4 bg-background rounded-lg p-3 space-y-1 text-xs">
                <p className="text-muted-foreground">✓ Inclusief: Schuren + voorbehandeling</p>
                <p className="text-muted-foreground">✓ Inclusief: 2 lagen afwerking</p>
                <p className="text-muted-foreground">✓ Inclusief: Verf en materialen</p>
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
                  binnenkozijnen: { enabled: false, aantal: "", verfkleur: "" },
                  binnendeuren: { enabled: false, aantal: "", verfkleur: "" },
                  deurkozijnen: { enabled: false, aantal: "", verfkleur: "" },
                  buitenkozijnen: { enabled: false, aantal: "", verfkleur: "" },
                  buitendeuren: { enabled: false, aantal: "", verfkleur: "" },
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
            <p className="text-foreground font-bold text-base mb-1">💰 Prijs Match Garantie</p>
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
    </div>
  )
}
