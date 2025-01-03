import React from 'react';
import { useCart } from '../context/CartContext';
import './CartDropdown.css';

const CartDropdown = () => {
  const { cart, removeFromCart } = useCart(); // Access cart and remove function from context

  return (
    <div className="cart-dropdown">
      <h4>Your Cart</h4>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="cart-item-details">
                <span>{item.title} - ${item.price.toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)} className="remove-x-btn">
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <a href="/checkout" className="checkout-link">
          Go to Checkout
        </a>
      )}
    </div>
  );
};

export default CartDropdown;