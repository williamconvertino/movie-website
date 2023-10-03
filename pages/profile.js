import React, { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [username, setUsername] = useState('');
  
  const [ratedMovies, setRatedMovies] = useState([]);

  useEffect(() => {
    //API request to fetch username
    fetch('/api/user') //REPLACE WITH ACTUAL API URL
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    //API request to fetch rated movies
    fetch('/api/rated-movies') //REPLACE WITH ACTUAL API URL
      .then((response) => response.json())
      .then((data) => {
        setRatedMovies(data);
      })
      .catch((error) => {
        console.error('Error fetching rated movies:', error);
      });
  }, []);

  return (
    <div>
      <h1>Your Profile</h1>
      <p>Username: {username}</p>
      <h2>Previously Rated Movies</h2>
      <ul>
        {ratedMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}