import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../animations';
import BeatCard from '../components/BeatCard';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { featuredBeats } from '../data/beats';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="home-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <section className="hero page-shell">
        <p className="hero-eyebrow">Premium instrumentals</p>
        <h1>Find the perfect beat for your next track</h1>
        <p className="hero-subtitle">
          Curated sounds for artists, creators, and producers.
        </p>
        <button className="btn-primary" onClick={() => navigate('/browse')}>
          Browse Beats
        </button>
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

      <Footer />
    </motion.div>
  );
};

export default HomePage;
