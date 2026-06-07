import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer>
    <div className="footer-inner page-shell">
      <div className="footer-brand">
        <span className="footer-logo">2Dan Beats</span>
        <p>Premium instrumentals for artists and creators.</p>
      </div>
      <nav className="footer-nav">
        <Link to="/browse">Browse</Link>
        <Link to="/about">About</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="social-links">
        <a href="https://www.instagram.com/prod2dan/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://x.com/prodx2Dan" target="_blank" rel="noreferrer">Twitter/X</a>
        <a href="https://www.youtube.com/@prod2Dan" target="_blank" rel="noreferrer">YouTube</a>
      </div>
    </div>
    <p className="footer-copy">&copy; {new Date().getFullYear()} 2Dan Beats. All rights reserved.</p>
  </footer>
);

export default Footer;
