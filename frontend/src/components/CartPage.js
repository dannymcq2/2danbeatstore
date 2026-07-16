import React from 'react';
import { Link } from 'react-router-dom';
import { useCart, PROMO_LABEL } from '../context/CartContext';
import { usePageTitle } from '../hooks/usePageTitle';
import './CartPage.css';

const CartPage = () => {
  usePageTitle('Cart');
  const { cart, removeFromCart, subtotal, discount, total, promoApplied } = useCart();

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
          <div className="cart-totals">
            {promoApplied && (
              <>
                <div className="cart-totals-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="cart-totals-row cart-totals-discount">
                  <span>{PROMO_LABEL}</span>
                  <span>−${discount.toFixed(2)}</span>
                </div>
              </>
            )}
            <div className="cart-totals-row cart-totals-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/checkout" className="checkout-link">Go to Checkout</Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
