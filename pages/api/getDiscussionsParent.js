const {getDiscussionsReviewID, getDiscussionsParentID} = require("../../backend/discussion_backend.js");

export default async (req, res) => {
    const parentID = req.query.parentID;
    const limit = req.query.limit;
    try {
        const discussionData = await getDiscussionsParentID(parentID, limit);
        res.status(200).json({discussionData: discussionData});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to fetch discussion." });
    }
}