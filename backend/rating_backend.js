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

module.exports = { getRatingID };