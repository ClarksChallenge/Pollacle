import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(req: Request) {
  // Dev-only guard
  if (process.env.NODE_ENV === 'production' || process.env.ALLOW_DEV_IMPERSONATION !== '1') {
    return NextResponse.json({ error: 'not allowed' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const email = body.email;
    if (!email) return NextResponse.json({ error: 'missing email' }, { status: 400 });

    // upsert user
    const user = await prisma.user.upsert({ where: { email }, update: {}, create: { email, name: 'Dev User' } });

    // create session token
    const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    await prisma.session.create({ data: { sessionToken: token, userId: user.id, expires } });

    return NextResponse.json({ sessionToken: token });
  } catch (err) {
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
