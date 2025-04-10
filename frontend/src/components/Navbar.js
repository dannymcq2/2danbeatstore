import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cart, removeFromCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/browse">Browse</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div
        className="cart-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button className="cart-button">
          🛒 Cart ({cart.length})
        </button>

        {isHovered && (
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
    </nav>
  );
};

export default Navbar;