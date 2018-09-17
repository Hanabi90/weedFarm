
//#######weedImgs
var weedImgs = {}
function setWeedImgs(imgs){
    weedImgs = imgs
}
function getWeedImgs(name){
    return weedImgs.getSpriteFrame(name)
}


//#######potImgs
var potImgs = {}

function setPotImgs(imgs) {
    potImgs = imgs
}

function getPotImgs(name) {
    return potImgs.getSpriteFrame(name)
}



//#######bigWeedImgs
var shopWeedImgs = {}

function setShopWeedImgs(imgs) {
    shopWeedImgs = imgs
}

function getShopWeedImgs(name) {
    return shopWeedImgs.getSpriteFrame(name)
}



//#######headImgs
var headImgs = {}

function setHeadImgs(imgs) {
    headImgs = imgs
}

function getHeadImgs(name) {
    return headImgs.getSpriteFrame(name)
}

//#######audio
var audioClips = {}
function setAudio(name,audio) {
    audioClips[name] = audio
    console.log(audioClips);
}
function getAudio(name) {
    return audioClips[name]
}


export {
    setWeedImgs,
    getWeedImgs,
    getPotImgs,
    setPotImgs,
    getShopWeedImgs,
    setShopWeedImgs,
    getHeadImgs,
    setHeadImgs,
    setAudio,
    getAudio
}