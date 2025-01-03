import React from 'react';
import BeatCard from '../components/BeatCard';
import { browseBeats } from '../data/beats'; // Import centralized data

const BrowsePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Browse Beats</h1>
      <div style={styles.grid}>
        {browseBeats.map((beat) => (
          <BeatCard
            key={beat.id}
            id={beat.id}
            title={beat.title}
            artist={beat.artist}
            price={beat.price}
            audioUrl={beat.audioUrl}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '16px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    justifyContent: 'center',
  },
};

export default BrowsePage;