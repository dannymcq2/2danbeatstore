import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

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

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
