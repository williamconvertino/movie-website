// adds users

const {
    getFirestore,
    collection,
    doc,
    setDoc,
    arrayUnion,
} = require("firebase/firestore");

const { app } = require("../firebase/firebase.js");

const addUser = async (user) => {
    const db = getFirestore(app);

    try {
        // add user to collection
        const usersRef = collection(db, "users");
        const userDocRef = doc(usersRef, user.uid);
        await setDoc(userDocRef, user);

        //updates user data
        if (user.ratings && user.ratings.length > 0) {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                ratings: arrayUnion(...user.ratings),
            }, { merge: true });
        }

        console.log("User added and data updated successfully.");
    } catch (e) {
        console.error("Error adding user and updating data: ", e);
        throw e;
    }
};

module.exports = addUser;

