const fs = require('fs');
const path = require('path');
const DeepSpeech = require('deepspeech');
const sox = require('sox-stream');
const soxPath = require('sox-bin');
const MemoryStream = require('memory-stream');
const Duplex = require('stream').Duplex;
const Wav = require('node-wav');
const convertDeepSpeechTimedCharToTimedWord = require('./convertDeepSpeechTimedCharToTimedWord/index.js');
const downloadDeepSpeechModel = require('./downloadDeepSpeechModel');

function deepSpeechSttWrapper(audioFile, modelPath) {
  // TODO: subsequent version, lmPath, triePath, and modelPath attribute
  // could be passed as input to allow custumization of which model to use
  const BEAM_WIDTH = 1024;
  // MODEL PATH
  let modelPathGraph = path.join(modelPath, 'deepspeech-0.9.3-models.pbmm');
  let model = new DeepSpeech.Model(modelPathGraph, BEAM_WIDTH);
  let desiredSampleRate = model.sampleRate();
  // const LM_ALPHA = 0.75;
  // const LM_BETA = 1.85;
  // MODEL PATH
  // let lmPath = path.join(modelPath, 'lm.binary');
  // MODEL PATH
  // let triePath = path.join(modelPath, 'trie');
  // model.enableDecoderWithLM(lmPath, triePath, LM_ALPHA, LM_BETA);

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(audioFile)) {
      console.log('file missing:', audioFile);
      process.exit();
    }

    const buffer = fs.readFileSync(audioFile);
    const result = Wav.decode(buffer);

    if (result.sampleRate < desiredSampleRate) {
      console.error(
        'Warning: original sample rate (' +
          result.sampleRate +
          ') is lower than ' +
          desiredSampleRate +
          'Hz. Up-sampling might produce erratic speech recognition.'
      );
    }

    function bufferToStream(buffer) {
      let stream = new Duplex();
      stream.push(buffer);
      stream.push(null);
      return stream;
    }

    let audioStream = new MemoryStream();
    bufferToStream(buffer)
      .pipe(
        sox({
          soxPath: soxPath,
          global: {
            'no-dither': true,
          },
          output: {
            bits: 16,
            rate: desiredSampleRate,
            channels: 1,
            encoding: 'signed-integer',
            endian: 'little',
            compression: 0.0,
            type: 'raw',
          },
        })
      )
      .pipe(audioStream);

    audioStream.on('data', (data) => {
      console.log('data', data);
    });

    audioStream.on('error', (errro) => {
      console.log('error', error);
      reject(error);
    });

    audioStream.on('finish', () => {
      let audioBuffer = audioStream.toBuffer();

      const audioLength = (audioBuffer.length / 2) * (1 / desiredSampleRate);

      // let result = model.sttWithMetadata(audioBuffer.slice(0, audioBuffer.length / 2));
      let result = model.sttWithMetadata(audioBuffer, 1);

      // TODO: need to run freeMetadata() but not sure how
      // https://deepspeech.readthedocs.io/en/v0.6.0/NodeJS-API.html#FreeMetadata
      // console.log('result.transcripts[0]', result.transcripts[0]);
      // console.log('model.stt(audioBuffer)', model.stt(audioBuffer));
      const dpeResult = convertDeepSpeechTimedCharToTimedWord(result);
      const resulData = { dpeResult, result, audioLength };
      // Freeing up memory
      DeepSpeech.FreeMetadata(result);
      DeepSpeech.FreeModel(model);
      resolve(resulData);
    });
  });
}

module.exports = deepSpeechSttWrapper;
module.exports.convertDeepSpeechTimedCharToTimedWord = convertDeepSpeechTimedCharToTimedWord;
module.exports.downloadDeepSpeechModel = downloadDeepSpeechModel;
