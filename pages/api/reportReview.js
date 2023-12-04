import { reportReview } from '@backend/report';

export default async (req, res) => {

    const {reviewID} = req.query;

    reportReview(reviewID);

    res.status(200).json({});

};
