import React, {
  useEffect,
  useState,
} from 'react';

import {
  addDoc,
  collection,
} from 'firebase/firestore';

import { UserAuth } from '@components/context/AuthContext';
import TopBar from '@components/TopBar';
import { db } from '@firebase';

export default function ProfilePage() {
  const {user, profile, emailSignUp, emailSignIn, logOut} = UserAuth()
  
  const [reviews, setReviews] = useState([]);
  
  const [savedMovies, setSavedMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');

  const getReviews = async () => {
    if (!profile) return;
    const res = await fetch(`/api/getReviewUser?userID=${profile.id}`)
    const data = await res.json()
    const reviews = data.reviewData

    const movieTasks = reviews.map(async (review) => {
      const res = await fetch(`/api/getMovieID?movieID=${review.movie}`)
      const data = await res.json()
      const movie = data.movieData
      review.movie = movie
    })

    await Promise.all(movieTasks)

    setReviews(reviews)  
  }

  const getSavedMovies = async () => {
    if (!user) return;

    const res = await fetch(`/api/getSavedMovies?userID=${profile.id}`)
    const data = await res.json()
    const savedMovieList = data.movies

    setSavedMovies(savedMovieList);
  };

  const handleAddMovie = async () => {
    // Add a new movie to the saved movies list
    if (newMovie.trim() === '') return;

    const savedMovie = {
      uid: user.uid,
      movieName: newMovie,
    };

    await addDoc(collection(db, 'savedMovies'), savedMovie);
    setNewMovie('');
  };

  const handleDeleteMovie = async (movie) => {
    
    const res = await fetch(`/api/unsaveMovie?userID=${profile.id}&movieID=${movie.id}`)

    const newMovieList = savedMovies.filter((m) => m.id !== movie.id);
    setSavedMovies(newMovieList);

  };

  useEffect(() => {
    getReviews();
    getSavedMovies();
  }, [profile]);

  return (
    <div>
      <TopBar />
      <div className = "user-profile">
        <br></br>
        <br></br>
        <br></br>
        <h1>Your Profile</h1>
        <p>Username: {profile ? profile.username : 'Loading...'}</p>
        <h2>Previously Reviews</h2>
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>{!review.movie ? "Loading..." : 
            
                <div >
                    <a href={`/movieprofile?movieID=${review.movie.id}`}>{review.movie.name}</a>
                  <br></br>
                    {review.content}
                </div>
            
            }</li>
          ))}
        </ul>

        <div className="saved-movies">
          <div className="movie-input-container">
            <h2>Saved Movies</h2>
            <ul>
              {savedMovies.map((movie) => (
                <li key={movie.id}>
                  <a href={`/movieprofile?movieID=${movie.id}`}>{movie.name}</a>
                  <button onClick={() => handleDeleteMovie(movie)}>
                    Delete Movie
                  </button>
                </li>
              ))}
            </ul>
            <div>
              {/* <input
                type="text"
                placeholder="Enter a movie name"
                value={newMovie}
                onChange={(e) => setNewMovie(e.target.value)}
              /> */}
              {/* <button onClick={handleAddMovie}>Add Movie</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}