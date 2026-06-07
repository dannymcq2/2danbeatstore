import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBeatById, getRelatedBeats } from '../data/beats';
import { useCart } from '../context/CartContext';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { usePageTitle } from '../hooks/usePageTitle';
import BeatCard from '../components/BeatCard';
import './BeatDetailPage.css';

const formatTime = (seconds) => {
  if (!seconds || Number.isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const BeatDetailPage = () => {
  const { id } = useParams();
  const beat = getBeatById(id);
  const audioRef = useRef(null);
  const { addToCart } = useCart();
  const { toggleBeat, handleEnded, isBeatPlaying } = useAudioPlayer();
  const [selectedLicense, setSelectedLicense] = useState('mp3');
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  usePageTitle(beat?.title ?? 'Beat Not Found');

  const isPlaying = beat ? isBeatPlaying(beat.id) : false;
  const relatedBeats = beat ? getRelatedBeats(beat) : [];
  const activeLicense = beat?.licenses?.find((l) => l.id === selectedLicense);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !beat) return undefined;

    const onEnded = () => handleEnded(beat.id);
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [beat, handleEnded]);

  if (!beat) {
    return (
      <div className="beat-detail-page">
        <div className="page-shell beat-detail-not-found">
          <h1>Beat not found</h1>
          <p>This beat may have been removed or the link is incorrect.</p>
          <Link to="/browse" className="btn-primary">Back to Browse</Link>
        </div>
      </div>
    );
  }

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audio.duration;
    audio.currentTime = newTime;
  };

  const handleAddToCart = () => {
    if (!activeLicense) return;
    addToCart({
      id: `${beat.id}-${activeLicense.id}`,
      beatId: beat.id,
      title: `${beat.title} (${activeLicense.name})`,
      artist: beat.artist,
      price: activeLicense.price,
      audioUrl: beat.audioUrl,
      license: activeLicense.name,
    });
  };

  const metaItems = [
    { label: 'BPM', value: beat.bpm ?? 'TBD' },
    { label: 'Key', value: beat.key ?? 'TBD' },
    { label: 'Genre', value: beat.genre },
    { label: 'Mood', value: beat.mood ?? 'TBD' },
  ];

  return (
    <div className="beat-detail-page">
      <div className="page-shell">
        <Link to="/browse" className="beat-detail-back">← Back to Browse</Link>

        <div className="beat-detail-layout">
          <div className="beat-detail-media">
            <img src={beat.image} alt={beat.title} className="beat-detail-cover" />

            <div className="beat-detail-player">
              <button
                className="beat-detail-play-btn"
                onClick={() => toggleBeat(beat.id, audioRef.current)}
                aria-label={isPlaying ? `Pause ${beat.title}` : `Play ${beat.title}`}
              >
                <span className={isPlaying ? 'pause-icon' : 'play-icon'} />
              </button>

              <div className="beat-detail-progress-wrap">
                <div
                  className="beat-detail-progress-bar"
                  onClick={handleProgressClick}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div className="beat-detail-progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="beat-detail-time">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="beat-detail-info">
            <p className="beat-detail-eyebrow">{beat.artist}</p>
            <h1>{beat.title}</h1>
            <p className="beat-detail-description">{beat.description}</p>

            <div className="beat-detail-meta">
              {metaItems.map((item) => (
                <div key={item.label} className="beat-detail-meta-item">
                  <span className="beat-detail-meta-label">{item.label}</span>
                  <span className="beat-detail-meta-value">{item.value}</span>
                </div>
              ))}
            </div>

            {beat.tags.length > 0 && (
              <div className="beat-detail-tags">
                {beat.tags.map((tag) => (
                  <span key={tag} className="beat-detail-tag">{tag}</span>
                ))}
              </div>
            )}

            <div className="beat-detail-licenses">
              <h2>Choose a license</h2>
              {beat.licenses.map((license) => (
                <label
                  key={license.id}
                  className={`beat-detail-license ${selectedLicense === license.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="license"
                    value={license.id}
                    checked={selectedLicense === license.id}
                    onChange={() => setSelectedLicense(license.id)}
                  />
                  <div className="beat-detail-license-content">
                    <div className="beat-detail-license-header">
                      <span className="beat-detail-license-name">{license.name}</span>
                      <span className="beat-detail-license-price">${license.price}</span>
                    </div>
                    <p className="beat-detail-license-desc">{license.description}</p>
                  </div>
                </label>
              ))}
            </div>

            <button className="btn-primary beat-detail-add-btn" onClick={handleAddToCart}>
              Add to Cart — ${activeLicense?.price}
            </button>

            <p className="beat-detail-note">
              Payment integration coming soon. Cart preview is live.
            </p>
          </div>
        </div>

        {relatedBeats.length > 0 && (
          <section className="beat-detail-related">
            <h2 className="section-title">You might also like</h2>
            <div className="beat-grid">
              {relatedBeats.map((related) => (
                <BeatCard
                  key={related.id}
                  id={related.id}
                  title={related.title}
                  artist={related.artist}
                  price={related.price}
                  audioUrl={related.audioUrl}
                  image={related.image}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <audio ref={audioRef} src={beat.audioUrl} />
    </div>
  );
};

export default BeatDetailPage;
