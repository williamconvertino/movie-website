const { addChatEntry } = require("../../backend/chatboard_backend.js");

export default async (req, res) => {

    const userReference = req.query.userReference;
    const chatText = req.query.chatText;
    await addChatEntry(userReference, chatText);

    res.status(200).json({ userReference, chatText });
    
}
