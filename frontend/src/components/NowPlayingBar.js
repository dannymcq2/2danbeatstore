import React from 'react';
import { Link } from 'react-router-dom';
import { useAudioPlayer, formatTime } from '../context/AudioPlayerContext';
import { getBeatById } from '../data/beats';
import './NowPlayingBar.css';

const PrevIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h2v12H6zM9.5 12l8.5 6V6z" />
  </svg>
);

const NextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z" />
  </svg>
);

const NowPlayingBar = () => {
  const {
    playingId,
    isPaused,
    currentTime,
    duration,
    progress,
    toggleCurrent,
    stopCurrent,
    playNext,
    playPrev,
    seek,
  } = useAudioPlayer();
  const beat = playingId ? getBeatById(playingId) : null;

  if (!beat) return null;

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    seek((e.clientX - rect.left) / rect.width);
  };

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

        <div className="now-playing-progress">
          <span className="now-playing-time">{formatTime(currentTime)}</span>
          <div
            className="now-playing-progress-bar"
            onClick={handleSeek}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="now-playing-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="now-playing-time">{formatTime(duration)}</span>
        </div>

        <div className="now-playing-controls">
          <button
            className="now-playing-btn now-playing-skip"
            onClick={playPrev}
            aria-label="Previous beat"
          >
            <PrevIcon />
          </button>
          <button
            className="now-playing-btn"
            onClick={toggleCurrent}
            aria-label={isPaused ? 'Resume' : 'Pause'}
          >
            <span className={isPaused ? 'play-icon' : 'pause-icon'} />
          </button>
          <button
            className="now-playing-btn now-playing-skip"
            onClick={playNext}
            aria-label="Next beat"
          >
            <NextIcon />
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
