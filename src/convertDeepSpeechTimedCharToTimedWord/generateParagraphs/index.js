// TODO: add id/counter to paragraphs
// parhaps separate function with map.

// TODO: handle edge case when didn't add any paragraphs, to create one large paragraph

function createParagraphsFromWords(wordsList) {
  const result = [];
  const SPEAKER_LABEL = 'U_UKN';
  let speakerItem = { speaker: `${SPEAKER_LABEL}`, start: 0, end: 0 };
  let isNewSpeaker = true;
  wordsList.forEach((word, index) => {
    // handling edge case where there is just one word
    // if (word.text.includes('.') &&&& index !== wordsList.length - 1) {
    //   speakerItem.end = word.end;
    //   speakerItem.speaker = `${SPEAKER_LABEL}`;
    //   speakerItem.start = word.start;
    //   isNewSpeaker = true;
    //   // handling edge case where the last word might not have a full stop
    // } else
    if (word.text.includes('.') || index === wordsList.length - 1) {
      speakerItem.end = word.end;
      speakerItem.speaker = `${SPEAKER_LABEL}`;
      result.push(speakerItem);
      speakerItem = {};
      isNewSpeaker = true;
      // To handle edge case of single word, then this gets overritten if it spans multiple words
      speakerItem.start = word.start;
    } else {
      if (isNewSpeaker) {
        speakerItem.start = word.start;
      }
      // if it is a new word, convert to false, if it is already false, leave as is
      isNewSpeaker = isNewSpeaker ? !isNewSpeaker : isNewSpeaker;
      speakerItem.end = word.end;
    }
  });

  // handle instance where there is no punctuation, and therefore no paragraphs
  // to make one overarching paragraph for all the words
  if (result.length === 0) {
    const firstword = wordsList[0];
    const firstwordStartTime = firstword.start;
    const numberOfWords = wordsList.length - 1;
    const lastWord = wordsList[numberOfWords];
    const lastWordEndTime = lastWord.end;
    const speakerItem = {
      speaker: `${SPEAKER_LABEL}`,
      start: firstwordStartTime,
      end: lastWordEndTime,
    };
    result.push(speakerItem);
  }

  return result;
}

module.exports = createParagraphsFromWords;
