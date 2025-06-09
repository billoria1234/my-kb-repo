'use client';

import { useEffect, useState } from 'react';

type Category = { id: string; name: string };

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (!res.ok || !Array.isArray(data.categories)) {
          throw new Error(data.error || 'Invalid data format from server');
        }
        setCategories(data.categories);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      }
    }
    load();
  }, []);

  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (categories.length === 0) return <p>No categories found.</p>;

  return (
    <div>
      <h2>Categories</h2>
      {categories.map((c) => (
        <div key={c.id}>{c.name}</div>
      ))}
    </div>
  );
}
