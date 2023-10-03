import React, { useState } from 'react';

import SearchBar from '@components/SearchBarComponent';
import SearchResults from '@components/SearchResultsComponent';
import TopBar from '@components/TopBar';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <div>
      <TopBar />
      <h1>Search Movies</h1>
      <SearchBar onSearch={handleSearch} />
      {query && <SearchResults query={query} />}
    </div>
  );
}