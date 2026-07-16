import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { logServerError } from '@/app/lib/server-helpers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, email, purpose, value } = body;

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined;
    const ua = req.headers.get('user-agent') || undefined;

    const record = await prisma.consent.create({
      data: {
        userId: userId || null,
        email: email || null,
        purpose: purpose || 'general',
        value: !!value,
        ip,
        userAgent: ua,
      },
    });

    return NextResponse.json({ success: true, id: record.id });
  } catch (error) {
    logServerError('consent-post', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
