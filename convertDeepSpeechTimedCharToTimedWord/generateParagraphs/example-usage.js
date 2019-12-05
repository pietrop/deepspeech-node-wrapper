const fs = require('fs');
const exampleDeepSpeechWords = require('../generateWords/dpe-words.json')
const createParagraphsFromWords = require('./index.js');


const result = createParagraphsFromWords(exampleDeepSpeechWords)


fs.writeFileSync('./convertDeepSpeechTimedCharToTimedWord/generateParagraphs/dpe-paragraphs.json', JSON.stringify(result, null,2))