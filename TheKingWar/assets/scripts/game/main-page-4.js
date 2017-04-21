import global from './../global'
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
        ShopModel: {
            default: null,
            type: cc.Prefab
        },
        ShopPage: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        global.event.on('loadover',()=>{
            this.initContent();
        })
        global.event.on('shop_buy_button_click',(data)=> {
            this.buyEventListener(data);
        })
    },
    buyEventListener: function (data) {
        cc.log('buy goods' + data);
    },
    initContent:function (){
        cc.log('init content page 4');
        let shopConfig = global.playerData.shopConfig;
        // cc.log('shop Config=' + JSON.stringify(shopConfig));
        let w = 0;
        for (let  i in shopConfig){
            let node = cc.instantiate(this.ShopModel);
            node.getComponent('shop-model').setModelName(i,shopConfig[i].count,shopConfig[i].money);
            node.parent = this.ShopPage;
            node.setPosition(0,250 - w * 168);
            w++;
        }
    },
    getDiamondButtonClick: function (event,customdata) {
        switch (customdata){
            case 'watch':
                cc.log('watch');
                break;
            case 'click':
                cc.log('click');
                break;
            case 'twitter':
                cc.log('twitter');
                break;
            case 'facebook':
                cc.log('facebook');
                break;
            default:
                break;
        }
    }



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
