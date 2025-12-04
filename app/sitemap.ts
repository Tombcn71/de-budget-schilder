import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://debudgetschilder.nl'
  
  // Haaglanden locaties
  const haaglandenLocaties = [
    'schilder-den-haag',
    'schilder-haaglanden',
    'schilder-delft',
    'schilder-zoetermeer',
    'schilder-rijswijk',
    'schilder-scheveningen',
    'schilder-westland',
    'schilder-leidschendam-voorburg',
    'schilder-pijnacker-nootdorp',
    'schilder-wassenaar',
    'schilder-midden-delfland',
  ]

  // Blog posts
  const blogPosts = [
    'blog',
    'blog/muren-schilderen',
    'blog/plafonds-schilderen',
    'blog/kozijnen-schilderen',
    'blog/deuren-lakken',
    'blog/plinten-schilderen',
    'blog/lijstwerk-schilderen',
  ]
  
  const locationPages = haaglandenLocaties.map((location) => ({
    url: `${baseUrl}/${location}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/algemene-voorwaarden`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/laagste-prijs-garantie`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...locationPages,
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/${post}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]
}

