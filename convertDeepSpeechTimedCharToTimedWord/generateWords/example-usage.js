const fs = require('fs');
const exampleDeepSpeech = require('../deepspeech-data.json')
const convertDeepSpeechTimedCharToTimedWord = require('./index.js');


const result = convertDeepSpeechTimedCharToTimedWord(exampleDeepSpeech.items)

// console.log(JSON.stringify(result, null,2))

fs.writeFileSync('./convertDeepSpeechTimedCharToTimedWord/generateWords/dpe-words.json', JSON.stringify(result, null,2))