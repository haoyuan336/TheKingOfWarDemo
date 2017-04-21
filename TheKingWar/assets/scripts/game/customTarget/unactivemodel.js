import global from './../../global'
import {Helper,RequireData} from './../../utitly/import'
import defines from './../../defines'
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
        NameLabel: {
            default: null,
            type: cc.Label
        },
        ActiveNeedGoldLabel:{
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {

    },
    activeButtonClick:function () {
        cc.log('激活道具');
        if (global.playerData.goldCount < this.getActiveNeedGold()){
            global.event.fire('gold_not_enough');
            return;
        }
        global.event.fire('active_daoju',this.name);
        global.playerData.goldCount -= this.getActiveNeedGold();
        RequireData.setData(defines.keyName.goldCount,global.playerData.goldCount);
        RequireData.setData(this.name + defines.keyName.levelNow,0);
        RequireData.setData(this.name + defines.keyName.isActive,defines.boolenValue.YES);
        let animate = this.getComponent(cc.Animation);
        animate.play('UnActiveModelExit');

    },
    exitAnimationOver: function () {
        cc.log('出场动画结束');
        //出场动画结束后，创建一个道具栏
        global.event.fire('create_new_cell',{
            name: this.name,
            position: {
                x: 640,
                y: this.node.getPositionY()
            }
        });
        this.destroy();

    },
    setCellName: function (name, num) {
        cc.log('name' + name);
        this.name = name;
        this.number = num;
        this.NameLabel.string = this.name;
        let needGold = this.getActiveNeedGold();
        this.ActiveNeedGoldLabel.string = Helper.numberToDollar(needGold);
        ///显示激活需要多少个金币
    },
    getActiveNeedGold: function () {
        let config = global.playerData.priceConfig[0];
        let price = parseInt(config[this.name]);
        let needGold = parseInt(price * this.number * this.number );
        return needGold;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
