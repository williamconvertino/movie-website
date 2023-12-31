import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import { UserAuth } from '@components/context/AuthContext';
import TopBar from '@components/TopBar';

export default function ReviewForm() {

  const {user, profile, emailSignUp, emailSignIn, logOut} = UserAuth()

  const router = useRouter()
  const {movieID} = router.query

  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [content, setContent] = useState("");
  
  const [censoredWord, setCensoredWord] = useState(false)

  const [loadState, setLoadState] = useState("loading");
  const [submitState, setSubmitState] = useState("idle");

  const handleSubmit = async (e) => {
    
    if (e) {
      e.preventDefault();
    }

    if (content.length < 1) {
      return
    }
    
    const obj = await fetch(`/api/censor?content=${content}`)
    const data = await obj.json()
    const censoredContent = data.censoredContent
    setContent(censoredContent)
    
    if (censoredContent.length < 1) {
      return
    }

    if (!movie || !user) {
      throw new Error("Movie not loaded...")
      return
    }

    if (loadState != "ready") {
      setSubmitState("ready")
      return
    }
    
    try {
      await fetch(`/api/newReview?movieID=${movie.id}&content=${censoredContent}&userID=${user.uid}`)
      router.push(`/movieprofile?movieID=${movie.id}`)

    } catch (error) {
      
    }
    
    
  }

  const loadMovie = async () => {
    if (!movieID) return;
    
    fetch(`/api/getMovieID?movieID=${movieID}`)
        .then((response) => response.json())
        .then((data) => {
            setMovie(data.movieData);

            setLoadState("ready")

            if (submitState == "ready") {
              handleSubmit()
            }

        })
        .catch((error) => {
            console.error('Error fetching search results:', error);
        });
  }

  const loadRating = async () => {

  }

  useEffect(() => {
    loadMovie()
    loadRating()
  }, [movieID])

  return (
    <div>
      <TopBar />
      <div className="review-page">
      <br></br>
      <br></br>
      <h1>{movie ? `Review the movie "${movie.name}"` : "Loading..."}</h1>
      
      <form onSubmit={handleSubmit}>
          {/* <input
            placeholder="Movie Title"
            type="text"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          /> */}

          {/* <label>Rating (1-5): 
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="0"
            max="5"
          />
</label> */}
        
          <textarea
            placeholder="Review movie here ..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

        <button type="submit">Submit Review</button>
      </form>
      
      </div>
    </div>
  );
}
