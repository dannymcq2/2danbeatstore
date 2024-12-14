import React, { useState } from 'react';

const BrowsePage = () => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="browse-page" style={{ backgroundColor: 'lightblue', padding: '20px' }}>
      <h1 style={{ color: 'purple' }}>Browse Page</h1>
      <input
        type="text"
        placeholder="Search for beats by genre, mood, tempo, etc."
        value={search}
        onChange={handleSearchChange}
        style={{ padding: '10px', marginBottom: '20px' }}
      />
      <div className="beats">
        <h2>Beat 1</h2>
        <p>[Beat placeholder]</p>
        <h2>Beat 2</h2>
        <p>[Beat placeholder]</p>
        <h2>Beat 3</h2>
        <p>[Beat placeholder]</p>
      </div>
    </div>
  );
};

export default BrowsePage;