'use client';

import Link from 'next/link';
import { useStore } from '@/store/store';
import Image from 'next/image';

export function ProductCard({ product }: { product: any }) {
  const { addToCart } = useStore();

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/product/${product.slug}`}>
        <div className="bg-gray-100 p-4">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-48 object-contain"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}