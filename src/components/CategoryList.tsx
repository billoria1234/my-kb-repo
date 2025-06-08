'use client';

import { useEffect, useState } from 'react';

type Category = {
  id: string;
  name: string;
};

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Categories</h2>
      {Array.isArray(categories) ? (
        categories.map((cat) => (
          <div key={cat.id} className="py-1 px-2 bg-gray-100 rounded mb-1">
            {cat.name}
          </div>
        ))
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  );
}
