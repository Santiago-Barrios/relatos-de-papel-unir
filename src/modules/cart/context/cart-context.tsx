import { BookModel } from '@modules/books';
import { CartItemModel } from '../domain/cart.model';
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface CartContextType {
  items: CartItemModel[];
  addToCart: (book: BookModel) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItemModel[]>([]);

  const addToCart = (book: BookModel) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.book.id === book.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.book.id === book.id
            ? CartItemModel.create({ ...item, quantity: item.quantity + 1 })
            : item
        );
      }
      return [...prevItems, CartItemModel.create({ book, quantity: 1 })];
    });
  };

  const removeFromCart = (bookId: number) => {
    setItems(prevItems => prevItems.filter(item => item.book.id !== bookId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = (): number => {
    return items.reduce(
      (total, item) => total + item.book.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, getTotal }}
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
