import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import BeatDetailPage from './pages/BeatDetailPage';
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
        <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/beats/:id" element={<BeatDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;