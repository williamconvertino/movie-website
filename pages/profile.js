import React, {
  useEffect,
  useState,
} from 'react';

import {
  doc,
  getDoc,
} from 'firebase/firestore';

import { UserAuth } from '@components/context/AuthContext';
import TopBar from '@components/TopBar';
import { db } from '@firebase';

export default function ProfilePage() {

  
  const {user, profile, emailSignUp, emailSignIn, logOut} = UserAuth()
  
  const [ratedMovies, setRatedMovies] = useState([]);
  const [ratingMap, setRatingMap] = useState({});

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

  useEffect(() => {
    getRatedMovies()
  }, [, user]);

  return (
    <div>
      <TopBar />
      <h1>Your Profile</h1>
      <p>Username: {profile ? profile.username : 'Loading...'}</p>
      <h2>Previously Rated Movies</h2>
      <ul>
        {ratedMovies.map((movie) => (
          <li key={movie.id}>{movie.name} : {ratingMap[movie.id]} stars</li>
        ))}
      </ul>
    </div>
  );
}