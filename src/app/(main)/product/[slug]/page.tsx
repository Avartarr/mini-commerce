'use client';

import { useStore } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Product } from '@/types';

async function getProduct(slug: string): Promise<Product | undefined> {
  const res = await fetch('/data/products.json');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const products: Product[] = await res.json();
  return products.find((p) => p.slug === slug);
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { addToCart } = useStore();

  const { data: product, isLoading, isError } = useQuery<Product | undefined>({
    queryKey: ['product', params.slug],
    queryFn: () => getProduct(params.slug),
  });

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error loading products</div>;
  if (!product) return <div className="text-center py-8">Product not found</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-6 text-gray-600 dark:text-gray-300">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
