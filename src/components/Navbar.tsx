'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function Navbar() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            MediCare
          </Link>

          {/* Desktop search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search medicines, health products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-6">
            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link href="/signin" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                  Sign In
                </Link>
                <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Sign Up
                </Link>
              </>
            )}

            <Link href="/cart" className="flex items-center text-gray-700 hover:text-blue-600">
              <ShoppingCart size={20} /><span className="ml-1">Cart</span>
            </Link>
            <Link href="/account" className="flex items-center text-gray-700 hover:text-blue-600">
              <User size={20} /><span className="ml-1">Account</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Category bar (desktop) */}
        <div className="hidden md:flex justify-center space-x-6 py-2 border-t border-gray-100">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={`px-3 py-2 text-sm font-medium ${
                pathname === `/category/${cat.slug}`
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Mobile category links */}
            <div className="space-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === `/category/${cat.slug}`
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Mobile auth & cart/account */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {session ? (
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md font-medium text-red-600 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-50"
              >
                Shopping Cart
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-50"
              >
                My Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
