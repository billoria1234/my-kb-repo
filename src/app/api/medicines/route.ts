// app/api/medicines/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const medicines = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 50
    });

    if (!medicines || medicines.length === 0) {
      return NextResponse.json(
        { medicines: [], message: "No products found" },
        { status: 200 }
      );
    }

    return NextResponse.json({ medicines }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}