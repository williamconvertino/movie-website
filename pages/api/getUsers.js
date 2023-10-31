//use function contained in userData_backend.js
const { getUserData } = require('../../backend/userData_backend.js');

export default async (req, res) => {

    const username = req.query.username;
    const userData = await getUserData(username);
    //return results
    res.status(200).json({ userData });
}