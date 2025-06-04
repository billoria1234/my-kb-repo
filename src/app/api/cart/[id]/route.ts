// app/api/cart/[id]/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/prisma';

export async function DELETE(
  req: NextRequest,
  context: any // ✅ TEMP FIX: avoid RouteContext type error
) {
  const id = context?.params?.id;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const item = await prisma.cartItem.findUnique({ where: { id } });

  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await prisma.cartItem.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
