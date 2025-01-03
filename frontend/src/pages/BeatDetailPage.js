import React from 'react';
import { useParams } from 'react-router-dom';

function BeatDetailPage() {
  const { id } = useParams(); // Get the beat ID from the URL

  return (
    <div>
      <h1>Beat Details</h1>
      <p>Details for Beat ID: {id}</p>
      {/* Add more details later (e.g., audio player, metadata) */}
      <button>Play</button>
      <button>Pause</button>
      <button>Next</button>
    </div>
  );
}

export default BeatDetailPage;