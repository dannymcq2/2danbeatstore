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

const WAVE_WIDTH = 2880;
const WAVE_HEIGHT = 220;
// The drift animation shifts each 200%-wide band by -50%, i.e. exactly
// WAVE_WIDTH / 2 viewBox units — so the curve must repeat with this period
// for the loop to be seamless. Integer harmonics of it keep that guarantee
// while making the crests irregular.
const WAVE_LOOP = WAVE_WIDTH / 2;
const WAVE_STEP = 60;

const r1 = (n) => Math.round(n * 10) / 10;

// Deterministic pseudo-random in [0,1) — stable across renders, no Math.random.
const hash = (seed) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

// Samples a y(x) function across the full wave width and joins the points
// as smooth Catmull-Rom-derived cubics. Shared by the filled wave bands and
// the open hairline strands below.
const sampleSmoothPath = (y) => {
  let d = `M0,${r1(y(0))}`;
  for (let x = 0; x < WAVE_WIDTH; x += WAVE_STEP) {
    const x2 = x + WAVE_STEP;
    const y1 = y(x);
    const y2 = y(x2);
    const y0 = y(x - WAVE_STEP);
    const y3 = y(x2 + WAVE_STEP);
    const c1y = y1 + (y2 - y0) / 6;
    const c2y = y2 - (y3 - y1) / 6;
    d += ` C${x + WAVE_STEP / 3},${r1(c1y)} ${x2 - WAVE_STEP / 3},${r1(c2y)} ${x2},${r1(y2)}`;
  }
  return d;
};

// Organic tiling wave line: a few sine harmonics summed with per-layer
// phases. Rendered as a stroke, not a fill — with nine overlapping bands,
// filled regions compound into a solid wash; thin lines don't.
const wavePath = ({ baseline, amp, harmonics }) => {
  const y = (x) =>
    baseline +
    amp *
      harmonics.reduce(
        (sum, [k, a, p]) => sum + a * Math.sin((2 * Math.PI * k * x) / WAVE_LOOP + p),
        0
      );
  return sampleSmoothPath(y);
};

// A single fine, mostly-straight strand with a gentle two-harmonic drift —
// an open stroke, not filled.
const hairlinePath = (baseline, amp, phase) => {
  const y = (x) =>
    baseline +
    amp * Math.sin((2 * Math.PI * x) / WAVE_WIDTH + phase) +
    amp * 0.35 * Math.sin((2 * Math.PI * 2.3 * x) / WAVE_WIDTH + phase * 1.7);
  return sampleSmoothPath(y);
};

const HAIRLINE_HEIGHT = 900;
const HAIRLINE_COUNT = 55;
const AMBIENT_HAIRLINES = Array.from({ length: HAIRLINE_COUNT }, (_, i) => ({
  baseline: 20 + i * ((HAIRLINE_HEIGHT - 40) / HAIRLINE_COUNT) + (hash(i * 2.3) - 0.5) * 16,
  amp: 8 + hash(i * 5.1) * 18,
  phase: hash(i * 8.7) * Math.PI * 2,
  opacity: 0.015 + hash(i * 3.9) * 0.035,
}));

// Layers cover the whole viewport, but spacing, height, shape, speed, and
// opacity are all deliberately jittered so nothing lines up too neatly.
const AMBIENT_WAVES = [
  { top: -5, height: 20, baseline: 58, amp: 14, harmonics: [[2, 1, 0.4], [3, 0.55, 2.1], [5, 0.3, 4.6]], drift: 46, reverse: false, bob: 13, opacity: 0.05 },
  { top: 6, height: 18, baseline: 66, amp: 18, harmonics: [[1, 1, 3.3], [4, 0.5, 0.9], [7, 0.22, 5.2]], drift: 34, reverse: true, bob: 17, opacity: 0.075 },
  { top: 19, height: 21, baseline: 52, amp: 12, harmonics: [[2, 1, 5.8], [5, 0.45, 1.7], [3, 0.6, 3.9]], drift: 56, reverse: false, bob: 11, opacity: 0.045 },
  { top: 28, height: 19, baseline: 70, amp: 20, harmonics: [[1, 1, 1.2], [3, 0.65, 4.4], [6, 0.28, 2.6]], drift: 30, reverse: true, bob: 19, opacity: 0.08 },
  { top: 42, height: 17, baseline: 60, amp: 15, harmonics: [[2, 1, 2.7], [4, 0.4, 5.9], [5, 0.35, 0.6]], drift: 50, reverse: false, bob: 14, opacity: 0.06 },
  { top: 52, height: 20, baseline: 55, amp: 17, harmonics: [[1, 1, 4.9], [5, 0.5, 2.3], [2, 0.7, 1.1]], drift: 38, reverse: true, bob: 12, opacity: 0.05 },
  { top: 65, height: 19, baseline: 64, amp: 21, harmonics: [[2, 1, 1.8], [3, 0.5, 5.4], [7, 0.25, 3.2]], drift: 28, reverse: false, bob: 16, opacity: 0.085 },
  { top: 76, height: 21, baseline: 57, amp: 13, harmonics: [[1, 1, 0.2], [4, 0.6, 3.5], [6, 0.3, 1.9]], drift: 52, reverse: true, bob: 10, opacity: 0.055 },
  { top: 90, height: 20, baseline: 62, amp: 19, harmonics: [[2, 1, 3.6], [5, 0.4, 0.3], [3, 0.55, 5.7]], drift: 40, reverse: false, bob: 15, opacity: 0.07 },
];

const AppContent = ({ darkMode, toggleTheme }) => {
  const { playingId } = useAudioPlayer();

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}${playingId ? ' has-player' : ''}`}>
      <div className="ambient-bg" aria-hidden="true">
        {AMBIENT_WAVES.map((wave) => (
          <div
            className="ambient-wave-band"
            key={wave.top}
            style={{
              top: `${wave.top}vh`,
              height: `${wave.height}vh`,
              '--wave-opacity': wave.opacity,
              '--bob-duration': `${wave.bob}s`,
              animation: `${wave.reverse ? 'ambient-wave-drift-reverse' : 'ambient-wave-drift'} ${wave.drift}s linear infinite`,
            }}
          >
            <svg viewBox={`0 0 ${WAVE_WIDTH} ${WAVE_HEIGHT}`} preserveAspectRatio="none">
              <path fill="none" stroke="var(--brand)" strokeWidth="2.5" d={wavePath(wave)} />
            </svg>
          </div>
        ))}

        <div className="ambient-hairlines">
          <svg
            viewBox={`0 0 ${WAVE_WIDTH} ${HAIRLINE_HEIGHT}`}
            preserveAspectRatio="none"
            width="100%"
            height="100%"
          >
            {AMBIENT_HAIRLINES.map((line, i) => (
              <path
                key={i}
                d={hairlinePath(line.baseline, line.amp, line.phase)}
                fill="none"
                stroke="var(--brand)"
                strokeWidth="1.4"
                strokeOpacity={line.opacity}
              />
            ))}
          </svg>
        </div>
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
