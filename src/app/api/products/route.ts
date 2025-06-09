// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("API /api/products error:", error);  // ✅ log the full error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
