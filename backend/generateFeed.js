const {
    collection,
    query,
    where,
    orderBy, // Import orderBy function
    limit,
    addDoc,
    doc,
    getDoc,
    Timestamp,
    getDocs
} = require("firebase/firestore");

const { db } = require('./firebase_backend');

const generateFeed = async () => {
    const numLimit = 10;

    // Calculate the start date of the last month
    const lastMonthStartDate = new Date();
    lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1);

    const moviesRef = collection(db, "reviews");
    const q = query(
        moviesRef,
        where("DateTimeCreated", ">", Timestamp.fromDate(lastMonthStartDate)),
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