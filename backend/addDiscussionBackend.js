const {
    getFirestore,
    collection,
    doc,
    setDoc,
    arrayUnion,
    getDocs, query, where, addDoc, Timestamp
} = require("firebase/firestore");

const { db } = require('./firebase_backend')

const addDiscussion = async (user, parentReview, parentDiscussion, content) => {
    
    const discussionRef = collection(db, "discussions");
    
    const newDiscussion = {
        user: user,
        content: content,
        numLikes: 0,
        numDislikes: 0,
        parentDiscussion: parentDiscussion,
        parentReview: parentReview,
        datetimeCreated: Timestamp.now(),
    };

    const docRef = await addDoc(discussionRef, newDiscussion);
    const newID = docRef.id;
    
    return newID;
}


module.exports = { addDiscussion };