import React, { useState } from 'react';

import SearchResults from '@components/SearchResultsComponent';
import TopBar from '@components/TopBar';

export default function SearchPage() {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

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
                  <input type="checkbox" /> Filter by genre
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> Sort by name
                </label>
              </li>
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}