const {updateListName} = require('../../backend/saveMovie_backend')

export default async (req, res) => {
    const userID = req.query.userID;
    const newName = req.query.newName;
    try{
        await updateListName(userID, newName);
        res.status(200).json({message: "list name updated succesfully."});
    }catch(error){
        res.status(500).json({error: "Failed to update list name."});
    }
}