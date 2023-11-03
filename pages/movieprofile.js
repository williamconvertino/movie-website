import React, { useState } from 'react';
import TopBar from '@components/TopBar';

const MovieProfile = ({ movie, onSave}) => {
    // conversations are hard-coded, tried to implement routing for movie attributes
    return (
        <div>
            <TopBar />
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
    </div>
  );
};

export default MovieProfile;