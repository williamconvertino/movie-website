const { addReviewEntry } = require("../../backend/review_backend.js");

export default async (req, res) => {

    const userID = req.query.userID;
    const content = req.query.content;
    const movieID = req.query.movieID;

    try {
        await addReviewEntry(userID, content, movieID);
        res.status(200).json({ userID, content, movieID });
    } catch (error) {
        res.status(500).json({ error: "Failed to create review." });
    }
    
}
