const fs = require('fs');
const path = require('path');
const deepSpeechSttWrapper = require('./index.js');

// absolute path of file
// const audioFile = './audio/2830-3980-0043.wav';
const audioFile = './audio/012021bidenfullspeech.472d28a75f2245dc8d8e52e123889dd4.wav';
// const audioFile =
// '/Users/passarellip/CODE/BITBUCKET/callhandler/node_modules/officegen/examples/sounds_for_examples/001.wav';
// const audioFile = './trailer.wav';
// const audioFile = "/Users/passarellip/Downloads/mulvaney.wav";
// const audioFile =
// '/Users/passarellip/CODE/WORK/Democratic Presidential Debate STT Analyses/debates/Democratic Presidential Debate - June 27 (Full) | NBC News/_-cX7hni-zGD8-trimmed.wav';
async function main() {
  try {
    const modelPath = path.join(__dirname, './models_0.9.3');
    // const modelPath = path.join(__dirname,'./model_tensorflow_it');
    const res = await deepSpeechSttWrapper(audioFile, modelPath);
    const { dpeResult, audioLength } = await res;
    console.log('dpeResult', dpeResult);
    fs.writeFileSync(
      './example-output/example-output-dpe.json',
      JSON.stringify({ dpeResult, audioLength }, null, 2)
    );
  } catch (e) {
    console.error(e);
  }
}

main();
