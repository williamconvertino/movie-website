import React, {useState, useEffect} from 'react'; //useEffect hook for making API requests

//displays search results based on query from search.js
export default function SearchResults({query}) {
  const [results, setResults] = useState([]); //results holds search results fetched by the API

  useEffect(() => { //API request to fetch search results
    fetch(`/api/search?query=${query}`) //REPLACE WITH ACTUAL API URL
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  }, [query]);

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}