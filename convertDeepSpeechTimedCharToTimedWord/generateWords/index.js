// function convertDeepSpeechTimedCharToTimedWord(items) {
//   const result = [];
//   let word = { text: "" };
//   let isNewWord = true;
//   items.forEach(c => {
//     if (c.character === " ") {
//       // TODO: in silence gap, If silence gap in seconds, larger then x, then add full stop `.`?
//       // determine X based on dpe transcript from PBS interview, and paragraph sentense timings gaps
//       // min number, compute programmatically.
//       word.end = c.start_time;
//       word.text = word.text.trim();
//       result.push(word);
//       word = { text: "" };
//       isNewWord = true;
//     }
//     if (c.character) {
//       if (isNewWord) {
//         word.start = c.start_time;
//       }
//       // if it is a new word, convert to false, if it is already false, leave as is
//       isNewWord = isNewWord ? !isNewWord : isNewWord;
//       word.text += c.character;
//     }
//   });
//   return result;
// }

// module.exports = convertDeepSpeechTimedCharToTimedWord;

const maxSilenceDurationForPunctuationInSeconds = 1;

// TODO: add id/counter to words 
// parhaps separate function with map.
function convertDeepSpeechTimedCharToTimedWord(items) {
    const result = [];
    let word = { text: "" };
    let isNewWord = true;
    items.forEach((c , index)=> {
      if (c.character === " ") {
        word.text = word.text.trim();
        // adding punctuation 
        // in silence gap, If silence gap in seconds, larger then x, then add full stop `.`?
        // eg 1 second
        // determine X based on dpe transcript from PBS interview, and paragraph sentense timings gaps
        // min number, compute programmatically.
        const previousItemStartTime = items[index-1].start_time;
        const pauseDuationBetweenCurrentWords = c.start_time - previousItemStartTime;
        if(pauseDuationBetweenCurrentWords > maxSilenceDurationForPunctuationInSeconds){
            word.text +='.'
        }
        result.push(word);
        // TODO: add a paragraph array for complete punctuation.
        // separate function from this output 
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
        word.end = c.start_time;
      }
    });
    return result;
  }
  
  module.exports = convertDeepSpeechTimedCharToTimedWord;
  