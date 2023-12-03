import {
  decodeBannedWordList,
  encodeBannedWordList,
} from '@backend/censorship/censorInput';

export default async (req, res) => {

    encodeBannedWordList()
    decodeBannedWordList()
    
    res.status(200).json({});

};
