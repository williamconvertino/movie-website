import React, { useState } from 'react';

import { useRouter } from 'next/router';

import TopBar from '@components/TopBar';

export default function AddMovie() {

    const router = useRouter();
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');

    const [error, setError] = useState(null);

    const handleNameChange = (e) => {
        setName(e.target.value);
        setError(null)
    }

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
        setError(null)
    }

    const handleYearChange = (e) => {
        setYear(e.target.value);
        setError(null)
    }

    const onSubmit = async (e) => {
        
        if (!name || !genre || !year) {
            return
        }

        const res = await fetch(`/api/addMovie?title=${name}&genres=${genre}&year=${year}`);
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
                <button onClick={onSubmit}>Add Movie</button>
                {error == "exists" &&
                <div>
                    <p>This movie already exists!</p>
                </div>}
            </div>
            
        </div>
    )
}