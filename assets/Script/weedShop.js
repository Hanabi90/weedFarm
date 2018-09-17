var data = require('./dataStore/data')
import {
    getShopWeedImgs
} from "./dataStore/img";
cc.Class({
    extends: cc.Component,

    properties: {
        shopContentNode: {
            type: cc.Node,
            default: null
        },
        weedPfb: {
            type: cc.Prefab,
            default: null
        },
        unKnowImg: {
            type: cc.SpriteFrame,
            default: null
        },
        buyBtn: {
            type: cc.Prefab,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.weedList = data.unlockedWeed
        var startX = 123
        var pfbW = 196
        var marginR = 20
        this.shopContentNode.width = startX + this.weedList.length * (20 + pfbW) - pfbW / 2

        for (var i = 0; i < this.weedList.length; i++) {
            if (this.weedList[i].lock && !this.weedList[i].cost) {
                var frame = this.unKnowImg
                console.log("不可购买");
                //不可购买,并且未知
            } else if (this.weedList[i].cost && this.weedList[i].lock) {
                var frame = getShopWeedImgs(i)
                var buyBtn = cc.instantiate(this.buyBtn)
                console.log('可购买');
                //购买按钮  可购买状态
            } else {
                //已购买
                var frame = getShopWeedImgs(i)
                console.log("已经购买");
            }
            var pfb = cc.instantiate(this.weedPfb)
            if (buyBtn) {
                var price = this.weedList[i].cost
                buyBtn.parent = pfb
                buyBtn.getChildByName('cost').getComponent(cc.Label).string = price;
                buyBtn.setPosition(0, -130)
                buyBtn = null
            }
            var weedImgNode = pfb.getChildByName('weedImg')
            weedImgNode.getComponent(cc.Sprite).spriteFrame = frame
            pfb.setPosition(startX, 0)
            startX += pfbW + marginR
            pfb.parent = this.shopContentNode
        }

    },

    start() {

    },
    onEnable() {
        this.weedList[0].lock = !this.weedList[0].lock
    }


    // update (dt) {},
});