import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    if (!item || !item.id) {
      console.error('Invalid item provided. Make sure the item has an `id`.');
      return;
    }

    console.log('Adding to cart:', item);

    // Check if an identical item (based on a unique `id`) is already in the cart
    setCart((prevCart) => {
      if (prevCart.find((cartItem) => cartItem.id === item.id)) {
        console.warn(`Item with ID ${item.id} is already in the cart.`);
        return prevCart; // Return the cart unchanged
      }
      const updatedCart = [...prevCart, { ...item }]; // Add item to the cart
      console.log('Cart after addition:', updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    if (!id) {
      console.error('Invalid ID provided. Cannot remove item without an ID.');
      return;
    }

    console.log('Removing item with id:', id);

    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      console.log('Cart after removal:', updatedCart);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);