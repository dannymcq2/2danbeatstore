import React, { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import './BeatCard.css';

const BeatCard = ({ id, title, artist, price, audioUrl, image }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { addToCart } = useCart();

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAddToCart = () => {
    addToCart({ id, title, artist, price, audioUrl });
  };

  return (
    <div className="card">
      <img 
        src={image || 'https://source.unsplash.com/featured/?music'} 
        alt="" 
        className="img"
      />
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
      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
};

export default BeatCard;