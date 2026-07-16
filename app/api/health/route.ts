import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function GET() {
  try {
    // quick DB check
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'ok', db: true });
  } catch (e) {
    return NextResponse.json({ status: 'ok', db: false }, { status: 200 });
  }
}
