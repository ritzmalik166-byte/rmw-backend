import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = body.token;

  if (!token) {
    return NextResponse.json({ success: false, error: 'Missing hCaptcha token' }, { status: 400 });
  }

  const secret = process.env.HCAPTCHA_SECRET;

  const formData = new URLSearchParams();
  formData.append('secret', secret || '');
  formData.append('response', token);

  try {
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: data['error-codes'] }, { status: 400 });
    }
  } catch (error: unknown) {
    console.error("Verification error:", error);
    return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 });
  }  
}
