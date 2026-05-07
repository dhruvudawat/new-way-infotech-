"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Cart, CartItem } from "@/types/cart";
import { Product } from "@/types/product";

interface CartContextType {
  cart: Cart;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialCart: Cart = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  totalPrice: 0,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(initialCart);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCart({ ...initialCart, ...parsed, subtotal: parsed.totalPrice || 0, total: parsed.totalPrice || 0 });
      } catch (e) {
        console.error("Failed to parse cart from localStorage");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const calculateTotals = (items: CartItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.18;
    const shipping = subtotal > 500 ? 0 : 50;
    return {
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      tax,
      shipping,
      total: subtotal + tax + shipping,
      totalPrice: subtotal + tax + shipping,
    };
  };

  const addItem = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existingItem = prev.items.find((item) => item.productId === product.id);
      let newItems: CartItem[];

      if (existingItem) {
        newItems = prev.items.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: Math.random().toString(36).substring(7),
          product: product,
          productId: product.id,
          productName: product.name,
          productImage: product.images?.[0] || "/placeholder-product.jpg",
          price: product.price,
          quantity,
          addedAt: new Date(),
        };
        newItems = [...prev.items, newItem];
      }

      return { items: newItems, ...calculateTotals(newItems) };
    });
  };

  const removeItem = (productId: string) => {
    setCart((prev) => {
      const newItems = prev.items.filter((item) => item.productId !== productId);
      return { items: newItems, ...calculateTotals(newItems) };
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) => {
      const newItems = prev.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      return { items: newItems, ...calculateTotals(newItems) };
    });
  };

  const clearCart = () => {
    setCart({ items: [], ...calculateTotals([]) });
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}