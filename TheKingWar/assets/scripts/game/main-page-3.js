import global from './../global'
import {Helper} from './../utitly/import'
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
        AchievementModel: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        global.event.on('loadover',()=>{
            this.initContent();
        })
    },
    initContent: function () {
        //初始化场景
        cc.log('init main page 3 content');
        let config = global.playerData.priceConfig[0];
        let nodeList = [];
        for (let i in config){
            for (let j in global.playerData.achievementCountConfig){
                let node = cc.instantiate(this.AchievementModel);
                node.getComponent('achievement-model').setNameAndAchievement(i,j);
                node.parent = this.Content;
                nodeList.push(node);
            }
        }
        cc.log('nodeList length =' + nodeList.length);
        for (let i = 0 ; i < nodeList.length / 3 ; i ++){
            for (let j = 0 ; j < 3 ; j ++){
                let w = i * 3 + j;
                if (w < nodeList.length){
                    nodeList[w].setPosition(-(3 - 1) * nodeList[w].getContentSize().width /2
                      + nodeList[w].getContentSize().width * j,
                      nodeList[w].getContentSize().height * -0.5 - nodeList[w].getContentSize().height * i);
                }else {

                    //return
                }
            }
        }


        this.Content.setContentSize(this.Content.getContentSize().height,
          nodeList[0].getContentSize().height * (Math.floor(nodeList.length / 3)));
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
});
