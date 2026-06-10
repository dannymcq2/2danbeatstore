import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { usePageTitle } from '../hooks/usePageTitle';
import './CartPage.css';

const CartPage = () => {
  usePageTitle('Cart');
  const { cart, removeFromCart } = useCart();

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/browse" className="btn-primary">Browse Beats</Link>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <span>
                  {item.title} by {item.artist} — ${parseFloat(item.price).toFixed(2)}
                </span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <Link to="/checkout" className="checkout-link">Go to Checkout</Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
