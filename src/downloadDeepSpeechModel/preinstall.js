const fs = require('fs');
const wget = require('wget-improved');
// ascii progress bar
const ProgressBar = require('progress');
const tar = require('tar');

function Filedownload(src, output) {
  console.log(
    'The Demo is now downloading the pre-trained files (roughly 1.8GB), ' +
      'this will take a few moments...',
  );

  const download = wget.download(src, output);
  download.on('error', console.error);

  let bar = null;
  download.on('progress', progress => bar.tick(progress));
  download.on('start', () => {
    bar = new ProgressBar('  downloading [:bar] :percent :etas', {
      width: 20,
      total: 100000 / 2,
    });
  });

  download.on('end', async () => {
    bar.tick(100000 / 2);
    console.log('\n Extracting tar archive...');
    // unzip
    await tar.x({ file: output });
    console.log('Done extracting archive');
    // renaming files?
    console.log('Removinf temporary tar archive...');
    fs.unlinkSync(output);
  });
}

const modelSrc =
  'https://github.com/mozilla/DeepSpeech/releases/download/v0.6.0/deepspeech-0.6.0-models.tar.gz';
const modelOutput = './models.tar.gz';
Filedownload(modelSrc, modelOutput);