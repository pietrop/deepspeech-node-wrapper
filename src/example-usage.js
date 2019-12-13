const fs = require("fs");
const deepSpeechSttWrapper = require("./index.js");

// absolute path of file
// const audioFile = "./audio/2830-3980-0043.wav";
const audioFile = "/Users/passarellip/Downloads/mulvaney.wav";
async function main(){
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

main()
