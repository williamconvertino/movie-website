const {getDiscussionsReviewID} = require("../../backend/discussion_backend.js");

export default async (req, res) => {
    const reviewID = req.query.reviewID;
    const limit = req.query.limit;
    try {
        const discussionData = await getDiscussionsReviewID(reviewID, limit);
        res.status(200).json({discussionData: discussionData});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to fetch discussion." });
    }
}