var fsm = require('./StateMachine')
var data = require('./dataStore/data')
import {
    getPotImgs,
    getWeedImgs,
    getHeadImgs,
    getAudio
} from "./dataStore/img";
cc.Class({
    extends: cc.Component,

    properties: {
        flowerPfb: {
            type: cc.Prefab,
            default: null
        },
        boxClip1: {
            type: cc.AnimationClip,
            default: null
        },
        boxClip2: {
            type: cc.AnimationClip,
            default: null
        },
        headPfb:{
            type:cc.Prefab,
            default:null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //生成动画起始时间
        this.animArr = []
        this.AnimRandom = Math.random()
        this.audioClips = []
        this.audioClips.push(getAudio('bush'), getAudio('bush2'))
        //实例化profab
        var flower = this.flower = cc.instantiate(this.flowerPfb)

        var weedType = data.userData.growBoxData[this.node.name].weedType
        var potType = data.userData.growBoxData[this.node.name].potType
        var potInfo = {
            type: {
                weedType,
                potType
            },
            node: flower
        }
        //调用资源图片加载函数,根据传入的potInfo信息进行渲染初始化
        this._addSpritePic(potInfo)
    },
    initAnim(node) {
        console.log('################',node)
        var clip = this.boxClip1
        var clip2 = this.boxClip2
        var animation = node.addComponent(cc.Animation)
        var random = this.AnimRandom
        animation.addClip(clip)
        animation.addClip(clip2)
        animation.play(clip.name, random)
        animation.on('stop', () => {
            this.animArr.push(animation.play(clip2.name))
        })
    },
    speedUp(speed){
        for (let i = 0; i < this.flower.children.length; i++) {
            //第二层循环拿到pot和weed节点
            var el = this.flower.children[i].children
            var animation = el[1].getComponent(cc.Animation)
            // animation.play(this.boxClip2.name).speed = speed
            // this.animArr[i].speed = speed
            this.animArr[i].speed = speed
        }
    },
    _addSpritePic(params) {
        var node = params.node
        var weedType = params.type.weedType
        var potType = params.type.potType
        for (let i = 0; i < node.children.length; i++) {
            //第二层循环拿到pot和weed节点
            var el = node.children[i].children
            for (let j = 0; j < el.length; j++) {
                //如果node节点名是weed
                if (el[j].name === 'weed') {
                    el[j].getComponent(cc.Sprite).spriteFrame = getWeedImgs(weedType)
                    this.initAnim(el[j])
                } else {
                    //node节点名为pot
                    el[j].getComponent(cc.Sprite).spriteFrame = getPotImgs(potType)
                }
            }
        }
        node.setPosition(8.6, 6.3)
        node.parent = this.node
    },
    action(tag) {
        console.log(tag);
        this.boxScale()
        this.current = cc.audioEngine.play(this.audioClips[Math.floor(Math.random() * 2)], false, 1);
        for (let i = 0; i < this.rpFn([0,3]); i++) {
            this.headAnim(tag)
        }
    },
    headAnim(tag) {
        var imgName = data.userData.growBoxData[tag].weedType
        var headImg = getHeadImgs(imgName)
        var pfb = cc.instantiate(this.headPfb)
        pfb.getComponent(cc.Sprite).spriteFrame = headImg
        pfb.parent = this.node
        var random = this.rpFn([-150, 150])
        pfb.setPosition(this.rpFn([-50, 50]), this.rpFn([80, 120]))
        var bezier = [pfb.getPosition(), cc.v2(random, 400), cc.v2(random + this.rpFn([30, -30]), this.rpFn([-50, -100]))];
        var bezierTo = cc.bezierTo(0.8, bezier).easing(cc.easeBezierAction(0.1, 0.5, 1, 1));
        var callback = cc.callFunc(() => {
            pfb.destroy()
        })
        var seq = cc.sequence(bezierTo, cc.fadeOut(1), callback)
        pfb.runAction(seq)
        pfb.runAction(cc.rotateBy(1, this.rpFn([-480, 480])))
    },
    boxScale(){
        var random1 = this.rpFn([0.5,1.3])
        var random2 = this.rpFn([0.5,1.3])
        var seq = cc.sequence(cc.scaleBy(0.07, random1, random2), cc.scaleTo(0.07, 1, 1))
        this.node.getChildByName('weeds').runAction(seq)
    },
    rpFn(arr) {
        let max = Math.max(...arr) ,
            min = Math.min(...arr)
        let result = Math.random() * (max - min) + min
        return result
    },

    start() {

    },

    // update (dt) {},
});