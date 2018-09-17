// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        growBoxes:{
            type: cc.Node,
            default:null
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.actions()
    },
    actions(){
        const boxes = this.growBoxes.children
        var m1 = cc.scaleTo(0.1, 1.05, 1.05)
        var m2 = cc.scaleTo(0.1, 1, 1)
        for (let i = 0; i < boxes.length; i++) {
            const el = boxes[i]
            el.color = cc.color(0, 255, 255, 255)
        }
        var seq = cc.sequence(m1, m2)
        this.growBoxes.runAction(seq.repeat(2))
    },

    start () {

    },

    // update (dt) {},
});
