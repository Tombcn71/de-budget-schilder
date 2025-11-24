"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { useState } from "react"

export function QuoteFormMobile() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating CTA button for mobile */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
        <Button
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 font-semibold shadow-lg text-base h-14"
          onClick={() => setIsOpen(true)}
        >
          Gratis Offerte Aanvragen
        </Button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-x-4 top-20 bottom-20 overflow-auto">
            <Card className="p-6 bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-xl">Vraag offerte aan</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="mb-4">
                <div className="text-2xl font-bold text-primary mb-1">085 060 8180</div>
                <p className="text-sm text-muted-foreground">Of vul het formulier in</p>
              </div>

              <form className="space-y-4">
                <div>
                  <Label htmlFor="postcode-mobile">Postcode</Label>
                  <Input id="postcode-mobile" placeholder="1234 AB" />
                </div>
                <div>
                  <Label htmlFor="huisnummer-mobile">Huisnummer</Label>
                  <Input id="huisnummer-mobile" placeholder="123" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 font-semibold" size="lg">
                  Volgende
                </Button>
                <p className="text-xs text-center text-muted-foreground">Vraag offerte aan binnen 2 uur!</p>
              </form>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
