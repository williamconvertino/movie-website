// api for adding user

import addUser from "../../backend/addUser_backend.js";

export default async (req, res) => {
    const user = {
        UID: req.query.UID,
        email: req.query.email,
        ratings: [],
        //other user things 
    };

    try {
        const userId = await addUser(user);
        res.status(200).json({message: "User added and data updated successfully."});
    } catch (error) {
        res.status(500).json({ error: "Failed to add user." });
    }
};
