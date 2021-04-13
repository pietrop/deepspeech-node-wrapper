/**
 * Helper function
 * TODO: This Could be a separate node module (?)
 */
const fs = require('fs');
const path = require('path');
const wget = require('wget-improved');
const tar = require('tar');
// const pathCompleteExtname = require('path-complete-extname');

const DEFAULT_MODEL_V = '0.9.3';

function deepSpeechModelUrl(modelVersion) {
  // TODO: some checks it's a valid model name, eg regex for 0.6.0;
  const deepspeechModelVersion = modelVersion ? modelVersion : DEFAULT_MODEL_V;
  // return `https://github.com/mozilla/DeepSpeech/releases/download/v${deepspeechModelVersion}/deepspeech-${deepspeechModelVersion}-models.tar.gz`;
  // TODO: the convention for model name is not consistent across releases
  return `https://github.com/mozilla/DeepSpeech/releases/download/v${deepspeechModelVersion}/models_0.9.tar.gz`;
}

function modelFolderOutputName(destFolder, modelVersion) {
  const deepspeechModelVersion = modelVersion ? modelVersion : DEFAULT_MODEL_V;
  const modelFolderName = `deepspeech-${deepspeechModelVersion}-models`;
  return path.join(destFolder, modelFolderName);
}

function downloadDeepSpeechModel(destFolder, modelVersion, progressCallback) {
  const deepspeechModelVersion = modelVersion ? modelVersion : DEFAULT_MODEL_V;
  const modelOutputPath = path.join(
    destFolder,
    `deepspeech-${deepspeechModelVersion}-models.tar.gz`
  );
  // const extension = pathCompleteExtname(modelOutputPath);
  // if output path for model does not have right tar extension,
  // then append this to it '.tar.gz'
  // TODO: properly parse the path, to make sure there are no other extensions
  // if(extension !== '.tar.gz'){
  //   modelOutputPath += '.tar.gz';
  // }
  const modelSrc = deepSpeechModelUrl(modelVersion);

  return new Promise(function (resolve, reject) {
    const download = wget.download(modelSrc, modelOutputPath);

    download.on('error', (error) => {
      reject(error);
    });

    download.on('progress', (progress) => {
      // bar.tick(progress)
      // code to show progress bar
      console.log('progress:: ', progress);
      if (progressCallback) {
        // Convert progress callback eg 0.9999937336371199 to 100%
        progressCallback(parseFloat(progress) * 100);
      }
    });

    download.on('start', () => {
      // bar = new ProgressBar('  downloading [:bar] :percent :etas', {
      //   width: 20,
      //   total: 100000 / 2,
      // });
      console.info('start');
    });

    download.on('end', async () => {
      // bar.tick(100000 / 2);
      console.log('\n Extracting tar archive...');
      // unzip
      // TODO can test tar unzip in a separate file
      await tar.x({ file: modelOutputPath, C: destFolder });
      console.log('Done extracting archive');
      // extracted files will be in folder same name as tar archive
      // but without the `.tar.gz` extension
      console.log('Removing temporary tar archive...');
      // TODO: temporarily commenting out cleaning up after tar file, for troubleshooting
      await fs.unlinkSync(modelOutputPath);
      // TODO: rename output file,
      console.log('modelOutputPath:: ', modelOutputPath);
      // seems like when you do unzip a tar it gives it the default
      // name that it had when it was zipped?
      // so doing this workaround to grap the final model folder name
      // pehaps in can look into how to give it a custom name?
      const deepSpeechmodelPath = modelFolderOutputName(destFolder, modelVersion);
      console.log('deepSpeechmodelPath:: ', modelOutputPath);
      // TODO: should return the name of the output file
      // containign the models, not the tar file
      resolve(deepSpeechmodelPath);
    });
  });
}

module.exports = downloadDeepSpeechModel;
