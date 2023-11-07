const { addDiscussion } = require("../../backend/discussion_backend.js");

export default async (req, res) => {

    const userReference = req.query.userRef;
    const chatText = req.query.chatText;
    const parentDiscussion = req.query.parentDiscussion;
    const parentReview = req.query.parentReview;
    
    try {
        await addDiscussion(userReference, chatText, parentDiscussion, parentReview);
        res.status(200).json({ message: "Reply added successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to create thread." });
    }
    
}