import React, { useState } from 'react';

export default function SearchResultsComponent({genre, startYear, endYear, sortOption}) {


  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onSearch = async () => {
    
    fetch(`/api/getMovies?searchQuery=${query}&genre=${genre}&startYear=${startYear}&endYear=${endYear}&sortOption=${sortOption}`)
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

    //return
    //THIS RETURN STATEMENT STOPS THE AUTOCOMPLETE
    //Autocomplete is cool, but it causes a lot of database queries; only use it for demos

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
            <div key={suggestion.id}>
              <a href={`/movieprofile?movieID=${suggestion.id}`}> {`${suggestion.name} (${suggestion.releaseDate})`}</a>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
