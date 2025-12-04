"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

const defaultFaqs = [
  {
    question: "Wat kost een schilder per m2?",
    answer: "Muren schilderen kost €12,50 per m², plafonds €13,50 per m². Plinten en lijstwerk kosten €7,50 per strekkende meter, kozijnen €12,50 per m¹ en deuren lakken €125 per deur. Vul ons formulier in voor een directe prijsindicatie."
  },
  {
    question: "Hoeveel kost het om een woonkamer te schilderen?",
    answer: "Een gemiddelde woonkamer van 25m² muren kost ongeveer €312 voor de muren. Met plafond (20m² = €270) en plinten (15m¹ = €112) komt u op circa €694. Vul het formulier in met uw exacte afmetingen voor een nauwkeurige prijsindicatie."
  },
  {
    question: "Wat kost het om kozijnen te laten schilderen?",
    answer: "Kozijnen schilderen kost €12,50 per strekkende meter. Een standaard raamkozijn van 2 meter kost dus €25. Deuren lakken kost €125 per deur. Vul het formulier in voor een directe prijsindicatie."
  },
  {
    question: "Hoe lang duurt het om een kamer te schilderen?",
    answer: "Een gemiddelde slaapkamer is binnen 1 dag klaar. Een woonkamer met muren, plafond en plinten duurt 1-2 dagen. Dit is inclusief voorbereiden, gronden en afwerken."
  },
  {
    question: "Wanneer is de beste tijd om je huis te schilderen?",
    answer: "Binnenschilderwerk kan het hele jaar door. Voor buitenschilderwerk is april tot oktober ideaal, bij droog weer en temperaturen boven 10°C. In de winter is binnenschilderwerk de beste optie."
  },
  {
    question: "Hoeveel lagen verf heb ik nodig?",
    answer: "Voor een goede dekking zijn meestal 2 lagen nodig. Bij een forse kleurverandering (bijv. donker naar licht) kunnen 3 lagen nodig zijn. Wij adviseren altijd het juiste aantal lagen voor een perfect resultaat."
  },
  {
    question: "Kan ik over behang schilderen?",
    answer: "Technisch kan het, maar wij raden aan behang te verwijderen voor het beste resultaat. Geschilderd behang kan gaan loslaten en geeft een minder strak eindresultaat."
  },
  {
    question: "Moet ik meubels verwijderen voor schilderwerk?",
    answer: "Grote meubels hoeven niet weg, maar moeten wel naar het midden van de kamer worden verplaatst. Wij dekken alles zorgvuldig af. Kleine spullen en schilderijen moeten wel worden verwijderd."
  },
  {
    question: "Hoe snel kan een schilder beginnen?",
    answer: "Vul het formulier in voor een directe prijsindicatie en plan vervolgens een gratis adviesgesprek in via onze planner."
  },
  {
    question: "Wat is het verschil tussen latex en acrylaat verf?",
    answer: "Latex is goedkoper maar minder duurzaam. Acrylaat verf is wasbaar, slijtvaster en ideaal voor intensief gebruikte ruimtes zoals keukens, badkamers en kinderkamers."
  },
  {
    question: "Hoe lang moet verf drogen?",
    answer: "Muurverf is na 2-4 uur stofdroog en na 24 uur overschilderbaar. Lakverf voor houtwerk heeft 6-8 uur nodig om stofdroog te zijn en 16-24 uur voor de volgende laag."
  },
  {
    question: "Wat kost het om een plafond te schilderen?",
    answer: "Plafond schilderen kost €13,50 per m². Een plafond van 20m² kost dus €270. Vul het formulier in met uw afmetingen voor een directe prijsindicatie voor uw plafond."
  }
]

interface FAQProps {
  location?: string
  customFaqs?: Array<{ question: string; answer: string }>
}

export function FAQ({ location, customFaqs }: FAQProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  const faqs = customFaqs || defaultFaqs
  const title = location ? `Veelgestelde vragen over schilderwerk in ${location}` : "Veelgestelde vragen"
  const subtitle = location 
    ? `Vind snel antwoord op vragen over schilderwerk in ${location}`
    : "Vind snel antwoord op de meest gestelde vragen over ons schilderwerk en diensten"

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-12 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {title}
            </h2>
            <p className="text-gray-600">
              {subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Staat uw vraag er niet bij?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Neem contact op
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

