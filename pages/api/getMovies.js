//use function contained in getMovieData.js
const { getMovieData } = require('../../backend/movieData_backend.js');

export default async (req, res) => {
    // on call: http://localhost:3000/api/getMovies?searchQuery=
    // get data from firebase for movie names based on search query
    const searchQuery = req.query.searchQuery;
    const movieData = await getMovieData(searchQuery);
    //return results
    res.status(200).json({ movieData });
}