import React from 'react';

function BeatCard({ title, previewUrl }) {
  return (
    <div className="beat-card">
      <h3>{title}</h3>
      <audio controls src={previewUrl}></audio>
      <button>Add to Cart</button>
    </div>
  );
}

export default BeatCard;