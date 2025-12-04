import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export const maxDuration = 60

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      formData,
      analysisResults,
      priceRange,
    } = body

    console.log('📧 Email verzenden gestart...')

    // Validatie
    if (!formData.naam || !formData.email) {
      return NextResponse.json(
        { error: 'Naam en email zijn verplicht' },
        { status: 400 }
      )
    }

    // Email format validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Ongeldig email adres. Gebruik het formaat: naam@voorbeeld.nl' },
        { status: 400 }
      )
    }

    // Build photo URLs
    const photoUrls = analysisResults?.map((r: any) => r.url) || []
    const previewUrls = analysisResults?.map((r: any) => r.previewUrl || r.url) || []

    // Format projectType
    const projectTypeLabels: Record<string, string> = {
      binnen: 'Binnen schilderwerk',
      buiten: 'Buiten schilderwerk',
      both: 'Binnen én buiten schilderwerk'
    }
    const projectTypeLabel = projectTypeLabels[formData.projectType] || formData.projectType

    // Build items list from multi-item form with price calculations
    const items = formData.items || {}
    const itemsText: string[] = []
    const itemsHTML: string[] = []
    const priceBreakdownHTML: string[] = []
    const priceBreakdownText: string[] = []
    
    // Prijzen constanten
    const PRIJZEN = {
      muren: 12.50,
      plafond: 13.50,
      plinten: 7.50,
      lijstwerk: 7.50,
      binnenkozijnen: 100,
      binnendeuren: 100,
      deurkozijnen: 40,
      buitenkozijnen: 125,
      buitendeuren: 125,
    }
    
    const formatEuro = (amount: number) => `€${amount.toLocaleString('nl-NL')}`
    
    if (items.muren?.enabled && items.muren.m2) {
      const subtotal = parseFloat(items.muren.m2) * PRIJZEN.muren
      itemsText.push(`- Muren: ${items.muren.m2} m² (${items.muren.verfkleur || 'geen kleur gekozen'})`)
      itemsHTML.push(`<tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Muren</td><td style="padding: 6px 0; color: #1f2937; font-size: 14px;">${items.muren.m2} m² - ${items.muren.verfkleur || 'geen kleur'}</td></tr>`)
      priceBreakdownText.push(`- Muren: ${items.muren.m2} m² × €12,50 = ${formatEuro(subtotal)} (${items.muren.verfkleur || 'geen kleur'})`)
      priceBreakdownHTML.push(`
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Muren: ${items.muren.m2} m² × €12,50</td>
          <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right; font-weight: 600;">${formatEuro(subtotal)}</td>
        </tr>
        <tr><td colspan="2" style="padding: 0 0 8px 0; color: #9ca3af; font-size: 12px; border-bottom: 1px solid #e5e7eb;">Kleur: ${items.muren.verfkleur || 'geen kleur'}</td></tr>
      `)
    }
    if (items.plafond?.enabled && items.plafond.m2) {
      const subtotal = parseFloat(items.plafond.m2) * PRIJZEN.plafond
      itemsText.push(`- Plafond: ${items.plafond.m2} m² (${items.plafond.verfkleur || 'geen kleur gekozen'})`)
      itemsHTML.push(`<tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Plafond</td><td style="padding: 6px 0; color: #1f2937; font-size: 14px;">${items.plafond.m2} m² - ${items.plafond.verfkleur || 'geen kleur'}</td></tr>`)
      priceBreakdownText.push(`- Plafond: ${items.plafond.m2} m² × €13,50 = ${formatEuro(subtotal)} (${items.plafond.verfkleur || 'geen kleur'})`)
      priceBreakdownHTML.push(`
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Plafond: ${items.plafond.m2} m² × €13,50</td>
          <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right; font-weight: 600;">${formatEuro(subtotal)}</td>
        </tr>
        <tr><td colspan="2" style="padding: 0 0 8px 0; color: #9ca3af; font-size: 12px; border-bottom: 1px solid #e5e7eb;">Kleur: ${items.plafond.verfkleur || 'geen kleur'}</td></tr>
      `)
    }
    if (items.plinten?.enabled && items.plinten.m1) {
      const subtotal = parseFloat(items.plinten.m1) * PRIJZEN.plinten
      itemsText.push(`- Plinten: ${items.plinten.m1} m¹ (${items.plinten.verfkleur || 'geen kleur gekozen'})`)
      itemsHTML.push(`<tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Plinten</td><td style="padding: 6px 0; color: #1f2937; font-size: 14px;">${items.plinten.m1} m¹ - ${items.plinten.verfkleur || 'geen kleur'}</td></tr>`)
      priceBreakdownText.push(`- Plinten: ${items.plinten.m1} m¹ × €7,50 = ${formatEuro(subtotal)} (${items.plinten.verfkleur || 'geen kleur'})`)
      priceBreakdownHTML.push(`
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Plinten: ${items.plinten.m1} m¹ × €7,50</td>
          <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right; font-weight: 600;">${formatEuro(subtotal)}</td>
        </tr>
        <tr><td colspan="2" style="padding: 0 0 8px 0; color: #9ca3af; font-size: 12px; border-bottom: 1px solid #e5e7eb;">Kleur: ${items.plinten.verfkleur || 'geen kleur'}</td></tr>
      `)
    }
    if (items.lijstwerk?.enabled && items.lijstwerk.m1) {
      const subtotal = parseFloat(items.lijstwerk.m1) * PRIJZEN.lijstwerk
      itemsText.push(`- Lijstwerk: ${items.lijstwerk.m1} m¹ (${items.lijstwerk.verfkleur || 'geen kleur gekozen'})`)
      itemsHTML.push(`<tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Lijstwerk</td><td style="padding: 6px 0; color: #1f2937; font-size: 14px;">${items.lijstwerk.m1} m¹ - ${items.lijstwerk.verfkleur || 'geen kleur'}</td></tr>`)
      priceBreakdownText.push(`- Lijstwerk: ${items.lijstwerk.m1} m¹ × €7,50 = ${formatEuro(subtotal)} (${items.lijstwerk.verfkleur || 'geen kleur'})`)
      priceBreakdownHTML.push(`
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Lijstwerk: ${items.lijstwerk.m1} m¹ × €7,50</td>
          <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right; font-weight: 600;">${formatEuro(subtotal)}</td>
        </tr>
        <tr><td colspan="2" style="padding: 0 0 8px 0; color: #9ca3af; font-size: 12px; border-bottom: 1px solid #e5e7eb;">Kleur: ${items.lijstwerk.verfkleur || 'geen kleur'}</td></tr>
      `)
    }
    // Binnen kozijnen & deuren
    if (items.binnenkozijnen?.enabled && items.binnenkozijnen.aantal) {
      const subtotal = parseInt(items.binnenkozijnen.aantal) * PRIJZEN.binnenkozijnen
      itemsText.push(`- Binnenkozijnen: ${items.binnenkozijnen.aantal} stuks (${items.binnenkozijnen.verfkleur || 'geen kleur gekozen'})`)
      itemsHTML.push(`<tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Binnenkozijnen</td><td style="padding: 6px 0; color: #1f2937; font-size: 14px;">${items.binnenkozijnen.aantal} stuks × €100 - ${items.binnenkozijnen.verfkleur || 'geen kleur'}</td></tr>`)
      priceBreakdownText.push(`- Binnenkozijnen: ${items.binnenkozijnen.aantal} × €100 = ${formatEuro(subtotal)} (${items.binnenkozijnen.verfkleur || 'geen kleur'})`)
      priceBreakdownHTML.push(`
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Binnenkozijnen: ${items.binnenkozijnen.aantal} × €100</td>
          <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right; font-weight: 600;">${formatEuro(subtotal)}</td>
        </tr>
        <tr><td colspan="2" style="padding: 0 0 8px 0; color: #9ca3af; font-size: 12px; border-bottom: 1px solid #e5e7eb;">Kleur: ${items.binnenkozijnen.verfkleur || 'geen kleur'}</td></tr>
      `)
    }
    if (items.binnendeuren?.enabled && items.binnendeuren.aantal) {
      const subtotal = parseInt(items.binnendeuren.aantal) * PRIJZEN.binnendeuren
      itemsText.push(`- Binnendeuren: ${items.binnendeuren.aantal} stuks (${items.binnendeuren.verfkleur || 'geen kleur gekozen'})`)
      itemsHTML.push(`<tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Binnendeuren</td><td style="padding: 6px 0; color: #1f2937; font-size: 14px;">${items.binnendeuren.aantal} stuks × €100 - ${items.binnendeuren.verfkleur || 'geen kleur'}</td></tr>`)
      priceBreakdownText.push(`- Binnendeuren: ${items.binnendeuren.aantal} × €100 = ${formatEuro(subtotal)} (${items.binnendeuren.verfkleur || 'geen kleur'})`)
      priceBreakdownHTML.push(`
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Binnendeuren: ${items.binnendeuren.aantal} × €100</td>
          <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right; font-weight: 600;">${formatEuro(subtotal)}</td>
        </tr>
        <tr><td colspan="2" style="padding: 0 0 8px 0; color: #9ca3af; font-size: 12px; border-bottom: 1px solid #e5e7eb;">Kleur: ${items.binnendeuren.verfkleur || 'geen kleur'}</td></tr>
      `)
    }
    // Deurkozijnen (binnen)
    if (items.deurkozijnen?.enabled && items.deurkozijnen.aantal) {
      const subtotal = parseInt(items.deurkozijnen.aantal) * PRIJZEN.deurkozijnen
      itemsText.push(`- Deurkozijnen: ${items.deurkozijnen.aantal} stuks (${items.deurkozijnen.verfkleur || 'geen kleur gekozen'})`)
      itemsHTML.push(`<tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Deurkozijnen</td><td style="padding: 6px 0; color: #1f2937; font-size: 14px;">${items.deurkozijnen.aantal} stuks × €40 - ${items.deurkozijnen.verfkleur || 'geen kleur'}</td></tr>`)
      priceBreakdownText.push(`- Deurkozijnen: ${items.deurkozijnen.aantal} × €40 = ${formatEuro(subtotal)} (${items.deurkozijnen.verfkleur || 'geen kleur'})`)
      priceBreakdownHTML.push(`
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Deurkozijnen: ${items.deurkozijnen.aantal} × €40</td>
          <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right; font-weight: 600;">${formatEuro(subtotal)}</td>
        </tr>
        <tr><td colspan="2" style="padding: 0 0 8px 0; color: #9ca3af; font-size: 12px; border-bottom: 1px solid #e5e7eb;">Kleur: ${items.deurkozijnen.verfkleur || 'geen kleur'}</td></tr>
      `)
    }
    // Buiten kozijnen & deuren
    if (items.buitenkozijnen?.enabled && items.buitenkozijnen.aantal) {
      const subtotal = parseInt(items.buitenkozijnen.aantal) * PRIJZEN.buitenkozijnen
      itemsText.push(`- Buitenkozijnen: ${items.buitenkozijnen.aantal} stuks (${items.buitenkozijnen.verfkleur || 'geen kleur gekozen'})`)
      itemsHTML.push(`<tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Buitenkozijnen</td><td style="padding: 6px 0; color: #1f2937; font-size: 14px;">${items.buitenkozijnen.aantal} stuks × €125 - ${items.buitenkozijnen.verfkleur || 'geen kleur'}</td></tr>`)
      priceBreakdownText.push(`- Buitenkozijnen: ${items.buitenkozijnen.aantal} × €125 = ${formatEuro(subtotal)} (${items.buitenkozijnen.verfkleur || 'geen kleur'})`)
      priceBreakdownHTML.push(`
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Buitenkozijnen: ${items.buitenkozijnen.aantal} × €125</td>
          <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right; font-weight: 600;">${formatEuro(subtotal)}</td>
        </tr>
        <tr><td colspan="2" style="padding: 0 0 8px 0; color: #9ca3af; font-size: 12px; border-bottom: 1px solid #e5e7eb;">Kleur: ${items.buitenkozijnen.verfkleur || 'geen kleur'}</td></tr>
      `)
    }
    if (items.buitendeuren?.enabled && items.buitendeuren.aantal) {
      const subtotal = parseInt(items.buitendeuren.aantal) * PRIJZEN.buitendeuren
      itemsText.push(`- Buitendeuren: ${items.buitendeuren.aantal} stuks (${items.buitendeuren.verfkleur || 'geen kleur gekozen'})`)
      itemsHTML.push(`<tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Buitendeuren</td><td style="padding: 6px 0; color: #1f2937; font-size: 14px;">${items.buitendeuren.aantal} stuks × €125 - ${items.buitendeuren.verfkleur || 'geen kleur'}</td></tr>`)
      priceBreakdownText.push(`- Buitendeuren: ${items.buitendeuren.aantal} × €125 = ${formatEuro(subtotal)} (${items.buitendeuren.verfkleur || 'geen kleur'})`)
      priceBreakdownHTML.push(`
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Buitendeuren: ${items.buitendeuren.aantal} × €125</td>
          <td style="padding: 8px 0; color: #1f2937; font-size: 14px; text-align: right; font-weight: 600;">${formatEuro(subtotal)}</td>
        </tr>
        <tr><td colspan="2" style="padding: 0 0 8px 0; color: #9ca3af; font-size: 12px; border-bottom: 1px solid #e5e7eb;">Kleur: ${items.buitendeuren.verfkleur || 'geen kleur'}</td></tr>
      `)
    }

    const aantalLagen = formData.aantalLagen || 2

    // Create plain text version
    const textEmail = `
DE BUDGETSCHILDER - UW PERSOONLIJKE OFFERTE

Bedankt voor uw aanvraag! Hieronder vindt u uw offerte op basis van uw opgave.

KLANTGEGEVENS
-------------
Naam: ${formData.naam}
Email: ${formData.email}
${formData.telefoon ? `Telefoon: ${formData.telefoon}` : ''}

PROJECT
-------
Type: ${projectTypeLabel}

UW PRIJS INDICATIE
------------------
${priceBreakdownText.join('\n')}

TOTAAL: ${priceRange ? `EUR ${priceRange.min.toLocaleString('nl-NL')}` : 'Op aanvraag'}

VOLGENDE STAPPEN
----------------
Plan uw gratis adviesgesprek: https://calendly.com/budgetgroep/30min?month=2025-11

Vragen? Bel ons of reply op deze email.

---
De Budgetschilder
Professioneel schilderwerk met laagste prijs garantie
    `.trim()

    // ========================================
    // KLANT EMAIL (SIMPLE - SPAM PROOF)
    // ========================================
    const simpleCustomerEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Uw Offerte - De Budgetschilder</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f9fafb;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e5e7eb;">
    
    <!-- Header -->
    <div style="border-bottom: 3px solid #f97316; padding-bottom: 20px; margin-bottom: 25px;">
      <h1 style="color: #f97316; font-size: 26px; margin: 0 0 8px 0;">De <strong>Budget</strong>schilder</h1>
      <p style="color: #6b7280; font-size: 15px; margin: 0;">Bedankt voor uw offerte aanvraag</p>
    </div>
    
    <!-- Uw Gegevens -->
    <div style="margin-bottom: 25px;">
      <h2 style="color: #1f2937; font-size: 18px; margin: 0 0 12px 0; border-left: 4px solid #f97316; padding-left: 12px;">Uw Gegevens</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; color: #6b7280; font-size: 14px; width: 40%;">Naam</td>
          <td style="padding: 6px 0; color: #1f2937; font-size: 14px; font-weight: 600;">${formData.naam}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Email</td>
          <td style="padding: 6px 0; color: #1f2937; font-size: 14px;">${formData.email}</td>
        </tr>
        ${formData.telefoon ? `
        <tr>
          <td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Telefoon</td>
          <td style="padding: 6px 0; color: #1f2937; font-size: 14px;">${formData.telefoon}</td>
        </tr>
        ` : ''}
      </table>
    </div>
    
    <!-- Prijsopbouw -->
    <div style="margin-bottom: 25px;">
      <h2 style="color: #1f2937; font-size: 18px; margin: 0 0 12px 0; border-left: 4px solid #f97316; padding-left: 12px;">Uw Prijs Indicatie</h2>
      <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; border: 1px solid #e5e7eb;">
      <table style="width: 100%; border-collapse: collapse;">
          ${priceBreakdownHTML.join('')}
          <tr style="border-top: 2px solid #f97316;">
            <td style="padding: 12px 0 0 0; color: #1f2937; font-size: 16px; font-weight: bold;">Totaal:</td>
            <td style="padding: 12px 0 0 0; color: #f97316; font-size: 20px; text-align: right; font-weight: bold;">${priceRange ? `€${priceRange.min.toLocaleString('nl-NL')}` : 'Op aanvraag'}</td>
        </tr>
      </table>
    </div>
      <p style="margin: 12px 0 0 0; color: #6b7280; font-size: 13px;">
        ✅ Inclusief: Schuren + voorbehandeling + 2 lagen afwerking + verf en materialen
      </p>
    </div>

    
    <!-- Call to Action -->
    <div style="background-color: #fef3c7; padding: 24px; border-radius: 8px; text-align: center; margin-bottom: 20px; border: 2px solid #fde68a;">
      <p style="color: #92400e; font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">Volgende stap: Plan uw gratis adviesgesprek</p>
      <div style="margin-bottom: 16px;">
        <a href="https://calendly.com/budgetgroep/30min?month=2025-11" style="display: inline-block; background-color: #f97316; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
          Plan Adviesgesprek
        </a>
      </div>
      <p style="color: #78350f; font-size: 13px; margin: 0;">
        Kies een tijdstip dat u uitkomt voor een persoonlijk gesprek
      </p>
    </div>
    
    <!-- Contact info -->
    <div style="text-align: center; margin-bottom: 20px;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        Liever contact via email of telefoon? Reply op deze email of bel 085 060 8180
      </p>
    </div>
    
    <!-- Footer -->
    <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
      <p style="color: #6b7280; font-size: 13px; margin: 0 0 4px 0; font-weight: 600;">De <strong>Budget</strong>schilder</p>
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">🏆 Laagste Prijs Garantie Schilderwerk</p>
    </div>
    
  </div>
</body>
</html>
    `.trim()

    // ========================================
    // BUSINESS EMAIL (INTERNAL NOTIFICATION)
    // ========================================
    const businessEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Nieuwe Aanvraag - De Budgetschilder</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f9fafb;">
  <div style="max-width: 700px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
    
    <!-- Alert Header -->
    <div style="background-color: #f97316; padding: 20px; text-align: center;">
      <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 8px 0;">🔔 NIEUWE SCHILDERWERK AANVRAAG</h1>
      <p style="color: #ffffff; font-size: 18px; margin: 0; font-weight: 600;">${formData.naam}${priceRange ? ` • €${priceRange.min.toLocaleString('nl-NL')}` : ''}</p>
    </div>
    
    <div style="padding: 30px;">
      
      <!-- Status -->
      <div style="background-color: #fef3c7; padding: 16px; border-radius: 6px; margin-bottom: 25px; border-left: 4px solid #f59e0b;">
        <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">
          ⏳ Wacht op Calendly boeking van ${formData.naam}
        </p>
      </div>
      
      <!-- Klantgegevens -->
      <h2 style="color: #1f2937; font-size: 18px; margin: 0 0 12px 0; border-left: 4px solid #f97316; padding-left: 12px;">Klantgegevens</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 40%;">Naam</td>
          <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: 600;">${formData.naam}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td>
          <td style="padding: 8px 0;"><a href="mailto:${formData.email}" style="color: #f97316; text-decoration: none; font-weight: 600;">${formData.email}</a></td>
        </tr>
        ${formData.telefoon ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Telefoon</td>
          <td style="padding: 8px 0;"><a href="tel:${formData.telefoon}" style="color: #f97316; text-decoration: none; font-weight: 600;">${formData.telefoon}</a></td>
        </tr>
        ` : ''}
      </table>
      
      <!-- Project Type -->
      <p style="margin: 0 0 20px 0; padding: 12px; background-color: #f3f4f6; border-radius: 6px; color: #4b5563; font-size: 14px;">
        <strong>Project type:</strong> ${projectTypeLabel}
      </p>
      
      <!-- Foto's -->
      ${analysisResults && analysisResults.length > 0 ? `
      <h2 style="color: #1f2937; font-size: 18px; margin: 0 0 12px 0; border-left: 4px solid #f97316; padding-left: 12px;">Foto's (${analysisResults.length})</h2>
      <div style="margin-bottom: 25px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            ${analysisResults.map((result: any, index: number) => `
              ${index % 2 === 0 && index > 0 ? '</tr><tr>' : ''}
              <td style="padding: 4px; width: 50%; vertical-align: top;">
                <a href="${result.url}" target="_blank" style="display: block; text-decoration: none;">
                  <img 
                    src="${result.url}" 
                    alt="Foto ${index + 1}"
                    style="width: 100%; height: 200px; object-fit: cover; border-radius: 6px; border: 2px solid #e5e7eb; display: block;"
                  />
                  <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 12px; text-align: center;">Foto ${index + 1}</p>
                </a>
              </td>
            `).join('')}
          </tr>
        </table>
      </div>
      ` : ''}
      
      <!-- Prijsopbouw -->
      <h2 style="color: #1f2937; font-size: 18px; margin: 0 0 12px 0; border-left: 4px solid #f97316; padding-left: 12px;">Prijs Indicatie (naar klant gestuurd)</h2>
      <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; border: 1px solid #e5e7eb; margin-bottom: 25px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${priceBreakdownHTML.join('')}
          <tr style="border-top: 2px solid #f97316;">
            <td style="padding: 12px 0 0 0; color: #1f2937; font-size: 16px; font-weight: bold;">Totaal:</td>
            <td style="padding: 12px 0 0 0; color: #f97316; font-size: 20px; text-align: right; font-weight: bold;">${priceRange ? `€${priceRange.min.toLocaleString('nl-NL')}` : 'Op aanvraag'}</td>
          </tr>
        </table>
      </div>
      
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 13px; margin: 0;">
        De Budgetschilder - Interne notificatie
      </p>
    </div>
    
  </div>
</body>
</html>
    `.trim()

    // ========================================
    // SEND TO CUSTOMER
    // ========================================
    console.log('📧 Verzenden naar klant:', formData.email)
    const { data: customerData, error: customerError } = await resend.emails.send({
      from: 'De Budgetschilder <offerte@debudgetschilder.nl>',
      to: [formData.email],
      replyTo: 'info@debudgetschilder.nl',
      subject: `Uw schilderwerk offerte - De Budgetschilder`,
      html: simpleCustomerEmail,
      text: textEmail,
    })

    if (customerError) {
      console.error('❌ Klant email error:', customerError)
    } else {
      console.log('✅ Klant email verzonden!', customerData)
    }

    // ========================================
    // SEND TO BUSINESS
    // ========================================
    // Build subject line summary
    const itemsSummary = itemsText.length > 0 ? itemsText[0].replace('- ', '') : 'Diverse werkzaamheden'
    
    console.log('📧 Verzenden naar bedrijf')
    const { data: businessData, error: businessError } = await resend.emails.send({
      from: 'De Budgetschilder <offerte@debudgetschilder.nl>',
      to: ['budgetgroep.nl@gmail.com'],
      replyTo: formData.email,
      subject: `Nieuwe Aanvraag - ${formData.naam} - ${itemsSummary}${priceRange ? ` - €${priceRange.min.toLocaleString('nl-NL')}` : ''}`,
      html: businessEmail,
      text: textEmail,
    })

    if (businessError) {
      console.error('❌ Bedrijf email error:', businessError)
    } else {
      console.log('✅ Bedrijf email verzonden!', businessData)
    }

    // Fail if customer email didn't send
    if (customerError) {
      return NextResponse.json(
        { error: 'Klant email kon niet worden verzonden', details: customerError },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      customerMessageId: customerData?.id,
      businessMessageId: businessData?.id,
    })

  } catch (error: any) {
    console.error('❌ Send quote error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden', details: error.message },
      { status: 500 }
    )
  }
}

