var target = require('./dataStore/currentTarget')
var fsm = require('./StateMachine')
cc.Class({
    extends: cc.Component,

    properties: {
        motion:{
            type:cc.MotionStreak,
            default:null
        },
        editPopNode:{
            type:cc.Node,
            default:null
        },
        isDebug:false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.mng = cc.director.getCollisionManager()
        this.mng.enabled = true;
        if (this.isDebug) {
            this.mng.enabledDebugDraw = true
        }
        this.initMotionEvent()
        
    },
    initMotionEvent(){
        cc.find('Canvas').on('touchstart', (e) => {
            this.node.position = this.node.parent.convertToNodeSpaceAR(e.getLocation())
            this.motion.enabled = true
            setTimeout(() => {
                if ((fsm.state === 'main'||'speedUp') && this.target) {
                    cc.find(`Canvas/backGround/growBoxes/growBox${this.target}`).getComponent('growbox').action(`growBox${this.target}`)
                }
            },20);
        })
        cc.find('Canvas').on('touchmove', (e) => {
            this.node.position = this.node.parent.convertToNodeSpaceAR(e.getLocation())
        })
        cc.find('Canvas').on('touchend', (e) => {
            this.motion.enabled = false
        })
    },
    onCollisionEnter(e){
        //真正的点击对象
        //检测当前状态
        var state = fsm.state
        setTimeout(() => {
            this.target = e.tag
            console.log('settarget')
        }, 10);
        switch (state) {
            case 'main':
            cc.find(`Canvas/backGround/growBoxes/growBox${e.tag}`).getComponent('growbox').action(`growBox${e.tag}`)
                break;
            case 'speedUp':
                cc.find(`Canvas/backGround/growBoxes/growBox${e.tag}`).getComponent('growbox').action(`growBox${e.tag}`)
                break;
            case 'edit':
            target.currentEditTarget = e.tag
            this.editPopNode.active = true
            fsm.editToEditting()
                break;
            default:
                break;
        }
    },
    onCollisionStay(e) {
        console.log('stay')
    },
    onCollisionExit(e) {
        this.target = null
        console.log('exit')
    },
    start () {
        
    },

    // update (dt) {},
});