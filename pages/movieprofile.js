import React from 'react';
import TopBar from '@components/TopBar';

const MovieProfile = ({ match }) => {
    // conversations are hard-coded, tried to implement routing for movie attributes
    const { name, releaseDate, genre, imageUrl } = match.params;

    return (
        <div>
            <TopBar />
            <div className="movie-profile">
            <div className="movie-details">
                <h1>{name}</h1>
                <p>Released Date: {releaseDate}</p>
                <p>Genre: {genre}</p>
                <img src={imageUrl} alt={name} />
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
                {/* Add more user conversations as needed */}
                </div>
            </div>
            </div>
    </div>
  );
};

export default MovieProfile;