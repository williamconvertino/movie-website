//get movie data from firebase

const getMovieData = async (searchQuery) => {
    const {
        getFirestore,
        collection,
        query,
        where,
        getDocs
    } = require("firebase/firestore");
    
    const { app } = require("../firebase/firebase.js");


    const db = getFirestore(app);
    const moviesRef = collection(db, "movieProfiles");
    const q = query(moviesRef, where("name", "==", searchQuery));
    const querySnapshot = await getDocs(q);
    let movieData = [];
    querySnapshot.forEach((doc) => {
        movieData.push(doc.data());
    });
    return movieData;
    }

module.exports = { getMovieData };