const {saveMovie} = require('../../backend/saveMovie_backend')

export default async (req, res) => {
    const movieName = req.query.movieName;
    const userID = req.query.userID;
    try{
        await saveMovie(movieName, userID);
        res.status(200).json({message: "movie saved succesfully"});
    }catch(error){
        res.status(500).json({error: "Failed to save movie."});
    }
}