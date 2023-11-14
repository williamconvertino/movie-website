import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import { UserAuth } from '@components/context/AuthContext';
import FeedItem from '@components/feed/FeedItem';
import TopBar from '@components/TopBar';

const MovieProfile = () => {
    
    const {user, profile} = UserAuth();

    const router = useRouter()
    const {movieID} = router.query;
    const [movie, setMovie] = useState(null);

    const [userReviews, setUserReviews] = useState([]);

    const onSave = async () => {
        if (!movieID) return
        if (!profile) return;
        fetch(`/api/saveMovie?userID=${profile.id}&movieID=${movieID}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Saved movie");
            })
            .catch((error) => {
                console.error('Error saving movie', error);
            });
    }

    const loadMovie = async () => {
        if (!movieID) return;
                fetch(`/api/getMovieID?movieID=${movieID}`)
            .then((response) => response.json())
            .then((data) => {
                setMovie(data.movieData);
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    }

    const loadUserReviews = async () => {
        if (!movieID) return;
        
        fetch(`/api/getReviewMovie?movieID=${movieID}`)
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
    }, [movieID]);

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
                        <button onClick={onSave}>Save Movie</button>
                    </div>
                    <div className="user-ratings">
                        <h2>Recent Reviews</h2>
                        {profile && <a href={`/review?movieID=${movie.id}`}>Write a review</a>}
                        {userReviews.map((review) => (<div key={review.id}><FeedItem review={review}/></div>))}
                    </div>
                    
                </div>
            )}

    </div>
  );
};

export default MovieProfile;