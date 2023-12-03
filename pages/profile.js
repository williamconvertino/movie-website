import React, {
  useEffect,
  useState,
} from 'react';

import {
  addDoc,
  collection,
} from 'firebase/firestore';
import { useRouter } from 'next/router';

import { UserAuth } from '@components/context/AuthContext';
import TopBar from '@components/TopBar';
import { db } from '@firebase';

export default function ProfilePage() {
  
  const router = useRouter()
  
  const {user, profile, emailSignUp, emailSignIn, logOut} = UserAuth()
  
  const [reviews, setReviews] = useState([]);
  
  const [savedMovies, setSavedMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');

  const [discussions, setDiscussions] = useState([]);

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

  const getDiscussions = async () => {
    if (!profile) return;
    const res = await fetch(`/api/getDiscussionsUser?userID=${profile.id}`)
    const data = await res.json()
    const discussions = data.discussions
    console.log(data)
    setDiscussions(discussions)  
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
    getDiscussions()
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
        <h2>Your Recent Reviews</h2>
        <ul>
          {reviews.map((review) => (
            <div key={review.id} onClick={() => router.push(`/review?reviewID=${review.id}`)} style={{cursor: "pointer"}}> {!review.movie ? "Loading..." : 
            
                <div className='conversation'>
                    <a href={`/movieprofile?movieID=${review.movie.id}`}>{`${review.movie.name} (${review.movie.releaseDate})`}</a>
                  <br></br>
                    {review.content}
                </div>
            
            }</div>
          ))}
        </ul>

        <h2>Your Discussions & Replies</h2>
        {discussions.map((discussion) => (<div className='conversation' onClick={() => router.push(`/review?reviewID=${discussion.parentReview}`)}>
          <p>
            {discussion.content}
          </p>
          
          </div>))}
      </div>
      

      <div className="saved-movies">
          <h2>Saved Movies</h2>
          <ul>
            {savedMovies.map((movie) => (
              <div className='conversation' key={movie.id}>
                <a href={`/movieprofile?movieID=${movie.id}`}>{`${movie.name} (${movie.releaseDate})`}</a>
                <button onClick={() => handleDeleteMovie(movie)}>
                  Delete Movie
                </button>
              </div>
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
  );
}