var fsm = require('./StateMachine')
cc.Class({
    extends: cc.Component,

    properties: {
        btn1: {
            type: cc.Node,
            default: null
        },
        btn2: {
            type: cc.Node,
            default: null
        },
        machineCode1: cc.String,
        machineCode2: cc.String,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.anim1 = this.btn1.getComponent(cc.Animation)
        this.anim2 = this.btn2.getComponent(cc.Animation)
        this.btn1.active = true
        this.btn2.active = false
        this.btnState = 'btn1'
        this.node.children[2].zIndex = 5
        this.node.on('touchstart', () => {
            this.animChange()
        })
        this.node.on('touchend', () => {
            this.checkBtnState()
            this.clearAnim()
        })
        this.node.on('touchcancel', () => {
            this.animChange(true)
        })
    },
    checkBtnState() {
        if (this.btnState == 'btn1') {
            this.updateStateToStateMachine(this.machineCode1)
            this.btnState = 'btn2'
            this.btn1.active = false
            this.btn2.active = true
        } else if (this.btnState == 'btn2') {
            this.updateStateToStateMachine(this.machineCode2)
            this.btnState = 'btn1'
            this.btn1.active = true
            this.btn2.active = false
        }
        console.log(this.btnState);
    },
    animChange(flag){
        if (this.btnState == 'btn1') {
            if (flag) {
                this.anim1.play().wrapMode = cc.WrapMode.Reverse
            }else{
                this.anim1.play().wrapMode = cc.WrapMode.Normal
            }
        } else if (this.btnState == 'btn2') {
            if (flag) {
                this.anim2.play().wrapMode = cc.WrapMode.Reverse
            }else{
                this.anim2.play().wrapMode = cc.WrapMode.Normal
            }
        }
    },
    clearAnim(){
        if (this.btnState == 'btn1') {
            this.anim1.play().wrapMode = cc.WrapMode.Reverse
        }else{
            this.anim2.play().wrapMode = cc.WrapMode.Reverse
        }
    },
    updateStateToStateMachine(machineCode) {
        var fn = eval(`fsm.${machineCode}()`)
            fn
    },

    start() {

    },

    // update (dt) {},
});