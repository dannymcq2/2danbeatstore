import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ toggleTheme, darkMode }) => {
  const { cart, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/browse">Browse</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="nav-right">
        <div className="nav-brand">
          <Link to="/" className="brand-text"><span className="gradient-text">2Dan Beats</span></Link>
        </div>

        <div className="cart-theme-wrapper">
        <label className="theme-switch">
  <input type="checkbox" onChange={toggleTheme} checked={darkMode} />
  <span className="slider"></span>
</label>

          <div className="cart-container">
            <button
              className="cart-button"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              🛒 Cart ({cart.length})
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
                          {item.title} - ${parseFloat(item.price).toFixed(2)}
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
                  <Link to="/checkout" className="checkout-link">Go to Checkout</Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
