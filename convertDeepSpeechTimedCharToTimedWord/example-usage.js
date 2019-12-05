const exampleDeepSpeech = require('./deepspeech-example-output.json')
const convertDeepSpeechTimedCharToTimedWord = require('./index.js');


const result = convertDeepSpeechTimedCharToTimedWord(exampleDeepSpeech.items)

console.log(JSON.stringify(result, null,2))