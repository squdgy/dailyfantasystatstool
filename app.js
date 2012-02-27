//FOR DEBUG PURPOSES, LET EXTJS FIGURE OUT WHERE SCRIPTS ARE AND LOAD THEM
Ext.Loader.setConfig({ 
    enabled: true,
    paths: {
        Ext: 'http://dev.sencha.com/deploy/ext-4.0.7-gpl/src' //TODO: make a local copy - shouldn't be hitting their dev server
    }
});

Ext.application({
    name: 'FV',
    appFolder: 'app', // this is the default, but I'm being explicit

    // Set up paths for custom classes
    paths: {
          'Ext.ux': 'extjs/'
    },

    // Define all the controllers that should initialize at boot up of your application
//    controllers: [
//        'Articles',
//        'Feeds'//,
//        'Stats'
//    ],
    
//    autoCreateViewport: true //to automatically load and instantiate FV.view.Viewport
    
//    ,

    launch: function() {
        Ext.create('FV.view.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'panel',
                    html: 'FOO'
                }
            ]
        });
    }
});

