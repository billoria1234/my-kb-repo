import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    // Ensure array is returned
    if (!Array.isArray(categories)) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('❌ Failed to fetch categories:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch categories',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
