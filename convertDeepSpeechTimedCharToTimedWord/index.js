// const exampleDeepSpeech = require('../deepspeech-data.json');
const convertDeepSpeechTimedCharToTimedWord = require('./generateWords/index.js');
const createParagraphsFromWords = require('./generateParagraphs/index.js');

/**
 * 
 * @param {json} deepSpeechData - STT with char level timings from DeepSpeech `sttWithMetadata`
 */
function convertDeepSpeechToDPE(deepSpeechData){
    const items = deepSpeechData.items? deepSpeechData.items : deepSpeechData;
    const words = convertDeepSpeechTimedCharToTimedWord(items);
    const paragraphs = createParagraphsFromWords(words)
    return {words, paragraphs}
}

module.exports = convertDeepSpeechToDPE;