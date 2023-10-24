const { addReply} = require("../../backend/chatboard_backend.js");

export default async (req, res) => {

    const userReference = req.query.userRef;
    const chatText = req.query.chatText;
    const parentThread = req.query.parent;

    try {
        await addReply(userReference, chatText, parentThread);
        res.status(200).json({ message: "Reply added successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to create thread." });
    }
    
}