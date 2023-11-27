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

const addReviewEntry = async (userID, content, movieID) => {
    const chatRef = collection(db, "reviews");
    await addDoc(chatRef, {
        user: userID,
        content: content,
        movie: movieID,
        DateTimeCreated: Timestamp.now(),
        numLikes: 0,
        numDislikes: 0
    });
}

const getUserReviews = async (userID, limit=10) => {
    
    const chatsRef = collection(db, "reviews");
    const q = query(chatsRef, where("user", "==", userID));
    const querySnapshot = await getDocs(q);
    let chatData = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        chatData.push(data);
    });
    return chatData;
}


const getReviewbyID = async (chatID) => {
    const chatRef = doc(db, "reviews/", chatID);
    const chatData = await getDoc(chatRef);
    if (chatData.exists()) {
        return chatData.data();
    }
    else {
        return null;
    }
}

const getReviewsByDate = async (dateFrom, limit) => {

    //if limit is not set set it to 10
    if (!limit) {
        limit = 10;
    }
    const moviesRef = collection(db, "reviews");
    const q = query(moviesRef, where("DateTimeCreated", ">", Timestamp(new Date(dateFrom))), orderBy("DateTimeCreated"), limit(limit));
    const querySnapshot = await getDocs(q);
    let output = [];
    querySnapshot.forEach((doc) => {
        const data = doc.get("content")
        output.push(data);
    });
    return output;
}

const getReviewsByMovie = async (movieID, limit=10) => {
    
    const moviesRef = collection(db, "reviews");
    const q = query(moviesRef, where("movie", "==", movieID), orderBy('DateTimeCreated', 'desc')); 
    // , orderBy('DatetimeCreated', 'desc'), limit(limit)
    const querySnapshot = await getDocs(q);
    let output = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id
        output.push(data);
    });
    return output;
}




module.exports = { getUserReviews, addReviewEntry, getReviewbyID, getReviewsByDate, getReviewsByMovie };

