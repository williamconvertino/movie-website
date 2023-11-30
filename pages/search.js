import React, { useState } from 'react';

import SearchResults from '@components/SearchResultsComponent';
import TopBar from '@components/TopBar';

export default function SearchPage() {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [genre, setGenre] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [sortOption, setSortOption] = useState('');

  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div>
      <TopBar />
      <div className = "movie-search">
        <h1>Search Movies</h1>
        <SearchResults/>

        <div className="options-buttons">
          <button onClick={toggleFilterOptions}>
            {showFilterOptions ? 'Hide Filtering Options' : 'Show Filtering Options'}
          </button>

          <button onClick={toggleSortOptions}>
            {showSortOptions ? 'Hide Sorting Options' : 'Show Sorting Options'}
          </button>
        </div>

        {showFilterOptions && (
          <div className="advanced-options">
            <h2>Filtering Options</h2>
            <ul>
              <li>
                <label>
                  Filter by genre:
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
                  Filter by year:
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

        {showSortOptions && (
          <div className="advanced-options">
            <h2>Sorting Options</h2>
            <ul>
              <li>
                <label>
                  Sort by:
                  <select value={sortOption} onChange={handleSortChange}>
                    <option value="">Select an option</option>
                    <option value="year">Year</option>
                    <option value="overallRating">Overall Rating</option>
                    <option value="numRatings">Number of Ratings</option>
                  </select>
                </label>
              </li>
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}