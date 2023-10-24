const {
    collection,
    query,
    where,
    addDoc,
    getDocs,
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

const getuserChats = async (userID) => {
    const chatRef = collection(db, "conversations");
    const q = query(chatRef, where("userReference", "==", "users/" + userID));
    const querySnapshot = await getDocs(q);
    let chatData = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id
        chatData.push(data);
    });
    return chatData;
}

module.exports = { addChatEntry, getuserChats };

