export interface Product {
    id: number;
    slug: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating?: number;
  }
  
  export interface CartItem {
    id: number;
    slug: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }