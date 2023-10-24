const {
    collection,
    query,
    where,
    getDocs
} = require("firebase/firestore");

const { db } = require('./firebase_backend')

const addChatEntry = async (userReference, chatText) => {
    const chatRef = collection(db, "conversations");
    await addDoc(chatRef, {
        userReference: userReference,
        chatText: chatText,
        timestamp: Date.now(),
        likes: 0,
        dislikes: 0
    });
}

