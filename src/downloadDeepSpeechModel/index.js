/**
 * Helper function
 * TODO: This Could be a separate node module (?)
 */
const fs = require("fs");
const wget = require("wget-improved");
const tar = require("tar");
const pathCompleteExtname = require('path-complete-extname');

function deepSpeechModelUrl(modelVersion) {
  // TODO: some checks it's a valid model name, eg regex for 0.6.0;
  const deepspeechModelVersion = modelVersion ? modelVersion : "0.6.0";
  return `https://github.com/mozilla/DeepSpeech/releases/download/v${deepspeechModelVersion}/deepspeech-${deepspeechModelVersion}-models.tar.gz`;
}

function downloadDeepSpeechModel(modelOutput, modelVersion) {
  let modelOutputPath = modelOutput;
  const extension = pathCompleteExtname(modelOutputPath); 
  // if output path for model does not have right tar extension,
  // then append this to it '.tar.gz'
  // TODO: properly parse the path, to make sure there are no other extensions
  if(extension !== '.tar.gz'){
    modelOutputPath += '.tar.gz';
  }
  const modelSrc = deepSpeechModelUrl(modelVersion);
  
  return new Promise(function(resolve, reject) {
    const download = wget.download(modelSrc, modelOutputPath);

    download.on("error", error => {
      reject(error);
    });

    download.on("progress", progress => {
      // bar.tick(progress)
      // code to show progress bar
      console.log("progress:: ", progress);
    });

    download.on("start", () => {
      // bar = new ProgressBar('  downloading [:bar] :percent :etas', {
      //   width: 20,
      //   total: 100000 / 2,
      // });
      console.info("start");
    });

    download.on("end", async () => {
      // bar.tick(100000 / 2);
      console.log("\n Extracting tar archive...");
      // unzip
      // TODO can test tar unzip in a separate file 
      await tar.x({ file: modelOutputPath, C: modelOutput });
      console.log("Done extracting archive");
      // extracted files will be in folder same name as tar archive 
      // but without the `.tar.gz` extension
      console.log("Removinf temporary tar archive...");
      // TODO: temporarily commenting out cleaning up after tar file, for troubleshooting
      // fs.unlinkSync(modelOutputPath);
      // TODO: rename output file,
      console.log('modelOutputPath:: ',modelOutputPath);
      // TODO: should return the name of the output file
      // containign the models, not the tar file
      resolve(modelOutput);
    });
  });
}

module.exports = downloadDeepSpeechModel;
