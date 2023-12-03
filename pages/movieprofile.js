import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import { UserAuth } from '@components/context/AuthContext';
import FeedItem from '@components/feed/FeedItem';
import StarRating from '@components/StarRating';
import TopBar from '@components/TopBar';

const MovieProfile = () => {
    
    const {user, profile} = UserAuth();

    const router = useRouter()
    const {movieID} = router.query;
    const [movie, setMovie] = useState(null);
    const [movieRating, setMovieRating] = useState(0);

    const [userReviews, setUserReviews] = useState([]);

    const [userRating, setUserRating] = useState(0)

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

    const onRateMovie = async (rating) => {
        if (!movieID || !profile) return
        if (rating > 5 || rating < 1) return;
        setUserRating(rating)
        await fetch(`/api/setRating?userID=${profile.id}&movieID=${movieID}&rating=${rating}`)

        await loadMovie()
    }

    const loadMovie = async () => {
        if (!movieID) return;
        const resp = await fetch(`/api/getMovieID?movieID=${movieID}`)
        const data = await resp.json()
        setMovie(data.movieData);
        if (!movie) return
        const rating = movie.numberOfRatings > 0 ? movie.totalRating / movie.numberOfRatings : 0;
        setMovieRating(rating)
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

    const loadUserRating = async () => {
        if (!profile) return
        
        const resp = await fetch(`/api/getRatingID?movieID=${movieID}&userID=${profile.id}`)
        const data = await resp.json()
        const ratingData = data.ratingData
        if (!ratingData) return
        setUserRating(ratingData.rating)
    }

    useEffect(() => {
        loadUserRating()
    }, [profile]);

    const populateData = async () => {
        loadMovie()
        loadUserReviews()
        loadUserRating()
    }

    useEffect(() => {
        populateData()
    }, [movieID]);

    useEffect(() => {
        if (!movie) return
        const rating = movie.numberOfRatings > 0 ? movie.totalRating / movie.numberOfRatings : 0;
        setMovieRating(rating)
    }, [movie])

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
                        <p>Average Rating: {movieRating}</p>
                        {/* {profile && <div>
                            <a style={{fontWeight: (userRating > 0 ? "bold": "normal"), cursor: "pointer"}} onClick={() => onRateMovie(1)}>1 </a>
                            <a style={{fontWeight: (userRating > 1 ? "bold": "normal"), cursor: "pointer" }} onClick={() => onRateMovie(2)}>2 </a>
                            <a style={{fontWeight: (userRating > 2 ? "bold": "normal"), cursor: "pointer" }} onClick={() => onRateMovie(3)}>3 </a>
                            <a style={{fontWeight: (userRating > 3 ? "bold": "normal"), cursor: "pointer" }} onClick={() => onRateMovie(4)}>4 </a>
                            <a style={{fontWeight: (userRating > 4 ? "bold": "normal"), cursor: "pointer" }} onClick={() => onRateMovie(5)}>5 </a>
                        </div>} */}
                        {profile && <div>
                            Your rating: {<StarRating rating={userRating} setRating={onRateMovie}/>}  
                        </div>}
                        {profile && <button onClick={onSave}>Save Movie</button>}
                        
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