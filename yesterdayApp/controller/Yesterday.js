/*global Ext: false*/
Ext.define('yesterdayApp.controller.Yesterday', {
    extend: 'Ext.app.Controller',

    stores: ['Yesterday'],
    views: ['Grid'],
    refs: [
        { ref: 'dataGrid', selector: 'grid' }
    ],

    init: function() {
        var host = 'https://localhost:44301';    //local
        if (window.location.hostname.indexOf('azurewebsites') > 0) {
            host = 'http://draftaidapi.azurewebsites.net';  //live azure
        }
        var yesterdayStore = this.getYesterdayStore();
        yesterdayStore.proxy.url = host + '/api/history/';
    },
    
    onLaunch: function() {
        this.getYesterdayStore().load();
    }
});
