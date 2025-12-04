"use client"

import { useState, FormEvent } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        ;(e.target as HTMLFormElement).reset()
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        setError("Er is iets misgegaan. Probeer het opnieuw.")
      }
    } catch (err) {
      setError("Er is een fout opgetreden. Probeer het later opnieuw.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Stuur ons een bericht</CardTitle>
              <CardDescription>
                Vul onderstaand formulier in en wij nemen contact met u op.
              </CardDescription>
            </CardHeader>
            <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Web3Forms Access Key */}
                    <input 
                      type="hidden" 
                      name="access_key" 
                      value="adfd057e-5903-40e3-8dae-4beba57c301f" 
                    />
                    
                    {/* Honeypot for spam protection */}
                    <input 
                      type="checkbox" 
                      name="botcheck" 
                      className="hidden" 
                      style={{ display: 'none' }}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Naam *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Uw naam"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="uw.email@voorbeeld.nl"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefoonnummer</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="06 12 34 56 78"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Onderwerp *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="Waar gaat uw bericht over?"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Bericht *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Vertel ons meer over uw project of vraag..."
                        className="min-h-[150px] resize-y"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Success Message */}
                    {isSuccess && (
                      <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                        <CheckCircle2 className="w-5 h-5" />
                        <p className="font-medium">Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.</p>
                      </div>
                    )}

                    {/* Error Message */}
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                        <p className="font-medium">{error}</p>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verzenden...
                        </>
                      ) : (
                        "Verstuur Bericht"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}

