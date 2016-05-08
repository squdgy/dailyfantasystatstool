/*global Ext: false */
Ext.application({
    name: 'yesterdayApp',
    appFolder: 'yesterdayApp',
    controllers: ['Yesterday'],

    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{ xtype: 'yesterdaygrid' }]
        });
    }
});

/* Fix for ajax requests not sending json request header in Firefox */
Ext.Ajax.defaultHeaders = {              
    'Accept' : 'application/json',  
    'Content-Type' : 'application/json'
};
