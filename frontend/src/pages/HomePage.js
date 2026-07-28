import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../animations';
import BeatCard from '../components/BeatCard';
import { useNavigate } from 'react-router-dom';
import { featuredBeats } from '../data/beats';
import { usePageTitle } from '../hooks/usePageTitle';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  usePageTitle(null);

  return (
    <motion.div
      className="home-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-waves" aria-hidden="true">
          <svg className="hero-wave hero-wave-1" viewBox="0 0 2880 200" preserveAspectRatio="none">
            <path
              fill="var(--brand-2)"
              d="M0,90 C90,72 270,108 360,90 C450,72 630,108 720,90 C810,72 990,108 1080,90 C1170,72 1350,108 1440,90 C1530,72 1710,108 1800,90 C1890,72 2070,108 2160,90 C2250,72 2430,108 2520,90 C2610,72 2790,108 2880,90 L2880,200 L0,200 Z"
            />
          </svg>
          <svg className="hero-wave hero-wave-2" viewBox="0 0 2880 200" preserveAspectRatio="none">
            <path
              fill="var(--brand)"
              d="M0,130 C90,108 270,152 360,130 C450,108 630,152 720,130 C810,108 990,152 1080,130 C1170,108 1350,152 1440,130 C1530,108 1710,152 1800,130 C1890,108 2070,152 2160,130 C2250,108 2430,152 2520,130 C2610,108 2790,152 2880,130 L2880,200 L0,200 Z"
            />
          </svg>
          <svg className="hero-wave hero-wave-3" viewBox="0 0 2880 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroWaveFront" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--brand)" />
                <stop offset="100%" stopColor="var(--brand-2)" />
              </linearGradient>
            </defs>
            <path
              fill="url(#heroWaveFront)"
              d="M0,165 C90,149 270,181 360,165 C450,149 630,181 720,165 C810,149 990,181 1080,165 C1170,149 1350,181 1440,165 C1530,149 1710,181 1800,165 C1890,149 2070,181 2160,165 C2250,149 2430,181 2520,165 C2610,149 2790,181 2880,165 L2880,200 L0,200 Z"
            />
          </svg>
        </div>

        <div className="hero-inner page-shell">
          <h1>
            Find the perfect beat for your{' '}
            <span className="gradient-text">next track</span>
          </h1>
          <p className="hero-subtitle">
            Curated sounds for artists, creators, and producers.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/browse')}>
              Browse Beats
            </button>
          </div>
        </div>
      </section>

      <section className="featured-beats page-shell">
        <h2 className="section-title">Featured</h2>
        <div className="beat-grid">
          {featuredBeats.map((beat) => (
            <BeatCard key={beat.id} beat={beat} />
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
