const {removeReview} = require('../../backend/review_backend.js');

export default async (req, res) => {
    const reviewID = req.query.reviewID;
    try{
        await removeReview(reviewID);
        res.status(200).json({message: "Discussion removed succesfully."});
    }catch(error){
        res.status(500).json({error: "Discussion not removed."});
    }
}