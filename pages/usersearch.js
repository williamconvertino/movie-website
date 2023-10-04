import React, { useState } from 'react';

import SearchBar from '@components/SearchBarComponent';
import TopBar from '@components/TopBar';
import UserSearchResults from '@components/UserSearchResultsComponent';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <div>
      <TopBar />
      <div className = "movie-search">
        <h1>Search Users</h1>
        <SearchBar onSearch={handleSearch} />
        {query && <UserSearchResults query={query} />}
      </div>
    </div>
  );
}