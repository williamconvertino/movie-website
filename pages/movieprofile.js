import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import FeedItem from '@components/feed/FeedItem';
import TopBar from '@components/TopBar';

const MovieProfile = () => {
    
    const router = useRouter()
    const {id} = router.query;
    const [movie, setMovie] = useState(null);

    const [userReviews, setUserReviews] = useState([]);

    const onSave = async (movie) => {

    }

    const loadMovie = async () => {
        if (!id) return;
        fetch(`/api/getMovieID?movieID=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setMovie(data.movieData);
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    }

    const loadUserReviews = async () => {
        if (!id) return;
        fetch(`/api/getReviewMovie?movieID=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setUserReviews(data.reviewData);
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    }

    const populateData = async () => {
        loadMovie()
        loadUserReviews()
    }

    useEffect(() => {
        populateData()
    }, [id]);

    return (
        <div>
            <TopBar />
            
            { !movie ? (
                <div>
                    Loading...
                </div>
            ) : (
                <div className="movie-profile">
                    <div className="movie-details">
                        <h1>{movie.name}</h1>
                        <p>Released Date: {movie.releaseDate}</p>
                        <p>Genre: {movie.releaseDate}</p>
                        <img src={movie.imageUrl} alt={movie.name} />
                    </div>
                    <div className="user-ratings">
                        <h2>Recent reviews</h2>
                        {userReviews.map((review) => (<div key={review.id}><FeedItem review={review}/></div>))}
                    </div>
                    <button onClick={() => onSave(movie)}>Save Movie</button>
                </div>
            )}

    </div>
  );
};

export default MovieProfile;