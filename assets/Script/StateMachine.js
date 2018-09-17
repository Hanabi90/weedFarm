var StateMachine = require('../lib/state-machine.min.js')
var data = require('./dataStore/data')
var target = require('./dataStore/currentTarget')
import {
    getWeedImgs,
    getPotImgs
} from "./dataStore/img";
var fsm = new StateMachine({
    init: 'main',
    data: {
        _this: null
    },
    transitions: [{
            name: 'mainToShop',
            from: 'main',
            to: 'shop'
        },
        {
            name: 'shopToMain',
            from: 'shop',
            to: 'main'
        },
        {
            name: 'mainToEdit',
            from: 'main',
            to: 'edit'
        },
        {
            name: 'editToMain',
            from: 'edit',
            to: 'main'
        },
        {
            name: 'editToEditting',
            from: 'edit',
            to: 'editting'
        },
        {
            name: 'edittingToEdit',
            from: 'editting',
            to: 'edit'
        },
        {
            name:'mainToSpeedUp',
            from:'main',
            to:'speedUp'
        }, 
        {
            name: 'speedUpToMain',
            from: 'speedUp',
            to: 'main'
        }
    ],
    methods: {
        onMainToShop: function () {
            _this.shopNode.active = true
            _this.mouse.getComponent(cc.MotionStreak).stroke = 0
        },
        onShopToMain: function () {
            _this.shopNode.active = false
            _this.mouse.getComponent(cc.MotionStreak).stroke = 20
        },
        onMainToEdit() {
            _this.boxesEditEvent_on()
            _this.coverAnim()
            _this.growBoxesHide()
            _this.mouse.getComponent(cc.MotionStreak).stroke = 0
            
        },
        onEditToMain() {
            _this.boxesEditEvent_off()
            _this.coverAnimOff()
            _this.growBoxesShow()
            _this.mouse.getComponent(cc.MotionStreak).stroke = 20
        },
        onEdittingToEdit() {
            console.log('onEdittingToEdit');
        },
        onEditToEditting() {
            var str = `growBox${target.currentEditTarget}`
            var growBoxData = data.userData.growBoxData[str]
            _this.editPopWeedAndPotInit(growBoxData)
            console.log('onEditToEditting,!@$#@!$!@$!$@!@$', growBoxData);
        },
        onMainToSpeedUp(){
            _this.coverAnim()
            console.log('onMainToSpeedUp')
        },
        onSpeedUpToMain(){
            _this.coverAnimOff()
            console.log('onSpeedUpToMain')
        }
    }
});

var _this = null
cc.Class({
    extends: cc.Component,
    properties: {
        shopNode: {
            type: cc.Node,
            default: null
        },
        growBoxes: {
            type: cc.Node,
            default: null
        },
        mouse: {
            type: cc.Node,
            default: null
        },
        cover: {
            type: cc.Node,
            default: null
        },
        editBoxes: {
            type: cc.Node,
            default: null
        },
        editPop: {
            type: cc.Node,
            default: null
        },
        weedAndPot: {
            type: cc.Prefab,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log("onload this.node")
        this.isFirstTimeEditting = true
        this.shopNode.active = false;
        _this = this
        // this.getUserData()
        // console.log(data);
    },
    upDateUserData() {

    },

    start() {

    },

    update(dt) {

    },
    boxesEditEvent_on() {
        this.growBoxes.on('touchstart', () => {

        })
        this.growBoxes.on('touchend', () => {
            console.log(this.mouse.getComponent('motionStreak').target);
        })
    },
    boxesEditEvent_off() {
        this.growBoxes.off('touchstart')
        this.growBoxes.off('touchmove')
        this.growBoxes.off('touchend')
    },
    coverAnim() {
        this.cover.active = true
        var anim = this.cover.getComponent(cc.Animation)
        anim.play()
    },
    coverAnimOff() {
        this.cover.active = false
        var anim = this.cover.getComponent(cc.Animation)
        anim.stop()
    },
    growBoxesHide() {
        for (const i of this.growBoxes.children) {
            i.active = false
        }
        this.editBoxes.active = true

    },
    growBoxesShow() {
        for (const i of this.growBoxes.children) {
            i.active = true
        }
        this.editBoxes.active = false
    },
    editPopWeedAndPotInit(data) {
        var weedType = data.weedType
        var potType = data.potType
        var node = this.editPop
        console.log(node.children);
        if (this.isFirstTimeEditting) {
            this.weedAndPot1 = cc.instantiate(this.weedAndPot)
            this.weedAndPot2 = cc.instantiate(this.weedAndPot)
            this.isFirstTimeEditting = false
        }
        var weedImg = getWeedImgs(weedType)
        var potImg = getPotImgs(potType)
        this.weedAndPot1.getChildByName('weed').getComponent(cc.Sprite).spriteFrame = weedImg
        this.weedAndPot1.getChildByName('pot').getComponent(cc.Sprite).spriteFrame = potImg
        this.weedAndPot2.getChildByName('pot').getComponent(cc.Sprite).spriteFrame = potImg
        this.weedAndPot2.getChildByName('weed').getComponent(cc.Sprite).spriteFrame = weedImg
        this.weedAndPot1.setPosition(-100,60)
        this.weedAndPot2.setPosition(100,60)
        this.weedAndPot2.name = 'preview'
        this.weedAndPot1.parent = node
        this.weedAndPot2.parent = node
    }
});

module.exports = fsm