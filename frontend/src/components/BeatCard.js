import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import './BeatCard.css';

const BeatCard = ({ beat }) => {
  const { id, title, artist, audioUrl, image, bpm, key, mood, description, licenses, price } = beat;
  const { addToCart } = useCart();
  const { toggleBeat, isBeatPlaying } = useAudioPlayer();
  const isPlaying = isBeatPlaying(id);
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef(null);

  const metaLine = [bpm ? `${bpm} BPM` : null, key, mood].filter(Boolean).join(' · ');

  useEffect(() => {
    if (!pickerOpen) return undefined;
    const onClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [pickerOpen]);

  const handleSelectLicense = (license) => {
    addToCart({
      id: `${id}-${license.id}`,
      beatId: id,
      title: `${title} (${license.name})`,
      artist,
      price: license.price,
      audioUrl,
      license: license.name,
    });
    setPickerOpen(false);
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
        {description && (
          <div className="beat-card-overlay" aria-hidden="true">
            <p>{description}</p>
          </div>
        )}
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
          {metaLine && <p className="beat-card-meta">{metaLine}</p>}
        </div>
        <p className="beat-card-price">From ${price}</p>
      </div>

      <div className="beat-card-actions" ref={pickerRef}>
        <button
          className="add-to-cart-button"
          onClick={() => setPickerOpen((open) => !open)}
          aria-haspopup="true"
          aria-expanded={pickerOpen}
        >
          Add to Cart
        </button>

        {pickerOpen && (
          <div className="beat-card-license-picker">
            {licenses.map((license) => (
              <button
                key={license.id}
                className="beat-card-license-option"
                onClick={() => handleSelectLicense(license)}
              >
                <span className="beat-card-license-name">{license.name}</span>
                <span className="beat-card-license-price">${license.price}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default BeatCard;
