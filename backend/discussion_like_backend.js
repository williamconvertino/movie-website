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

const updateDiscussionLike = async (discussionID, updateValue) => {
    
    const reviewRef = doc(db, "discussions", discussionID);
    await updateDoc(reviewRef, {
        numLikes: increment(updateValue)
    });
}

const updateDiscussionDislike = async (discussionID, updateValue) => {
    const reviewRef = doc(db, "discussions", discussionID);
    await updateDoc(reviewRef, {
        numDislikes: increment(updateValue)
    });
}

module.exports = { updateDiscussionLike, updateDiscussionDislike };

