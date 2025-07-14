'use client';

import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryFilter } from '@/components/ui/CategoryFilter';
import { SkeletonGrid } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import { Suspense } from 'react';

async function getProducts(): Promise<Product[]> {
  const res = await fetch('/data/products.json');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

function HomeContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ['products', query, category],
    queryFn: getProducts,
  });

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = query
      ? product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      : true;
    const matchesCategory = category
      ? product.category === category
      : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    ...new Set(products?.map((product) => product.category)),
  ] as string[];

  if (isError) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Failed to load products. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-6">
          <SearchBar />
          <CategoryFilter categories={categories} />
        </aside>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Our Products</h1>
          {isLoading ? (
            <SkeletonGrid />
          ) : filteredProducts?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl">No products found</p>
              <p className="text-gray-500 mt-2">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<SkeletonGrid />}>
      <HomeContent />
    </Suspense>
  );
}