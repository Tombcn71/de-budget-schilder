# Vercel Blob Storage Setup

Deze app gebruikt **Vercel Blob** voor het uploaden en opslaan van klantfoto's van ramen/kozijnen.

## 📋 Wat is Vercel Blob?

Vercel Blob is een eenvoudige file storage oplossing voor Next.js apps:
- Automatisch gescaleerd
- CDN-backed (snel wereldwijd)
- Eenvoudige API
- Gratis tier beschikbaar

## 🔑 Setup Instructies

### Optie 1: Via Vercel Dashboard (Aanbevolen)

1. **Deploy je app naar Vercel** (indien nog niet gedaan):
   ```bash
   vercel
   ```

2. **Ga naar je project dashboard** op [vercel.com](https://vercel.com)

3. **Klik op "Storage" tab**

4. **Klik op "Create Database"** → Selecteer **"Blob"**

5. **Kies een naam** (bijv. "kozijnen-photos")

6. **Connect to Project** - Vercel voegt automatisch de `BLOB_READ_WRITE_TOKEN` toe aan je environment variables

7. **Done!** De token is nu beschikbaar voor je app

### Optie 2: Handmatig (Local Development)

1. **Maak een Blob Store** in Vercel Dashboard zoals hierboven

2. **Kopieer de token** uit Settings → Environment Variables

3. **Voeg toe aan `.env.local`**:
   ```bash
   BLOB_READ_WRITE_TOKEN=vercel_blob_abc123xyz...
   ```

4. **Restart je development server**:
   ```bash
   pnpm dev
   ```

## 📁 Hoe het werkt in de app

### Upload Flow:

```
Klant upload foto → Frontend → /api/upload → Vercel Blob → Public URL
                                                              ↓
                                            Gemini gebruikt URL voor preview
```

### Code Locaties:

- **Upload API**: `/app/api/upload/route.ts`
- **Upload Component**: `/components/photo-upload.tsx`
- **Used in**: `/components/ai-quote-form.tsx`

## 💰 Kosten & Limits

### Gratis Tier (Hobby):
- ✅ 1 GB Storage
- ✅ 100 GB Bandwidth/maand
- ✅ Unlimited Requests

### Pro Tier ($20/maand):
- ✅ 100 GB Storage
- ✅ 1 TB Bandwidth/maand
- ✅ Unlimited Requests

**Voor deze app**: Gratis tier is ruim voldoende voor 1000+ klanten per maand

## 🔒 Beveiliging

De huidige configuratie:
- **Public Access**: Foto's zijn publiek toegankelijk via URL
- **Random Suffix**: Unieke, moeilijk te raden URLs
- **Validation**: Max 10MB, alleen images
- **Sanitization**: Bestandsnamen worden geschoond

### Voor productie overwegen:
- Signed URLs voor tijdelijke toegang
- Rate limiting op uploads
- Automatisch verwijderen oude foto's (GDPR)

## 🗑️ Foto's Verwijderen (Optioneel)

Als je foto's automatisch wilt verwijderen na X dagen:

```typescript
import { del } from '@vercel/blob';

// In je API route
await del(blobUrl);
```

Je kunt een cron job maken die oude foto's opruimt:
- `/app/api/cleanup/route.ts` (met Vercel Cron Jobs)

## 🐛 Troubleshooting

### "Upload mislukt" errors:

1. **Check of token is geconfigureerd**:
   ```bash
   echo $BLOB_READ_WRITE_TOKEN
   ```

2. **Vercel deployment**: Token wordt automatisch toegevoegd bij deployment

3. **Local development**: Moet handmatig in `.env.local`

### Token niet gevonden:

```bash
# Controleer in Vercel Dashboard:
Settings → Environment Variables → BLOB_READ_WRITE_TOKEN
```

### File te groot:

- Current limit: 10MB
- Aanpassen in `/app/api/upload/route.ts` (regel 25)

## 📚 Documentatie

- [Vercel Blob Docs](https://vercel.com/docs/storage/vercel-blob)
- [Pricing](https://vercel.com/docs/storage/vercel-blob/usage-and-pricing)
- [Best Practices](https://vercel.com/docs/storage/vercel-blob/using-blob-sdk)

## 🚀 Productie Checklist

- [ ] Vercel Blob storage aangemaakt
- [ ] `BLOB_READ_WRITE_TOKEN` geconfigureerd
- [ ] Getest dat uploads werken
- [ ] File size limits ingesteld
- [ ] (Optioneel) Cleanup cron job voor oude foto's
- [ ] (Optioneel) Rate limiting toegevoegd

