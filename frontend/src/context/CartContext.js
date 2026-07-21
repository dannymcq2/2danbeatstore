import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();

// Bulk deal: for every 3 items in the cart, the cheapest one is free.
// Set PROMO_ENABLED to false to turn the deal off everywhere.
export const PROMO_ENABLED = true;
export const PROMO_LABEL = 'Buy 2, get 1 free';

const CART_STORAGE_KEY = '2dan-cart';

const loadCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage unavailable (private mode etc.) — cart still works in memory
    }
  }, [cart]);

  const addToCart = (item) => {
    if (!item?.id) return;

    setCart((prevCart) => {
      if (prevCart.some((cartItem) => cartItem.id === item.id)) {
        return prevCart;
      }
      return [...prevCart, { ...item }];
    });
  };

  const removeFromCart = (id) => {
    if (!id) return;
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
    const freeCount = PROMO_ENABLED ? Math.floor(cart.length / 3) : 0;
    const discount = [...cart]
      .sort((a, b) => parseFloat(a.price || 0) - parseFloat(b.price || 0))
      .slice(0, freeCount)
      .reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
    return {
      subtotal,
      discount,
      total: subtotal - discount,
      promoApplied: freeCount > 0,
    };
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, ...totals }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
