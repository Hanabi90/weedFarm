
cc.Class({
    extends: cc.Component,

    properties: {
        weedName: cc.String ,
        seedPrice:cc.Integer,
        growTime:cc.Integer,
        harvest: cc.Integer,
        flowerPrice:cc.Integer,
        count: cc.Integer,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('touchstart',()=>{
            console.log(this.seedPrice)
            console.log(this.node.get)
        })
    },

    start () {

    },

    // update (dt) {},
});
