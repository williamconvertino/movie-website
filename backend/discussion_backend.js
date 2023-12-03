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
    orderBy
} = require("firebase/firestore");

const { db } = require('./firebase_backend')

//add parent review or parent discussion fields, one will be empty
const addDiscussion = async(userReference, chatText, parentDiscussion, parentReview) => {
    const chatRef = collection(db, "discussions");
    if(parentDiscussion == null){
    await addDoc(chatRef, {
        user: doc(db, "users/", userReference),
        content: chatText,
        dateTimeCreated: Timestamp.now(),
        numLikes: 0,
        numDislikes: 0,
        parentReview: doc(db, "reviews/", parentReview),
        parentDiscussion: null
    });
}
else{
    await addDoc(chatRef, {
        user: doc(db, "users/", userReference),
        content: chatText,
        dateTimeCreated: Timestamp.now(),
        numLikes: 0,
        numDislikes: 0,
        parentReview: null,
        parentDiscussion: doc(db, "discussions/", parentDiscussion)
    });
}
}

const getUserDiscussions = async (userID) => {
    
    const discussionRef = collection(db, "discussions");
    const q = query(discussionRef, where("user", "==", userID), orderBy("datetimeCreated"), limit(10));
    const querySnapshot = await getDocs(q);
    let chatData = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        chatData.push(data);
    });
    return chatData;
}

const getDiscussionbyID = async (chatID) => {
    const chatRef = doc(db, "discussions/", chatID);
    const chatData = await getDoc(chatRef);
    if (chatData.exists()) {
        return chatData.data();
    }
    else {
        return null;
    }
}

const getDiscussionsReviewID = async (reviewID, limit) => {
    if (!limit) {
        limit = 10;
    }
    
    const discussionRef = collection(db, "discussions");
    
    const q = query(discussionRef, where("parentReview", "==", reviewID));
    const querySnapshot = await getDocs(q);
    
    let discussions = [];

    querySnapshot.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id
        discussions.push(data);
    });
    return discussions;
    }

    const getDiscussionsParentID = async (parentID, limit) => {
        if (!limit) {
            limit = 10;
        }
        
        const discussionRef = collection(db, "discussions");
        
        const q = query(discussionRef, where("parentDiscussion", "==", parentID));
        const querySnapshot = await getDocs(q);
        
        let discussions = [];
    
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            data.id = doc.id
            discussions.push(data);
        });
        return discussions;
        }

module.exports = { addDiscussion, getUserDiscussions, getDiscussionbyID, getDiscussionsReviewID, getDiscussionsParentID}