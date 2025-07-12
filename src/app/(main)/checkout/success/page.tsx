'use client';

import { useStore } from '@/store/store';
import { useHydration } from '@/hooks/useHydration';
import Link from 'next/link';

export default function SuccessPage() {
  const { orderId } = useStore();
  const isHydrated = useHydration();

  if (!isHydrated) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-12 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="mb-6">Your order has been placed successfully.</p>
        {orderId && (
          <p className="mb-6">
            Order ID: <span className="font-mono font-bold">{orderId}</span>
          </p>
        )}
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}