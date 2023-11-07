const {
    collection,
    arrayUnion,
    arrayRemove,
    doc,
    addDoc,
    getDocs,
    getDoc,
    runTransaction,
    where,
    query,
    updateDoc
} = require("firebase/firestore");

const { db } = require('./firebase_backend')

const saveMovie = async (movieName, userID) => {
    const saveMovieRef = collection(db, "savedMovies");
    const movieRef = collection(db, "movieProfiles");

    //check if list already exists for given user
    const q2 = query(saveMovieRef, where("user", "==", userID));
    const querySnapshot2 = await getDocs(q2);
    let listID = null;
    querySnapshot2.forEach((doc) => {
        listID = doc.id;
    });

    //creates new list for user without list
    if (listID == null) {
        await addDoc(saveMovieRef, {
            user: userID,
            listName: "default",
            movie: arrayUnion(movieName)
        });
    }

    //adds movie to existing list for user
    else { 
        const listRef = doc(db, "savedMovies/", listID);
        await updateDoc(listRef, {
            movie: arrayUnion(movieName)
        });
    }
}

const updateListName = async (userID, newName) => {
    const saveMovieRef = collection(db, "savedMovies");
    const q = query(saveMovieRef, where("user", "==", userID));
    const querySnapshot = await getDocs(q);
    let listID = null;
    querySnapshot.forEach((doc) => {
        listID = doc.id;
    });
    const listRef = doc(db, "savedMovies/", listID);
    await updateDoc(listRef, {
        listName: newName
    });
}


const getUserSavedMovies = async (userID) => {
    const savedMoviesRef = collection(db, "savedMovies");
    const q = query(savedMoviesRef, where("user", "==", userID));
    const querySnapshot = await getDocs(q);
    let savedMoviesData = [];
    querySnapshot.forEach((doc) => {
        const data = doc.get("movie");
        savedMoviesData.push(data);
    });
    return savedMoviesData;
}

const removeListbyID = async (listID) => {
    const listRef = doc(db, "lists/", listID);
    await deleteDoc(listRef);
}

const removeFromList = async (movieName, userID) => {
    const saveMovieRef = collection(db, "savedMovies");
    const q = query(saveMovieRef, where("user", "==", userID));
    const querySnapshot = await getDocs(q);
    let listID = null;
    querySnapshot.forEach((doc) => {
        listID = doc.id;
    });
    const listRef = doc(db, "savedMovies/", listID);
    await updateDoc(listRef, {
        movie: arrayRemove(movieName)
    });
}

const reorderList = async (movieName, userID, newIndex) => {
    const saveMovieRef = collection(db, "savedMovies");
    const q = query(saveMovieRef, where("user", "==", userID));
    const querySnapshot = await getDocs(q);
    let listID = null;
    
    querySnapshot.forEach((doc) => {
        listID = doc.id;
    });
    
    const listRef = doc(db, "savedMovies/", listID);

    await runTransaction(db, async (transaction) => {
        const listDoc = await transaction.get(listRef);

        if (!listDoc.exists()) {
            throw new Error("Document does not exist!");
        }

        const listData = listDoc.data();
        const listMovies = listData.movie;

        // Remove the movie from its current position
        const updatedListMovies = listMovies.filter((movie) => movie !== movieName);

        // Insert the movie at its new position
        updatedListMovies.splice(newIndex, 0, movieName);

        // Update the 'movie' field in the document
        transaction.update(listRef, { movie: updatedListMovies });
    });
};





module.exports = { saveMovie, getUserSavedMovies, removeListbyID, removeFromList, updateListName, reorderList }