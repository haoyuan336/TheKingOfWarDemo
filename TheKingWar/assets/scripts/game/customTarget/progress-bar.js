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
        ViewTarget: {
            default: null,
            type: cc.Node
        },
        DefaultWidth: 0,
        StartValue: 0.5

    },

    // use this for initialization
    onLoad: function () {
        this.setProgress(this.StartValue);
    },

    setProgress: function (value) {
        let width = this.DefaultWidth * value;
        this.ViewTarget.setContentSize( width , this.ViewTarget.getContentSize().height);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

});
