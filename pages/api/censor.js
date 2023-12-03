import { censor } from '@backend/censorship/censorInput';

export default async (req, res) => {

    const content = req.query.content;

    const censoredContent = censor(content);

    res.status(200).json({censoredContent: censoredContent});

};
