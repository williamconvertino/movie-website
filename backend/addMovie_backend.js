// adding a movie

const {
    getFirestore,
    collection,
    doc,
    setDoc,
    arrayUnion,
} = require("firebase/firestore");

const { app } = require("../firebase.js");

const addMovie = async (movie) => {
    const db = getFirestore(app);

    try {
        // add movie to collection
        const moviesRef = collection(db, "movies");
        const movieDocRef = doc(moviesRef, movie.id); 
        await setDoc(movieDocRef, movie);

        
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

