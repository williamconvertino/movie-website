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

const addChatEntry = async (userReference, chatText, movieRef) => {
    const chatRef = collection(db, "reviews");
    await addDoc(chatRef, {
        user: doc(db, "users/", userReference),
        content: chatText,
        movie: doc(db, "movieProfiles/", movieRef),
        DateTimeCreated: Timestamp.now(),
        numLikes: 0,
        numDislikes: 0
    });
}

const addReply = async(userReference, chatText, parentThread) => {
    const chatRef = collection(db, "reviews");
    await addDoc(chatRef, {
        user: doc(db, "users/", userReference),
        content: chatText,
        movie: doc(db, "reviews/", parentThread).movie,
        DateTimeCreated: Timestamp.now(),
        numLikes: 0,
        numDislikes: 0,
        parent: doc(db, "reviews/", parentThread)
    });
}

const getUserReviews = async (userID, lim) => {
    const userRef = doc(db, "users/", userID);
    const chatsRef = collection(db, "reviews");
    const q = query(chatsRef, where("user", "==", userRef), limit(lim));
    const querySnapshot = await getDocs(q);
    let chatData = [];
    querySnapshot.forEach((doc) => {
        const data = doc.get("content");
        chatData.push(data);
    });
    return chatData;
}

const getUserDiscussions = async (userID, lim) => {
    const userRef = doc(db, "users/", userID);
    const chatsRef = collection(db, "discussions");
    const q = query(chatsRef, where("user", "==", userRef), limit(lim));
    const querySnapshot = await getDocs(q);
    let chatData = [];
    querySnapshot.forEach((doc) => {
        const data = doc.get("content");
        chatData.push(data);
    });
    return chatData;
}

const getChatbyID = async (chatID) => {
    const chatRef = doc(db, "reviews/", chatID);
    const chatData = await getDoc(chatRef);
    if (chatData.exists()) {
        return chatData.data();
    }
    else {
        return null;
    }
}

module.exports = { addChatEntry, getUserReviews, addReply, getChatbyID, getUserDiscussions };

