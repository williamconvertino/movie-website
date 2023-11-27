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

  const [loadState, setLoadState] = useState("loading");
  const [submitState, setSubmitState] = useState("idle");

  const handleSubmit = async (e) => {
    
    if (e) {
      e.preventDefault();
    }

    if (content.length < 1) {
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


    // const newReview = {
    //   movie: movie.id,
    //   content: content,
    //   DateTimeCreated: Timestamp.now(),
    //   user: profile.id
    // };

    fetch(`/api/newReview?movieID=${movie.id}&content=${content}&userID=${user.uid}`)
        .then((response) => response.json())
        .then((data) => {
          router.push(`/movieprofile?movieID=${movie.id}`)
        })
        .catch((error) => {
            console.error('Error fetching search results:', error);
    });

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
      {/* <div>
        <h1>List of Reviews</h1>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <strong>Movie Title:</strong> {review.movieTitle}
              <br />
              <strong>Rating:</strong> {review.rating}
              <br />
              <strong>Review:</strong> {review.comment}
              <hr />
            </li>
          ))}
        </ul>
      </div> */}
      </div>
    </div>
  );
}
