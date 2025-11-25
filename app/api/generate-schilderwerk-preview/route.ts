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
  const werkDesc = schilderwerkTypeDescriptions[specs.schilderwerkType] || specs.schilderwerkType;

  return `Edit this photo: repaint the ${werkDesc} in ${kleurDesc} color for ${projectDesc}.

🎨 PAINTING TRANSFORMATION RULES:

STEP 1 - IDENTIFY WHAT TO PAINT:
${specs.schilderwerkType === 'muren' || specs.schilderwerkType === 'volledige_kamer' ? `
- Paint ALL visible walls/wall surfaces
- Apply ${kleurDesc} paint color evenly
- Keep wall texture (smooth/textured) exactly the same
- Paint goes from floor to ceiling
` : ''}
${specs.schilderwerkType === 'plafond' || specs.schilderwerkType === 'volledige_kamer' ? `
- Paint the entire ceiling surface
- Apply ${kleurDesc} paint color evenly
- Keep ceiling texture exactly the same
` : ''}
${specs.schilderwerkType === 'kozijnen' ? `
- Paint ONLY the window frames/kozijnen
- Apply ${kleurDesc} paint to all frame parts
- Keep glass clear and transparent
- DO NOT paint the glass itself
` : ''}
${specs.schilderwerkType === 'deuren' ? `
- Paint ONLY the doors
- Apply ${kleurDesc} paint to entire door surface
- Keep door handles/hardware unpainted (metal color)
` : ''}
${specs.schilderwerkType === 'plinten' || specs.schilderwerkType === 'volledige_kamer' ? `
- Paint all baseboards/plinten
- Apply ${kleurDesc} paint evenly
` : ''}
${specs.schilderwerkType === 'lijstwerk' || specs.schilderwerkType === 'volledige_kamer' ? `
- Paint all crown molding/lijstwerk
- Apply ${kleurDesc} paint evenly
` : ''}
${specs.schilderwerkType === 'gevel' ? `
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
  ${specs.schilderwerkType !== 'gevel' ? '* Keep ceiling original if only walls are being painted' : ''}
  ${specs.schilderwerkType !== 'muren' && specs.schilderwerkType !== 'volledige_kamer' ? '* Keep walls original if not specified to paint them' : ''}
  * Keep floors exactly the same
  * Keep furniture exactly the same (color, position, everything)
  * Keep decorations, pictures, lighting exactly the same
  * Keep windows and glass transparent and clean
  * Keep door handles, hinges, metal parts unpainted
  ${specs.schilderwerkType === 'gevel' ? '* Keep roof, windows, doors in original colors' : ''}

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
✓ Is ONLY the ${werkDesc} painted in ${kleurDesc}? (must be YES)
✓ Is everything else unchanged? (must be YES)
✓ Does the paint look professional and even? (must be YES)
✓ Are the RAL color specifications correct? (must be YES)

RESULT: Professional ${projectDesc} with ${werkDesc} freshly painted in ${kleurDesc}. Everything else perfectly preserved from original photo.`;
}

