import global from './../../global'
import defines from './../../defines'
import {RequireData,Helper} from './../../utitly/import'
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
        ProgressBarProduce: {
            default: null,
            type: cc.Node
        },
        ProgressBarUpLevel: {
            default: null,
            type: cc.Node
        },
        SellGoldLabel: {
            default: null,
            type: cc.Label
        },
        upLevelNeedGold: {
            default: null,
            type: cc.Label
        },
        nameLabel: {
            default: null,
            type: cc.Label
        },
        DiamondLabel: {
            default: null,
            type: cc.Label
        },
        LevelNowLabel: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        global.event.on('active_engineer',(name)=>{
            // cc.log('激活了工程师' + name);
            this.activeEngineer(name)
        });
    },
    activeEngineer: function (name) {
        if (this.name === name){
            cc.log('激活了这个工程师'  + name);
            ///这个工程师激活了 ，就要开始管理生产了
            this.engineerIsActive = defines.boolenValue.YES;
            this.produceButtonClick();
        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.nowProduceTime > 0){
            this.nowProduceTime -= dt;
            this.ProgressBarProduce.getComponent('progress-bar').setProgress((this.allProduceTime - this.nowProduceTime) / this.allProduceTime);
            if (this.nowProduceTime <= 0){
                this.nowProduceTime = 0;
                this.ProgressBarProduce.getComponent('progress-bar').setProgress(0);
                cc.log('总金额加上一定的金币');
                this.produceSuccess();
            }
            RequireData.setData(this.name + defines.keyName.produceTime,this.nowProduceTime);
        }

        if (this.nowUpLevelTime >0){
            this.nowUpLevelTime -= dt;
            this.ProgressBarUpLevel.getComponent('progress-bar').setProgress((this.allUpLevelTime - this.nowUpLevelTime) / this.allUpLevelTime);
            if (this.nowUpLevelTime <=0){
                this.nowUpLevelTime  = 0;
                this.ProgressBarUpLevel.getComponent('progress-bar').setProgress(0);
                cc.log('等级数加1');
                this.upLevelSuccess();
            }
            RequireData.setData(this.name + defines.keyName.upLevelTime,this.nowUpLevelTime);
        }

    },
    produceButtonClick: function () {
        if (this.nowProduceTime > 0){
            return;
        }
        ///生产按钮点击
        cc.log('生产按钮点击事件');
        ///开始生产  先获取到生产所需要的时间  先得知道当前道具的 级数
        let level = this.getNowLevel();
        cc.log('now level =' + level);
        let config = global.playerData.produceTimeConfig[level];
        // console.log('config=' + JSON.stringify(config));
        let needTime = config[this.name];
        this.nowProduceTime = needTime;
        this.allProduceTime = needTime;
        cc.log('needTime=' + needTime);

    },
    uplevelButtonClick: function () {



        if (this.nowUpLevelTime > 0){
            return;
        }

        //升级按钮点击
        cc.log('升级按钮点击事件');
        let level = this.getNowLevel();
        cc.log('level = ' + level);
        if (level >= 99){
            return;
        }

        //得到升级所需要的金币
        let uplevelprice = this.getUpLevelNeedGold();
        if (global.playerData.goldCount < uplevelprice){
            cc.log('金币不足');
            global.event.fire('gold_not_enough');
            return;
        }
        global.playerData.goldCount -= uplevelprice;
        RequireData.setData(defines.keyName.goldCount,global.playerData.goldCount);///储存当前金币的个数


        // cc.log('升级配置文件=' +  JSON.stringify(global.playerData.uplevelTimeConfig));
        let config = global.playerData.produceTimeConfig[0];
        // console.log('config=' + JSON.stringify(config));
        let needTime = parseInt(config[this.name]) * Math.pow(1.01,level);///这是计算升级所需要的时间
        cc.log('needTime =' + needTime);
        this.nowUpLevelTime = needTime;
        this.allUpLevelTime = needTime;
        ////升级所需要的 时间

    },
    setCellName: function (name,playEnterAnimate) {
        cc.log('name=' + name);
        this.name = name;
        ///显示当前生产一个产品 获得多少钱
        this.nameLabel.string = this.name;
        this.referUIShow();
        if (playEnterAnimate){
            let animate = this.getComponent(cc.Animation);
            animate.play('ActiveModelEnter');
            cc.log('播放进场动画');
        }
        ///取出升级跟生产时间
        let produceTime = parseInt(RequireData.getData(this.name + defines.keyName.produceTime));
        if (produceTime > 0){
            this.nowProduceTime = produceTime;
            let level = this.getNowLevel();
            let config = global.playerData.produceTimeConfig[level];
            this.allProduceTime = parseInt(config[this.name]);
        }
        let uplevelTime = parseInt(RequireData.getData(this.name + defines.keyName.upLevelTime));

        if (uplevelTime > 0){
            this.nowUpLevelTime = uplevelTime;
            let level = this.getNowLevel();
            let config = global.playerData.produceTimeConfig[0];////这里只需要去除第一级所需要的时间即可
            let needTime = parseInt(config[this.name]) * Math.pow(1.01,level);
            this.allUpLevelTime = needTime;
        }
        ///在这里 取出工程师 是否已经激活
        let isActive = RequireData.getData(global.playerData.engineerNameConfig[this.name]);
        this.engineerIsActive = isActive;
        cc.log('isActive= ' + isActive);
        if (isActive === defines.boolenValue.YES){
            this.produceButtonClick();
        }
    },
    getNowLevel: function () {
        let level = RequireData.getData(this.name + defines.keyName.levelNow);
        return parseInt(level);
    },
    produceSuccess :function () {
        cc.log('生产成功');
        let level = this.getNowLevel();
        let config = global.playerData.priceConfig[level];
        let price = parseInt(config[this.name]);
        cc.log('price=' + price);
        global.playerData.goldCount += price;
        cc.log('gold count=' + global.playerData.goldCount);
        RequireData.setData(defines.keyName.goldCount,global.playerData.goldCount);///储存当前金币的个数

        ///这里生产成功了 ，需要储存一下
        // let count = parseInt(RequireData.getData(this.name + defines.keyName.daojuCount)) + 1;
        // RequireData.setData(this.name + defines.keyName.daojuCount, count);
        global.playerData.daojuCountMap[this.name] += 1;
        RequireData.setData(this.name + defines.keyName.daojuCount, global.playerData.daojuCountMap[this.name]);
        // cc.log(this.name + '个数= ' + count);
        ///升级成功
        ////生产完成了 ，重新生产
        if (this.engineerIsActive === defines.boolenValue.YES){
            this.produceButtonClick();
        }
    },
    upLevelSuccess: function () {
        cc.log('升级成功');
        let level = parseInt(this.getNowLevel());
        level += 1;
        cc.log('level = ' + level);
        RequireData.setData(this.name + defines.keyName.levelNow,level);
        this.referUIShow();
    },
    getUpLevelNeedGold: function () {
        let level = this.getNowLevel();
        let config = global.playerData.priceConfig[level];
        let price = parseInt(config[this.name]);
        return (price + 1) * (level + 1);
    }
    ,
    referUIShow: function () {
        let level = this.getNowLevel();
        if (level === 99){
            this.upLevelNeedGold.string = '--';
            this.DiamondLabel.string = '--';
            return;
        }
        ///去除配置文件
        cc.log('level=' + level);
        let config = global.playerData.priceConfig[level];
        let price = parseInt(config[this.name]);
        this.SellGoldLabel.string = price;
        let uplevelprice = this.getUpLevelNeedGold();
        this.upLevelNeedGold.string = Helper.numberToDollar(uplevelprice);
        this.DiamondLabel.string =  this.getDiamondCount();////显示升级所需要的钻石数量
        this.LevelNowLabel.string = level + 1 + '';

    },
    getDiamondCount: function () {
        let level = this.getNowLevel();
        let config = global.playerData.produceTimeConfig[0];
        let needTime = parseInt(config[this.name]) * Math.pow(1.01,level);///这是计算升级所需要的时间
        let minute = Math.ceil(needTime / 60);
        let gold = this.getUpLevelNeedGold();
        gold = global.playerData.getDiamondByGold(gold);
        let diamond = minute + gold;
        if (diamond > 999){
            diamond = 999
        }
        return diamond;
    },
    diamondUpButtonClick: function () {
        if (parseInt(this.getNowLevel()) >= 99){
            return
        }
        cc.log('钻石升级按钮');
        let needDiamond = this.getDiamondCount();
        if (needDiamond <= global.playerData.diamondCount){

        }else {
            return
        }
        global.playerData.diamondCount -= needDiamond;
        this.nowUpLevelTime  = 0;
        this.ProgressBarUpLevel.getComponent('progress-bar').setProgress(0);
        this.upLevelSuccess();

    }
});
