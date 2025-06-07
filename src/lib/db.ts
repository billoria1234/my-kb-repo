// lib/db.ts
import { PrismaClient } from '@prisma/client'

// Type for our global prisma instance
declare global {
  var prisma: PrismaClient | undefined
}

// Initialize Prisma Client
const prisma = globalThis.prisma || new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL,
    },
  },
  log: ['query', 'info', 'warn', 'error'],
})

// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

export default prisma