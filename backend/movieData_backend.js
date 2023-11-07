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
    
    searchQuery = searchQuery.toLowerCase().trim();

    const moviesRef = collection(db, "movieProfiles");
    
    const q = query(
        moviesRef,
        where("searchName", ">=", searchQuery), // StartAt partial query
        where("searchName", "<=", searchQuery + "\uf8ff") // EndAt partial query
    );
    const querySnapshot = await getDocs(q);
    let movieData = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        movieData.push(data);
    });
    return movieData;
}

const getMovieAutofill = async (searchQuery) => {
    searchQuery = searchQuery.toLowerCase().trim();

    if (searchQuery.length < 4) {
        return [];
    }

    return getMovieData(searchQuery);
}

const getMovieData_ID = async (movieID) => {
    //check if provided movie doc ID is in database
    const movieRef = doc(db, "movieProfiles", movieID);
    const movieData = await getDoc(movieRef);
    
    if (!movieData.exists()) {
        return null
    }

    const data = movieData.data();
    data.id = movieData.id;
    return data
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

const getAutocompleteSuggestions = async (searchQuery) => {
    const moviesRef = collection(db, "movieProfiles");
    const q = query(moviesRef, where("name", ">=", searchQuery).where("name", "<=", searchQuery + "\uf8ff"));
    const querySnapshot = await getDocs(q);
    let movieData = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        movieData.push(data);
    });
    return movieData;
}


module.exports = { getMovieData, getMovieData_ID, getAutocompleteSuggestions, getMovieAutofill };

