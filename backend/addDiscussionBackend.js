const {
    getFirestore,
    collection,
    doc,
    setDoc,
    arrayUnion,
    getDocs, query, where, addDoc, Timestamp
} = require("firebase/firestore");

const { db } = require('./firebase_backend')

const addDiscussion = async (user, parentID, content) => {
    
    const discussionRef = collection(db, "discussions");
    
    const newDiscussion = {
        user: user,
        content: content,
        numLikes: 0,
        numDisikes: 0,
        parentDiscussion: parentID,
        datetimeCreated: Timestamp.now(),
    };

    const docRef = await addDoc(discussionRef, newDiscussion);
    const newID = docRef.id;
    
    return newID;
}

const addDiscussionReview = async (user, parentID, content) => {
    
    const discussionRef = collection(db, "discussions");
    
    const newDiscussion = {
        user: user,
        content: content,
        numLikes: 0,
        numDisikes: 0,
        parentReview: parentID,
        datetimeCreated: Timestamp.now(),
    };

    const docRef = await addDoc(discussionRef, newDiscussion);
    const newID = docRef.id;
    
    return newID;
}

module.exports = { addDiscussion, addDiscussionReview };