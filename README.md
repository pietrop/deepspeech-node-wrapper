
## `deepspeech-node-wrapper`
<!-- _One liner + link to confluence page_
_Screenshot of UI - optional_ -->

_TBC_ _Work in progress_

A node module that wraps around Mozilla Deepspeech node, to make it easier to use and get transcripts with word level timing.

## Setup
<!-- _stack - optional_
_How to build and run the code/app_ -->

git clone, cd, npm install


## Usage
<!-- requrie from npm
```
npm install deepspeech-node-wrapper
```
-->

Promises 
```js
const deepSpeechSttWrapper = require("deepspeech-node-wrapper");
// absolute path to audio file file
const audioFile = "./audio/2830-3980-0043.wav";

deepSpeechSttWrapper(audioFile)
  .then(res => {
    console.log(JSON.stringify(res, null, 2));
    const { dpeResult, result, audioLength } = res;
    // Do something with the result
  })
  .catch(err => {
    console.error(err);
  });
```
`async`/`await` 
```js
const deepSpeechSttWrapper = require("deepspeech-node-wrapper");
// absolute path to audio file file
const audioFile = "./audio/2830-3980-0043.wav";

async function main(audioFile){
    try{
        const res = await deepSpeechSttWrapper(audioFile);
        const { dpeResult, result, audioLength } = await res;
        console.log(dpeResult)
        fs.writeFileSync(
            "./example-output/example-output-dpe.json",
            JSON.stringify({ ...dpeResult, audioLength }, null, 2)
          );
    }
    catch(e){
        console.error(e);
    }
}

main(audioFile)
```
See example usage in src folder for more.
 

## System Architecture
<!-- _High level overview of system architecture_ -->

<!-- uses example from... -->
- initially from [`DeepSpeech/examples/nodejs_wav`](https://github.com/mozilla/DeepSpeech/tree/master/examples/nodejs_wav)
- uses [`sox-bin`](https://www.npmjs.com/package/sox-bin) to package the binary for the right OS (10mb)

<!--  could be moved -->

## Development env
 <!-- _How to run the development environment_
_Coding style convention ref optional, eg which linter to use_
_Linting, github pre-push hook - optional_ -->

- NodeJS (Versions 4.x, 5.x, 6.x, 7.x, 8.x, 9.x, 10.x, 11.x, 12.x and 13.x) [as required by Deepspeech](https://github.com/mozilla/DeepSpeech/releases/tag/v0.6.0)

## Build
<!-- _How to run build_ -->
_NA_

## Tests
<!-- _How to carry out tests_ -->
_NA_

## Deployment
<!-- _How to deploy the code/app into test/staging/production_ -->


```
npm run publish:public
``` 
