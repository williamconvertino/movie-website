const { getUserID } = require('../../backend/userData_backend.js');

export default async (req, res) => {

    const userID = req.query.UID;
    const userData = await getUserID(userID);
    //return results
    res.status(200).json({ userData });
}