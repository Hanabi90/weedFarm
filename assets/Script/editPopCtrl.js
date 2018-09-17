var data = require('./dataStore/data')
var target = require('./dataStore/currentTarget')
var fsm = require('./StateMachine')
import {
    getWeedImgs, getPotImgs
} from "./dataStore/img";
cc.Class({
    extends: cc.Component,

    properties: {
        weedAndPot: {
            type: cc.Prefab,
            default: null
        },
        scrollContent: {
            type: cc.Node,
            default: null
        },
        scrollContent2: {
            type: cc.Node,
            default: null
        },
        scrollItem: {
            type: cc.Prefab,
            default: null
        },
        growBoxes:{
            type:cc.Node,
            default:null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.target = target.currentEditTarget
        this.selectedWeedIndex = -1
        this.selectedPotIndex = -1
        this.ownedWeed = data.ownedWeed()
        this.ownedPot = data.ownedPot()
        this.tabState = 'weed'
        var params = {
            scrollContent: this.scrollContent,
            ownedItem: this.ownedWeed,
            selectedItemType: this.selectedWeedType,
            type: 'weed'

        }
        var params2 = {
            scrollContent: this.scrollContent2,
            ownedItem: this.ownedPot,
            selectedItemType: this.selectedWeedType,
            type: 'pot'

        }
        this.scrollContentInit(params)
        this.scrollContentInit(params2)
    },
    onEnable(){
        this.target = target.currentEditTarget
    },
    weedAndPotInit() {
        var weedAndPot = cc.instantiate(this.weedAndPot)
        weedAndPot.parent = this.node
    },
    scrollContentInit(params) {
        params.scrollContent.height = 0
        for (let i = 0; i < params.ownedItem.length; i++) {
            params.selectedItemType = params.ownedItem[i].xiabiao
            const el = params.ownedItem[i];
            var scrollItem = cc.instantiate(this.scrollItem)
            scrollItem.name = i.toString()
            scrollItem.on('touchend', (e) => {
                for (const item of e.target.parent.children) {
                    item.color = cc.color(255,255,255)
                }
                e.target.color = cc.color(79,248,99)
                if (params.type=='weed') {
                    this.selectedWeedIndex = e.target.name
                    let index = this.ownedWeed[this.selectedWeedIndex].xiabiao
                    var weedImg = getWeedImgs(index)
                }else{
                    this.selectedPotIndex = e.target.name
                    let index = this.ownedPot[this.selectedPotIndex].xiabiao
                    console.log(index);
                    var potImg = getPotImgs(index)
                }
                var previewNode = this.node.getChildByName('preview')
                if (this.tabState ==='weed') {
                    previewNode.getChildByName('weed').getComponent(cc.Sprite).spriteFrame = weedImg
                } else if (this.tabState === 'pot'){
                    previewNode.getChildByName('pot').getComponent(cc.Sprite).spriteFrame = potImg
                }
            })
            if (params.type==='weed') {
                var frame = getWeedImgs(params.selectedItemType)
                scrollItem.getChildByName('weed').getComponent(cc.Sprite).spriteFrame = frame
                scrollItem.getChildByName('miaoshu').children[0].getComponent(cc.Label).string += el.weedname
                scrollItem.getChildByName('miaoshu').children[1].getComponent(cc.Label).string += el.val
                scrollItem.getChildByName('miaoshu').children[2].getComponent(cc.Label).string += `${el.Lharvest.toString()} - ${el.Hharvest.toString()}`
            }else{
                var frame = getPotImgs(params.selectedItemType)
                scrollItem.getChildByName('weed').getComponent(cc.Sprite).spriteFrame = frame
                console.log(scrollItem.getChildByName('weed').getComponent(cc.Sprite).spriteFrame)
                // scrollItem.getChildByName('miaoshu').children[0].getComponent(cc.Label).string += el.weedname
                // scrollItem.getChildByName('miaoshu').children[1].getComponent(cc.Label).string += el.val
                // scrollItem.getChildByName('miaoshu').children[2].getComponent(cc.Label).string += `${el.Lharvest.toString()} - ${el.Hharvest.toString()}`
            }
            scrollItem.setPosition(-100, i * -scrollItem.height)
            scrollItem.parent = params.scrollContent
            params.scrollContent.height += scrollItem.height
        }
    },
    cancelEdit() {
        fsm.edittingToEdit()
        this.reset()
    },
    confirmEdit() {
        fsm.edittingToEdit()
        this.updateGrowBoxData()
        this.reset()
    },
    reset(){
        this.node.active = false
        cc.find('Canvas/motionStreak').setPosition(-475, -312)
        if (this.selectedWeedIndex && this.selectedWeedIndex != -1 && this.scrollContent.children[this.selectedWeedIndex]) {
            this.scrollContent.children[this.selectedWeedIndex].color = cc.color(255, 255, 255)
            this.scrollContent2.children[this.selectedWeedIndex].color = cc.color(255, 255, 255)
            this.selectedWeedIndex = -1
            this.selectedPotIndex = -1
            this.target = null
        }
    },
    updateGrowBoxData(){
        var weedIndex = null
        var potIndex = null
        var boxNameStr = `growBox${this.target}`
        if (this.selectedWeedIndex!=-1) {
            weedIndex = this.ownedWeed[this.selectedWeedIndex].xiabiao
            data.userData.growBoxData[boxNameStr].weedType = weedIndex
            var weedImg = getWeedImgs(weedIndex)
            // weedImg.setOriginalSize(100,100)
            console.log(weedImg)
        }
        if (this.selectedPotIndex != -1) {
            potIndex = this.ownedPot[this.selectedPotIndex].xiabiao
            data.userData.growBoxData[boxNameStr].potType = potIndex
            var potImg = getPotImgs(potIndex)
        }
        var node = this.growBoxes.getChildByName(boxNameStr).children
        for (let i = 0; i < node.length; i++) {
            for (let j = 0; j < node[i].children.length; j++) {
                const el = node[i].children[j].children
                for (let k = 0; k < el.length; k++) {
                    if (el[k].name === 'weed' && weedImg) {
                        el[k].getComponent(cc.Sprite).spriteFrame = weedImg
                    } else if (el[k].name === 'pot' && potImg) {
                        el[k].getComponent(cc.Sprite).spriteFrame = potImg
                    }
                }
            }
        }
    },

    start() {

    },
    scrollTab(){
        this.node.getChildByName('scrollView1').active = !this.node.getChildByName('scrollView1').active
        this.node.getChildByName('scrollView2').active = !this.node.getChildByName('scrollView2').active
        if (this.node.getChildByName('scrollView1').active) {
            this.tabState = 'weed'
        }else{
            this.tabState = 'pot'
        }
    }

    // update (dt) {},
});