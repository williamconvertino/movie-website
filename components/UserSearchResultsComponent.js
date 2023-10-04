import React, {
  useEffect,
  useState,
} from 'react'; //useEffect hook for making API requests

//displays search results based on query from search.js
export default function UserSearchResults({ query }) {
  const [results, setResults] = useState([]); //results holds search results fetched by the API

  useEffect(() => {
    fetch(`/api/getUsers?username=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.userData);
        console.log(data)
        console.log(results)
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
          <li key={result.id}>{result.username} {result.email}</li>
        ))}
      </ul>
    </div>
  );
}