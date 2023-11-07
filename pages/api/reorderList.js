const {reorderList} = require('../../backend/saveMovie_backend')

export default async (req, res) => {
    const userID = req.query.userID;
    const movieName = req.query.movieName;
    const newIndex = req.query.newIndex;

    // try{
        await reorderList(movieName, userID, newIndex);
        res.status(200).json({message: "List updated succesfully."});
    // }catch(error){
    //     res.status(500).json({error: "Failed to update list."});
    // }
}