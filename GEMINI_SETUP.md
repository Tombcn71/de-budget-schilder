# Gemini "Nano Banana" Image Generation Setup

Deze app gebruikt **Google Gemini's image generation** (ook wel "Nano Banana" genoemd) om AI-powered previews te genereren van geschilderde muren en oppervlaktes.

## 📋 Wat doet het?

Wanneer een klant:
1. Hun schilderwerk specificaties invult (projecttype, verfkleur, aantal lagen)
2. Foto's uploadt van hun huis/muren
3. Op "Bereken Prijs & Genereer Preview" klikt

Dan gebruikt de app Gemini om:
- De originele foto's te analyseren
- Nieuwe afbeeldingen te genereren met de gekozen verfkleur
- Een realistische preview te tonen van hoe het geschilderde resultaat eruit gaat zien

## 🔑 API Key Verkrijgen

1. Ga naar [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Log in met je Google account
3. Klik op "Create API Key"
4. Kopieer de gegenereerde API key

## ⚙️ Installatie

### 1. Maak een `.env.local` bestand in de root van het project:

```bash
# Google Gemini API Key for image generation
GOOGLE_AI_API_KEY=jouw_api_key_hier

# Vercel Blob Token for photo uploads
BLOB_READ_WRITE_TOKEN=jouw_vercel_blob_token_hier
```

> **Note**: Zie `VERCEL_BLOB_SETUP.md` voor instructies om de Blob token te krijgen

### 2. Installeer de dependencies (als je dat nog niet hebt gedaan):

```bash
pnpm install
```

### 3. Start de development server:

```bash
pnpm dev
```

## 🎨 Hoe het werkt

De app gebruikt het `gemini-2.5-flash-image` model met de volgende flow:

1. **Upload**: Klant uploadt foto's van ramen
2. **Specificaties**: Klant kiest projecttype, schilderwerk type, verfkleur, aantal lagen
3. **API Call**: Backend stuurt foto + specs naar Gemini
4. **Generatie**: Gemini genereert nieuwe afbeelding met de geschilderde muren
5. **Preview**: Klant ziet direct hoe de nieuwe verfkleur eruit gaat zien

## 📁 Relevante Bestanden

- `/app/api/generate-schilderwerk-preview/route.ts` - Gemini API integration
- `/components/ai-quote-form.tsx` - Frontend formulier en preview display

## 🚀 Features

- ✅ Text-to-image generation
- ✅ Image editing (muren schilderen)
- ✅ Multiple image processing
- ✅ Photorealistic results
- ✅ Fallback naar originele foto's als API key ontbreekt
- ✅ Detailed prompting voor beste resultaten

## 💰 Kosten

Google Gemini pricing:
- Image generation: $30 per 1 miljoen tokens
- Elke gegenereerde afbeelding = ~1290 tokens (tot 1024x1024px)
- Geschatte kosten: ~$0.04 per preview

## 🐛 Troubleshooting

### "Preview niet beschikbaar (Gemini API key vereist)"
- Check of `GOOGLE_AI_API_KEY` in `.env.local` staat
- Restart de development server na het toevoegen van de key

### "Gemini preview generatie mislukt"
- Check of je API key geldig is
- Controleer of je quota niet is overschreden
- Check de browser console voor details

### Originele foto's worden getoond in plaats van previews
- Dit is de fallback als Gemini niet werkt
- Check de server logs voor error messages

## 📚 Documentatie

- [Gemini Image Generation Docs](https://ai.google.dev/gemini-api/docs/image-generation)
- [Google AI Studio](https://aistudio.google.com/)
- [Pricing](https://ai.google.dev/pricing)

## 🎯 Toekomstige Verbeteringen

- [ ] Before/After slider voor previews
- [ ] Download gegenereerde previews
- [ ] Meerdere kleuren tegelijk genereren
- [ ] Video generation met Veo
- [ ] Iterative refinement (chat met AI over de preview)

