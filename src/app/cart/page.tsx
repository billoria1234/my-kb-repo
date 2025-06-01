'use client';

import { useEffect, useState } from 'react';

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
      <p className="p-4">
        {orderSuccess ? '🎉 Order placed successfully!' : 'Your cart is empty.'}
      </p>
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
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-28 h-28 object-cover rounded-md"
            />
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
              className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
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
          disabled={placingOrder}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded disabled:opacity-50"
        >
          {placingOrder ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}
