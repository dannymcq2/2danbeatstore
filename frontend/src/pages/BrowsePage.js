import React from 'react';
import BeatCard from '../components/BeatCard';
import { browseBeats } from '../data/beats';
import './BrowsePage.css';

const BrowsePage = () => {
  return (
    <div className="browse-page">
      <div className="page-shell">
        <header className="browse-header">
          <h1>Browse Beats</h1>
          <p>Explore the full catalog and find your sound.</p>
        </header>

        <div className="beat-grid">
          {browseBeats.map((beat) => (
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
    </div>
  );
};

export default BrowsePage;
