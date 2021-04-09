const convertDeepSpeechTimedCharToTimedWord = require('./generateWords/index.js');
const createParagraphsFromWords = require('./generateParagraphs/index.js');

/**
 *
 * @param {json} deepSpeechData - STT with char level timings from DeepSpeech `sttWithMetadata`
 */
function convertDeepSpeechToDPE(deepSpeechData) {
  // TODO: test with something longer see if the alternative are need or just using first is ok
  const items = deepSpeechData.transcripts[0];
  const words = convertDeepSpeechTimedCharToTimedWord(items.tokens);
  const paragraphs = createParagraphsFromWords(words);
  return { words, paragraphs };
}

module.exports = convertDeepSpeechToDPE;
