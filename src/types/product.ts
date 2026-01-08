export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  inStock: boolean;
}

export type Category = 'all' | 'clothing' | 'accessories' | 'shoes' | 'bags';
