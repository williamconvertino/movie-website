import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { UserAuth } from "@components/context/AuthContext";
import TopBar from "@components/TopBar";
import StarRating from "@components/StarRating";
import { FaStar } from "react-icons/fa";

export default function ReviewForm() {
  const { user, profile, emailSignUp, emailSignIn, logOut } = UserAuth();

  const router = useRouter();
  const { movieID } = router.query;

  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [content, setContent] = useState("");

  const [loadState, setLoadState] = useState("loading");
  const [submitState, setSubmitState] = useState("idle");

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (content.length < 1) {
      return;
    }

    if (!movie || !user) {
      throw new Error("Movie not loaded...");
      return;
    }

    if (loadState != "ready") {
      setSubmitState("ready");
      return;
    }

    // const newReview = {
    //   movie: movie.id,
    //   content: content,
    //   DateTimeCreated: Timestamp.now(),
    //   user: profile.id
    // };

    fetch(
      `/api/newReview?movieID=${movie.id}&content=${content}&userID=${user.uid}`
    )
      .then((response) => response.json())
      .then((data) => {
        router.push(`/movieprofile?movieID=${movie.id}`);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  const loadMovie = async () => {
    if (!movieID) return;

    fetch(`/api/getMovieID?movieID=${movieID}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data.movieData);

        setLoadState("ready");

        if (submitState == "ready") {
          handleSubmit();
        }
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  const loadRating = async () => {};

  useEffect(() => {
    loadMovie();
    loadRating();
  }, [movieID]);

  return (
    <div>
      <TopBar />
      <div className="review-page">
        <br></br>
        <br></br>
        <h1>{movie ? `Review the movie "${movie.name}"` : "Loading..."}</h1>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Review movie here ..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          <div style={{display: 'flex'}}>
            {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label key={index} style={{ display: 'inline-block', marginRight: '5px' }}>
                <input style={{width: 0}}
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => setRating(currentRating)}
                />
                  <FaStar 
                    className='star' 
                    size={20}
                    color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                    />
              </label>
            );
          })}
          </div>

          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}
