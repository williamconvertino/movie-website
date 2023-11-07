import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import TopBar from '@components/TopBar';

const MovieProfile = () => {
    
    const router = useRouter()
    const {id} = router.query;
    const [movie, setMovie] = useState(null);

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

    useEffect(() => {
        loadMovie()
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
                        <div className="user-conversations">
                            <h2>User Rating: 4.5/5</h2>
                            <div className="user-conversation">
                                <h3>User 1</h3>
                                <p>Rated: Movie Name</p>
                                <p>Rating: 4.5/5</p>
                                <p>Comments: insert here...</p>
                        </div>
                            <div className="user-conversation">
                                <h3>User 2</h3>
                                <p>Rated: Movie Name</p>
                                <p>Rating: 4.0/5</p>
                                <p>Comments: insert here...</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => onSave(movie)}>Save Movie</button>
                </div>
            )}

    </div>
  );
};

export default MovieProfile;