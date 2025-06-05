// File: app/api/products/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '../../../prisma'; // ✅ use a shared Prisma client instance

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        images: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error); // ✅ log the error
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
