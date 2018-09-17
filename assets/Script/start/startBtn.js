var data = require('../dataStore/data')
import {setWeedImgs,setPotImgs,setHeadImgs,setShopWeedImgs,setAudio} from "../dataStore/img";
cc.Class({
    extends: cc.Component,

    properties: {
        btn: {
            type: cc.Node,
            default: null
        },
        loading: {
            type: cc.Node,
            default: null
        }
    },

    onLoad() {
        this.getUserData()
        this.btn.active = false
        this.loadRes()
    },
    loadScene(){
        cc.director.preloadScene("game", () => {
            console.log('场景加载完毕')
            this.loading.destroy()
            this.btn.active = true
        });
    },
    startGame() {
        cc.director.loadScene("game");
    },

    start() {

    },
    initUserData() {
        var userData = {
            userName: '',
            account: '',
            growBoxData: {
                growBox1: {
                    weedType:'1',
                    weedState: '',
                    potType:'8',
                    remain: ''
                },
                growBox2: {
                    weedType: '2',
                    weedState: '',
                    potType: '1',
                    remain: ''
                },
                growBox3: {
                    weedType:'3',
                    weedState: '',
                    potType: '1',
                    remain: ''
                },
                growBox4: {
                    weedType:'4',
                    weedState: '',
                    potType:'8',
                    remain: ''
                },
                growBox5: {
                    weedType:'5',
                    weedState: '',
                    potType:'8',
                    remain: ''
                },
                growBox6: {
                    weedType:'6',
                    weedState: '',
                    potType:'8',
                    remain: ''
                },
                growBox7: {
                    weedType:'7',
                    weedState: '',
                    potType:'8',
                    remain: ''
                },
                growBox8: {
                    weedType:'8',
                    weedState: '',
                    potType:'8',
                    remain: ''
                },
                growBox9: {
                    weedType:'9',
                    weedState: '',
                    potType:'8',
                    remain: ''
                },
            },
            lastTime: '',
            growLightRemain: ''
        }
/*         //initImageUrlData
        cc.loader.loadResDir("weed", cc.SpriteFrame, (err, assets, urls) => {
            cc.sys.localStorage.setItem('weedUrlInfo', JSON.stringify(urls));
            data.weedUrlInfo = urls
        });
        cc.loader.loadResDir("pot", cc.SpriteFrame, (err, assets, urls) => {
            cc.sys.localStorage.setItem('potUrlInfo', JSON.stringify(urls));
            data.potUrlInfo = urls
        }); */
        //initUserData
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
        data.userData = userData
    },
    getUserData() {
        var userData = this.userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        var weedUrlInfo = this.weedUrlInfo = JSON.parse(cc.sys.localStorage.getItem('weedUrlInfo'));
        var potUrlInfo = this.potUrlInfo = JSON.parse(cc.sys.localStorage.getItem('potUrlInfo'));
        if (!userData || !weedUrlInfo || !potUrlInfo) {
            this.initUserData()
        } else {
            data.userData = userData
            data.weedUrlInfo = JSON.parse(cc.sys.localStorage.getItem('weedUrlInfo'));
            data.potUrlInfo = JSON.parse(cc.sys.localStorage.getItem('potUrlInfo'));
        }
    },
    loadRes(){
        var audioArr = ['bush','bush2','bgAudio']
        this.loader(`weed/weed`,(err,atlas)=>{
            setWeedImgs(atlas)
            this.loader('pot/pot', (err, atlas) => {
                setPotImgs(atlas)
                this.loader('head/head', (err, atlas) => {
                    setHeadImgs(atlas)
                    this.loader('shopweed/shopWeed',(err,atlas)=>{
                        this.loadAudio(audioArr,()=>{
                            this.loadScene()
                        })
                        setShopWeedImgs(atlas)
                    })
                })
            })
        })
    },
    loader(url,callback){
        cc.loader.loadRes(url, cc.SpriteAtlas, callback)
    },
    loadAudio(arr,callback){
        for (let i = 0; i < arr.length; i++) {
            var name = arr[i]
            cc.loader.load(cc.url.raw(`resources/audio/${name}.mp3`), (err, clip) => {
                var name = arr[i]
                setAudio(name, clip)
                if (i==arr.length-1) {
                    cc.audioEngine.play(clip, true, 1);
                    callback()
                }
            });
        }
    }

    // update (dt) {},
});