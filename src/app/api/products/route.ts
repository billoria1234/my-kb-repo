// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma';

export async function GET() {
  try {
    // Add connection testing
    await prisma.$connect();
    
    const products = await prisma.product.findMany({
      // Add explicit select for better practice
      select: {
        id: true,
        name: true,
        price: true,
        // include other fields you need
      },
      // Add pagination for production safety
      take: 100, // Limit number of results
    });

    await prisma.$disconnect();
    
    return NextResponse.json(products);
  } catch (error) {
    console.error("API /api/products error:", error);
    
    // Ensure connection is closed even if error occurs
    await prisma.$disconnect().catch(() => {});

    // Return more detailed error in development
    const errorMessage = process.env.NODE_ENV === 'development'
      ? `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      : 'Internal server error';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}