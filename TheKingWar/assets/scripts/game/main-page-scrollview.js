import global from './../global'
import {RequireData} from './../utitly/import'
import defines from './../defines'
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
        Content: {
            default: null,
            type: cc.Node
        },
        ActivePrefab: {
            default: null,
            type: cc.Prefab
        },
        UnActivePrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        ///加载资源
        global.playerData.load(()=>{
            cc.log('load end');//加载结束，开始初始化场景
            let keyName = global.playerData.priceConfig[0];
            ///根据游戏的激活状态来初始化道具
            let  w = 0 ;
            for (let i in keyName){
                // cc.log('i = ' + i);
                let key = i + defines.keyName.isActive;
               // cc.log('key = ' + key);
                let value = RequireData.getData(key);
                cc.log('value=' + value);
                let node = null;
                if (value === 'yes'){
                    //cc.log('激活了');
                    ///激活了的初始化激活的预制件
                    node = cc.instantiate(this.ActivePrefab);
                    node.getComponent('activemodel').setCellName(i);
                }
                if (value === 'no'){
                   // cc.log('没有激活');
                    node = cc.instantiate(this.UnActivePrefab);
                    node.getComponent('unactivemodel').setCellName(i,w);
                }
                node.parent = this.Content;
                node.setPositionY( - 194 * 0.5 - 194 * w);
                w ++;
            }
            this.Content.setContentSize(this.Content.getContentSize().width,194 * w);

            global.event.fire('loadover');
        });


        global.event.on('create_new_cell',(object)=>{
            this.createNewCell(object);
        });

    },
    ///重新创建一个 激活后的道具栏
    createNewCell: function (object) {
        cc.log('create new cell' + JSON.stringify(object));
        ///激活之后，要将等级设置成0
        let node = cc.instantiate(this.ActivePrefab);
        ///储存等级 跟激活信息

        node.getComponent('activemodel').setCellName(object.name,true);
        node.setPosition(object.position);
        node.parent = this.Content;
        // let animation = node.getComponent(cc.Animation);
        // animation.play('ActiveModelEnter');
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

});
