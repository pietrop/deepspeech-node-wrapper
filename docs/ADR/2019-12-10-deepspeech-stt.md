# Deepspeech STT Models integration

* Status: considered <!-- optional -->
* Deciders: Pietro <!-- optional -->
* Date: 2019-12-11 

## Context and Problem Statement

Making a node wrapper for Mozilla Deepseepch, in `deepspeech-node-wrapper`.

Using Mozilla node `deepspeech` module and their example [`DeepSpeech/examples/nodejs_wav`](https://github.com/mozilla/DeepSpeech/tree/master/examples/nodejs_wav) as a starting point.

The question this ADR explore is, how to package the the STT models in this npm module?

## Decision Drivers <!-- optional -->

* Easy to reason around
* Avoid adding large binaries to git repository 
* ease of use and setup 
* considerate of slow internet connections
* … <!-- numbers of drivers can vary -->

## Considered Options

1. model in npm package
2. two npm packages
3. Download models in host app (eg Electron)
4. npm binaries
5. npm pre install with `wget`
* … <!-- numbers of options can vary -->

## Decision Outcome

<!-- Chosen option: "[option 1]", because [justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force force | … | comes out best (see below)]. -->

_TBC_

most likely a combination of these 5 options

<!-- ### Positive Consequences 

* [e.g., improvement of quality attribute satisfaction, follow-up decisions required, …]
* …

### Negative consequences

* [e.g., compromising quality attribute, follow-up decisions required, …]
* …
-->


## Pros and Cons of the Options 

### 1. model in npm package

Package the model (1.8gb) in npm package `deepspeech-node-wrapper`.

**pros**
- "conceptually simple/straigthforward" / easy to reason around 

**cons**
- npm packages are generally small in size, and largest one last year was 500mb (link needed)
- adding models to git repo, increases it's size, and might grow even more if need to update to latest models version, as git keeps all the history snapshots in the history form previous commits.

### 2. two npm packages

1. One node npm module deepspeech-node-wrapper where you can pass path to models as attribute
2. another node npm module that contains the models (1.8gb) from [mozilla/DeepSpeech github releases, eg v6](https://github.com/mozilla/DeepSpeech/releases/download/v0.6.0/deepspeech-0.6.0-models.tar.gz), exposing path as entry point to module etc..


**pros**
- That way because the models are in a separate npm they are not added to the git repository of an `electron` app or `deepspeech-node-wrapper`
- and if the models change, eg there is a version 7 can just do another npm module for version 7 and replace that.
- on the other hand in electron can have build step that is for packaging deepspeech
and one without deepspeech (so that if one is not using deepspeech they don't have to deal with the extra 1.8gb file size when downloading the electron app)

**cons**
- it might get confusing to figure out how to pass relative or absolute path from one module to the other

### 3.Download models in host app (eg Electron)

Another option is to not package the models with the modle, pass the path to the model as an attribute, and have that as an option in the host app, eg in electron for [BBC DPE](https://github.com/bbc/digital-paper-edit-electron), under STT settings, that downloads and unpacks up the models, get the path, and pass it to the `deepspeech-node-wrapper` node module.

**pros**
- easoer to do electron releases without adding 1.8gb of models to the app
- user can decide to download models only if they need them
**cons**
- user has to do two steps to start using electron app with deepspeech 


### 3. npm binaries

Using binary in npm


> A lot of packages have one or more executable files that they’d like to install into the PATH. npm makes this pretty easy (in fact, it uses this feature to install the “npm” executable.)
>
> To use this, supply a `bin` field in your package.json which is a map of command name to local file name. On install, npm will symlink that file into `prefix/bin` for global installs, or `./node_modules/.bin/` for local installs.


from https://docs.npmjs.com/files/package.json#bin     
also https://stackoverflow.com/questions/24082810/binary-file-in-npm-package

**pros**
- 🤷‍♂️

**cons**
- don't fully understand how npm bin works
- not sure if using path this way is compatible with packaged electron apps

### 5. npm pre install with `wget`
Another node module on npm [`node-DeepSpeech`](https://github.com/teamthesol/node-DeepSpeech), downloads the models programmatically, from github releases, and .

[`github.com/teamthesol/node-DeepSpeech/preinstall.js`](https://github.com/teamthesol/node-DeepSpeech/blob/master/preinstall.js)

```js
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
    console.log('Removinf temporary tar archive...');
    fs.unlinkSync(output);
  });
}
// https://github.com/mozilla/DeepSpeech/releases/download/v0.6.0/deepspeech-0.6.0-models.tar.gz
const modelSrc =
  'https://github.com/mozilla/DeepSpeech/releases/download/v0.4.1/deepspeech-0.4.1-models.tar.gz';
const modelOutput = './models.tar.gz';
Filedownload(modelSrc, modelOutput);

const audioSrc =
  'https://github.com/mozilla/DeepSpeech/releases/download/v0.4.1/audio-0.4.1.tar.gz';
const audioOutput = './audio.tar.gz';
Filedownload(audioSrc, audioOutput);
```

In [`package.json`](https://github.com/teamthesol/node-DeepSpeech/blob/1d810c48b2a9f97d9d472f6d3fd4d6154966257c/package.json#L10)

```js
"scripts": {
    ...
    "pre": "node preinstall.js"
},
```

In an electron app you could have something similar this to download the models in the user's library on the system, on a path that is passed to `deepspeech-node-wrapper` etc...

**pros**
- models added as part of npm install step but not bundled with the npm package or github repository 
- easy to package 

**cons**
- might slow down npm install if it needs to download 1.8gb to complete

