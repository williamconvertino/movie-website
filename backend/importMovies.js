const addMovie = require('./addMovie_backend'); // Importing the addMovie function from addMovie_backend.js
const fs = require('fs');


async function importMovies() {
// Function to read JSON file and parse it
function readMoviesFromFile(filePath) {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
}

async function addMoviesFromJson(filePath) {
    const movies = readMoviesFromFile(filePath);

    for (const movie of movies) {
        try {
            await addMovie(movie); // Using the imported addMovie function
            console.log(`Movie ${movie.id} added successfully.`);
        } catch (error) {
            console.error(`Error adding movie ${movie.id}: `, error);
        }
    }
}

addMoviesFromJson('./database/test_small_set.json');

}
module.exports = importMovies;
