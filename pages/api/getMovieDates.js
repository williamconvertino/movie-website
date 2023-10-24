const { getMoviebyDate } = require('../../backend/movieData_backend.js');

export default async (req, res) => {  

    try {
        const movieData = await getMoviebyDate(req.query.q);
        res.status(200).json({ movieData });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies." });
    }
}