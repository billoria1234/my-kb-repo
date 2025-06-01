'use client';

import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    setLoadingProductId(productId);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!res.ok) {
        let errMsg = 'Failed to add to cart';
        try {
          const err = await res.json();
          errMsg = err.message || err.error || errMsg;
        } catch {
          // JSON parse failed, fallback to default message
        }
        throw new Error(errMsg);
      }

      alert('Item added to cart!');
    } catch (error: any) {
      alert(error.message || 'Error adding to cart');
    } finally {
      setLoadingProductId(null);
    }
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-xl shadow-md p-5 bg-white flex flex-col justify-between hover:shadow-lg transition-shadow"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-56 w-full object-cover mb-4 rounded-lg"
          />
          <h2 className="text-xl font-semibold mb-1 truncate">{product.name}</h2>
          <p className="text-gray-700 mb-4 text-lg">₹{product.price}</p>
          <button
            onClick={() => handleAddToCart(product.id)}
            disabled={loadingProductId === product.id}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loadingProductId === product.id ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      ))}
    </div>
  );
}
