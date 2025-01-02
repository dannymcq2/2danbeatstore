// src/pages/CartPage.js
import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.uniqueId}>
              <span>
                {item.title} by {item.artist} - ${item.price.toFixed(2)}
              </span>
              <button onClick={() => removeFromCart(item.uniqueId)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;