const {getReviewsByDate} = require("../../backend/review_backend.js");

export default async (req, res) => {
    const date = req.query.date;
    const limit = req.query.limit;
    try {
        const reviewData = await getReviewsByDate(date, limit);
        res.status(200).json({reviewData});
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch review." });
    }
}