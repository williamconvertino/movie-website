import React, {
  useEffect,
  useState,
} from 'react';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
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

    const q = query(collection(db, 'savedMovies'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);

    const savedMovieList = [];

    querySnapshot.forEach((doc) => {
      const savedMovie = doc.data();
      savedMovieList.push(savedMovie);
    });

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
    
    if (!movie.id) return
    
    let movieDoc = doc(db, 'savedMovies', movie.id)
    console.log(movieDoc)
    await deleteDoc(movieDoc);
    setSavedMovies(savedMovies.filter((movie) => movie.id !== movieId));
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
                    {review.movie.name}
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
                  <span>{movie.movieName}</span>
                  <button onClick={() => handleDeleteMovie(movie)}>
                    Delete Movie
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <input
                type="text"
                placeholder="Enter a movie name"
                value={newMovie}
                onChange={(e) => setNewMovie(e.target.value)}
              />
              <button onClick={handleAddMovie}>Add Movie</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}