var data = require('./dataStore/data')

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.index = this.node.parent.children.indexOf(this.node)
        this.lock = data.unlockedWeed[this.index].lock
        this.buyBtn = this.node.getChildByName('buyBtn')
        if (this.buyBtn) {
            this.buyBtnCtrl()
        }

    },

    start () {

    },
    buyBtnCtrl(){
        this.buyBtn.on('touchend', (e) => {
            e.currentTarget.destroy()
            data.unlockedWeed[this.index].lock = false
        });
    }

    // update (dt) {},
});
