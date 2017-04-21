import global from './../../global'
import {Helper} from './../../utitly/import'
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
        GoldLabel: {
            default: null,
            type: cc.Label
        },
        DiamondLabel: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.DiamondLabel.string = global.playerData.diamondCount;
        this.GoldLabel.string = Helper.numberToDollar(global.playerData.goldCount);
    },
});
