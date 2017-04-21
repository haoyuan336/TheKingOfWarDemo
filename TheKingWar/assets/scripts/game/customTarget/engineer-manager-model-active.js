import defines from './../../defines'
import {RequireData} from './../../utitly/import'
import global from './../../global'
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
        PriceLabel: {
            default: null,
            type: cc.Label
        },
        ActiveButton: {
            default: null,
            type: cc.Node
        },
        DiamondLabel: {
            default: null,
            type: cc.Label
        },
        ActiveNode: {
            default: null,
            type: cc.Node
        },
        CannotActiveNode: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
    },
    setModelName: function (name) {
        cc.log('engineer name =' + name);
        this.name = name;
        ///看一下这个道具 有没有激活



        this.NameLabel.string = name;
        ///取出经纪人价格配置
        this.engineerName = global.playerData.engineerNameConfig[this.name];
        let price = parseInt(global.playerData.engineerPriceConfig[this.engineerName]);
        this.price = price;
        this.PriceLabel.string =  price + '';
        this.DiamondLabel.string = global.playerData.getDiamondWithModelName(this.name);

    },
    activeButton: function (event,customdata) {
        switch (customdata){
            case 'gold':
                cc.log('金币激活');
                cc.log('激活按钮' + this.name);
                if (global.playerData.goldCount < this.price){
                    global.event.fire('gold_not_enough');
                    cc.log('金币不足');
                    return
                }
                ///金币减去一定的值
                global.playerData.goldCount -= this.price;
                RequireData.setData(defines.keyName.goldCount,global.playerData.goldCount);

                break;
            case 'diamond':
                cc.log('钻石激活');
                let diamond = global.playerData.getDiamondWithModelName(this.name);
                if (diamond <= global.playerData.diamondCount){

                }else {
                    global.event.fire('diamond_not_enough');
                    cc.log('钻石不足');
                    return;
                }
                global.playerData.diamondCount -= diamond;
                RequireData.setData(defines.keyName.diamondCount,global.playerData.diamondCount);

                break;
            default:
                break;
        }
        RequireData.setData(global.playerData.engineerNameConfig[this.name],defines.boolenValue.YES);
        //金币足够的情况下，
        let animate = this.getComponent(cc.Animation);
        animate.play('EngineerModelActiveExit');

    },
    animationOver: function () {
        cc.log('动作结束');
        global.event.fire('create_engineer_model_alactive',{
            name: this.name,
            position: {
                x: 640,
                y: this.node.getPositionY()
            }
        });
        global.event.fire('active_engineer',this.name);
        this.destroy();
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.price){
            if (global.playerData.goldCount >= this.price){
                this.ActiveButton.active = true;
            }else {
                this.ActiveButton.active = false;
            }
        }

    },
});
