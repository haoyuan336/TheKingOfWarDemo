/**
 * Created by chu on 2017/2/4 0004.
 */
import defines from './defines'
import {RequireData} from './utitly/import'
const PlayerData = function () {
    let that = {};
    that.priceConfig = {};
    that.produceTimeConfig = {};
    that.engineerNameConfig = {};
    that.achievementCountConfig = {};
    that.engineerPriceConfig = {};
    that.achievementGetGoldConfig = {};
    that.diamondengineerConfig = {};
    that.daojuCountMap = {};
    that.shopConfig = {};
    that.goldCount = 0;
    that.diamondCount = 0;
    cc.log('加载资源');
    ///加载等级参数
    //是否是第一次进入游戏


    const initLocalData = function () {
        let data = that.priceConfig[0];
        ////第一次进入游戏 只有第一个道具是处于激活状态的，其余的都是未激活状态
        RequireData.setData(defines.keyName.goldCount,9999);
        RequireData.setData(defines.keyName.diamondCount,9999);
        for (let i in data){
           // cc.log('i = ' + i);
            let keyActive = i + defines.keyName.isActive;
            let keyLevel = i + defines.keyName.levelNow;
            let keyProduceTime = i + defines.keyName.produceTime;
            let keyUpLevelTime = i + defines.keyName.upLevelTime;
            let keyDaojuCount = i + defines.keyName.daojuCount;
            let engineerName = that.engineerNameConfig[i];
            // cc.log('engineername =' + engineerName);
            RequireData.setData(engineerName,'no');
            RequireData.setData(keyDaojuCount,0);
            if (i === 'daoju_0'){
                RequireData.setData(keyActive,'yes');
                RequireData.setData(keyLevel,0);
                RequireData.setData(keyProduceTime,0);
                RequireData.setData(keyUpLevelTime,0);
            }else {
                RequireData.setData(keyActive,'no');
            }
            for (let j in that.achievementCountConfig){
                // cc.log('i ===' + j);
                let key = i + j;
                RequireData.setData(key, defines.boolenValue.NO);
            }
        }
    };

    let i = 0;
    const loadCB = function (cb) {
        i ++;

        if (i === 8){
            cc.log('配置文件加载完毕');
            // cc.log('isgame=' + RequireData.getData('isgame'));
            RequireData.clear();
            if(RequireData.getData('isgame') === null){
                RequireData.setData('isgame',1);
                initLocalData();
            }
            that.goldCount = parseInt(RequireData.getData(defines.keyName.goldCount));
            that.diamondCount = parseInt(RequireData.getData(defines.keyName.diamondCount));
            let config = that.priceConfig[0];
            for (let j in config){
                let count = parseInt(RequireData.getData(j + defines.keyName.daojuCount));
                // cc.log('count=' + count);
                that.daojuCountMap[j] = count;
            }
            cc.log('gold count = ' + that.goldCount);
            if (cb){
                cb();
            }
        }

    };

    that.load = function (cb) {
        defines.LoadConfigWithTag(defines.ConfigName.priceConfig,function (data) {
              that.priceConfig = data;
            loadCB(cb);
        });
        defines.LoadConfigWithTag(defines.ConfigName.produceTime,function (data) {
            that.produceTimeConfig = data;
            loadCB(cb);
        });
        defines.LoadConfigWithTag(defines.ConfigName.engineerNameConfig,function (data) {
            that.engineerNameConfig = data;
            loadCB(cb);
        });
        defines.LoadConfigWithTag(defines.ConfigName.achievementCountConfig,function (data) {
            that.achievementCountConfig = data;
            loadCB(cb);
        });
        defines.LoadConfigWithTag(defines.ConfigName.engineerPriceConfig,function (data) {
            that.engineerPriceConfig = data;
            loadCB(cb);
        });
        defines.LoadConfigWithTag(defines.ConfigName.achievementGetGoldConfig,function (data) {
            that.achievementGetGoldConfig = data;
            loadCB(cb);
        });
        defines.LoadConfigWithTag(defines.ConfigName.diamondengineerConfig,function (data) {
            that.diamondengineerConfig = data;
            loadCB(cb);
        });
        defines.LoadConfigWithTag(defines.ConfigName.shopConfig,function (data) {
            that.shopConfig = data;
            loadCB(cb);
        })

    };

    that.getDiamondByGold = function (goldCount) {
      return Math.ceil(goldCount/200);
    };
    that.getDiamondWithModelName = function (name) {
        let names = name;
        let diamond = that.diamondengineerConfig[names];
        cc.log('diamond = ' + diamond);
        return parseInt(that.diamondengineerConfig[names]);
    };


    return that;
};
export default PlayerData;
