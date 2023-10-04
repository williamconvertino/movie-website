//get movie data from firebase
const {
    collection,
    query,
    where,
    getDocs
} = require("firebase/firestore");

const { db } = require('./backend_firebase')

const getMovieData = async (searchQuery) => {

    const moviesRef = collection(db, "movieProfiles");
    const q = query(moviesRef, where("name", "==", searchQuery));
    const querySnapshot = await getDocs(q);
    let movieData = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id
        movieData.push(data);
    });
    return movieData;
    }

module.exports = { getMovieData };