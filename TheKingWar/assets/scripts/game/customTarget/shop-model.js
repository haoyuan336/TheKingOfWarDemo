import global from './../../global'
import defines from './../../defines'
import {ResourcesManager} from './../../utitly/import'
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
        DiamondLabel: {
            default: null,
            type: cc.Label
        },
        MoneyLabel: {
            default: null,
            type: cc.Label
        },
        DiamondIcon: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {

    },
    setModelName: function (name,diamondCount,moneyCount) {
        this.name = name;
        cc.log('diamond Count = ' + diamondCount);
        cc.log('money count = ' + moneyCount);
        this.DiamondLabel.string = 'Diamond:' + 'X' + diamondCount;
        this.MoneyLabel.string = '$:' + moneyCount;
        let iconResPath = defines.resPath + 'image/'+ global.playerData.shopConfig[this.name].icon;
        cc.log('icon res path = ' + iconResPath);
        ResourcesManager.load(iconResPath,(data)=>{
            this.DiamondIcon.getComponent(cc.Sprite).spriteFrame = cc.SpriteFrame(data);
        });
    },
    buttonClick: function () {
        global.event.fire('shop_buy_button_click',this.name);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
