const fs = require('fs');
const exampleDeepSpeech = require('../deepspeech-data.json').transcripts[0].tokens;
const convertDeepSpeechTimedCharToTimedWord = require('./index.js');

const result = convertDeepSpeechTimedCharToTimedWord(exampleDeepSpeech);

// console.log(JSON.stringify(result, null,2))

fs.writeFileSync(
  './src/convertDeepSpeechTimedCharToTimedWord/generateWords/dpe-words.json',
  JSON.stringify(result, null, 2)
);
