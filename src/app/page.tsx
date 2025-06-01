// app/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductList from "@/components/ProductList";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen p-8">
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to Our E-commerce Store
        </h1>

        <Link href="/cart">
          <Button>View Cart</Button>
        </Link>

        {session ? (
          <div className="text-center mb-8">
            <p className="mb-4">Welcome, {session.user?.email ?? "User"}!</p>
            <div className="space-x-4">
              <Link href="/products">
                <Button>Browse Products</Button>
              </Link>
              <Link href="/api/auth/signout">
                <Button variant="outline">Sign Out</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center mb-8">
            <p className="mb-4">Please sign in to shop</p>
            <div className="space-x-4">
              <Link href="/signin">
                <Button>Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="border-4 border-yellow-400 p-4">
          <ProductList />
        </div>
      </section>
    </main>
  );
}
