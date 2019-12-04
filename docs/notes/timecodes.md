# Timecodes
Getting timecodes from [DeepSpeech/issues/2570](https://github.com/mozilla/DeepSpeech/issues/2570)

From [Model.sttWithMetadata](https://deepspeech.readthedocs.io/en/v0.6.0/NodeJS-API.html#Model.sttWithMetadata)

eg
```js
let result = model.sttWithMetadata(audioBuffer.slice(0, audioBuffer.length / 2));
```

```js
$ node index.js audio/4507-16021-0012.wav
TensorFlow: v1.14.0-21-ge77504ac6b
DeepSpeech: v0.6.0-0-g6d43e21
2019-12-04 14:31:01.389712: I tensorflow/core/platform/cpu_feature_guard.cc:142] Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX2 FMA
audio length 2.735
result: _exports_Metadata {
  confidence: -34.45586306435193,
  num_items: 30,
  items: 
   [ _exports_MetadataItem { start_time: 0, timestep: 0, character: 'w' },
     _exports_MetadataItem { start_time: 0.1599999964237213, timestep: 8, character: 'h' },
     _exports_MetadataItem { start_time: 0.7599999904632568, timestep: 38, character: 'y' },
     _exports_MetadataItem { start_time: 0.8199999928474426, timestep: 41, character: ' ' },
     _exports_MetadataItem { start_time: 0.8199999928474426, timestep: 41, character: 's' },
     _exports_MetadataItem { start_time: 0.8799999952316284, timestep: 44, character: 'h' },
     _exports_MetadataItem { start_time: 0.8999999761581421, timestep: 45, character: 'o' },
     _exports_MetadataItem { start_time: 0.9399999976158142, timestep: 47, character: 'u' },
     _exports_MetadataItem { start_time: 0.9599999785423279, timestep: 48, character: 'l' },
     _exports_MetadataItem { start_time: 0.9799999594688416, timestep: 49, character: 'd' },
     _exports_MetadataItem { start_time: 1.0399999618530273, timestep: 52, character: ' ' },
     _exports_MetadataItem { start_time: 1.059999942779541, timestep: 53, character: 'o' },
     _exports_MetadataItem { start_time: 1.159999966621399, timestep: 58, character: 'n' },
     _exports_MetadataItem { start_time: 1.2400000095367432, timestep: 62, character: 'e' },
     _exports_MetadataItem { start_time: 1.399999976158142, timestep: 70, character: ' ' },
     _exports_MetadataItem { start_time: 1.399999976158142, timestep: 70, character: 'h' },
     _exports_MetadataItem { start_time: 1.4800000190734863, timestep: 74, character: 'a' },
     _exports_MetadataItem { start_time: 1.559999942779541, timestep: 78, character: 'l' },
     _exports_MetadataItem { start_time: 1.5799999237060547, timestep: 79, character: 't' },
     _exports_MetadataItem { start_time: 1.8199999332427979, timestep: 91, character: ' ' },
     _exports_MetadataItem { start_time: 1.8199999332427979, timestep: 91, character: 'o' },
     _exports_MetadataItem { start_time: 1.9799998998641968, timestep: 99, character: 'n' },
     _exports_MetadataItem { start_time: 2.0399999618530273, timestep: 102, character: ' ' },
     _exports_MetadataItem { start_time: 2.059999942779541, timestep: 103, character: 't' },
     _exports_MetadataItem { start_time: 2.0999999046325684, timestep: 105, character: 'h' },
     _exports_MetadataItem { start_time: 2.1399998664855957, timestep: 107, character: 'e' },
     _exports_MetadataItem { start_time: 2.200000047683716, timestep: 110, character: ' ' },
     _exports_MetadataItem { start_time: 2.200000047683716, timestep: 110, character: 'w' },
     _exports_MetadataItem { start_time: 2.4600000381469727, timestep: 123, character: 'a' },
     _exports_MetadataItem { start_time: 2.5199999809265137, timestep: 126, character: 'y' } ] }
```