import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: 'black', padding: '10px' }}>
      <Link to="/" style={{ color: 'white', margin: '10px' }}>Home</Link>
      <Link to="/browse" style={{ color: 'white', margin: '10px' }}>Browse</Link>
      <Link to="/checkout" style={{ color: 'white', margin: '10px' }}>Checkout</Link>
      <Link to="/contact" style={{ color: 'white', margin: '10px' }}>Contact</Link>
    </nav>
  );
};

export default Navbar;