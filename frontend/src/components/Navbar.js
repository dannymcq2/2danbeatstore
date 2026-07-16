import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const Navbar = ({ toggleTheme, darkMode }) => {
  const { cart, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    if (!isCartOpen) return undefined;
    const onClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isCartOpen]);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">2Dan Beats</Link>

      <ul className="nav-links">
        <li><NavLink to="/browse">Browse</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/faq">FAQ</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>

      <div className="nav-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>

        <div className="cart-container" ref={cartRef}>
          <button
            className="cart-button"
            onClick={() => setIsCartOpen(!isCartOpen)}
            aria-label={`Cart, ${cart.length} items`}
          >
            <CartIcon />
            <span className="cart-button-label">Cart</span>
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>

          {isCartOpen && (
            <div className="cart-dropdown">
              <h4>Your Cart</h4>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul>
                  {cart.map((item) => (
                    <li key={item.id}>
                      <span>
                        {item.title} — ${parseFloat(item.price).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-x-btn"
                        aria-label={`Remove ${item.title}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {cart.length > 0 && (
                <Link
                  to="/checkout"
                  className="checkout-link"
                  onClick={() => setIsCartOpen(false)}
                >
                  Checkout
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
