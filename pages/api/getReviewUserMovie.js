const {getReviewbyID} = require("../../backend/review_backend.js");

export default async (req, res) => {
    const userID = req.query.userID;
    const movieID = req.query.movieID;
    
    try {
        const reviewData = await getReviewbyUserMovie(userID, movieID);
        res.status(200).json({reviewData});
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch review." });
    }
}