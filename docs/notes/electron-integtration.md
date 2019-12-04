from https://github.com/mozilla/DeepSpeech/issues/2569#issuecomment-561645077

>Yeah DeepSpeech 0.5 works with Electron 5.1, and I've got it working in my main project here which is the electron desktop voice control app.
>
>Getting DeepSpeech working in Electron is the same as any other NPM library, npm install, import and download the deepspeech models, and see the node_wav example. The two biggest challenges I had was to make DeepSpeech into a live microphone voice control system. These problems probably won't matter for you if you're just doing speech-to-text, they aren't Electron specific but might be of interest:
>
>DeepSpeech doesn't have a built-in microphone recording
>
>doesn't have a continuous/stream transcription mode to continuously be recognizing speech (or at least not in the previous versions)
>
>So I had to write my own microphone -> DeepSpeech library, and use a VAD library (voice activity detection) to automatically turn DeepSpeech on and off. I wrote a separate speech library that handles those 2 problems, and another one for Alexa-style hotword commands.
>
>Another issue is processing speed. On my macbook pro DeepSpeech takes the same amount of time to process the speech as the length of the recording (eg. 5 seconds of speech takes about 5 seconds to process). So in the VAD part of my recording library I cut off the length of the microphone recording to 15 seconds to prevent recording too long of a clip.
>
>The result is I can speak for a few seconds, and then have to wait for that clip to be processed before saying the next sentence. It's a limitation I was able to live with for now because the kinds of things I wanted to do the most was Star Trek style voice commands, short commands like "launch game", "move up/down", "lights on". But it might not be suitable right now for long duration dictation, like translating an entire paragraph.