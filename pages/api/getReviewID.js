const {getReviewbyID} = require("../../backend/review_backend.js");

export default async (req, res) => {
    const reviewID = req.query.reviewID;
    
    try {
        const reviewData = await getReviewbyID(reviewID);
        res.status(200).json({reviewData});
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch review." });
    }
}