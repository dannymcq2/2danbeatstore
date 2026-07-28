import React, { useEffect, useState } from 'react';
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

const WAVE_HEIGHT = 220;
const WAVE_PERIOD = 360;
const WAVE_REPEATS = 8; // 2880 / 360, so a -50% drift is an exact multiple of the period (seamless loop)

// Tiling wave shape: curve along the top, filled to the bottom of its band.
const wavePath = (amplitude, baseline = 60) => {
  let d = `M0,${baseline}`;
  for (let i = 0; i < WAVE_REPEATS; i++) {
    const x0 = i * WAVE_PERIOD;
    d += ` C${x0 + WAVE_PERIOD * 0.25},${baseline - amplitude} ${x0 + WAVE_PERIOD * 0.75},${baseline + amplitude} ${x0 + WAVE_PERIOD},${baseline}`;
  }
  return `${d} L2880,${WAVE_HEIGHT} L0,${WAVE_HEIGHT} Z`;
};

// Layers tile the full viewport: each band is 18vh tall, spaced 12vh apart,
// so every band's fill reaches under the next wave line — waves cover the
// whole background, not just the top.
const AMBIENT_WAVES = Array.from({ length: 9 }, (_, i) => ({
  top: i * 12 - 4,
  amplitude: [14, 22, 10, 26, 16, 20, 12, 24, 18][i],
  duration: [58, 44, 66, 38, 52, 42, 62, 36, 48][i],
  reverse: i % 2 === 1,
  opacity: i % 2 === 0 ? 0.05 : 0.08,
}));

const AppContent = ({ darkMode, toggleTheme }) => {
  const { playingId } = useAudioPlayer();

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}${playingId ? ' has-player' : ''}`}>
      <div className="ambient-bg" aria-hidden="true">
        {AMBIENT_WAVES.map(({ top, amplitude, duration, reverse, opacity }) => (
          <div
            className="ambient-wave-band"
            key={top}
            style={{
              top: `${top}vh`,
              '--wave-opacity': opacity,
              animation: `${reverse ? 'ambient-wave-drift-reverse' : 'ambient-wave-drift'} ${duration}s linear infinite`,
            }}
          >
            <svg viewBox={`0 0 2880 ${WAVE_HEIGHT}`} preserveAspectRatio="none">
              <path fill="var(--brand)" d={wavePath(amplitude)} />
            </svg>
          </div>
        ))}
      </div>
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
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('2dan-theme') !== 'light';
    } catch {
      return true;
    }
  });
  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    try {
      localStorage.setItem('2dan-theme', darkMode ? 'dark' : 'light');
    } catch {
      // storage unavailable — theme just won't persist
    }
  }, [darkMode]);

  return (
    <Router>
      <AppContent darkMode={darkMode} toggleTheme={toggleTheme} />
    </Router>
  );
};

export default App;
