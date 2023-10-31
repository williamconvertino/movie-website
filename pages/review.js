import React, {
    useState,
  } from 'react';

export default function ReviewForm() {
  const [movieTitle, setMovieTitle] = useState('');
  const [rating, setRating] = useState(0); 
  const [review, setReview] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = { movieTitle, rating, review };

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        // Review created successfully, handle the confirmation.
      } else {
        // Handle the error response.
      }
    } catch (error) {
      // Handle any network or other errors.
    }
  };

  return (
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
        Review:
        <textarea value={review} onChange={(e) => setReview(e.target.value)} />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
}
