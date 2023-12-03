const { generateFeed } = require('../../backend/generateFeed.js');

export default async (req, res) => {
    const {feedOption} = req.query;
    const data = await generateFeed(feedOption);
    res.status(200).json({ data: data });

}
