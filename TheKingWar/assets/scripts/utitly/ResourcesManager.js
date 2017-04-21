/**
 * Created by chu on 2017/2/4 0004.
 */
const ResourcesManager = function () {
    let that = {};
    const load = function (url,cb) {
        cc.loader.load(cc.url.raw(url),function (err,res) {
            if (err){
                cc.log('load:' + url + 'failed' + err);
            }else {
                cc.log('load:' + url + 'success');
                that[url] = res;
                if (cb){
                    cb.call(null,that[url]);
                }
            }
        })
    };
    that.load = function (path,cb) {
        load(path,cb);
    };
    
    return that;
};
const resources = ResourcesManager();
export default resources;