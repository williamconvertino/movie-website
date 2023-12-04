import { getReportedDiscussions } from '@backend/report';

export default async (req, res) => {

   const discussionData = await getReportedDiscussions()
    res.status(200).json({discussionData: discussionData});

};
