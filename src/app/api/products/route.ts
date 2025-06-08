import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const products = await prisma.product.findMany();

    // Make sure we always return an array
    if (!Array.isArray(products)) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('❌ Failed to fetch products:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
