var fsm = require('./StateMachine')
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        console.log("onload")
        setTimeout(() => {
            this.node.on('touchstart', () => {
                this.speedUp()
            })
        }, 1500);
    },
    speedUp(speed,stop){
        if (!stop) {
            fsm.mainToSpeedUp()
        }
        this.playAnim()
        var speed = speed || 2
        var root = cc.find('Canvas/backGround/growBoxes').children
        for (const i of root) {
            i.getComponent('growbox').speedUp(speed)
        }
        if (stop) {
            return
        }
        setTimeout(() => {
            this.speedUp(1,true)
            this.stopAnim()
            fsm.speedUpToMain()
        }, 30000);
    },
    playAnim(){
        var anim = this.node.parent.getComponent(cc.Animation)
        this.animState = anim.play()
    },
    stopAnim(){
        var anim = this.node.parent.getComponent(cc.Animation)
        this.animState = anim.stop()
    },

    start () {

    },

    update (dt) {

    },
});
