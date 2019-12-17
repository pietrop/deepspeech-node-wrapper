const tar = require("tar");
const modelOutputPath = '/Users/passarellip/Desktop/deepspeech-0.6.0-models.tar.gz';
const modelOutput = '/Users/passarellip/Desktop'
const main = async()=>{
    try{
        await tar.x({ file: modelOutputPath, C: modelOutput });
    }
    catch(e){
        console.error(e)
    }
   
}

main()