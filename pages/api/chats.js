const { getUserChats }  = require("../../backend/chatboard_backend.js");

export default async (req, res) => {
        const userID = req.query.userID;
        const userChats = await getUserChats(userID);
    
        res.status(200).json(userChats);
    }