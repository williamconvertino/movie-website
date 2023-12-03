import React from 'react';

function ImportMoviesButton() {
    const handleImportClick = async () => {
        try {
            const response = await fetch('/api/import-movies', { method: 'POST' });
            const result = await response.json();
            console.log(result.message);
        } catch (error) {
            console.error('Error importing movies:', error);
        }
    };

    return (
        <button onClick={handleImportClick}>Import Movies</button>
    );
}

export default ImportMoviesButton;
