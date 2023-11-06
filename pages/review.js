import React, { useState } from "react";
import TopBar from "@components/TopBar";

export default function ReviewForm() {
  const [movieTitle, setMovieTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      movieTitle: movieTitle,
      rating: rating,
      comment: comment,
    };

    setReviews([...reviews, newReview]);

    setMovieTitle("");
    setRating(0);
    setComment("");
  }

  return (
    <div>
      <TopBar />
      <div className="review-page">
      <br></br>
      <br></br>
      <h1>Review A Movie</h1>
      <form onSubmit={handleSubmit}>
          <input
            placeholder="Movie Title"
            type="text"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />

          <label>Rating (1-5): 
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="0"
            max="5"
          />
</label>
        
          <textarea
            placeholder="Review movie here ..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

        <button type="submit">Submit Review</button>
      </form>
      <div>
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
      </div>
      </div>
    </div>
  );
}
