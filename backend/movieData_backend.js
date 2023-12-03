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

const getMovieData = async (searchQuery, genre, startYear, endYear, sortOption) => {
    
    
    if (startYear == '' || !startYear) {
        startYear = 0
    } else {
        startYear = Number(startYear);
    }

    if (endYear == '' || !endYear) {
        endYear = 9999
    } else {
        endYear = Number(endYear);
    }
    
    const genreList = (!genre || genre == '') ? [] : genre.split(",").map((item) => item.trim().toLowerCase())

    searchQuery = searchQuery.toLowerCase().trim();

    const moviesRef = collection(db, "movieProfiles");
    
    console.log(searchQuery, genreList, startYear, endYear, sortOption)
    

    let q = query(
        moviesRef,
        where("searchName", ">=", searchQuery),
        where("searchName", "<=", searchQuery + "\uf8ff"),
        orderBy("searchName")
    );

    genreList.forEach((genre) => {q = query(q, where("genres", "array-contains", genre))})
    

    const querySnapshot = await getDocs(q);
    let movieData = [];
    querySnapshot.forEach((doc) => {
        
        const data = doc.data();
        data.id = doc.id;
        if (data.releaseDate >= startYear && data.releaseDate <= endYear) {
            movieData.push(data);
        }
    });

    if (sortOption == "year") {
        movieData.sort((a, b) => a.releaseDate - b.releaseDate);
    } else if (sortOption == "overallRating") {
        movieData.sort((a, b) => b.averageRating - a.averageRating);
    } else if (sortOption == "numRatings") {
        movieData.sort((a, b) => b.numRatings - a.numRatings);
    }

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

