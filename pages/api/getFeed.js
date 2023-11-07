const { generateFeed } = require('../../backend/generateFeed.js');

export default async (req, res) => {
    try {
        const data = await generateFeed();
        res.status(200).json({ data });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to fetch feed." });
    }
}
