import React from 'react';
import { Link } from 'react-router-dom';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { getBeatById } from '../data/beats';
import './NowPlayingBar.css';

const NowPlayingBar = () => {
  const { playingId, isPaused, toggleCurrent, stopCurrent } = useAudioPlayer();
  const beat = playingId ? getBeatById(playingId) : null;

  if (!beat) return null;

  return (
    <div className="now-playing-bar">
      <div className="now-playing-inner page-shell">
        <img src={beat.image} alt="" className="now-playing-art" />
        <div className="now-playing-info">
          <span className="now-playing-label">Now playing</span>
          <Link to={`/beats/${beat.id}`} className="now-playing-title">
            {beat.title}
          </Link>
          <span className="now-playing-artist">{beat.artist}</span>
        </div>
        <div className="now-playing-controls">
          <button
            className="now-playing-btn"
            onClick={toggleCurrent}
            aria-label={isPaused ? 'Resume' : 'Pause'}
          >
            <span className={isPaused ? 'play-icon' : 'pause-icon'} />
          </button>
          <button
            className="now-playing-btn now-playing-close"
            onClick={stopCurrent}
            aria-label="Stop"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingBar;
