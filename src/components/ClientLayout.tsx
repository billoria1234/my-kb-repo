// components/ClientLayout.tsx

"use client";

import { Providers } from "@/app/providers";
import Navbar from "@/components/Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Navbar />
      <main className="min-h-[calc(100vh-120px)]">{children}</main>
      <footer className="bg-gray-50 py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} MediCare Pharmacy. All rights reserved.
          </p>
        </div>
      </footer>
    </Providers>
  );
}
