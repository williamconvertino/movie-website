const {
    collection,
    query,
    where,
    doc,
    getDoc,
    getDocs,
    orderBy,
    setDoc,
    addDoc,
    updateDoc
} = require("firebase/firestore");

const { db } = require('./firebase_backend')

const reportDiscussion = async (discussionID) => {
    
    const reportRef = collection(db, "reports");
    const q = query(reportRef, where("discussionID", "==", discussionID));
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.size === 0) {
        // If no document is found, create a new one
        await addDoc(reportRef, {
            discussionID: discussionID,
            numReports: 1
        });
    } else {
        // If a document is found, update its values
        
        const previousNumReports = querySnapshot.docs[0].data().numReports;
        const docToUpdate = querySnapshot.docs[0];
        await updateDoc(docToUpdate.ref, { numReports: previousNumReports + 1 });
    }
}

const reportReview = async (reviewID) => {
    
    const reportRef = collection(db, "reports");
    const q = query(reportRef, where("reviewID", "==", reviewID));
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.size === 0) {
        // If no document is found, create a new one
        await addDoc(reportRef, {
            reviewID: reviewID,
            numReports: 1
        });
    } else {
        // If a document is found, update its values
        
        const previousNumReports = querySnapshot.docs[0].data().numReports;
        const docToUpdate = querySnapshot.docs[0];
        await updateDoc(docToUpdate.ref, { numReports: previousNumReports + 1 });
    }
}

const getReportedReviews = async () => {
    const reportRef = collection(db, "reports");
    const q = query(reportRef, orderBy("numReports", "desc"));
    const querySnapshot = await getDocs(q);
    
    const reportedReviews = []
    
    for (const doc of querySnapshot.docs) {
        const data = doc.data();
        if (data.reviewID == null) continue;
        data.id = doc.id;
        reportedReviews.push(data);
    }

    const reviews = []
    
    for (const review of reportedReviews) {
        const reviewRef = doc(db, "reviews", review.reviewID);
        const reviewDoc = await getDoc(reviewRef);
        const data = reviewDoc.data();
        data.id = reviewDoc.id;
        data.numReports = review.numReports;
        reviews.push(data);
    }
    
    return reviews;
}

const getReportedDiscussions = async () => {
    const reportRef = collection(db, "reports");
    const q = query(reportRef, orderBy("numReports", "desc"));
    const querySnapshot = await getDocs(q);
    
    const reportedDiscussions = []
    for (const doc of querySnapshot.docs) {
        const data = doc.data();
        if (data.discussionID == null) continue;
        data.id = doc.id;
        reportedDiscussions.push(data);
    }

    const discussions = []
    
    for (const discussion of reportedDiscussions) {
        const discussionRef = doc(db, "discussions", discussion.discussionID);
        const discussionDoc = await getDoc(discussionRef);
        const data = discussionDoc.data();
        data.id = discussionDoc.id;
        data.numReports = discussion.numReports;
        discussions.push(data);
    }

    return discussions;
}

module.exports = { reportDiscussion, reportReview, getReportedReviews, getReportedDiscussions };