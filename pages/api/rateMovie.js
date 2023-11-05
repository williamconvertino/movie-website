const { rateMovie } = require("../../backend/userData_backend.js");

export default async (req, res) => {

    const userEmail = req.query.userEmail;
    const movieId = req.query.movieId;
    const rating = req.query.rating;
    await rateMovie(userEmail, movieId, rating);

    res.status(200).json({ userEmail, movieId, rating });
    
}
