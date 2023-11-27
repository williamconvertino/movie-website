const fs = require('fs');
const path = require('path');

let _censorChars = '@#$%!';
let _censorPool = [];


const _ROOT = path.resolve(__dirname);

let words = null;

function loadWords(wordlistFile = 'wordlist.txt') {
    const filePath = path.join(_ROOT, 'data', wordlistFile);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    words = fileContent.split('\n').map(w => w.trim()).filter(w => w);
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

module.exports = censorInput;
