const convertDeepSpeechTimedCharToTimedWord = require('./generateWords/index.js');
const createParagraphsFromWords = require('./generateParagraphs/index.js');

const roundUpWords = (words) => {
  return words.map(({ start, end, text }) => {
    return {
      start: parseFloat(parseFloat(start).toFixed(2)),
      end: parseFloat(parseFloat(end).toFixed(2)),
      text,
    };
  });
};

/**
 *
 * @param {json} deepSpeechData - STT with char level timings from DeepSpeech `sttWithMetadata`
 */

function convertDeepSpeechToDPE(deepSpeechData) {
  // TODO: test with something longer see if the alternative are need or just using first is ok
  const items = deepSpeechData.transcripts[0];
  const wordsRaw = convertDeepSpeechTimedCharToTimedWord(items.tokens);
  const words = roundUpWords(wordsRaw);
  const paragraphs = createParagraphsFromWords(words);
  return { words, paragraphs };
}

module.exports = convertDeepSpeechToDPE;
