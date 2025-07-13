'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type CategoryFilterProps = {
  categories: string[];
};

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get('category');

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', category);
    router.replace(`/?${params.toString()}`);
  };

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('category');
    router.replace(`/?${params.toString()}`);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={clearFilter}
          className={`px-3 py-1 text-sm rounded-full ${
            !selectedCategory
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-3 py-1 text-sm rounded-full capitalize ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}