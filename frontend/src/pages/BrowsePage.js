import React, { useMemo, useState } from 'react';
import BeatCard from '../components/BeatCard';
import SearchBar from '../components/SearchBar';
import { allBeats } from '../data/beats';
import { PROMO_ENABLED, PROMO_LABEL } from '../context/CartContext';
import { usePageTitle } from '../hooks/usePageTitle';
import './BrowsePage.css';

const moods = ['All', ...new Set(allBeats.map((b) => b.mood).filter(Boolean))];

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'title', label: 'Title A–Z' },
];

const BrowsePage = () => {
  usePageTitle('Browse');
  const [search, setSearch] = useState('');
  const [activeMood, setActiveMood] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filteredBeats = useMemo(() => {
    const query = search.toLowerCase().trim();
    const filtered = allBeats.filter((beat) => {
      const matchesMood = activeMood === 'All' || beat.mood === activeMood;
      const matchesSearch =
        !query ||
        beat.title.toLowerCase().includes(query) ||
        beat.artist.toLowerCase().includes(query) ||
        beat.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        (beat.mood && beat.mood.toLowerCase().includes(query));
      return matchesMood && matchesSearch;
    });

    const sorted = [...filtered];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  }, [search, activeMood, sortBy]);

  return (
    <div className="browse-page">
      <div className="page-shell">
        <header className="browse-header">
          <h1>Browse Beats</h1>
          <p>Explore the full catalog and find your sound.</p>
        </header>

        {PROMO_ENABLED && (
          <div className="promo-banner">
            <strong>{PROMO_LABEL}</strong> — add 3 beats to your cart and the
            cheapest one is free, automatically.
          </div>
        )}

        <div className="browse-filters">
          <div className="browse-controls">
            <SearchBar value={search} onChange={setSearch} />
            <label className="sort-control">
              <span className="sort-label">Sort</span>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
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
              <BeatCard key={beat.id} beat={beat} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
