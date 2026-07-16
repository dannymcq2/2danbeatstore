import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NowPlayingBar from './components/NowPlayingBar';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import BeatDetailPage from './pages/BeatDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './components/CartPage';
import { useAudioPlayer } from './context/AudioPlayerContext';
import './pages/global.css';
import './styles/MobileGlobal.css';

const AppContent = ({ darkMode, toggleTheme }) => {
  const { playingId } = useAudioPlayer();

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}${playingId ? ' has-player' : ''}`}>
      <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/beats/:id" element={<BeatDetailPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </main>
      <NowPlayingBar />
    </div>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <Router>
      <AppContent darkMode={darkMode} toggleTheme={toggleTheme} />
    </Router>
  );
};

export default App;
