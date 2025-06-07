// File: app/api/products/route.ts

import { NextResponse } from 'next/server';
import prisma  from '@/lib/db'; // ✅ make sure this is the correct path to your Prisma instance

export async function GET() {
  try {
    console.log('➡️ GET /api/products called');

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        images: true,
      },
    });

    console.log(`✅ Found ${products.length} products`);
    return NextResponse.json(products);
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: String(error) },
      { status: 500 }
    );
  }
}
