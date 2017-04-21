import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        GoldNotEnough: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        global.event.on('gold_not_enough',()=>{
           this.showGoldNotEnoughTip();
        });
    },
    showGoldNotEnoughTip: function () {
        cc.log('显示 金币 不足提示');
        if (this.goldNotEnoughAction === undefined){
            this.goldNotEnoughAction = cc.delayTime(2.6);
            this.node.runAction(cc.sequence([this.goldNotEnoughAction,cc.callFunc(()=>{
                this.goldNotEnoughAction = undefined;
            })]));
        }else {
            return
        }
        let anim = this.getComponent(cc.Animation);
        anim.play('goldNotEnoughTipsEnter');
        // this.getComponent(cc.Animation).play('goldNotEnoughTipsEnter');
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
