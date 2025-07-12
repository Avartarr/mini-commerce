'use client';

import { ProductCard } from '@/components/ProductCard';
import { useQuery } from '@tanstack/react-query';

async function getProducts() {
  const res = await fetch('/data/products.json');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default function Home() {
  const {data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if(isLoading) return <div>Loading...</div>

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}