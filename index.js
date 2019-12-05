const DeepSpeech = require('deepspeech');
const fs = require('fs');
const sox = require('sox-stream');
const MemoryStream = require('memory-stream');
const Duplex = require('stream').Duplex;
const Wav = require('node-wav');
const convertDeepSpeechTimedCharToTimedWord = require('./convertDeepSpeechTimedCharToTimedWord/index.js');

const BEAM_WIDTH = 1024;
// MODEL PATH
let modelPath = './models/output_graph.pbmm';

let model = new DeepSpeech.Model(modelPath, BEAM_WIDTH);

let desiredSampleRate = model.sampleRate();

const LM_ALPHA = 0.75;
const LM_BETA = 1.85;
// MODEL PATH
let lmPath = './models/lm.binary';
// MODEL PATH
let triePath = './models/trie';

model.enableDecoderWithLM(lmPath, triePath, LM_ALPHA, LM_BETA);

let audioFile = process.argv[2] || './audio/2830-3980-0043.wav';

if (!fs.existsSync(audioFile)) {
	console.log('file missing:', audioFile);
	process.exit();
}

const buffer = fs.readFileSync(audioFile);
const result = Wav.decode(buffer);

if (result.sampleRate < desiredSampleRate) {
	console.error('Warning: original sample rate (' + result.sampleRate + ') is lower than ' + desiredSampleRate + 'Hz. Up-sampling might produce erratic speech recognition.');
}

function bufferToStream(buffer) {
	let stream = new Duplex();
	stream.push(buffer);
	stream.push(null);
	return stream;
}

let audioStream = new MemoryStream();
bufferToStream(buffer).
pipe(sox({
	// soxPath: ,
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
		type: 'raw'
	}
})).
pipe(audioStream);

audioStream.on('data', (data) => {
	console.log('data', data)
})

audioStream.on('error', (errro) => {
	console.log('error', error)
})


audioStream.on('finish', () => {
	let audioBuffer = audioStream.toBuffer();
	
	const audioLength = (audioBuffer.length / 2) * (1 / desiredSampleRate);
	// TODO: add audio length to results. seconds.
	console.log('audio length', audioLength);
	
	let result = model.sttWithMetadata(audioBuffer.slice(0, audioBuffer.length / 2));
	// TODO: need to run freeMetadata() but not sure how 
	// https://deepspeech.readthedocs.io/en/v0.6.0/NodeJS-API.html#FreeMetadata
 	
	console.log('result:', result);
	const metadataItem = result.items[0]
	console.log(metadataItem)
	console.log(metadataItem.character, metadataItem.start_time)
	fs.writeFileSync('example-output.json',JSON.stringify(result, null, 2))
	const dpeResult = convertDeepSpeechTimedCharToTimedWord(result);
	console.log(dpeResult)
	fs.writeFileSync('example-output-dpe.json',JSON.stringify(dpeResult, null, 2))
});

// TODO function, convert deepspeech time level char, to timed words
// function 

