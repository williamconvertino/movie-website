//get movie data from firebase
const {
    collection,
    query,
    where,
    doc,
    getDoc,
    getDocs,
    orderBy
} = require("firebase/firestore");

const { db } = require('./firebase_backend')

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

const getMovieData_ID = async (searchQuery) => {
    //check if provided movie doc ID is in database
    const movieRef = doc(db, "movieProfiles", searchQuery);
    const movieData = await getDoc(movieRef);
    if (movieData.exists()) {
        return movieData.data();
    }
    else {
        return null;
    }
        }

const getMoviebyDate = async (dateFrom) => {
    const moviesRef = collection(db, "movieProfiles");
    const q = query(moviesRef, where("releaseDate", ">", Number(dateFrom)), orderBy("releaseDate"));
    const querySnapshot = await getDocs(q);
    let movieData = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id
        movieData.push(data);
    });
    return movieData;
}

module.exports = { getMovieData, getMovieData_ID, getMoviebyDate };