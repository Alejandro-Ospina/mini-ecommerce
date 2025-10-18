import React, { createContext, useContext, useState } from "react";
import type { CartItem, Product } from "../types/types";

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((ci) => ci.product.id === item.product.id);
      if (exists) {
        return prev.map((ci) =>
          ci.product.id === item.product.id
            ? { ...ci, quantity: ci.quantity + item.quantity }
            : ci
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((ci) => ci.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((ci) =>
        ci.product.id === productId ? { ...ci, quantity } : ci
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
