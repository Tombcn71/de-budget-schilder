"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useState } from "react"

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-primary border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-12 gap-4">
          <div className="flex-1 text-center">
            {/* Mobile: Korte tekst */}
            <span className="text-sm sm:hidden text-white font-medium">
              Upload een foto en zie direct hoe uw huis eruit ziet met uw nieuwe kleur!
            </span>
            
            {/* Desktop: Volledige tekst */}
            <span className="hidden sm:inline text-sm text-white font-medium">
              Professioneel schilderwerk met AI preview - Upload een foto en zie direct hoe uw huis eruit ziet met uw nieuwe verfkleur!
            </span>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-white/80 transition-colors"
            aria-label="Sluit banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
