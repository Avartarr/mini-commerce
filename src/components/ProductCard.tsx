'use client';

import Link from 'next/link';
import { useStore } from '@/store/store';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/toast';
import Image from 'next/image';

export function ProductCard({ product }: { product: any }) {
  const { addToCart } = useStore();

  const handleAddToCart = () => {
    addToCart(product);
    toast(`${product.name} added to cart`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow dark:border-gray-700"
    >
      <Link href={`/product/${product.slug}`}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-contain"
            priority={false}
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-blue-600 dark:hover:text-blue-400">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}