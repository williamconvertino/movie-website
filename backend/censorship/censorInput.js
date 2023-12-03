const fs = require('fs');
const path = require('path');

let _censorChars = '*';
let _censorPool = [];


const _ROOT = path.resolve(__dirname);

let words = null;

function encodeBannedWordList() {
    const filePath = path.resolve('./public', 'bannedwordlist.txt');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const wordList = fileContent.split('\n').map(w => w.trim()).filter(w => w);
    const encodedWordList = [];

    wordList.forEach(word => {
        const encodedWord = encodeWord(word);
        encodedWordList.push(encodedWord);
    });

    const encodedFilePath = path.resolve('./public', 'bannedwordlist_encoded.txt');
    fs.writeFileSync(encodedFilePath, encodedWordList.join('\n'), 'utf8');
}

function decodeBannedWordList() {
    const filePath = path.resolve('./public', 'bannedwordlist_encoded.txt');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const wordList = fileContent.split('\n').map(w => w.trim()).filter(w => w);
    const encodedWordList = [];

    wordList.forEach(word => {
        const encodedWord = decodeWord(word);
        encodedWordList.push(encodedWord);
    });

    const encodedFilePath = path.resolve('./public', 'bannedwordlist_decoded.txt');
    fs.writeFileSync(encodedFilePath, encodedWordList.join('\n'), 'utf8');
}

function decodeWord(word) {
    let decodedWord = '';
    for (let i = 0; i < word.length; i++) {
        const charCode = word.charCodeAt(i);
        const decodedChar = String.fromCharCode(charCode - 1);
        decodedWord += decodedChar;
    }
    return decodedWord;
}

function encodeWord(word) {
    let encodedWord = '';
    for (let i = 0; i < word.length; i++) {
        const charCode = word.charCodeAt(i);
        const encodedChar = String.fromCharCode(charCode + 1);
        encodedWord += encodedChar;
    }
    return encodedWord;
}


function loadWords() {
    const filePath = path.resolve('./public', 'bannedwordlist_encoded.txt');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    words = fileContent.split('\n').map(w => w.trim()).filter(w => w).map(w => decodeWord(w));
}

function getCensorChar() {
    if (_censorPool.length === 0) {
        _censorPool = _censorChars.split('');
    }
    return _censorPool.splice(Math.floor(Math.random() * _censorPool.length), 1)[0];
}

function censor(inputText) {
    if (!words) {
        loadWords();
    }

    let ret = inputText;
    words.forEach(word => {
        const curseWord = new RegExp(word, 'gi');
        const cen = Array.from(word).map(() => getCensorChar()).join('');
        ret = ret.replace(curseWord, cen);
    });
    return ret;
}

const censorInput = (input) => {
    const inputString = typeof input === 'object' ? JSON.stringify(input) : input;

    if (words.some(word => inputString.includes(word))) {
        return { censored: censor(inputString) };
    }

    return { approved: inputString };
};

module.exports = {censorInput, censor, encodeWord, decodeWord, encodeBannedWordList, decodeBannedWordList};
