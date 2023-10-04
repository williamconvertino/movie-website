//use function contained in userData_backend.js
const { getUserData } = require('../../backend/userData_backend.js');

export default async (req, res) => {
    //takes in email address
    // on call: http://localhost:3000/api/getUser
    // get user data from firebase if user is logged in
    const username = req.query.username;
    const userData = await getUserData(username);
    //return results
    res.status(200).json({ userData });
}