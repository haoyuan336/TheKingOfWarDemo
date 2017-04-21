import global from './../global'
import {RequireData,Helper} from './../utitly/import'
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
        EngineerModelActive: {
            default: null,
            type: cc.Prefab
        },
        EngineerModelActiveAlready: {
            default: null,
            type: cc.Prefab
        },
        EngineModelActiveCannotActive: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        ///展示
        global.event.on('loadover',()=>{
            this.initContent();
        });
        global.event.on('create_engineer_model_alactive',(object)=>{
            this.createAlActiveModel(object);
        });
        global.event.on('create_active_engine_model',(object)=>{
            this.createActiveModel(object);
        })
    },
    createActiveModel: function (object) {
        let node = cc.instantiate(this.EngineerModelActive);
        node.parent = this.Content;
        node.setPosition(object.position);
        node.getComponent('engineer-manager-model-active').setModelName(object.name);
    },
    createAlActiveModel: function (object) {
        cc.log('创建一个经纪人模块' + JSON.stringify(object));
        let node = cc.instantiate(this.EngineerModelActiveAlready);
        node.parent = this.Content;
        node.setPosition(object.position);
        node.getComponent('engineer-manager-model-alactive').setModelName(object.name,true);
    },
    initContent: function () {
        let nameConfig = global.playerData.engineerNameConfig;
        // cc.log('nameConfig=' + JSON.stringify(nameConfig));
        let w = 0;
        for (let i in nameConfig){


            ///首先判断这个道具有没有激活

            let isActive = RequireData.getData(nameConfig[i]);
            cc.log(nameConfig[i] + 'is active' + isActive);
            let isDaoJuActive = RequireData.getData(i + defines.keyName.isActive);
            let node = null;
            if (isDaoJuActive === defines.boolenValue.YES){
                if (isActive === defines.boolenValue.NO){
                    node = cc.instantiate(this.EngineerModelActive);
                    node.getComponent('engineer-manager-model-active').setModelName(i);
                }else
                if (isActive === defines.boolenValue.YES ){
                    node = cc.instantiate(this.EngineerModelActiveAlready);
                    node.getComponent('engineer-manager-model-alactive').setModelName(i);

                }
            }else {
                node = cc.instantiate(this.EngineModelActiveCannotActive);
                node.getComponent('engineer-manager-model-cannot-active').setModelName(i);
            }


            node.parent = this.Content;
            node.setPositionY( - node.getContentSize().height * 0.5 - node.getContentSize().height * w);
            w ++;
            this.Content.setContentSize(this.Content.getContentSize().width,node.getContentSize().height * w);

        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
});
