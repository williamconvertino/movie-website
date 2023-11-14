const {
    collection,
    query,
    where,
    limit,
    addDoc,
    doc,
    getDoc,
    Timestamp,
    getDocs,
    orderBy,
    updateDoc,
    increment
} = require("firebase/firestore");

const { db } = require('./firebase_backend')

const updateLike = async (reviewID, updateValue) => {
    
    const reviewRef = doc(db, "reviews", reviewID);
    await updateDoc(reviewRef, {
        numLikes: increment(updateValue)
    });
}

const updateDislike = async (reviewID, updateValue) => {
    const reviewRef = doc(db, "reviews", reviewID);
    await updateDoc(reviewRef, {
        numDislikes: increment(updateValue)
    });
}

module.exports = { updateLike, updateDislike };

