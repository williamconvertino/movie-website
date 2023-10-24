const { addChatEntry } = require("../../backend/chatboard_backend.js");

export default async (req, res) => {

    const userReference = req.query.userRef;
    const chatText = req.query.chatText;

    try {
        await addChatEntry(userReference, chatText);
        res.status(200).json({ userReference, chatText });
    } catch (error) {
        res.status(500).json({ error: "Failed to create thread." });
    }
    
}
