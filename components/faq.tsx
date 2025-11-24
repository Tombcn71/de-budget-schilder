"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    question: "Hoe werkt de AI preview voor mijn geschilderde huis?",
    answer: "Upload gewoon een foto van uw huidige gevel of kamer, kies uw gewenste verfkleur, en onze AI toont binnen enkele seconden hoe uw huis eruit gaat zien na het schilderwerk. Zo kunt u verschillende kleuren uitproberen voordat u een definitieve keuze maakt!"
  },
  {
    question: "Wat kost het om mijn huis te laten schilderen?",
    answer: "De kosten variëren afhankelijk van het oppervlak, de staat van het houtwerk en het aantal lagen. Een gemiddelde tussenwoning buiten schilderen kost tussen €3.500 en €6.500. Een kamer binnen schilderen vanaf €450. Gebruik onze calculator voor een exacte prijsindicatie."
  },
  {
    question: "Welke verfmerken gebruiken jullie?",
    answer: "Wij werken uitsluitend met A-merken zoals Sigma, Sikkens, Histor en Flexa. Deze merken bieden de beste kwaliteit, dekking en duurzaamheid voor zowel binnen- als buitenschilderwerk."
  },
  {
    question: "Hoe lang duurt het om mijn huis te schilderen?",
    answer: "Een gemiddelde tussenwoning buitenschilderen duurt 5-7 werkdagen, afhankelijk van het weer en de staat van het houtwerk. Binnenschilderwerk van één kamer is vaak binnen 1-2 dagen klaar. Grotere projecten plannen we in overleg."
  },
  {
    question: "Wordt het houtwerk ook gerepareerd?",
    answer: "Ja! Wij repareren houtwerkrot en beschadigingen voordat we gaan schilderen. Dit is essentieel voor een duurzaam resultaat. Rotte delen worden vervangen of gerepareerd met epoxyhoutreparatie."
  },
  {
    question: "Krijg ik garantie op het schilderwerk?",
    answer: "Ja, wij geven standaard 5 jaar garantie op ons buitenschilderwerk en 3 jaar op binnenschilderwerk. Dit geldt bij gebruik van de juiste voorbehandeling en kwaliteitsverf. De garantie dekt afschilferen, verkleuring en andere materiaalgebreken."
  },
  {
    question: "Welke voorbereiding is nodig voor het schilderen?",
    answer: "Voor buitenschilderwerk: alle ondergrond wordt geschuurd, ontvetten en indien nodig geïmpregneerd. Rotte delen worden gerepareerd. Voor binnenschilderwerk: meubels afdekken, gaten en scheuren vullen, schuren en stofvrij maken. Wij verzorgen alle voorbereidingen."
  },
  {
    question: "Kan ik ook alleen de kozijnen laten schilderen?",
    answer: "Jazeker! Wij schilderen ook alleen kozijnen, deuren, dakgoten, gevelbetimmering of andere specifieke onderdelen. Gebruik onze calculator om een gerichte offerte te krijgen voor uw specifieke wens."
  },
  {
    question: "Werken jullie ook in de winter?",
    answer: "Buitenschilderwerk is seizoensgebonden. We schilderen buiten bij temperaturen boven 5°C en droog weer. Voor binnenschilderwerk zijn we het hele jaar door beschikbaar. Plan buitenwerk idealiter tussen april en oktober."
  },
  {
    question: "Hoeveel m² kan ik schilderen met 1 liter verf?",
    answer: "Dit hangt af van de verf en ondergrond. Gemiddeld: 1 liter dekkende muurverf = 8-10 m², 1 liter lak voor houtwerk = 10-12 m². Wij berekenen de benodigde hoeveelheid nauwkeurig bij de offerte."
  },
  {
    question: "Moet ik eerst een voorstrijkmiddel gebruiken?",
    answer: "Voor nieuw of kaal hout is een voorstrijkmiddel (primer/grondverf) essentieel. Dit zorgt voor betere hechting en bescherming. Voor eerder geverfd houtwerk in goede staat is dit vaak niet nodig. Wij adviseren wat in uw situatie het beste is."
  },
  {
    question: "Hoe vaak moet ik mijn huis laten schilderen?",
    answer: "Buitenschilderwerk: elke 8-12 jaar afhankelijk van ligging (zon, wind, regen) en kwaliteit vorige schilderbeurt. Binnenschilderwerk: elke 5-10 jaar of bij verandering van kleur/stijl. Regelmatig onderhoud verlengt de levensduur."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-12 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Veelgestelde vragen
            </h2>
            <p className="text-gray-600">
              Vind snel antwoord op de meest gestelde vragen over ons schilderwerk en diensten
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

