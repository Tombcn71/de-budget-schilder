import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Schildertips & Advies",
  description: "Lees alles over schilderwerk in Haaglanden. Tips, kosten en advies over muren, plafonds, kozijnen, deuren en meer schilderen.",
  keywords: "schilder blog, schildertips, schilderen tips, verf tips, hoe schilderen",
  alternates: {
    canonical: "https://debudgetschilder.nl/blog"
  }
}

export default function BlogOverviewPage() {
  const blogs = [
    {
      title: "Muren Schilderen",
      description: "Alles over muren schilderen in Haaglanden. Hoe doe je het? Wat kost het? Tips voor perfect resultaat.",
      slug: "muren-schilderen",
    },
    {
      title: "Plafonds Schilderen",
      description: "De uitdagingen van plafond schilderen en waarom veel mensen het laten doen. Kosten en tips.",
      slug: "plafonds-schilderen",
    },
    {
      title: "Kozijnen Schilderen",
      description: "Waarom kozijnen schilderen belangrijk is. Kosten, tips en het beste seizoen voor kozijnonderhoud.",
      slug: "kozijnen-schilderen",
    },
    {
      title: "Deuren Lakken",
      description: "Deuren lakken voor een strakke, moderne uitstraling. Het proces, kosten en wanneer het beter is om het te laten doen.",
      slug: "deuren-lakken",
    },
    {
      title: "Plinten Schilderen",
      description: "Plinten schilderen lijkt simpel maar vraagt precisie. Lees waarom velen het uitbesteden.",
      slug: "plinten-schilderen",
    },
    {
      title: "Lijstwerk Schilderen",
      description: "Lijstwerk schilderen is precisiewerk. Tips voor een mooi resultaat en kosten in Haaglanden.",
      slug: "lijstwerk-schilderen",
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Schilderwerk Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Ontdek alles over schilderwerk in Haaglanden. Van muren tot kozijnen, van plafonds tot deuren - lees onze complete gidsen met tips en kosteninformatie.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <Link 
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="bg-background border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-2xl font-bold mb-3 text-foreground">{blog.title}</h2>
                  <p className="text-muted-foreground mb-4">{blog.description}</p>
                  <span className="text-primary font-semibold hover:underline">
                    Lees meer →
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-16 bg-muted p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">Schilderwerk nodig in Haaglanden?</h2>
              <p className="text-lg mb-6">
                Vul het formulier in en krijg binnen 30 seconden je prijsindicatie. Prijs match garantie in heel Haaglanden!
              </p>
              <Link 
                href="/#hero" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Direct prijsindicatie
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

