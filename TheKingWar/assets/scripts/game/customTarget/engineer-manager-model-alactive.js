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
        NameLabel: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {

    },
    setModelName: function (name,isAction) {
        cc.log('set name +' + name);
        //播放动画
        this.NameLabel.string = name;
        if (isAction){
            let animate = this.getComponent(cc.Animation);
            animate.play('EngineerModelAlActiveEnter');
        }

    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
