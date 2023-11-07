const {getReviewsByMovie} = require("../../backend/review_backend.js");

export default async (req, res) => {
    const movieID = req.query.movieID;
    try {
        const reviewData = await getReviewsByMovie(movieID);
        res.status(200).json({reviewData});
    } catch (error) {
        // res.status(500).json({ error: "Failed to fetch review." });
        res.status(500).json({ error: error });
    }
}