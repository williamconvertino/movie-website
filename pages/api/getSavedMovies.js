const {getUserSavedMovies} = require("../../backend/saveMovie_backend.js");

export default async (req, res) => {
    const userID = req.query.userID;
    // try{
        const movies = await getUserSavedMovies(userID);
        res.status(200).json({movies: movies});
    // }catch(error){
    //     res.status(500).json({error: "Failed to get saved movies."});
    // }
}