import { PrismaClient } from '@prisma/client'

export async function GET() {
  const prisma = new PrismaClient()
  try {
    // Test raw SQL connection
    const result = await prisma.$queryRaw`SELECT 1+1 as test`
    
    // Test table access
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public'
    `
    
    return Response.json({ 
      status: 'DB Connected',
      simpleQuery: result,
      tables: tables,
      env: {
        nodeEnv: process.env.NODE_ENV,
        dbUrl: process.env.DATABASE_URL?.replace(/\/\/[^@]+@/, '//user:****@')
      }
    })
  } catch (error) {
    return Response.json({
      error: error.message,
      code: error.code,
      meta: error.meta
    }, { status: 500 })
  }
}