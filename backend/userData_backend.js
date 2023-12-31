// get user data for provided email address
// returns user data object
const {
    getFirestore,
    collection,
    updateDoc,
    arrayUnion,
    arrayRemove,
    query,
    where,
    getDocs,
    getDoc,
    doc
} = require("firebase/firestore");

const { db } = require('./firebase_backend')

const getUserData = async (username) => {

    username = username.trim()

    const usersRef = collection(db, "users");
    const q = query(
        usersRef,
        where("username", ">=", username), // StartAt partial query
        where("username", "<=", username + "\uf8ff") // EndAt partial query
    );

    const querySnapshot = await getDocs(q);
    let userData = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id
        userData.push(data);
    });    

    return userData;
}

const getUserID = async (userID) => {
    const userRef = doc(db, "users/", userID);
    const userData = await getDoc(userRef);
    if (userData.exists()) {
        return userData.data();
    }
    else {
        return null;
    }
}

//user Rates movie -- update user data field "ratings" with new movie and new rating
//ratings takes the documentID 
const rateMovie = async (movieName, rating) => {
    const auth = getAuth(app);
    let userData = null;
    onAuthStateChanged(auth, (user) => {
        if (user) {
            userData = user;
        } else {
            userData = null;
        }
    });
    if (userData) {

        const db = getFirestore(app);
        const userRef = doc(db, "users", userData.uid);
        if (rating === 0) {
            await updateDoc(userRef, {
                ratings: arrayRemove(movieName)
            });
        } else {
            await updateDoc(userRef, {
                ratings: arrayUnion({ docid: doc(db, "users", userData.uid), rating: rating })
            });
        }
    }
}

module.exports = { getUserData, rateMovie, getUserID };
