'use client';

import { useEffect } from 'react';

type ErrorBoundaryProps = {
  error: Error;
  reset: () => void;
};

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <h2 className="font-bold text-lg mb-2">Something went wrong!</h2>
        <p className="mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}