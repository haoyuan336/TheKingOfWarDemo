import global from './../../global'
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
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        const createActiveModel = function (value) {
            cc.log('name = ' + self.name);
            if (self.name === value){
                 global.event.removeListener('active_daoju',createActiveModel);
                global.event.fire('create_active_engine_model',{
                    name: self.name,
                    position: self.node.getPosition()
                });
                self.node.destroy();
            }
        };
        global.event.on('active_daoju', createActiveModel);

    },
    setModelName: function (name) {
        cc.log('can not active enginner mode name=' + name);
        this.name = name;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
