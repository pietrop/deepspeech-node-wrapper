// TODO: add id/counter to paragraphs
// parhaps separate function with map.

// TODO: handle edge case when didn't add any paragraphs, to create one large paragraph

function createParagraphsFromWords(wordsList) {
  const result = [];
  const SPEAKER_LABEL = "TBC";
  let speakerItem = { speaker: `${SPEAKER_LABEL} 0`, start: 0, end: 0 };
  let speakerCounter = 0;
  let isNewSpeaker = true;
  wordsList.forEach(word => {
    if (word.text.includes(".")) {
      speakerItem.end = word.end;
      speakerCounter += 1;
      speakerItem.speaker = `${SPEAKER_LABEL} ${speakerCounter}`;
      result.push(speakerItem);
      speakerItem = {};
      isNewSpeaker = true;
    } else {
      if (isNewSpeaker) {
        speakerItem.start = word.start;
      }
      // if it is a new word, convert to false, if it is already false, leave as is
      isNewSpeaker = isNewSpeaker ? !isNewSpeaker : isNewSpeaker;
      speakerItem.end = word.end;
    }
  });

  return result;
}

module.exports = createParagraphsFromWords;