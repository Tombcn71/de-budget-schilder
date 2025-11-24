import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 mb-8">
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">De Budgetschilder</h2>
            <p className="text-sm lg:text-base text-primary-foreground/80 leading-relaxed max-w-md">
              Uw betrouwbare partner voor professioneel schilderwerk tegen de beste prijs. Direct een prijsindicatie met AI preview van uw geverfde woning!
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Diensten</h3>
            <ul className="space-y-2 text-sm lg:text-base text-primary-foreground/80">
              <li>Binnen schilderwerk</li>
              <li>Buiten schilderwerk</li>
              <li>Houtwerkrot herstel</li>
              <li>Spuitwerk</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm lg:text-base text-primary-foreground/80">
              <li>06 12 34 56 78</li>
              <li>info@debudgetschilder.nl</li>
              <li>Ma-Za: 07:00 - 22:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} De Budgetschilder. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}
