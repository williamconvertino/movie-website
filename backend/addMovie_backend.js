const {
    getFirestore,
    collection,
    doc,
    setDoc,
    arrayUnion,
    getDocs, query, where, addDoc, Timestamp
} = require("firebase/firestore");

const { db } = require('./firebase_backend')

const addMovie = async (name, genres, year, imdbID) => {
    
    const moviesRef = collection(db, "movieProfiles");
    
    const q = query(moviesRef, where("imdbID", "==", imdbID))
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
        return "exists"
    }

    const genreList = genres.split(",").map((genre) => genre.trim().toLowerCase());

    const newMovie = {
        name: name,
        imdbID: imdbID,
        searchName: name.toLowerCase(),
        genres: genreList,
        releaseDate: year,
        totalRating: 0,
        numberOfRatings: 0,
        datetimeCreated: Timestamp.now(),
    };

    const docRef = await addDoc(moviesRef, newMovie);
    const newMovieId = docRef.id;
    
    return newMovieId;
}

// const addMovie_obj = async (movie) => {
//     const db = getFirestore(app);

   
//     const censorResult = censorInput(movie);
//     if (censorResult.error) {
//         console.error(censorResult.error);
//         throw new Error(censorResult.error);
//     }

//     const movieToAdd = censorResult.approved ? movie : censorResult.censored;

//     try {

//         const moviesRef = collection(db, "movies");
//         const movieDocRef = doc(moviesRef, movie.id); 
//         await setDoc(movieDocRef, movieToAdd); 


//         if (movie.users && movie.users.length > 0) {
//             const usersRef = collection(db, "users");

//             for (const userId of movie.users) {
//                 const userRef = doc(usersRef, userId);
//                 await setDoc(userRef, {
//                     watchlist: arrayUnion(movie.id),
//                 }, { merge: true });
//             }
//         }

//         console.log("Movie added and data updated successfully.");
//     } catch (e) {
//         console.error("Error adding movie and updating data: ", e);
//         throw e;
//     }
// };

module.exports = {addMovie};


