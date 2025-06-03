'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch('/api/cart');
        if (!res.ok) throw new Error('Failed to fetch cart');
        const data = await res.json();
        setCartItems(data.items);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  const handleDelete = async (itemId: string) => {
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete item');

      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error(error);
      alert('Failed to delete item');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    try {
      setPlacingOrder(true);
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!res.ok) throw new Error('Order failed');

      // Clear cart and show success
      setCartItems([]);
      setOrderSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Failed to place order');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) return <p className="p-4">Loading cart...</p>;
  if (cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center p-8">
        {orderSuccess ? (
          <>
            <Image 
              src="/order-success.svg" 
              alt="Order success" 
              width={200} 
              height={200}
              className="mb-4"
            />
            <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 Order placed successfully!</h2>
            <p className="text-gray-600">Your items will be shipped soon.</p>
          </>
        ) : (
          <>
            <Image 
              src="/empty-cart.svg" 
              alt="Empty cart" 
              width={200} 
              height={200}
              className="mb-4"
            />
            <h2 className="text-xl font-medium">Your cart is empty</h2>
            <p className="text-gray-600">Start shopping to add items to your cart</p>
          </>
        )}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Bag</h1>

      <div className="space-y-6">
        {cartItems.map(({ id, quantity, product }) => (
          <div
            key={id}
            className="flex items-start gap-4 border rounded-lg p-4 shadow-sm"
          >
            <div className="relative w-28 h-28">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-medium">{product.name}</h2>
              <p className="text-gray-700">Price: ₹{product.price}</p>
              <p className="text-gray-700">Quantity: {quantity}</p>
              <p className="text-gray-900 font-semibold mt-1">
                Total: ₹{product.price * quantity}
              </p>
            </div>
            <button
              onClick={() => handleDelete(id)}
              className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 border-t flex justify-between items-center">
        <span className="text-lg font-semibold">Total Amount:</span>
        <span className="text-xl font-bold">₹{calculateTotal()}</span>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={handlePlaceOrder}
          disabled={placingOrder || cartItems.length === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {placingOrder ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}