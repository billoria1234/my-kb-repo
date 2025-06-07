// File: app/api/products/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '../../../prisma'; // ✅ update path if different

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
      { message: 'Internal Server Error', error: String(error) },
      { status: 500 }
    );
  }
}
