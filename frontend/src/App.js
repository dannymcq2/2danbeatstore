import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './components/CartPage';
import './pages/global.css';
import './styles/MobileGlobal.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <Router>
      <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;