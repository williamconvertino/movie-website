import React, { useState } from 'react';

import SearchResults from '@components/SearchResultsComponent';
import TopBar from '@components/TopBar';

export default function SearchPage() {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [genre, setGenre] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  return (
    <div>
      <TopBar />
      <div className = "movie-search">
        <h1>Search Movies</h1>
        <SearchResults/>
        <button onClick={toggleAdvancedOptions}>
            {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
        </button>

        {showAdvancedOptions && (
          <div className="advanced-options">
            <h2>Advanced Search Options</h2>
            <ul>
              <li>
                <label>
                  <input type="checkbox" /> Filter by genre:
                  <input
                    type="text"
                    placeholder = "Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> Filter by year:
                  <input
                    type="text"
                    placeholder="Start year"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                  />
                  <span> to </span>
                  <input
                    type="text"
                    placeholder="End year"
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                  />
                </label>
              </li>
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}