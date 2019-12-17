const path = require('path');
const downloadDeepSpeechModel = require('./index.js');
// TODO: try different path 
// eg 
// deepspeech-0.6.0-models
// const modelTarName = 'deepspeechmodels.tar.gz';
const outputPathDestination = path.join('/Users/passarellip/Desktop')


downloadDeepSpeechModel(outputPathDestination, '0.6.0').then((res)=>{
    console.log('res',res)
}).catch((error)=>{
    console.error('error',error)
})