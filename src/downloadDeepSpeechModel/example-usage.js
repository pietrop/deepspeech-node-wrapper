const downloadDeepSpeechModel = require('./index.js');
const outputPath = 'models';
downloadDeepSpeechModel(outputPath, '0.6.0').then((res)=>{
    console.log('res',res)
}).catch((error)=>{
    console.error('error',error)
})