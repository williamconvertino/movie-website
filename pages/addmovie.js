import React, { useState } from 'react';

import SearchResults from '@components/SearchResultsComponent';
import TopBar from '@components/TopBar';

export default function AddMovie() {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    }

    const handleYearChange = (e) => {
        setYear(e.target.value);
    }

    return (
        <div>
            <TopBar/>
            <div className = "add-movie">
                <h1>Add Movie</h1>
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
                <button type="submit">Add Movie</button>
            </div>
        </div>
    )
}