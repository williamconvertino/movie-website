const {
    getFirestore,
    collection,
    doc,
    setDoc,
    arrayUnion,
} = require("firebase/firestore");
const { app } = require("../firebase/firebase.js");
const censorInput = require('./censorInput.js'); 

const addMovie = async (movie) => {
    const db = getFirestore(app);

   
    const censorResult = censorInput(movie);
    if (censorResult.error) {
        console.error(censorResult.error);
        throw new Error(censorResult.error);
    }

    const movieToAdd = censorResult.approved ? movie : censorResult.censored;

    try {

        const moviesRef = collection(db, "movies");
        const movieDocRef = doc(moviesRef, movie.id); 
        await setDoc(movieDocRef, movieToAdd); 


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


