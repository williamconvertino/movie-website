import React from 'react';

import SearchResults from '@components/SearchResultsComponent';
import TopBar from '@components/TopBar';

export default function SearchPage() {

  return (
    <div>
      <TopBar />
      <div className = "movie-search">
        <h1>Search Movies</h1>
        <SearchResults/>
      </div>
    </div>
  );
}