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
    muren: { min: 12, max: 18 },           // €12-18 per m²
    plafond: { min: 15, max: 22 },         // €15-22 per m²
    volledige_kamer: { min: 450, max: 750 } // €450-750 per kamer (flat rate)
  },
  buiten: {
    gevel: { min: 25, max: 40 },           // €25-40 per m²
  }
} as const

// Schilderwerk berekend per STREKKENDE METER (m¹)
const PRIJZEN_PER_M1 = {
  binnen: {
    kozijnen: { min: 35, max: 55 },        // €35-55 per strekkende meter
    deuren: { min: 45, max: 75 },          // €45-75 per strekkende meter (omtrek)
    plinten: { min: 8, max: 15 },          // €8-15 per strekkende meter
    lijstwerk: { min: 10, max: 18 },       // €10-18 per strekkende meter
  },
  buiten: {
    kozijnen: { min: 45, max: 70 },        // €45-70 per strekkende meter
    deuren: { min: 55, max: 90 },          // €55-90 per strekkende meter (omtrek)
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

function calculatePriceRange(
  projectType: ProjectType,
  schilderwerkType: SchilderwerkType,
  oppervlakte: number,
  extraLagen: boolean
): PriceRange | null {
  if (!oppervlakte || oppervlakte <= 0) return null
  
  let minPrice = 0
  let maxPrice = 0
  
  // Bepaal of we per m² of per strekkende meter rekenen
  const unit = MEASUREMENT_UNITS[schilderwerkType]
  
  if (unit === 'm2') {
    // Berekening per VIERKANTE METER
    if (projectType === 'binnen' || projectType === 'binnen_buiten') {
      const prijzen = PRIJZEN_PER_M2.binnen[schilderwerkType as keyof typeof PRIJZEN_PER_M2.binnen]
      if (prijzen) {
        minPrice += oppervlakte * prijzen.min
        maxPrice += oppervlakte * prijzen.max
      }
    }
    
    if (projectType === 'buiten' || projectType === 'binnen_buiten') {
      const prijzen = PRIJZEN_PER_M2.buiten[schilderwerkType as keyof typeof PRIJZEN_PER_M2.buiten]
      if (prijzen) {
        minPrice += oppervlakte * prijzen.min
        maxPrice += oppervlakte * prijzen.max
      }
    }
  } else {
    // Berekening per STREKKENDE METER
    if (projectType === 'binnen' || projectType === 'binnen_buiten') {
      const prijzen = PRIJZEN_PER_M1.binnen[schilderwerkType as keyof typeof PRIJZEN_PER_M1.binnen]
      if (prijzen) {
        minPrice += oppervlakte * prijzen.min
        maxPrice += oppervlakte * prijzen.max
      }
    }
    
    if (projectType === 'buiten' || projectType === 'binnen_buiten') {
      const prijzen = PRIJZEN_PER_M1.buiten[schilderwerkType as keyof typeof PRIJZEN_PER_M1.buiten]
      if (prijzen) {
        minPrice += oppervlakte * prijzen.min
        maxPrice += oppervlakte * prijzen.max
      }
    }
  }
  
  // Extra laag verf +30%
  if (extraLagen) {
    minPrice = Math.round(minPrice * 1.30)
    maxPrice = Math.round(maxPrice * 1.30)
  }
  
  return { min: Math.round(minPrice), max: Math.round(maxPrice) }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

// ============================================================================
// COMPONENT
// ============================================================================

interface AIQuoteFormProps {
  className?: string
}

export function AIQuoteForm({ className = "" }: AIQuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [photos, setPhotos] = useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any[]>([])
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    projectType: "" as ProjectType | "",
    schilderwerkType: "" as SchilderwerkType | "",
    oppervlakte: "",
    verfkleur: "",
    extraLagen: false,
    houtwerkReparatie: false,
    naam: "",
    email: "",
    telefoon: "",
  })

  // Bereken prijs automatisch
  const priceRange = formData.oppervlakte && formData.projectType && formData.schilderwerkType
    ? calculatePriceRange(
        formData.projectType,
        formData.schilderwerkType,
        parseInt(formData.oppervlakte),
        formData.extraLagen
      )
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

  const handleNext = async () => {
    if (currentStep === 1) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      setCurrentStep(3)
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
          const generateRes = await fetch('/api/generate-preview', {
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

  const progressPercentage = (currentStep / 3) * 100

  return (
    <Card className={`p-4 sm:p-6 lg:p-8 bg-white shadow-2xl border-0 ${className}`}>
      {currentStep < 3 ? (
        <>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
            <h2 className="font-bold text-base sm:text-lg lg:text-xl text-foreground">
              Direct een prijsindicatie en AI preview van uw geschilderde huis.
            </h2>
          </div>
          <p className="text-xs sm:text-sm italic text-muted-foreground mb-3">
            {currentStep === 1 && "Selecteer uw type schilderwerk"}
            {currentStep === 2 && "Vul uw voorkeuren in"}
            {currentStep === 3 && "Bekijk uw offerte en upload optioneel foto's voor AI preview"}
          </p>

          <div className="mb-4">
            <div className="flex justify-between text-xs text-foreground mb-2">
              <span className={currentStep >= 1 ? "font-bold" : ""}>Type werk</span>
              <span className={currentStep >= 2 ? "font-bold" : ""}>Details</span>
              <span className={currentStep >= 3 ? "font-bold" : ""}>Offerte</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2 bg-muted" 
              aria-label={`Stap ${currentStep} van 3`}
            />
          </div>

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

                {/* Schilderwerk Type */}
                {formData.projectType && (
                  <div>
                    <Label className="text-foreground text-sm font-semibold mb-3 block">
                      Wat wilt u laten schilderen? *
                    </Label>
                    <div className="grid grid-cols-1 gap-2">
                      {formData.projectType === 'binnen' || formData.projectType === 'binnen_buiten' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, schilderwerkType: 'muren' })}
                            className={`p-3 border-2 rounded-lg text-left transition-all ${
                              formData.schilderwerkType === 'muren'
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="font-semibold text-foreground text-sm">Muren (m²)</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, schilderwerkType: 'plafond' })}
                            className={`p-3 border-2 rounded-lg text-left transition-all ${
                              formData.schilderwerkType === 'plafond'
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="font-semibold text-foreground text-sm">Plafond (m²)</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, schilderwerkType: 'volledige_kamer' })}
                            className={`p-3 border-2 rounded-lg text-left transition-all ${
                              formData.schilderwerkType === 'volledige_kamer'
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="font-semibold text-foreground text-sm">Volledige kamer (m²)</div>
                            <div className="text-xs text-muted-foreground mt-1">Muren, plafond en houtwerk</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, schilderwerkType: 'plinten' })}
                            className={`p-3 border-2 rounded-lg text-left transition-all ${
                              formData.schilderwerkType === 'plinten'
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="font-semibold text-foreground text-sm">Plinten (m¹)</div>
                            <div className="text-xs text-muted-foreground mt-1">Per strekkende meter</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, schilderwerkType: 'lijstwerk' })}
                            className={`p-3 border-2 rounded-lg text-left transition-all ${
                              formData.schilderwerkType === 'lijstwerk'
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="font-semibold text-foreground text-sm">Lijstwerk (m¹)</div>
                            <div className="text-xs text-muted-foreground mt-1">Per strekkende meter</div>
                          </button>
                        </>
                      ) : null}
                      
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, schilderwerkType: 'kozijnen' })}
                        className={`p-3 border-2 rounded-lg text-left transition-all ${
                          formData.schilderwerkType === 'kozijnen'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-semibold text-foreground text-sm">Kozijnen (m¹)</div>
                        <div className="text-xs text-muted-foreground mt-1">Per strekkende meter</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, schilderwerkType: 'deuren' })}
                        className={`p-3 border-2 rounded-lg text-left transition-all ${
                          formData.schilderwerkType === 'deuren'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-semibold text-foreground text-sm">Deuren (m¹)</div>
                        <div className="text-xs text-muted-foreground mt-1">Per strekkende meter (omtrek)</div>
                      </button>
                      
                      {formData.projectType === 'buiten' || formData.projectType === 'binnen_buiten' ? (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, schilderwerkType: 'gevel' })}
                          className={`p-3 border-2 rounded-lg text-left transition-all ${
                            formData.schilderwerkType === 'gevel'
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="font-semibold text-foreground text-sm">Gevel (m²)</div>
                        </button>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                {/* Oppervlakte */}
                <div>
                  <Label className="text-foreground text-sm mb-2 block">
                    {formData.schilderwerkType && MEASUREMENT_UNITS[formData.schilderwerkType] === 'm1' 
                      ? 'Lengte in strekkende meters (m¹) *'
                      : 'Oppervlakte in vierkante meters (m²) *'
                    }
                  </Label>
                  <Input
                    type="number"
                    placeholder={formData.schilderwerkType && MEASUREMENT_UNITS[formData.schilderwerkType] === 'm1' ? "Bijv. 25" : "Bijv. 50"}
                    value={formData.oppervlakte}
                    onChange={(e) => setFormData({ ...formData, oppervlakte: e.target.value })}
                    className="bg-background border-0 h-11"
                    min="1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    💡 {formData.schilderwerkType && MEASUREMENT_UNITS[formData.schilderwerkType] === 'm1' 
                      ? 'Strekkende meter = totale lengte (bijv. kozijnen omtrek, plint lengte)'
                      : 'Vierkante meter = lengte × breedte'
                    } - schat gerust, we bespreken de exacte maten later
                  </p>
                </div>

                {/* Verfkleur */}
                <div>
                  <Label className="text-foreground text-sm mb-2 block">Gewenste verfkleur *</Label>
                  <Select
                    value={formData.verfkleur}
                    onValueChange={(value) => setFormData({ ...formData, verfkleur: value })}
                  >
                    <SelectTrigger className="bg-background border-0 h-11">
                      <SelectValue placeholder="Kies een kleur" />
                    </SelectTrigger>
                    <SelectContent>
                      {VERFKLEUREN.map((kleur) => (
                        <SelectItem key={kleur.value} value={kleur.value}>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded border border-gray-300" 
                              style={{ backgroundColor: kleur.hex }}
                            />
                            <span>{kleur.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Extra opties */}
                <div className="space-y-3">
                  <Label className="text-foreground text-sm block">Extra opties</Label>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="extraLagen"
                      checked={formData.extraLagen}
                      onCheckedChange={(checked) => setFormData({ ...formData, extraLagen: checked as boolean })}
                      className="border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    <label htmlFor="extraLagen" className="text-sm text-foreground cursor-pointer">
                      Extra laag verf (+30%)
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="houtwerkReparatie"
                      checked={formData.houtwerkReparatie}
                      onCheckedChange={(checked) => setFormData({ ...formData, houtwerkReparatie: checked as boolean })}
                      className="border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    <label htmlFor="houtwerkReparatie" className="text-sm text-foreground cursor-pointer">
                      Houtwerkrot reparatie
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2 sm:pt-3">
              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={handlePrevious}
                  variant="outline"
                  className="flex-1 bg-muted hover:bg-muted/90 text-foreground border-0 h-10 text-sm"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Vorige
                </Button>
              )}
              <Button
                type="button"
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && (!formData.projectType || !formData.schilderwerkType)) ||
                  (currentStep === 2 && (!formData.oppervlakte || !formData.verfkleur))
                }
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-10 text-sm disabled:opacity-50"
              >
                <>
                  <span className="hidden sm:inline">{currentStep === 2 ? "Bekijk Offerte" : "Volgende"}</span>
                  <span className="sm:hidden">{currentStep === 2 ? "Offerte" : "Volgende"}</span>
                  {currentStep < 2 && <ChevronRight className="w-4 h-4 ml-1" />}
                </>
              </Button>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center space-y-6">
          {/* AI Preview Upload Sectie */}
          {analysisResults.length === 0 && (
            <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4 text-left">
              <div className="flex items-start gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-base text-foreground mb-1">
                    ✨ Upload foto's voor AI Preview (Optioneel)
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Upload foto's van uw huis en zie direct hoe het eruit gaat zien in uw gekozen kleur!
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-foreground text-xs sm:text-sm font-medium mb-1 block">
                    Upload foto's (0-5 foto's)
                  </Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Foto's van muren, gevel of kozijnen die geschilderd worden
                  </p>
                  <PhotoUpload 
                    onPhotosChange={setPhotos}
                    maxPhotos={5}
                    minPhotos={0}
                  />
                </div>

                {photos.length > 0 && (
                  <Button
                    onClick={analyzePhotos}
                    disabled={isAnalyzing}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        AI Preview Genereren...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Genereer AI Preview
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Success banner na AI preview */}
          {analysisResults.length > 0 && (
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-2">
              <Check className="w-4 h-4" />
              <span className="text-sm font-semibold">AI Preview Gegenereerd!</span>
            </div>
          )}

          <h2 className="font-bold text-2xl text-foreground">Uw Instant Offerte:</h2>

          {priceRange && (
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 border-2 border-primary/20">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Vanaf</p>
                  <p className="text-4xl font-bold text-primary">
                    {formatPrice(priceRange.min)}
                  </p>
                </div>
                <div className="text-2xl text-muted-foreground">-</div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Tot</p>
                  <p className="text-4xl font-bold text-primary">
                    {formatPrice(priceRange.max)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Totale offerte voor {formData.oppervlakte} {formData.schilderwerkType && MEASUREMENT_UNITS[formData.schilderwerkType] === 'm1' ? 'm¹' : 'm²'} {formData.schilderwerkType}
              </p>
            </div>
          )}

          <div className="bg-background rounded-lg p-4 space-y-2 text-left">
            <p className="text-xs text-muted-foreground mb-2">Inbegrepen in uw offerte:</p>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Professioneel schilderwerk</span>
              <span className="font-medium">✓</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">A-merk verf ({formData.verfkleur})</span>
              <span className="font-medium">✓</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Voorbehandeling oppervlak</span>
              <span className="font-medium">✓</span>
            </div>
            {formData.houtwerkReparatie && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Houtwerkrot reparatie</span>
                <span className="font-medium">✓</span>
              </div>
            )}
            <div className="border-t border-border pt-2 mt-2">
              <p className="text-xs text-muted-foreground">
                ✓ Vanaf-prijs: standaard schilderwerk<br/>
                ✓ Tot-prijs: inclusief extra voorbehandeling
              </p>
            </div>
          </div>

          {/* Voor & Na Vergelijking */}
          {analysisResults.length > 0 && (
            <div className="bg-background rounded-lg p-4 text-left border-2 border-primary/20">
              <h3 className="font-semibold text-base text-foreground mb-3">
                🎨 Voor & Na: Uw huis in {formData.verfkleur}
              </h3>
              <div className="space-y-6">
                {analysisResults.map((result, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div 
                          className="relative rounded-lg overflow-hidden border-2 border-border group"
                        >
                          <img
                            src={result.url}
                            alt={`Huidige situatie ${idx + 1}`}
                            className="w-full h-auto object-contain max-h-64 cursor-pointer"
                            onClick={() => setEnlargedImage(result.url)}
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

                      <div className="space-y-2">
                        <div 
                          className="relative rounded-lg overflow-hidden border-2 border-border group"
                        >
                          <img
                            src={result.previewUrl || result.url}
                            alt={`Na schilderwerk ${idx + 1}`}
                            className="w-full h-auto object-contain max-h-64 cursor-pointer"
                            onClick={() => setEnlargedImage(result.previewUrl || result.url)}
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
              <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                <p className="text-xs text-foreground text-center">
                  ✨ <strong>Powered by AI</strong> - Deze previews zijn gegenereerd door AI op basis van uw gekozen specificaties.
                </p>
              </div>
            </div>
          )}

          <div className="bg-primary/10 rounded-lg p-4">
            <p className="text-foreground font-bold text-lg mb-2">💰 Laagste Prijs Garantie</p>
            <p className="text-foreground text-sm">
              Vindt u hetzelfde schilderwerk elders goedkoper? Dan betalen wij het verschil terug!
            </p>
          </div>

          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-base"
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== 'undefined' && (window as any).Calendly) {
                  (window as any).Calendly.initPopupWidget({url: 'https://calendly.com/tbvanreijn'});
                }
              }}
            >
              📞 Gratis Adviesgesprek
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Of vul uw gegevens in</span>
            </div>
          </div>

          <div className="space-y-3 text-left">
            <Label className="text-foreground text-sm">Uw gegevens voor offerte bevestiging:</Label>
            <Input
              placeholder="Naam"
              value={formData.naam}
              onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
              className="bg-background border-0 h-11"
            />
            <Input
              type="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-background border-0 h-11"
            />
            <Input
              type="tel"
              placeholder="Telefoon"
              value={formData.telefoon}
              onChange={(e) => setFormData({ ...formData, telefoon: e.target.value })}
              className="bg-background border-0 h-11"
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-base"
          >
            Verstuur Offerte Aanvraag
          </Button>

          <Button
            variant="ghost"
            onClick={() => {
              setCurrentStep(1)
              setPhotos([])
              setAnalysisResults([])
              setFormData({
                projectType: "",
                schilderwerkType: "",
                oppervlakte: "",
                verfkleur: "",
                extraLagen: false,
                houtwerkReparatie: false,
                naam: "",
                email: "",
                telefoon: "",
              })
            }}
            className="text-foreground hover:text-foreground/80 hover:bg-transparent"
          >
            Nieuwe berekening starten
          </Button>
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
