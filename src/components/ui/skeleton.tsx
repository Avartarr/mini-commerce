'use client';

import { motion } from 'framer-motion';

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
          className="border rounded-lg overflow-hidden"
        >
          <div className="bg-gray-200 dark:bg-gray-700 h-48 w-full" />
          <div className="p-4 space-y-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}