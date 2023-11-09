// addMovie_backend.js

const { collection, doc, setDoc, arrayUnion } = require('firebase/firestore');
const { db } = require('../firebase'); // Adjust the path to your firebase.js

const addMovie = async (movie) => {
    try {
        // Add movie to collection
        const moviesRef = collection(db, "movies");
        const movieDocRef = doc(moviesRef, movie.id);
        await setDoc(movieDocRef, movie);

        // Update users' watchlist if applicable
        if (movie.users && movie.users.length > 0) {
            const usersRef = collection(db, "users");

            for (const userId of movie.users) {
                const userRef = doc(usersRef, userId);
                await setDoc(userRef, {
                    watchlist: arrayUnion(movie.id),
                }, { merge: true });
            }
        }

        console.log("Movie added and data updated successfully.");
    } catch (e) {
        console.error("Error adding movie and updating data: ", e);
        throw e;
    }
};

module.exports = addMovie;


