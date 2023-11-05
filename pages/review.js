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
  };

  return (
    <div>
      <h1>Review A Movie</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Movie Title:
          <input
            type="text"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
        </label>

        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="0"
            max="10"
          />
        </label>

        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>

        <button type="submit">Submit Review</button>
      </form>
      <div>
        <h2>List of Reviews</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <strong>Rating:</strong> {review.rating}
              <br />
              <strong>Comment:</strong> {review.comment}
              <br />
              <strong>Movie Title:</strong> {review.movieTitle}
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
