// get user data for provided email address
// returns user data object

const getUserData = async (UID) => {
    const {
        getFirestore,
        collection,
        query,
        where,
        getDocs
    } = require("firebase/firestore");

    const { app } = require("../firebase/firebase.js");

    const db = getFirestore(app);

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("UID", "==", UID));

    const querySnapshot = await getDocs(q);
    let userData = [];
    querySnapshot.forEach((doc) => {
        userData.push(doc.data());
    });
    return userData;
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
        const {
            getFirestore,
            collection,
            doc,
            updateDoc,
            arrayUnion,
            arrayRemove
        } = require("firebase/firestore");
        const db = getFirestore(app);
        const userRef = doc(db, "users", userData.uid);
        if (rating === 0) {
            await updateDoc(userRef, {
                ratings: arrayRemove(movieName)
            });
        } else {
            await updateDoc(userRef, {
                ratings: arrayUnion({ docid: doc.id, rating: rating })
            });
        }
    }
}

module.exports = { getUserData, rateMovie };
