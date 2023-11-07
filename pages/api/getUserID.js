//use function contained in userData_backend.js
const { getUserDataRef, getUserDataID } = require('../../backend/userData_backend.js');

export default async (req, res) => {
    
    const userID = req.query.userID;

    const userData = await getUserDataID(userID);
    
    res.status(200).json({ userData });
}