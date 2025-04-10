import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../animations';
import BeatCard from '../components/BeatCard';
import { useNavigate } from 'react-router-dom';
import { featuredBeats } from '../data/beats'; // Import centralized data
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
      {/* Hero Section */}
      <div className="hero">
        <h1>Find the Perfect Beat for Your Creativity</h1>
        <p>Explore unique beats for every style and mood.</p>
        <button className="cta-button" onClick={() => navigate('/browse')}>Browse Beats</button>
      </div>

      {/* Featured Beats Section */}
      <div className="featured-beats">
        <h2>Featured Beats</h2>
        <div className="beat-list">
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
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Dan's Beat Store. All Rights Reserved.</p>
        <div className="social-links">
          <a href="https://www.instagram.com/prod2dan/">Instagram</a>
          <a href="https://x.com/prodx2Dan">Twitter/X</a>
          <a href="https://www.youtube.com/@prod2Dan">YouTube</a>
        </div>
      </footer>
    </motion.div>
  );
};

export default HomePage;