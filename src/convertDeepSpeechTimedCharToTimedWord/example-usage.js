const deepSpeechData = require('./deepspeech-data.json');
const convertDeepSpeechToDPE = require('./index.js');

const result = convertDeepSpeechToDPE(deepSpeechData);

console.log(result);
