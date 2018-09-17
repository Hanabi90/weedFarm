
cc.Class({
    extends: cc.Component,

    properties: {
        growBoxesList:{
            type:cc.Node,
            default:[]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("growboxes onload")
        // console.log(this.node.children[0].color = new cc.color(255,255,255,255))
        // this.node.on(cc.Node.EventType.TOUCH_START,()=>{
        //     console.log(this)
        // },this)
        for (const i of this.growBoxesList) {
            this.setTouchEvent(i)
        }
        // console.log(this.growBoxesList)

    },
    setTouchEvent(node){
        node.on(cc.Node.EventType.TOUCH_START,(e)=>{
            // console.log(e.currentTarget)
        },this)
        node.on(cc.Node.EventType.TOUCH_MOVE,(e)=>{
            // console.log(e.currentTarget)
        })
    },
    start () {

    },

    // update (dt) {},
});
