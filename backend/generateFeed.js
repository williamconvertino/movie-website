const {
    collection,
    query,
    where,
    orderBy,
    limit,
    addDoc,
    doc,
    getDoc,
    Timestamp,
    getDocs
} = require("firebase/firestore");

const { db } = require('./firebase_backend');

const generateFeed = async (feedOption) => {
    const numLimit = 30;
    
    if (feedOption == "week") {
        return getTopWeek(numLimit);
    }
    
    if (feedOption == "all") {
        return getTopAll(numLimit);
    }

    if (feedOption == "month") {
        return getTopMonth(numLimit);
    }

    return getNewReviews(numLimit)

}

const getTopMonth = async (numLimit) => {
    
    // Calculate the start date of the last month
    const lastMonthStartDate = new Date();
    lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1);

    const moviesRef = collection(db, "reviews");

    const q = query(
        moviesRef,
        where("DateTimeCreated", ">", Timestamp.fromDate(lastMonthStartDate)),
        limit(numLimit)
    );

    const querySnapshot = await getDocs(q);
    let output = [];

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        output.push(data);
    });

    output.sort((a, b) => (a.numLikes < b.numLikes) ? 1 : -1)
    

    return output;
}

const getTopWeek = async (numLimit) => {
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // Subtract 7 days from the current date

    const moviesRef = collection(db, "reviews");

    const q = query(
        moviesRef,
        where("DateTimeCreated", ">", Timestamp.fromDate(startDate)),
        limit(numLimit)
    );

    const querySnapshot = await getDocs(q);
    let output = [];

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        output.push(data);
    });

    output.sort((a, b) => (a.numLikes < b.numLikes) ? 1 : -1)
    

    return output;
}

const getTopAll = async (numLimit) => {
    
    const moviesRef = collection(db, "reviews");

    const q = query(
        moviesRef,
        orderBy("numLikes", "desc"),
        limit(numLimit)
    );

    const querySnapshot = await getDocs(q);
    let output = [];

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        output.push(data);
    });

    return output;
}

const getNewReviews = async (numLimit) => {
    
    const moviesRef = collection(db, "reviews");

    const q = query(
        moviesRef,
        orderBy("DateTimeCreated", "desc"),
        limit(numLimit)
    );

    const querySnapshot = await getDocs(q);
    let output = [];

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        output.push(data);
    });

    return output;
}

module.exports = { generateFeed };