/**
 * Created by chu on 2017/2/4 0004.
 */
const RequireData = function () {
    let that = {};
    that.getData = function (key) {
        let data = cc.sys.localStorage.getItem(key);
        return data;
    };
    that.setData = function (key,data) {
        cc.sys.localStorage.setItem(key,data);
    };
    that.clear = function () {
        cc.sys.localStorage.clear();
    };
    return that;
};
let requireData = RequireData();
export default requireData;