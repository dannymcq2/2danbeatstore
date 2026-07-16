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
            <BeatCard
              key={beat.id}
              id={beat.id}
              title={beat.title}
              artist={beat.artist}
              price={beat.price}
              audioUrl={beat.audioUrl}
              image={beat.image}
            />
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
