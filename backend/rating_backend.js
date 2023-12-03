const {
    collection,
    query,
    where,
    doc,
    getDoc,
    getDocs,
    orderBy,
    setDoc,
    addDoc,
    updateDoc
} = require("firebase/firestore");

const { db } = require('./firebase_backend')

const getRatingID = async (userID, movieID) => {
    
    const ratingRef = collection(db, "movieRatings");
    const q = query(ratingRef, where("user", "==", userID), where("movie", "==", movieID));
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.size == 0) {
        return null
    }

    const doc = querySnapshot.docs[0]
    const data = doc.data();
    data.id = doc.id;
    return data;
}

const setRatingID = async (userID, movieID, rating) => {
    
    const ratingRef = collection(db, "movieRatings");
    const q = query(ratingRef, where("user", "==", userID), where("movie", "==", movieID));
    
    const querySnapshot = await getDocs(q);
    
    let previousRating = 0

    if (querySnapshot.size === 0) {
        // If no document is found, create a new one
        await addDoc(ratingRef, {
            user: userID,
            movie: movieID,
            rating: rating
        });
    } else {
        // If a document is found, update its values
        
        previousRating = querySnapshot.docs[0].data().rating;
        const docToUpdate = querySnapshot.docs[0];
        await updateDoc(docToUpdate.ref, { rating: rating });
    }
    
    const movieRef = doc(db, "movieProfiles", movieID)
    const movieData = await getDoc(movieRef)
    
    let newNumRatings = movieData.data().numberOfRatings;
    let newTotalRating = Number(movieData.data().totalRating) + Number(rating);

    if (querySnapshot.size != 0) {
        newTotalRating -= previousRating;
    } else {
        newNumRatings += 1;
    }

    let newAverageRating = newNumRatings > 0 ? Number(newTotalRating / newNumRatings) : 0
    
    await updateDoc(movieRef, {
        numberOfRatings: newNumRatings,
        totalRating: newTotalRating,
        averageRating: newAverageRating
    });
}

const getMovieRating = async () => {

}

module.exports = { getRatingID, setRatingID, getMovieRating };