//FOR DEBUG PURPOSES, LET EXTJS FIGURE OUT WHERE SCRIPTS ARE AND LOAD THEM
Ext.Loader.setConfig({ 
    enabled: true,
    paths: {
        Ext: 'ext-4.0.7-gpl/src'
    }
});

Ext.application({
    name: 'DFST',
    appFolder: 'app', // this is the default, but I'm being explicit

    // Set up paths for custom classes
    paths: {
          'Ext.ux': 'ext-4.0.7-gpl/examples/ux'
    },

    // Define all the controllers that should initialize at boot up of your application
    controllers: [
        'Stats'
    ],
    
    autoCreateViewport: true //to automatically load and instantiate DFST.view.Viewport
    
});

