// get user data for provided email address
// returns user data object
const {
    getFirestore,
    collection,
    query,
    where,
    getDocs
} = require("firebase/firestore");

const { db } = require('./firebase_backend')

const getUserData = async (username) => {

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));

    const querySnapshot = await getDocs(q);
    let userData = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id
        userData.push(data);
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
