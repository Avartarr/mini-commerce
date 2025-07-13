'use client';

import Image from 'next/image';
import type { CartItem } from '@/types';

interface CartItemProps {
  item: CartItem;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}


export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  return (
    <div className="flex items-center py-4 border-b">
      <div className="w-20 h-20 bg-gray-100 rounded mr-4">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-600">${item.price}</p>
      </div>
      <div className="flex items-center">
        <select
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
          className="border rounded p-1 mr-4"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
}