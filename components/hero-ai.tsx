import { AIQuoteForm } from "@/components/ai-quote-form"
import Image from "next/image"

export function HeroAI() {
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
              Professioneel schilderwerk met laagste prijs garantie.
            </h1>

            <p className="text-sm sm:text-base sm:hidden text-white mb-4 leading-relaxed">
              Upload een foto en zie direct met AI hoe uw huis eruit ziet met uw nieuwe verfkleur!
            </p>

            <p className="hidden sm:block text-base sm:text-lg md:text-xl text-white mb-6 leading-relaxed text-pretty">
              Krijg direct een prijsindicatie en zie met AI hoe uw huis eruit gaat zien met uw nieuwe verfkleur. Vindt u goedkoper? Wij betalen het verschil!
            </p>

            <div className="hidden sm:flex flex-wrap gap-3 md:gap-4 text-sm md:text-base text-white">
              <span>Binnen</span>
              <span>|</span>
              <span>Buiten</span>
              <span>|</span>
              <span>Houtwerkrot</span>
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

