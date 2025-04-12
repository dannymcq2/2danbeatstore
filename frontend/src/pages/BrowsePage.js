import React from 'react';
import BeatCard from '../components/BeatCard';
import { browseBeats } from '../data/beats'; // Import centralized data
import './BrowsePage.css';

const BrowsePage = () => {
  return (
    <div className="browse-page">
      <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '16px' }}>Browse Beats</h1>
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
  );
};

export default BrowsePage;