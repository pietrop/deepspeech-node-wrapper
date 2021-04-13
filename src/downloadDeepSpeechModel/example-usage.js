const path = require('path');
const downloadDeepSpeechModel = require('./index.js');
// TODO: try different path
// eg
// deepspeech-0.6.0-models
// const modelTarName = 'deepspeechmodels.tar.gz';
const outputPathDestination = path.join('/Users/passarellip/Desktop');
const MODEL_V = '0.9.3';

const exampleProgressCallback = (progressData) => {
  console.log('progressData', progressData);
};

downloadDeepSpeechModel(outputPathDestination, MODEL_V, exampleProgressCallback)
  .then((res) => {
    console.log('res', res);
  })
  .catch((error) => {
    console.error('error', error);
  });
