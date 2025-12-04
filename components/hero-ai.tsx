import { AIQuoteForm } from "@/components/ai-quote-form"
import Image from "next/image"

interface HeroAIProps {
  location?: string
  title?: string
  description?: string
}

export function HeroAI({ location, title, description }: HeroAIProps = {}) {
  const defaultTitle = "Professioneel schilderwerk met Prijs Match Garantie."
  const defaultDescriptionMobile = "Professioneel schilderwerk tegen de scherpste prijs. Scherpere prijs gevonden? Wij matchen deze direct!"
  const defaultDescriptionDesktop = "Professioneel schilderwerk in heel Haaglanden tegen de scherpste prijs. Den Haag, Zoetermeer, Westland, Delft, Rijswijk en meer. Scherpere prijs gevonden? Wij matchen deze direct!"
  
  return (
    <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Professionele schilder aan het werk"
          fill
          priority
          fetchPriority="high"
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 lg:mb-6 leading-tight text-balance">
              {title || defaultTitle}
            </h1>

            <p className="text-sm sm:text-base sm:hidden text-white mb-4 leading-relaxed">
              {description || defaultDescriptionMobile}
            </p>

            <p className="hidden sm:block text-base sm:text-lg md:text-xl text-white mb-6 leading-relaxed text-pretty">
              {description || defaultDescriptionDesktop}
            </p>

            <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-4">
              <p className="text-md sm:text-lg font-semibold text-white">
                🏆 Prijs Match Garantie {location && `${location}`}
              </p>
            </div>

            <div className="hidden sm:flex flex-wrap gap-3 md:gap-4 text-sm md:text-base text-white">
              <span>Muren</span>
              <span>|</span>
              <span>Plafonds</span>
              <span>|</span>
              <span>Kozijnen</span>
              <span>|</span>
              <span>Deuren</span>
            </div>
          </div>

          <div className="w-full">
            <AIQuoteForm />
          </div>
        </div>
      </div>
    </section>
  )
}

