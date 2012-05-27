//FOR DEBUG PURPOSES, LET EXTJS FIGURE OUT WHERE SCRIPTS ARE AND LOAD THEM
Ext.Loader.setConfig({ 
    enabled: true,
    paths: {
        Ext: 'ext-4.1.0/src'
    }
});

Ext.application({
    name: 'DFST',
    appFolder: 'app', // this is the default, but I'm being explicit

    // Set up paths for custom classes
    paths: {
          'Ext.ux': 'ext-4.1.0/examples/ux'
    },

    // Define all the controllers that should initialize at boot up of your application
    controllers: [
        'Stats',
        'Filters'
    ],
    
    autoCreateViewport: true //to automatically load and instantiate DFST.view.Viewport
    
});

/* Fix for ExtJS 4.1.0 bug */
Ext.override(Ext.view.AbstractView, {
    onRender: function() 
    {
        var me = this;
        
        this.callOverridden();
        
        if (me.mask && Ext.isObject(me.store)) {
            me.setMaskBind(me.store);
        }
    }
});
