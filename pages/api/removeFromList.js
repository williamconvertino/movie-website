const {removeFromList} = require('../../backend/saveMovie_backend')

export default async (req, res) => {
    const movieName = req.query.movieName;
    const userID = req.query.userID;
    try{
        await removeFromList(movieName, userID);
        res.status(200).json({message: "Movie removed succesfully."});
    }catch(error){
        res.status(500).json({error: "Movie not removed."});
    }
}