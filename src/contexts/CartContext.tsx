import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Product } from '../types/product';
import * as cartApi from '../services/api';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await cartApi.getCart();
      console.log("fetchCary ::::", result);

      const cartData = result.data?.data || result.data || result;
      setItems(cartData.items || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: any, quantity = 1) => {
    setLoading(true);
    setError(null);
    try {
      const result = await cartApi.addToCart(product._id || product.id, quantity);
      const cartData = result.data?.data || result.data || result;
      setItems(cartData.items || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error adding to cart:', err);
      
      // Optimistic update fallback
      setItems((prev) => {
        const existing = prev.find((item:any) => item.product._id === product._id);
        if (existing) {
          return prev.map((item:any) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { product, quantity }];
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await cartApi.removeFromCart(productId);
      const cartData = result.data?.data || result.data || result;
      const updateItems = items.filter((data:any) => {
        return data.product._id != cartData?.items[0]?.product
      }) 
      setItems(updateItems || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error removing from cart:', err);
      
      // Optimistic update fallback
      setItems((prev) => prev.filter((item:any) => item.product._id !== productId));
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const result = await cartApi.updateCartItem(productId, quantity);      
      const cartData = result.data?.data || result.data || result;
      const updateItems = items.map((data:any) => {
        if(data.product._id == cartData?.items[0]?.product){

          return {
            ...data,
            quantity: cartData?.items[0].quantity
          };
        }
        else{
          return data;
        }

      })
      setItems(updateItems || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error updating cart:', err);
      
      // Optimistic update fallback
      setItems((prev) =>
        prev.map((item:any) =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await cartApi.clearCart();
      if (!response.ok) throw new Error('Failed to clear cart');
      
      setItems([]);
    } catch (err: any) {
      setError(err.message);
      console.error('Error clearing cart:', err);
      
      // Optimistic update fallback
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};