//use function contained in getMovieData.js
const { getMovieData_ID } = require('../../backend/movieData_backend.js');

export default async (req, res) => {  
    //get search query;
    const movieData = await getMovieData_ID(req.query.q);
    //return results
    res.status(200).json({ movieData });
}