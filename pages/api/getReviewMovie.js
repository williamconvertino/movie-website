const {getReviewsByMovie} = require("../../backend/review_backend.js");

export default async (req, res) => {
    const movieRef = req.query.movieRef;
    try {
        const reviewData = await getReviewsByMovie(movieRef);
        res.status(200).json({reviewData});
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch review." });
    }
}