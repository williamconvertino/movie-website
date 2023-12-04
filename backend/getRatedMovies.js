const {
    collection,
    query,
    where,
    orderBy,
    limit,
    addDoc,
    doc,
    getDoc,
    Timestamp,
    getDocs
} = require("firebase/firestore");

const { db } = require('./firebase_backend');

const getRatedMovies = async (userID) => {
    
    const moviesRef = collection(db, "movieRatings");

    const q = query(
        moviesRef, where("user", "==", userID)
    );

    const querySnapshot = await getDocs(q);
    let output = [];

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        output.push(data.movie);
    });

    return output;
}

module.exports = {getRatedMovies};