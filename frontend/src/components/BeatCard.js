import React, { useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import './BeatCard.css';

const BeatCard = ({ id, title, artist, price, audioUrl, image }) => {
  const audioRef = useRef(null);
  const { addToCart } = useCart();
  const { playingId, toggleBeat, handleEnded } = useAudioPlayer();
  const isPlaying = playingId === id;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const onEnded = () => handleEnded(id);
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, [id, handleEnded]);

  const handleAddToCart = () => {
    addToCart({ id, title, artist, price, audioUrl });
  };

  return (
    <article className="beat-card">
      <div className="beat-card-media">
        <img
          src={image || 'https://source.unsplash.com/featured/?music'}
          alt={title}
          className="beat-card-img"
        />
        <button
          className="play-button"
          onClick={() => toggleBeat(id, audioRef.current)}
          aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
        >
          <span className={isPlaying ? 'pause-icon' : 'play-icon'} />
        </button>
      </div>

      <div className="beat-card-body">
        <div className="beat-card-info">
          <h3 className="beat-card-title">{title}</h3>
          <p className="beat-card-artist">{artist}</p>
        </div>
        <p className="beat-card-price">${price}</p>
      </div>

      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Add to Cart
      </button>

      <audio ref={audioRef} src={audioUrl} />
    </article>
  );
};

export default BeatCard;
