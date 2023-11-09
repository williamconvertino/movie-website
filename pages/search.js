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
              {/* Add criteria with checkboxes */}
              <li>
                <label>
                  <input type="checkbox" /> Criterion 1
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> Criterion 2
                </label>
              </li>
              {/* Add more criteria as needed */}
            </ul>
          </div>
        )}
      </div>

      
    </div>
  );
}