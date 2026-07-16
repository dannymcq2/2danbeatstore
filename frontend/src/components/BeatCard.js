import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import './BeatCard.css';

const BeatCard = ({ id, title, artist, price, audioUrl, image }) => {
  const { addToCart } = useCart();
  const { toggleBeat, isBeatPlaying } = useAudioPlayer();
  const isPlaying = isBeatPlaying(id);

  const handleAddToCart = () => {
    addToCart({ id, title, artist, price, audioUrl });
  };

  return (
    <article className={`beat-card${isPlaying ? ' playing' : ''}`}>
      <div className="beat-card-media">
        <Link to={`/beats/${id}`} className="beat-card-media-link" tabIndex={-1}>
          <img
            src={image || 'https://source.unsplash.com/featured/?music'}
            alt={title}
            className="beat-card-img"
            loading="lazy"
          />
        </Link>
        <button
          className="play-button"
          onClick={() => toggleBeat(id)}
          aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
        >
          <span className={isPlaying ? 'pause-icon' : 'play-icon'} />
        </button>
      </div>

      <div className="beat-card-body">
        <div className="beat-card-info">
          <Link to={`/beats/${id}`} className="beat-card-title">{title}</Link>
          <p className="beat-card-artist">{artist}</p>
        </div>
        <p className="beat-card-price">${price}</p>
      </div>

      <div className="beat-card-actions">
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default BeatCard;
