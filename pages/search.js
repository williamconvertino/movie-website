import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <SearchBar onSearch={handleSearch} />
      {query && <SearchResults query={query} />}
    </div>
  );
}