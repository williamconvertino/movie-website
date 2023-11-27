const { getUserReviews }  = require("../../backend/review_backend.js");

export default async (req, res) => {
        const userID = req.query.userID;
        const reviewData = await getUserReviews(userID);
        res.status(200).json({reviewData});
}