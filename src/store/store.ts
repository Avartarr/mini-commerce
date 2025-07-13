import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type CartItem = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type StoreState = {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  orderId: string | null;
  setOrderId: (id: string) => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      orderId: null,
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      setOrderId: (id) => set({ orderId: id }),
    }),
    {
      name: 'mini-commerce-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const cartTotalItems = () => useStore.getState().cart.reduce((sum, item) => sum + item.quantity, 0);
export const cartSubtotal = () => useStore.getState().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const cartTotal = () => cartSubtotal() * 1.1; 