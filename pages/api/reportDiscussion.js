import { reportDiscussion } from '@backend/report';

export default async (req, res) => {

    const {discussionID} = req.query;

    reportDiscussion(discussionID);

    res.status(200).json({});

};
