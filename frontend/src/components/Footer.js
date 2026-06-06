import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer>
    <p>&copy; {new Date().getFullYear()} Dan&apos;s Beat Store. All Rights Reserved.</p>
    <div className="social-links">
      <a href="https://www.instagram.com/prod2dan/">Instagram</a>
      <a href="https://x.com/prodx2Dan">Twitter/X</a>
      <a href="https://www.youtube.com/@prod2Dan">YouTube</a>
    </div>
  </footer>
);

export default Footer;
