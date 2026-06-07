import React, { useMemo, useState } from 'react';
import BeatCard from '../components/BeatCard';
import SearchBar from '../components/SearchBar';
import { allBeats } from '../data/beats';
import { usePageTitle } from '../hooks/usePageTitle';
import './BrowsePage.css';

const moods = ['All', ...new Set(allBeats.map((b) => b.mood).filter(Boolean))];

const BrowsePage = () => {
  usePageTitle('Browse');
  const [search, setSearch] = useState('');
  const [activeMood, setActiveMood] = useState('All');

  const filteredBeats = useMemo(() => {
    const query = search.toLowerCase().trim();
    return allBeats.filter((beat) => {
      const matchesMood = activeMood === 'All' || beat.mood === activeMood;
      const matchesSearch =
        !query ||
        beat.title.toLowerCase().includes(query) ||
        beat.artist.toLowerCase().includes(query) ||
        beat.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        (beat.mood && beat.mood.toLowerCase().includes(query));
      return matchesMood && matchesSearch;
    });
  }, [search, activeMood]);

  return (
    <div className="browse-page">
      <div className="page-shell">
        <header className="browse-header">
          <h1>Browse Beats</h1>
          <p>Explore the full catalog and find your sound.</p>
        </header>

        <div className="browse-filters">
          <SearchBar value={search} onChange={setSearch} />
          <div className="mood-filters">
            {moods.map((mood) => (
              <button
                key={mood}
                className={`mood-chip ${activeMood === mood ? 'active' : ''}`}
                onClick={() => setActiveMood(mood)}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {filteredBeats.length === 0 ? (
          <div className="browse-empty">
            <p>No beats match your search.</p>
            <button
              className="btn-primary"
              onClick={() => { setSearch(''); setActiveMood('All'); }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="beat-grid">
            {filteredBeats.map((beat) => (
              <BeatCard
                key={beat.id}
                id={beat.id}
                title={beat.title}
                artist={beat.artist}
                price={beat.price}
                audioUrl={beat.audioUrl}
                image={beat.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
