const {getDiscussionbyID} = require("../../backend/discussion_backend.js");

export default async (req, res) => {
    const discussionID = req.query.discussionID;
    
    try {
        const discussionData = await getDiscussionbyID(discussionID);
        res.status(200).json({discussionData});
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch discussion." });
    }
}