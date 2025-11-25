# De Budgetschilder 🎨

Een moderne Next.js web applicatie voor het verkrijgen van directe prijsopgaven voor professioneel schilderwerk, inclusief AI-gegenereerde previews van hoe je geschilderde muren eruit gaan zien!

## ✨ Features

- 🎨 **AI Preview Generation** - Zie direct hoe je nieuwe verfkleur eruit gaat zien met Google Gemini "Nano Banana"
- 💰 **Instant Prijsberekening** - Directe prijsopgave op basis van m² en m¹
- 📸 **Foto Upload** - Upload foto's van je huis/muren
- 🏠 **Project Typen** - Binnen, Buiten, of Binnen & Buiten
- 🎨 **Verfkleuren** - Wit, Gebroken wit, Lichtgrijs, Donkergrijs, Beige, Blauw, Groen, Custom
- 🖌️ **Schilderwerk Types** - Muren (m²), Plafond (m²), Kozijnen (m¹), Deuren (m¹), Plinten (m¹), Lijstwerk (m¹), Gevel (m²)
- 📱 **Responsive Design** - Werkt perfect op mobiel en desktop
- 💳 **Laagste Prijs Garantie** - Vind je het goedkoper? Wij betalen het verschil!

## 🚀 Quick Start

### 1. Clone & Install

```bash
cd debudgetschilder
pnpm install
```

### 2. Environment Variables

Maak een `.env.local` bestand:

```bash
# Google Gemini API Key (voor AI preview generation)
GOOGLE_AI_API_KEY=jouw_gemini_api_key_hier

# Vercel Blob Token (voor foto uploads)
BLOB_READ_WRITE_TOKEN=jouw_vercel_blob_token_hier
```

**Zie setup guides voor details:**
- 📖 `GEMINI_SETUP.md` - Voor Gemini API key (AI previews)
- 📖 `VERCEL_BLOB_SETUP.md` - Voor Vercel Blob token (uploads)

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📚 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **AI Image Generation**: Google Gemini (`gemini-2.5-flash-image`)
- **File Storage**: Vercel Blob
- **Deployment**: Vercel

## 🗂️ Project Structure

```
debudgetschilder/
├── app/
│   ├── api/
│   │   ├── generate-schilderwerk-preview/  # Gemini AI preview generation
│   │   └── upload/                          # Vercel Blob uploads
│   ├── page.tsx                             # Homepage
│   └── layout.tsx                           # Root layout
├── components/
│   ├── ai-quote-form.tsx                    # Main quote form met AI
│   ├── hero-ai.tsx                          # Hero section
│   ├── header.tsx                           # Navigation
│   ├── how-it-works.tsx                     # Process explanation
│   ├── faq.tsx                              # FAQ section
│   └── ui/                                  # Reusable UI components
├── lib/
│   └── utils.ts                             # Utility functions
└── public/                                  # Static assets
```

## 🎯 How It Works

### Customer Journey:

1. **Klant vult specificaties in**:
   - Projecttype (binnen/buiten/beide)
   - Schilderwerk type (muren, plafond, kozijnen, deuren, etc.)
   - Oppervlakte in m² of m¹
   - Verfkleur keuze
   - Aantal verflagen (1-3 lagen)
   - Voorbereidingswerk (optioneel)

2. **Upload foto's**:
   - Min. 1 foto van te schilderen oppervlak
   - Van binnen of buiten
   - Automatisch upload naar Vercel Blob

3. **AI Preview Generation** ✨:
   - Google Gemini analyseert foto's
   - Genereert realistische previews
   - Toont geschilderde muren met gekozen verfkleur
   - Behoudt architectuur, past alleen verfkleur toe

4. **Prijsberekening**:
   ```
   Binnen:
   - Muren:     €12-18 per m²
   - Plafond:   €15-22 per m²
   - Kozijnen:  €35-55 per m¹
   - Deuren:    €45-75 per m¹
   - Plinten:   €8-15 per m¹
   - Lijstwerk: €10-18 per m¹
   
   Buiten:
   - Gevel:     €25-40 per m²
   - Kozijnen:  €45-70 per m¹
   - Deuren:    €55-90 per m¹
   
   Extra lagen: +40-50% per extra laag
   Voorbereiding: +€150-300
   ```

5. **Offerte & Contact**:
   - Direct offerte met breakdown
   - AI preview van geschilderd resultaat
   - Contactgegevens invullen
   - Plan schilderwerk afspraak
   - Laagste prijs garantie

## 💡 API Routes

### `POST /api/generate-schilderwerk-preview`

Genereert AI previews van geschilderde muren met Google Gemini:

**Input:**
```json
{
  "imageUrl": "https://blob.vercel-storage.com/...",
  "specs": {
    "projectType": "binnen",
    "schilderwerkType": "muren",
    "verfkleur": "lichtgrijs",
    "aantalLagen": "2"
  }
}
```

**Output:**
```json
{
  "success": true,
  "previewImage": "data:image/png;base64,...",
  "specs": { ... }
}
```

### `POST /api/upload`

Upload foto's naar Vercel Blob:

**Input:** FormData with `file` field

**Output:**
```json
{
  "url": "https://blob.vercel-storage.com/...",
  "size": 1234567,
  "contentType": "image/png"
}
```

**Validation:**
- Max 10MB per foto
- Alleen images
- Auto sanitized filenames

## 🎨 Pricing Logic

Zie `/lib/pricing/ai-calculator.ts`:

```typescript
// Materiaal prijzen per m²
kunststof: €280/m²
hout: €450/m²
aluminium: €550/m²
hout-aluminium: €650/m²

// Glas prijzen per m²
dubbel glas: €80/m²
HR++: €120/m²
triple: €180/m²
geluidswerend: €220/m²

// Type multipliers
draaikiepraam: 1.0x
schuifraam: 1.2x
vaste beglazing: 0.7x

// Extra kosten
montage: €75/raam
afvoer: €200 forfait
kleur toeslag: €0-100/raam
```

## 🚢 Deployment

### Deploy to Vercel

```bash
vercel
```

**Environment Variables:**

In Vercel Dashboard → Settings → Environment Variables:

```bash
# Handmatig toevoegen:
GOOGLE_AI_API_KEY=your_gemini_api_key

# Automatisch via Vercel Blob:
BLOB_READ_WRITE_TOKEN=auto_generated_by_vercel
```

### Setup Checklist:

- [ ] Deploy to Vercel
- [ ] Create Vercel Blob Storage
- [ ] Add Gemini API Key to environment
- [ ] Test foto upload
- [ ] Test AI preview generation
- [ ] Test prijsberekening

## 🎨 AI Preview Examples

**Input**: Witte woonkamer muur
**Specs**: Lichtgrijs, 2 lagen, binnen
**Output**: Realistische preview met lichtgrijze geschilderde muur

**Input**: Oude beige gevel
**Specs**: Modern donkergrijs, 2 lagen, buiten
**Output**: Preview met moderne donkergrijze gevel

## 💰 Kosten

### Gemini API:
- **Image Generation**: $30 per 1M tokens
- **Per preview**: ~1290 tokens = **~$0.04**
- **100 previews**: ~$4

### Vercel Blob (Hobby):
- **Storage**: 1 GB gratis
- **Bandwidth**: 100 GB/maand gratis
- **Voor 1000+ klanten/maand**: Gratis tier voldoende

## 📝 Todo / Roadmap

### MVP (Done) ✅:
- [x] Homepage met formulier
- [x] Foto upload naar Vercel Blob
- [x] Gemini AI preview generation
- [x] Prijsberekening
- [x] Responsive design

### Komende Features:
- [ ] Email notificaties bij offerte
- [ ] Admin dashboard voor offertes
- [ ] Before/After slider voor previews
- [ ] Download previews als PDF
- [ ] Meerdere kleuren tegelijk genereren
- [ ] Chat met AI over preview (iterative refinement)
- [ ] Betaling integratie (Stripe/Mollie)
- [ ] Klant reviews & testimonials

## 📖 Documentation

- `GEMINI_SETUP.md` - Gemini API setup & usage
- `VERCEL_BLOB_SETUP.md` - File storage setup
- Deze README - Project overview

## 🤝 Contributing

Dit is een private project, maar suggesties zijn welkom!

## 📄 License

Private - All rights reserved

---

**Gebouwd met ❤️ en powered by Google Gemini "Nano Banana" 🍌**
