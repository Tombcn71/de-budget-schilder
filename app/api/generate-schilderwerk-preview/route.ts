import { GoogleGenAI } from "@google/genai";
import { NextResponse } from 'next/server';

export const maxDuration = 60;

// Initialize Gemini client
function getGeminiClient() {
  const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GOOGLE_AI_API_KEY or GEMINI_API_KEY is not configured');
  }
  
  return new GoogleGenAI({ apiKey });
}

interface SchilderwerkSpecs {
  verfkleur: string;
  projectType: string;
  schilderwerkType: string;
  items?: {
    muren?: { enabled: boolean; m2?: string; verfkleur?: string };
    plafond?: { enabled: boolean; m2?: string; verfkleur?: string };
    plinten?: { enabled: boolean; m1?: string; verfkleur?: string };
    lijstwerk?: { enabled: boolean; m1?: string; verfkleur?: string };
    kozijnen?: { enabled: boolean; m1?: string; verfkleur?: string };
    deuren?: { enabled: boolean; aantal?: string; verfkleur?: string };
  };
}

export async function POST(request: Request) {
  try {
    const { imageUrl, imageData, specs } = await request.json();
    
    console.log('🎨 Gemini Image Generation gestart voor schilderwerk preview');
    console.log('📋 Specs:', specs);

    if (!imageUrl && !imageData) {
      return NextResponse.json(
        { error: 'Geen foto URL of data opgegeven' },
        { status: 400 }
      );
    }

    if (!specs) {
      return NextResponse.json(
        { error: 'Geen schilderwerk specificaties opgegeven' },
        { status: 400 }
      );
    }

    const schilderwerkSpecs: SchilderwerkSpecs = specs;
    
    console.log('🔑 Gemini API Key aanwezig:', !!process.env.GOOGLE_AI_API_KEY);
    console.log('🔑 Alternative Key aanwezig:', !!process.env.GEMINI_API_KEY);
    
    const ai = getGeminiClient();
    console.log('📡 Gemini client geïnitialiseerd');
    console.log('📡 Gemini request verzenden met specs:', JSON.stringify(schilderwerkSpecs));

    // Build a detailed prompt for painting transformation
    const prompt = buildSchilderwerkPrompt(schilderwerkSpecs);

    // Prepare the content parts
    const contentParts: any[] = [
      { text: prompt }
    ];

    // Add the image
    if (imageData) {
      // If base64 image data is provided directly
      contentParts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageData,
        },
      });
    } else if (imageUrl) {
      // Fetch the image and convert to base64
      const imageResponse = await fetch(imageUrl);
      const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
      const imageBuffer = await imageResponse.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString('base64');
      
      console.log('📷 Image fetched, type:', contentType, 'size:', imageBuffer.byteLength);
      
      contentParts.push({
        inlineData: {
          mimeType: contentType,
          data: base64Image,
        },
      });
    }

    // Generate the image with Gemini
    console.log('🤖 Calling Gemini API with model: gemini-2.5-flash-image');
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: contentParts,
      config: {
        responseModalities: ['Image']
      }
    });

    console.log('📦 Gemini response received');
    console.log('📦 Response has candidates:', !!response.candidates);
    console.log('📦 Candidates length:', response.candidates?.length);

    // Extract the generated image
    let generatedImageData: string | null = null;
    
    if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          generatedImageData = part.inlineData.data;
          console.log('✅ Image data found, size:', generatedImageData.length, 'bytes');
          break;
        }
      }
    } else {
      console.log('❌ Response structure unexpected:', JSON.stringify(response, null, 2));
    }

    if (!generatedImageData) {
      throw new Error('Geen afbeelding gegenereerd door Gemini - check console logs');
    }

    console.log('✅ Schilderwerk preview succesvol gegenereerd!');

    return NextResponse.json({
      success: true,
      previewImage: `data:image/png;base64,${generatedImageData}`,
      specs: schilderwerkSpecs,
    });

  } catch (error: any) {
    console.error('❌ Gemini Generation error:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      code: error.code,
    });
    
    return NextResponse.json(
      { 
        error: 'Preview generatie mislukt',
        details: error.message || 'Onbekende fout',
        code: error.code || 'UNKNOWN'
      },
      { status: 500 }
    );
  }
}

function buildSchilderwerkPrompt(specs: SchilderwerkSpecs): string {
  const kleurDescriptions: Record<string, string> = {
    'wit': 'helder wit (RAL 9010)',
    'gebroken-wit': 'warm gebroken wit (RAL 9001)',
    'lichtgrijs': 'licht grijs (RAL 7035)',
    'grijs': 'modern grijs (RAL 7016)',
    'antraciet': 'elegant antraciet grijs (RAL 7021)',
    'zwart': 'diep zwart (RAL 9005)',
    'beige': 'warm beige (RAL 1015)',
    'zandgeel': 'zacht zandgeel (RAL 1002)',
    'groen': 'donkergroen (RAL 6009)',
    'blauw': 'elegant blauw (RAL 5014)'
  };

  // Helper functie om kleur te beschrijven (ondersteunt custom kleuren)
  const getKleurBeschrijving = (kleur: string | undefined): string => {
    if (!kleur) return 'de opgegeven kleur';
    // Check of het een preset kleur is
    if (kleurDescriptions[kleur]) {
      return kleurDescriptions[kleur];
    }
    // Custom kleur - gebruik letterlijk wat de gebruiker heeft ingevuld
    return `"${kleur}" (user-specified custom color - interpret this color name naturally and apply it accurately)`;
  };

  const projectTypeDescriptions: Record<string, string> = {
    'binnen': 'binnenschilderwerk',
    'buiten': 'buitenschilderwerk',
    'binnen_buiten': 'binnen en buiten schilderwerk'
  };

  const schilderwerkTypeDescriptions: Record<string, string> = {
    'muren': 'muren',
    'plafond': 'plafond',
    'kozijnen': 'kozijnen',
    'deuren': 'deuren',
    'plinten': 'plinten',
    'lijstwerk': 'lijstwerk',
    'volledige_kamer': 'volledige kamer (muren, plafond en houtwerk)',
    'gevel': 'gevel'
  };

  const kleurDesc = kleurDescriptions[specs.verfkleur] || specs.verfkleur;
  const projectDesc = projectTypeDescriptions[specs.projectType] || specs.projectType;
  
  // Determine which items to paint based on specs.items (new multi-item system)
  const items = specs.items || {};
  const paintMuren = items.muren?.enabled || specs.schilderwerkType === 'muren' || specs.schilderwerkType === 'volledige_kamer';
  const paintPlafond = items.plafond?.enabled || specs.schilderwerkType === 'plafond' || specs.schilderwerkType === 'volledige_kamer';
  const paintKozijnen = items.kozijnen?.enabled || specs.schilderwerkType === 'kozijnen';
  const paintDeuren = items.deuren?.enabled || specs.schilderwerkType === 'deuren';
  const paintPlinten = items.plinten?.enabled || specs.schilderwerkType === 'plinten' || specs.schilderwerkType === 'volledige_kamer';
  const paintLijstwerk = items.lijstwerk?.enabled || specs.schilderwerkType === 'lijstwerk' || specs.schilderwerkType === 'volledige_kamer';
  const paintGevel = specs.schilderwerkType === 'gevel';

  // Build list of what's being painted
  const paintingList: string[] = [];
  if (paintMuren) paintingList.push('muren');
  if (paintPlafond) paintingList.push('plafond');
  if (paintKozijnen) paintingList.push('kozijnen');
  if (paintDeuren) paintingList.push('deuren');
  if (paintPlinten) paintingList.push('plinten');
  if (paintLijstwerk) paintingList.push('lijstwerk');
  if (paintGevel) paintingList.push('gevel');
  
  const werkDesc = paintingList.join(', ') || 'selected surfaces';

  return `Edit this photo: repaint the ${werkDesc} in their specified colors for ${projectDesc}.

⚠️ CRITICAL INSTRUCTIONS:
${paintPlafond ? `- The CEILING must be completely repainted - this is mandatory!` : ''}
${paintMuren ? `- The WALLS must be completely repainted - this is mandatory!` : ''}
${!paintPlafond && paintMuren ? `- DO NOT change the ceiling color - only paint walls!` : ''}
${!paintMuren && paintPlafond ? `- DO NOT change the wall colors - only paint ceiling!` : ''}

🎨 PAINTING TRANSFORMATION RULES:

STEP 1 - IDENTIFY WHAT TO PAINT:
${paintMuren ? `
- Paint ALL visible walls/wall surfaces
- Apply ${getKleurBeschrijving(items.muren?.verfkleur)} paint color evenly
- CRITICAL: The wall color MUST be ${getKleurBeschrijving(items.muren?.verfkleur)}
- Keep wall texture (smooth/textured) exactly the same
- Paint goes from floor to ceiling
` : ''}
${paintPlafond ? `
- Paint the ENTIRE CEILING surface (this is CRITICAL)
- Apply ${getKleurBeschrijving(items.plafond?.verfkleur)} paint color to ALL ceiling areas
- CRITICAL: The ceiling color MUST be ${getKleurBeschrijving(items.plafond?.verfkleur)}
- Keep ceiling texture exactly the same (smooth/textured/popcorn)
- Paint EVERY visible part of the ceiling from wall to wall
- DO NOT miss any ceiling sections
` : ''}
${paintKozijnen ? `
- Paint ONLY the window frames/kozijnen
- Apply ${getKleurBeschrijving(items.kozijnen?.verfkleur)} paint to all frame parts
- CRITICAL: The kozijnen color MUST be ${getKleurBeschrijving(items.kozijnen?.verfkleur)}
- Keep glass clear and transparent
- DO NOT paint the glass itself
` : ''}
${paintDeuren ? `
- Paint ONLY the doors
- Apply ${getKleurBeschrijving(items.deuren?.verfkleur)} paint to entire door surface
- CRITICAL: The door color MUST be ${getKleurBeschrijving(items.deuren?.verfkleur)}
- Keep door handles/hardware unpainted (metal color)
` : ''}
${paintPlinten ? `
- Paint all baseboards/plinten
- Apply ${getKleurBeschrijving(items.plinten?.verfkleur)} paint evenly
- CRITICAL: The plinten color MUST be ${getKleurBeschrijving(items.plinten?.verfkleur)}
` : ''}
${paintLijstwerk ? `
- Paint all crown molding/lijstwerk
- Apply ${getKleurBeschrijving(items.lijstwerk?.verfkleur)} paint evenly
- CRITICAL: The lijstwerk color MUST be ${getKleurBeschrijving(items.lijstwerk?.verfkleur)}
` : ''}
${paintGevel ? `
- Paint the exterior facade/gevel
- Apply ${kleurDesc} paint to entire outside wall surface
- Keep windows, doors, and trim as they are
` : ''}

STEP 2 - APPLY PAINT PROFESSIONALLY:
- Paint looks freshly applied, smooth and even
- Color is ${kleurDesc} - use the exact RAL color specification
- NO drips, NO streaks, NO uneven patches
- Professional finish with proper coverage
- Paint has a matte/satin finish (not glossy unless specified)

STEP 3 - PRESERVE EVERYTHING ELSE 100%:
- DO NOT paint areas that shouldn't be painted:
  ${!paintPlafond ? '* Keep ceiling COMPLETELY ORIGINAL - do not change ceiling color at all' : ''}
  ${!paintMuren ? '* Keep walls COMPLETELY ORIGINAL - do not change wall color at all' : ''}
  ${!paintKozijnen ? '* Keep window frames in their original color' : ''}
  ${!paintDeuren ? '* Keep doors in their original color' : ''}
  ${!paintPlinten ? '* Keep baseboards/plinten in their original color' : ''}
  ${!paintLijstwerk ? '* Keep crown molding/lijstwerk in their original color' : ''}
  * Keep floors exactly the same
  * Keep furniture exactly the same (color, position, everything)
  * Keep decorations, pictures, lighting exactly the same
  * Keep windows and glass transparent and clean
  * Keep door handles, hinges, metal parts unpainted
  ${paintGevel ? '* Keep roof, windows, doors in original colors' : ''}

- Preserve all architectural details:
  * Same lighting and shadows
  * Same room layout
  * Same textures on unpainted surfaces
  * Same reflections in glass/mirrors

CRITICAL RULES:
✓ ONLY paint the specified surfaces (${werkDesc})
✓ Paint color is ${kleurDesc} - must be accurate
✓ Professional, even finish with no defects
✓ Everything else stays 100% identical to original
✓ NO hallucinations - don't add or remove furniture/objects
✓ Keep room atmosphere and lighting the same

FINAL QUALITY CHECK:
✓ Is ONLY the ${werkDesc} painted in the specified colors? (must be YES)
${paintPlafond ? '✓ Is the ENTIRE ceiling painted? (must be YES)' : ''}
${paintMuren ? '✓ Are ALL walls painted? (must be YES)' : ''}
✓ Is everything else unchanged? (must be YES)
✓ Does the paint look professional and even? (must be YES)
✓ Are the RAL color specifications correct? (must be YES)

RESULT: Professional ${projectDesc} with ${werkDesc} freshly painted. Everything else perfectly preserved from original photo.`;
}

