const { collection, doc, getDoc, deleteDoc, addDoc, getDocs, query, where, in: inQuery } = require("firebase/firestore");

const { db } = require('./firebase_backend');

const saveMovie = async (userID, movieID) => {
    const savedMoviesRef = collection(db, "savedMovies");
    const q = query(savedMoviesRef, where("userID", "==", userID), where("movieID", "==", movieID));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        await addDoc(savedMoviesRef, {
            userID: userID,
            movieID: movieID
        }); 
    }
}


const unsaveMovie = async (userID, movieID) => {
    const savedMoviesRef = collection(db, "savedMovies");
    const q = query(savedMoviesRef, where("userID", "==", userID), where("movieID", "==", movieID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
    })
}

const getSavedMovies = async (userID) => {

    const savedMoviesRef = collection(db, "savedMovies");
    const q = query(savedMoviesRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(q);
    const movieIDs = querySnapshot.docs.map(doc => doc.data().movieID);
    
    const movieProfileRef = collection(db, "movieProfiles");
    const savedMovies = [];
    for (const movieID of movieIDs) {
        const docRef = doc(movieProfileRef, movieID);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            const data = docSnapshot.data()
            data.id = docSnapshot.id;
            savedMovies.push(data);
        }
    }
    return savedMovies;

}

module.exports = { saveMovie, getSavedMovies, unsaveMovie };