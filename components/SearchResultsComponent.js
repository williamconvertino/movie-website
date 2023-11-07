import React, { useState } from 'react';

import Link from 'next/link';

export default function SearchResultsComponent() {


  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onSearch = async () => {
    fetch(`/api/getMovies?searchQuery=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.movieData);
        })
        .catch((error) => {
          console.error('Error fetching autocomplete suggestions:', error);
        });
  }

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.length > 0) {
      fetch(`/api/autocompleteMovies?searchQuery=${newQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.movieData);
        })
        .catch((error) => {
          console.error('Error fetching autocomplete suggestions:', error);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Here"
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>
              <Link href={`/movieprofile?movieID=${suggestion.id}`}>{suggestion.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
