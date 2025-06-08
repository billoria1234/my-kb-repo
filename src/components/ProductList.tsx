'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Product = {
  id: number
  name: string
  price: number
  images: string[]
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received')
        }

        setProducts(data)
      } catch (err: any) {
        console.error('Fetch error:', err)
        setError(err.message || 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <LoadingSkeleton />
  if (error) return <ErrorDisplay message={error} />

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p className="col-span-full text-center py-8">No products available</p>
      )}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="border p-4 rounded shadow animate-pulse">
          <div className="bg-gray-200 h-40 w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  )
}

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="text-red-600 p-4 border border-red-200 bg-red-50 rounded">
      Error: {message}
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="border p-4 rounded shadow hover:shadow-md transition-shadow">
      <img
        src={product.images?.[0] || '/placeholder-product.jpg'}
        alt={product.name}
        className="w-full h-40 object-cover mb-2"
      />
      <h2 className="font-bold">{product.name}</h2>
      <p>${product.price.toFixed(2)}</p>
    </Link>
  )
}