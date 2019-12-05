function convertDeepSpeechTimedCharToTimedWord(items) {
  const result = [];
  let word = { text: "" };
  let isNewWord = true;
  items.forEach(c => {
    if (c.character === " ") {
      word.end = c.start_time;
      word.text = word.text.trim();
      result.push(word);
      word = { text: "" };
      isNewWord = true;
    }
    if (c.character) {
      if (isNewWord) {
        word.start = c.start_time;
      }
      // if it is a new word, convert to false, if it is already false, leave as is
      isNewWord = isNewWord ? !isNewWord : isNewWord;
      word.text += c.character;
    }
  });
  return result;
}

module.exports = convertDeepSpeechTimedCharToTimedWord;
