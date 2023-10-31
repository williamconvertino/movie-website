import React, {
    useState,
  } from 'react';

export default function ReviewForm() {
  const [movieTitle, setMovieTitle] = useState('');
  const [rating, setRating] = useState(0); 
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = { 
      movieTitle: movieTitle, 
      rating: rating, 
      comment: comment 
    };

    setReviews([...reviews, newReview]);

    setMovieTitle('');
    setRating(0);
    setComment('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Movie Title:
          <input type="text" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} />
        </label>
        <label>
          Rating:
          <input type="number" min="0" max="10" value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>
        <label>
          Comment:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type="submit">Submit Review</button>
      </form>
      
      <div>
        <h2>Your Reviews</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <strong>Movie Title:</strong> {review.movieTitle}
              <hr />
              <strong>Rating:</strong> {review.rating}
              <br />
              <strong>Comment:</strong> {review.comment}
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
