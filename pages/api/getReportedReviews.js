import { getReportedReviews } from '@backend/report';

export default async (req, res) => {

    const reviewData = await getReportedReviews()
    res.status(200).json({reviewData: reviewData});

};
