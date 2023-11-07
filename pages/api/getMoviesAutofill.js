//use function contained in getMovieData.js
const { getMovieData, getMovieAutofill } = require('../../backend/movieData_backend.js');

export default async (req, res) => {  
    const searchQuery = req.query.searchQuery;
    const movieData = await getMovieAutofill(searchQuery);
    //return results
    res.status(200).json({ movieData });
}