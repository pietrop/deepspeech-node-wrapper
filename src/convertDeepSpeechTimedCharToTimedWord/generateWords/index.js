const maxSilenceDurationForPunctuationInSeconds = 1;
// TODO: add id/counter to words
// parhaps separate function with map.
function convertDeepSpeechTimedCharToTimedWord(items) {
  const result = [];
  let word = { text: '' };
  let isNewWord = true;
  items.forEach((c, index) => {
    if (c.text === ' ') {
      word.text = word.text.trim();
      // adding punctuation
      // in silence gap, If silence gap in seconds, larger then x, then add full stop `.`?
      // eg 1 second
      // determine X based on dpe transcript from PBS interview, and paragraph sentense timings gaps
      // min number, compute programmatically.
      const previousItemStartTime = items[index - 1].start_time;
      const pauseDuationBetweenCurrentWords = c.start_time - previousItemStartTime;
      if (pauseDuationBetweenCurrentWords > maxSilenceDurationForPunctuationInSeconds) {
        word.text += '.';
      }
      result.push(word);
      // TODO: add a paragraph array for complete punctuation.
      // separate function from this output
      word = { text: '' };
      isNewWord = true;
    }
    if (c.text) {
      if (isNewWord) {
        word.start = c.start_time;
      }
      // if it is a new word, convert to false, if it is already false, leave as is
      isNewWord = isNewWord ? !isNewWord : isNewWord;
      word.text += c.text;
      word.end = c.start_time;
    }

    if (index === items.length - 1) {
      result.push(word);
    }
  });
  return result;
}

module.exports = convertDeepSpeechTimedCharToTimedWord;
