import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    // Connect to the database (optional, Prisma auto-connects)
    await prisma.$connect()

    // Fetch all products
    const products = await prisma.product.findMany()

    // Return the products as JSON
    return NextResponse.json(products)
  } catch (error) {
    console.error('❌ Failed to fetch products:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  } finally {
    // Disconnect from database to free resources
    await prisma.$disconnect()
  }
}
