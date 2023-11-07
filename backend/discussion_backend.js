const {
    collection,
    query,
    where,
    limit,
    addDoc,
    doc,
    getDoc,
    Timestamp,
    getDocs
} = require("firebase/firestore");

const { db } = require('./firebase_backend')

//add parent review or parent discussion fields, one will be empty
const addDiscussion = async(userReference, chatText, parentThread) => {
    const chatRef = collection(db, "discussions");
    await addDoc(chatRef, {
        user: doc(db, "users/", userReference),
        content: chatText,
        movie: doc(db, "reviews/", parentThread),
        DateTimeCreated: Timestamp.now(),
        numLikes: 0,
        numDislikes: 0,
        parent: doc(db, "reviews/", parentThread)
    });
}

const getUserDiscussions = async (userID, limit) => {
    if (!limit) {
        limit = 10;
    }
    const userRef = doc(db, "users/", userID);
    const chatsRef = collection(db, "discussions");
    const q = query(chatsRef, where("user", "==", userRef), limit(limit));
    const querySnapshot = await getDocs(q);
    let chatData = [];
    querySnapshot.forEach((doc) => {
        const data = doc.get("content");
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
    // get all discussions based on reviewID
    const reviewRef = doc(db, "reviews/", reviewID);
    const chatsRef = collection(db, "discussions");
    const q = query(chatsRef, where("parent", "==", reviewRef), limit(limit));
    const querySnapshot = await getDocs(q);
    let chatData = [];
    querySnapshot.forEach((doc) => {
        const data = doc.get("content")
        chatData.push(data);
    });
    return chatData;
    }

module.exports = { addDiscussion, getUserDiscussions, getDiscussionbyID, getDiscussionsReviewID}