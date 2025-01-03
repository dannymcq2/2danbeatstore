import React, { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import './BeatCard.css'; // Import the CSS file

const BeatCard = ({ id, title, artist, price, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Create a ref for the audio element
  const { addToCart } = useCart(); // Get addToCart from context

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAddToCart = () => {
    addToCart({ id, title, artist, price, audioUrl }); // Add beat to cart
  };

  return (
    <div className="card">
      <div className="content">
        <h2 className="title">{title}</h2>
        <p className="artist">By {artist}</p>
        <p className="price">${price}</p>
        <button className="playButton" onClick={togglePlay}>
          <div className={isPlaying ? 'pauseIcon' : 'playIcon'}></div>
        </button>
        <button className="addToCartButton" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
      <audio ref={audioRef} src={audioUrl} /> {/* Attach ref to the audio element */}
    </div>
  );
};

export default BeatCard;