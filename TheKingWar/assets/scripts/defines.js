/**
 * Created by chu on 2017/2/4 0004.
 */
import {ResourcesManager} from './utitly/import'
const Defines = function () {
    let that = {};
    that.resPath = './resources/';
    that.ConfigName = {
        priceConfig: './resources/config/priceconfig.json',
        produceTime: './resources/config/produceTimeConfig.json',
        engineerNameConfig: './resources/config/engineerNameConfig.json',
        achievementCountConfig: './resources/config/achievementCountConfig.json',
        engineerPriceConfig: './resources/config/engineerPriceConfig.json',
        achievementGetGoldConfig: './resources/config/achievementGetGoldConfig.json',
        diamondengineerConfig: './resources/config/diamondengineerConfig.json',
        shopConfig: './resources/config/shopConfig.json'
    };
    that.boolenValue = {
        NO: 'no',
        YES: 'yes'
    }
    that.keyName = {
        isActive: 'isActive',
        levelNow: 'levelNow',
        produceTime: 'produceTime',
        upLevelTime: 'upLevelTime',
        goldCount: 'goldCount',
        achievement: 'achievement',
        daojuCount: 'daojuCount',
        diamondCount: 'diamondCount'

    };
    that.LoadConfigWithTag = function (tag,callBack) {
        cc.log('load config with tag +' + tag);
        ResourcesManager.load(tag,callBack);
    };
    return that;
};
let defines = Defines();
export default defines;