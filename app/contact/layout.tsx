import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | De Budgetschilder",
  description: "Heeft u vragen over schilderwerk? Neem contact op met De Budgetschilder via ons contactformulier. We helpen u graag verder.",
  openGraph: {
    title: "Contact - De Budgetschilder",
    description: "Neem contact op met De Budgetschilder voor al uw schilderwerk vragen.",
    url: "https://debudgetschilder.nl/contact",
  },
  alternates: {
    canonical: "https://debudgetschilder.nl/contact"
  }
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

