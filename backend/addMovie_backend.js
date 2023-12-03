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
        averageRating: 0,
        datetimeCreated: Timestamp.now(),
    };

    const docRef = await addDoc(moviesRef, newMovie);
    const newMovieId = docRef.id;
    
    return newMovieId;
}

module.exports = {addMovie};


