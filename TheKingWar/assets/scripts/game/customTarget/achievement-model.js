import global from './../../global'
import {RequireData} from './../../utitly/import'
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
        GetGodlLabel: {
            default: null,
            type: cc.Label
        },
        LabelName: {
            default: null,
            type: cc.Label
        },
        LabelCount: {
            default: null,
            type: cc.Label
        },
        ActiveButton: {
            default: null,
            type: cc.Node
        },
        NotRedched: {
            default: null,
            type: cc.Node
        },
        HasBeen: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        ///检车当前道具的数量

    },
    setNameAndAchievement: function (name,achievement) {
        // cc.log('设置成就名称等' + name + ',' + achievement);
        this.LabelName.string = name;
        this.name = name;
        this.achievement = achievement;
        let count = parseInt(global.playerData.achievementCountConfig[achievement]);
        let getGoldCount =parseInt(global.playerData.achievementGetGoldConfig[this.name]);

        let goldprice = count * getGoldCount;
        this.goldPrice = goldprice;
        this.GetGodlLabel.string = this.goldPrice;
        this.count = count;
        this.LabelCount.string = count + '';
        ///取出储存的数据
        let countNow = global.playerData.daojuCountMap[this.name];
        if (countNow > count){
            cc.log('可以收集了');
        }
        ////取出储存的值是否是已经激活
        let value = RequireData.getData(this.name + achievement);

        this.isHasBeen = value;

        cc.log('achievement value' + value);
        if (value === defines.boolenValue.YES){
            this.HasBeen.active = true;
            this.NotRedched.active = false;
            this.ActiveNode.active = false;
        }

    },

    collectButton: function (event) {
        // cc.log('收集按钮' + this.ActiveButton.active);
        this.ActiveButton.active = false;
        this.HasBeen.active = true;
        // cc.log('收集按钮' + this.ActiveButton.active);
        // this.ActiveButton.setPositionX(100);
        // this.ActiveButton.active = false;
        ///收集过来的操作储存一下
        RequireData.setData(this.name + this.achievement,defines.boolenValue.YES);
        ///收集的金币加到总金币里面
        global.playerData.diamondCount += this.goldPrice;
        //储存一下
        RequireData.setData(defines.keyName.goldCount,global.playerData.goldCount);

    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.isHasBeen === defines.boolenValue.NO){
            if (this.count !== undefined){
                if (global.playerData.daojuCountMap[this.name] >= this.count){
                    // cc.log('显示道具收集按钮');
                    this.ActiveButton.active = true;
                    this.NotRedched.active = false;
                }else {
                    // cc.log('不显示道具收集按钮');
                    this.ActiveButton.active = false;
                    this.NotRedched.active = true;
                }
            }
        }

    },
});
