const { getUserChats }  = require("../../backend/chatboard_backend.js");

export default async (req, res) => {
        const userID = req.query.uid;
        const limit = req.query.limit;
            const userChats = await getUserChats(userID, limit);
            res.status(200).json({userChats, message: "Fetched user chats successfully."});

    }