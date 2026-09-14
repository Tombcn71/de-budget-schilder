"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

const defaultFaqs = [
  {
    question: "Wat kost een schilder per m2?",
    answer: "Onze tarieven voor muren en plafonds zijn helder en per vierkante meter berekend. Muren schilderen kost €12,50 per m² en plafonds schilderen kost €13,50 per m² inclusief materiaal en uitvoering."
  },
  {
    question: "Hoeveel kost het om een woonkamer te schilderen?",
    answer: "De kosten voor een woonkamer hangen af van de totale oppervlakte van de muren en plafonds, en of de kozijnen en deuren ook meegenomen moeten worden. Met onze online rekentool vult u uw gegevens in en ziet u binnen 30 seconden exact wat uw woonkamer gaat kosten."
  },
  {
    question: "Wat kost het om kozijnen te laten schilderen?",
    answer: "Voor het schilderen van kozijnen hanteren we vaste stuksprijzen. Binnenkozijnen kosten €100 per stuk en buitenkozijnen kosten €125 per stuk. Zo weet u vooraf precies waar u aan toe bent."
  },
  {
    question: "Hoe lang duurt het om een kamer te schilderen?",
    answer: "Het schilderen van een gemiddelde kamer (muren en plafond) is door onze ervaren vakmensen meestal binnen één tot twee dagen volledig afgerond, inclusief de benodigde droogtijd tussen de lagen door."
  },
  {
    question: "Wanneer is de beste tijd om je huis te schilderen?",
    answer: "Voor binnenschilderwerk maakt het seizoen niet uit. Voor buitenschilderwerk is het voorjaar tot en met het najaar (van ca. april tot oktober) de beste periode, omdat de temperatuur en luchtvochtigheid dan optimaal zijn voor de droging van de verf."
  },
  {
    question: "Hoeveel lagen verf heb ik nodig?",
    answer: "Voor muren en plafonds rekenen we standaard op twee lagen latex voor een egaal en dekkend resultaat. Bij buitenschilderwerk brengen we minimaal één grondlaag en twee aflaklagen aan om uw houtwerk optimaal te beschermen."
  },
  {
    question: "Kan ik over behang schilderen?",
    answer: "Ja, dat kan mits het behang stevig op de muur zit en geen losse naden heeft. Glasvezelbehang of renovlies is uitstekend over te schilderen. Bij erg bobbelig of loslatend papier adviseren we echter om het eerst te verwijderen voor een strak eindresultaat."
  },
  {
    question: "Moet ik meubels verwijderen voor schilderwerk?",
    answer: "Het helpt enorm als kleine spullen en breekbare voorwerpen vooraf uit de ruimte zijn. Grotere meubels kunnen we in overleg naar het midden van de kamer schuiven en dekken we zorgvuldig af met plastic om verfspetters te voorkomen."
  },
  {
    question: "Hoe snel kan een schilder beginnen?",
    answer: "Dankzij ons brede netwerk van professionele schilders in de regio Haaglanden kunnen we vaak al op korte termijn bij u aan de slag. Vraag direct een prijsindicatie aan en plan via onze planner een adviesgesprek om de exacte planning af te stemmen."
  },
  {
    question: "Wat is het verschil tussen latex en acrylaat verf?",
    answer: "Latex is een watergedragen muurverf die speciaal gebruikt wordt voor grote oppervlakken zoals muren en plafonds. Acrylaatverf is een duurzame, watergedragen verf op kunstharsbasis die we vooral gebruiken voor houtwerk zoals kozijnen, deuren en plinten."
  },
  {
    question: "Hoe lang moet verf drogen?",
    answer: "Watergedragen muurverf en lakverf zijn doorgaans binnen 2 tot 4 uur overschilderbaar. Volledige uitharding van de verflaag duurt echter enkele dagen tot een week, waarbij we adviseren om in de eerste dagen voorzichtig te zijn met stoten."
  },
  {
    question: "Wat kost het om een plafond te schilderen?",
    answer: "Het schilderen van een plafond kost bij ons €13,50 per vierkante meter. Dit is inclusief professionele afwerking voor een streeploos en wit resultaat."
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
        </div>
      </div>
    </section>
  )
}

