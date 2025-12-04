// Schema.org structured data for SEO and AI overviews

export const denHaagWijken = [
  "Scheveningen",
  "Centrum",
  "Benoordenhout",
  "Bezuidenhout",
  "Duindorp",
  "Escamp",
  "Haagse Hout",
  "Laak",
  "Leidschenveen-Ypenburg",
  "Loosduinen",
  "Mariahoeve",
  "Moerwijk",
  "Morgenstond",
  "Oud Scheveningen",
  "Schilderswijk",
  "Segbroek",
  "Statenkwartier",
  "Transvaal",
  "Vruchtenbuurt",
  "Waldeck",
  "Wateringseveld",
  "Westbroekpark",
  "Zuiderpark"
]

export const haaglandenGemeentes = [
  "Den Haag",
  "Zoetermeer",
  "Westland",
  "Delft",
  "Leidschendam-Voorburg",
  "Rijswijk",
  "Pijnacker-Nootdorp",
  "Wassenaar",
  "Midden-Delfland"
]

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://debudgetschilder.nl",
  "name": "De Budgetschilder",
  "description": "Professioneel schilderwerk in Den Haag en Haaglanden tegen de scherpste prijs. Scherpere prijs gevonden? Wij matchen deze direct! Direct prijsindicatie met AI preview. Actief in Den Haag, Delft, Zoetermeer, Westland, Rijswijk en heel Haaglanden.",
  "url": "https://debudgetschilder.nl",
  "logo": "https://debudgetschilder.nl/placeholder-logo.png",
  "image": "https://debudgetschilder.nl/placeholder-logo.png",
  "priceRange": "€€",
  "telephone": "+31612345678",
  "email": "info@debudgetschilder.nl",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Den Haag",
    "addressRegion": "Zuid-Holland",
    "addressCountry": "NL"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Den Haag",
      "containsPlace": denHaagWijken.map(wijk => ({
        "@type": "Place",
        "name": wijk
      }))
    },
    ...haaglandenGemeentes.filter(g => g !== "Den Haag").map(gemeente => ({
      "@type": "City",
      "name": gemeente
    }))
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "52.0705",
    "longitude": "4.3007"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Schilderwerk Diensten",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Binnen Schilderwerk Den Haag en Haaglanden",
          "description": "Professioneel binnen schilderwerk voor wanden, plafonds en houtwerk in heel Den Haag en Haaglanden (Delft, Zoetermeer, Westland, Rijswijk)"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Buiten Schilderwerk Den Haag en Haaglanden",
          "description": "Duurzaam buiten schilderwerk voor kozijnen, gevels en houtwerk in Den Haag en Haaglanden"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Kozijnen Schilderen Den Haag en Haaglanden",
          "description": "Specialist in kozijnen schilderen voor woningen in Den Haag, Delft, Zoetermeer en heel Haaglanden"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Deuren Lakken Den Haag en Haaglanden",
          "description": "Professioneel deuren lakken in Den Haag en Haaglanden - €125 per deur"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Plinten en Lijstwerk Schilderen",
          "description": "Plinten en lijstwerk schilderen in heel Haaglanden - €7,50 per strekkende meter"
        }
      }
    ]
  },
  "sameAs": [
    "https://www.facebook.com/debudgetschilder",
    "https://www.instagram.com/debudgetschilder"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wat kost een schilder per m2 in Haaglanden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Muren schilderen kost €12,50 per m², plafonds €13,50 per m². Plinten en lijstwerk kosten €7,50 per strekkende meter, kozijnen €12,50 per m¹ en deuren lakken €125 per deur. Deze prijzen gelden voor heel Haaglanden: Den Haag, Delft, Zoetermeer, Westland, Rijswijk en alle andere gemeentes."
      }
    },
    {
      "@type": "Question",
      "name": "Hoeveel kost het om een woonkamer te schilderen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Een gemiddelde woonkamer van 25m² muren kost ongeveer €312 voor de muren. Met plafond (20m² = €270) en plinten (15m¹ = €112) komt u op circa €694. Vul het formulier in op debudgetschilder.nl met uw exacte afmetingen voor een nauwkeurige prijsindicatie."
      }
    },
    {
      "@type": "Question",
      "name": "Wat kost het om kozijnen te laten schilderen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kozijnen schilderen kost €12,50 per strekkende meter. Een standaard raamkozijn van 2 meter kost dus €25. Deuren lakken kost €125 per deur. Via De Budgetschilder krijgt u direct een prijsindicatie voor al uw kozijnen en deuren."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe lang duurt het om een kamer te schilderen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Een gemiddelde slaapkamer is binnen 1 dag klaar. Een woonkamer met muren, plafond en plinten duurt 1-2 dagen. Dit is inclusief voorbereiden, gronden en afwerken met 2 lagen verf."
      }
    },
    {
      "@type": "Question",
      "name": "Wanneer is de beste tijd om je huis te schilderen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Binnenschilderwerk kan het hele jaar door. Voor buitenschilderwerk is april tot oktober ideaal, bij droog weer en temperaturen boven 10°C. In de winter is binnenschilderwerk de beste optie."
      }
    },
    {
      "@type": "Question",
      "name": "In welke gemeentes werkt De Budgetschilder?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De Budgetschilder werkt in heel Haaglanden: Den Haag (alle wijken inclusief Scheveningen), Delft, Zoetermeer, Westland, Rijswijk, Leidschendam-Voorburg, Pijnacker-Nootdorp, Wassenaar en Midden-Delfland. Overal dezelfde vaste prijzen."
      }
    },
    {
      "@type": "Question",
      "name": "Wat kost het om een plafond te schilderen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plafond schilderen kost €13,50 per m². Een plafond van 20m² kost dus €270. Vul het formulier in op debudgetschilder.nl met uw afmetingen voor een directe prijsindicatie."
      }
    },
    {
      "@type": "Question",
      "name": "Hoeveel lagen verf heb ik nodig?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Voor een goede dekking zijn meestal 2 lagen nodig. Bij een forse kleurverandering (bijv. donker naar licht) kunnen 3 lagen nodig zijn. De prijzen van De Budgetschilder zijn inclusief 2 lagen afwerking."
      }
    }
  ]
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "De Budgetschilder",
  "url": "https://debudgetschilder.nl",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://debudgetschilder.nl/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

// Schema voor specifieke wijk pagina's
export const wijkPageSchema = (wijk: string) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": `De Budgetschilder ${wijk}`,
  "description": `Professioneel schilderwerk in ${wijk}, Den Haag tegen de scherpste prijs. Direct prijsindicatie en AI preview.`,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": wijk,
    "addressRegion": "Den Haag",
    "addressCountry": "NL"
  },
  "areaServed": {
    "@type": "Place",
    "name": wijk,
    "containedInPlace": {
      "@type": "City",
      "name": "Den Haag"
    }
  }
})

