import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // L'URL de ton Webhook n8n (Production)
    const N8N_WEBHOOK_URL = "https://n8n-latest-fsq5.onrender.com/webhook/contactneocard";

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Envoyé à n8n' });
    } else {
      return NextResponse.json({ success: false, message: 'Erreur n8n' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erreur Serveur' }, { status: 500 });
  }
}