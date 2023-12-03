import React, { useState } from 'react';

import { useRouter } from 'next/router';

import TopBar from '@components/TopBar';
import { api_key } from '@omdb';

export default function AddMovie() {

    const router = useRouter();
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');

    const [error, setError] = useState(null);

    const [searchResults, setSearchResults] = useState([])

    const handleNameChange = (e) => {
        setName(e.target.value);
        setError(null)
        setSearchResults([])
    }

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
        setError(null)
        setSearchResults([])
    }

    const handleYearChange = (e) => {
        setYear(e.target.value);
        setError(null)
        setSearchResults([])
    }

    const onSubmit = async (e) => {
        
        if (!name || !genre || !year) {
            return
        }
        
        const omdbRes = await fetch(`http://www.omdbapi.com/?apikey=${api_key}&s=${name}&y=${year}`)
        const omdbData = await omdbRes.json()
        console.log(omdbData)
        if (omdbData.Response == 'False') {
            setError("found")
            return
        }
        setSearchResults(omdbData.Search)
    }

    const addMovie = async (name, year, imdbID) => {

        if (!name || !genre || !year || !imdbID) {
            return
        }

        const res = await fetch(`/api/addMovie?title=${name}&genres=${genre}&year=${year}&imdbID=${imdbID}`);
        const data = await res.json();
        if (data.movieID == "exists") {
            setError("exists")
        } else {
            router.push(`/movieprofile?movieID=${data.movieID}`)
        }
    }

    return (
        <div>
            <TopBar/>
            <div className = "add-movie">
            
                <h1>Add Movie</h1>
                
                {<div>

                    <div className="input-container">
                        <label>Name:</label>
                        <input
                            type="name"
                            value={name}
                            onChange={handleNameChange}
                            required
                            style={{ marginBottom: '15px' }}
                        />
                    </div>
                    <div className="input-container">
                        <label>Genre:</label>
                        <input
                            type="genre"
                            value={genre}
                            onChange={handleGenreChange}
                            required
                            style={{ marginBottom: '15px' }}
                        />
                    </div>
                    <div className="input-container">
                        <label>Year:</label>
                        <input
                            type="year"
                            value={year}
                            onChange={handleYearChange}
                            required
                            style={{ marginBottom: '15px' }}
                        />
                    </div>
                    <button onClick={onSubmit}>Find Movies</button>

                </div>}
                
                {
                    searchResults.length > 0 &&
                    searchResults.map((movie) => <p className="conversation" style={{cursor: "pointer"}}  onClick={() => addMovie(movie.Title, movie.Year, movie.imdbID)} key={movie.imdbID}>{`${movie.Title.replace('(${movie.Year})','')} (${movie.Year})`}</p>)
                }
                
                {error == "exists" &&
                <div>
                    <p>This movie already exists in our database.</p>
                </div>}
                {error == "found" && 
                <div>
                <p>We can't find the movie your looking for.</p>
                </div>
                }
            </div>
            
        </div>
    )
}