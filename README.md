# Budget Kozijnenshop 🪟

Een moderne Next.js web applicatie voor het verkrijgen van directe prijsopgaven voor nieuwe raamkozijnen, inclusief AI-gegenereerde previews van hoe je nieuwe kozijnen eruit gaan zien!

## ✨ Features

- 🎨 **AI Preview Generation** - Zie direct hoe je nieuwe kozijnen eruit gaan zien met Google Gemini "Nano Banana"
- 💰 **Instant Prijsberekening** - Directe prijsopgave op basis van specificaties
- 📸 **Foto Upload** - Upload foto's van je huidige ramen
- 🎯 **Materiaal Keuze** - Kunststof, Hout, Aluminium, Hout/Aluminium
- 🎨 **Kleur Opties** - Wit, Crème, Grijs, Antraciet, Zwart, Donkergroen, Houtkleur
- 🪟 **Type Selectie** - Draaikiepraam, Draadraam, Kiepraam, Schuifraam, Vaste beglazing
- 🔆 **Glas Typen** - Dubbel glas, HR++, Triple glas, Geluidswerend
- 📱 **Responsive Design** - Werkt perfect op mobiel en desktop
- 💳 **Laagste Prijs Garantie** - Vind je het goedkoper? Wij betalen het verschil!

## 🚀 Quick Start

### 1. Clone & Install

```bash
cd Budgetkozijnenshop
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
Budgetkozijnenshop/
├── app/
│   ├── api/
│   │   ├── generate-kozijn-preview/  # Gemini AI preview generation
│   │   └── upload/                    # Vercel Blob uploads
│   ├── page.tsx                       # Homepage
│   └── layout.tsx                     # Root layout
├── components/
│   ├── ai-quote-form.tsx              # Main quote form met AI
│   ├── hero-ai.tsx                    # Hero section
│   ├── header.tsx                     # Navigation
│   ├── how-it-works.tsx               # Process explanation
│   └── ui/                            # Reusable UI components
├── lib/
│   └── pricing/
│       └── ai-calculator.ts           # Pricing logic
└── public/                            # Static assets
```

## 🎯 How It Works

### Customer Journey:

1. **Klant vult specificaties in**:
   - Postcode
   - Materiaal (kunststof/hout/aluminium)
   - Kleur (wit, grijs, antraciet, etc.)
   - Type kozijn (draaikiepraam, schuifraam, etc.)
   - Aantal ramen & m² glas
   - Glastype (dubbel, HR++, triple, geluidswerend)

2. **Upload foto's**:
   - Min. 3 foto's van huidige ramen
   - Van binnen of buiten
   - Automatisch upload naar Vercel Blob

3. **AI Preview Generation** ✨:
   - Google Gemini analyseert foto's
   - Genereert realistische previews
   - Toont nieuwe kozijnen met gekozen specs
   - Behoudt architectuur, vervangt alleen kozijnen

4. **Prijsberekening**:
   ```
   Kozijnen:  €280-650 per m² (afhankelijk van materiaal)
   Glas:      €80-220 per m² (afhankelijk van type)
   Kleur:     €0-100 toeslag per raam
   Montage:   €75 per raam (optioneel)
   Afvoer:    €200 forfait (optioneel)
   
   Min. prijs: €1.500
   ```

5. **Offerte & Booking**:
   - Direct offerte met breakdown
   - Preview van nieuwe kozijnen
   - Contactgegevens invullen
   - Plan opname/plaatsing
   - Laagste prijs garantie

## 💡 API Routes

### `POST /api/generate-kozijn-preview`

Genereert AI previews met Google Gemini:

**Input:**
```json
{
  "imageUrl": "https://blob.vercel-storage.com/...",
  "specs": {
    "materiaal": "kunststof",
    "kleur": "wit",
    "kozijnType": "draaikiepraam",
    "glasType": "hr++"
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

**Input**: Oude witte kozijnen
**Specs**: Antraciet aluminium, HR++ glas
**Output**: Realistische preview met nieuwe antraciet kozijnen

**Input**: Traditionele houten ramen
**Specs**: Kunststof wit, triple glas
**Output**: Preview met moderne witte kozijnen

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
