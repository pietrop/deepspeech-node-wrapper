/**
 * Helper function 
 * TODO: This Could be a separate node module (?)
 */
const fs = require('fs');
const wget = require('wget-improved');
// ascii progress bar
// const ProgressBar = require('progress');
const tar = require('tar');

// function Filedownload(src, output) {
//   console.log(
//     'The Demo is now downloading the pre-trained files (roughly 1.8GB), ' +
//       'this will take a few moments...',
//   );

//   const download = wget.download(src, output);
//   download.on('error', console.error);

//   let bar = null;
//   download.on('progress', progress => bar.tick(progress));
//   download.on('start', () => {
//     bar = new ProgressBar('  downloading [:bar] :percent :etas', {
//       width: 20,
//       total: 100000 / 2,
//     });
//   });

//   download.on('end', async () => {
//     bar.tick(100000 / 2);
//     console.log('\n Extracting tar archive...');
//     // unzip
//     await tar.x({ file: output });
//     console.log('Done extracting archive');
//     // renaming files?
//     console.log('Removinf temporary tar archive...');
//     fs.unlinkSync(output);
//   });
// }


// const modelOutput = './models.tar.gz';
// Filedownload(modelSrc, modelOutput);


function deepSpeechModelUrl(modelVersion){
  return `https://github.com/mozilla/DeepSpeech/releases/download/v${modelVersion}/deepspeech-${modelVersion}-models.tar.gz`; 
}

function downloadDeepSpeechModel(outputPath, modelVersion){
    // append .tar.gz to model name for tmpTarDeepSpeechModels
    const modelOutput = './models.tar.gz';
    // TODO: some checks it's a valid model name
    const deepspeechModelVersion = modelVersion ? modelVersion : '0.6.0';
    const modelSrc = deepSpeechModelUrl(deepspeechModelVersion);
    return new Promise(function(resolve, reject) {


    const download = wget.download(modelSrc, modelOutput);

    download.on('error', (error)=>{
        reject(error);
    });

    download.on('progress', (progress) => {
        // bar.tick(progress)
        console.log('progress:: ', progress);
    });

    download.on('start', () => {
        // bar = new ProgressBar('  downloading [:bar] :percent :etas', {
        //   width: 20,
        //   total: 100000 / 2,
        // });
        console.info('start')
      });

      download.on('end', async () => {
        // bar.tick(100000 / 2);
        console.log('\n Extracting tar archive...');
        // unzip
        await tar.x({ file: output });
        console.log('Done extracting archive');
        // renaming files?
        console.log('Removinf temporary tar archive...');
        fs.unlinkSync(output);
        // TODO: rename output file, 
        console.log(output)
        resolve(output)
      });
    })
}

module.exports = downloadDeepSpeechModel;