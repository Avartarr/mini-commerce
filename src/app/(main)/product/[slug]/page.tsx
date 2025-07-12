'use client';

import { useStore } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

async function getProduct(slug: string) {
  const res = await fetch('/data/products.json');
  const products = await res.json();
  return products.find((p: any) => p.slug === slug);
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', params.slug],
    queryFn: () => getProduct(params.slug),
  });

  const { addToCart } = useStore();

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg p-8">
          <Image src={product.image} alt={product.name} className="w-full" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">${product.price}</p>
          <p className="mb-6">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}