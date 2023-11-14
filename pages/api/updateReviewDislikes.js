const {updateDislike} = require('../../backend/review_like_backend');
export default async (req, res) => {  
    
    const {reviewID, likeValue} = req.query;
    await updateDislike(reviewID, likeValue);

    res.status(200).json({});
}