import React, {
  useEffect,
  useState,
} from 'react';

import {doc, getDoc, collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';

import { UserAuth } from '@components/context/AuthContext';
import TopBar from '@components/TopBar';
import { db } from '@firebase';

export default function ProfilePage() {
  const {user, profile, emailSignUp, emailSignIn, logOut} = UserAuth()
  
  const [ratedMovies, setRatedMovies] = useState([]);
  const [ratingMap, setRatingMap] = useState({});

  const [savedMovies, setSavedMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');

  const getRatedMovies = async () => {
    if (!user) return;
    const docRef = doc(db, 'movieRatings', user.uid)
    const docSnapshot = await getDoc(docRef);
    const ratings = docSnapshot.data().ratings
    setRatingMap(ratings)

    const movieList = []
    
    for (var movieID of Object.keys(ratings)) {
      const movieRef = doc(db, 'movieProfiles', movieID);
      const movieSnapshot = await getDoc(movieRef);
      const movie = movieSnapshot.data()
      movie.id = movieID
      movieList.push(movie)
    }

    setRatedMovies(movieList)
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

  const handleDeleteMovie = async (movieId) => {
    // Delete the movie from the saved movies list
    // Modify code with actual database for saved movies of each user
    await deleteDoc(doc(db, 'savedMovies', movieId));
    setSavedMovies(savedMovies.filter((movie) => movie.id !== movieId));
  };

  useEffect(() => {
    getRatedMovies();
    getSavedMovies();
  }, [, user]);

  return (
    <div>
      <TopBar />
      <div className = "user-profile">
        <br></br>
        <br></br>
        <br></br>
        <h1>Your Profile</h1>
        <p>Username: {profile ? profile.username : 'Loading...'}</p>
        <h2>Previously Rated Movies</h2>
        <ul>
          {ratedMovies.map((movie) => (
            <li key={movie.id}>{movie.name} : {ratingMap[movie.id]} stars</li>
          ))}
        </ul>

        <div className="saved-movies">
          <div className="movie-input-container">
            <h2>Saved Movies</h2>
            <ul>
              {savedMovies.map((movie) => (
                <li key={movie.id}>
                  <span>{movie.movieName}</span>
                  <button onClick={() => handleDeleteMovie(movie.id)}>
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