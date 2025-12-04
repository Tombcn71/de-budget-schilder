import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-8">
          <div className="md:col-span-2 lg:col-span-4">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">De Budgetschilder</h2>
            <p className="text-sm lg:text-base text-primary-foreground/80 leading-relaxed max-w-2xl">
              Uw betrouwbare partner voor professioneel schilderwerk in Den Haag en Haaglanden tegen de beste prijs. Direct een prijsindicatie met AI preview van uw geverfde woning!
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Onze Diensten in Haaglanden</h3>
            <ul className="space-y-2 text-sm lg:text-base text-primary-foreground/80">
              <li>Muren schilderen</li>
              <li>Plafonds schilderen</li>
              <li>Kozijnen schilderen</li>
              <li>Plinten schilderen</li>
              <li>Deuren lakken</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Regio's</h3>
            <ul className="space-y-2 text-sm lg:text-base text-primary-foreground/80">
              <li>
                <Link href="/schilder-den-haag" className="hover:text-primary-foreground transition-colors">
                  Schilder Den Haag
                </Link>
              </li>
              <li>
                <Link href="/schilder-haaglanden" className="hover:text-primary-foreground transition-colors">
                  Schilder Haaglanden
                </Link>
              </li>
              <li>
                <Link href="/schilder-delft" className="hover:text-primary-foreground transition-colors">
                  Schilder Delft
                </Link>
              </li>
              <li>
                <Link href="/schilder-zoetermeer" className="hover:text-primary-foreground transition-colors">
                  Schilder Zoetermeer
                </Link>
              </li>
              <li>
                <Link href="/schilder-rijswijk" className="hover:text-primary-foreground transition-colors">
                  Schilder Rijswijk
                </Link>
              </li>
              <li>
                <Link href="/schilder-scheveningen" className="hover:text-primary-foreground transition-colors">
                  Schilder Scheveningen
                </Link>
              </li>
              <li>
                <Link href="/schilder-westland" className="hover:text-primary-foreground transition-colors">
                  Schilder Westland
                </Link>
              </li>
              <li>
                <Link href="/schilder-leidschendam-voorburg" className="hover:text-primary-foreground transition-colors">
                  Schilder Leidschendam-Voorburg
                </Link>
              </li>
              <li>
                <Link href="/schilder-pijnacker-nootdorp" className="hover:text-primary-foreground transition-colors">
                  Schilder Pijnacker-Nootdorp
                </Link>
              </li>
              <li>
                <Link href="/schilder-wassenaar" className="hover:text-primary-foreground transition-colors">
                  Schilder Wassenaar
                </Link>
              </li>
              <li>
                <Link href="/schilder-midden-delfland" className="hover:text-primary-foreground transition-colors">
                  Schilder Midden-Delfland
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm lg:text-base text-primary-foreground/80">
              <li>
                <Link href="/laagste-prijs-garantie" className="hover:text-primary-foreground transition-colors">
                  Prijs Match Garantie
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-foreground transition-colors">
                  Blog & Tips
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-foreground transition-colors">
                  Contactformulier
                </Link>
              </li>
              <li>info@debudgetschilder.nl</li>
              <li>Ma-Za: 07:00 - 22:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p className="mb-2">&copy; {new Date().getFullYear()} De Budgetschilder. Alle rechten voorbehouden.</p>
          <Link href="/algemene-voorwaarden" className="hover:text-primary-foreground transition-colors underline">
            Algemene Voorwaarden
          </Link>
        </div>
      </div>
    </footer>
  )
}
