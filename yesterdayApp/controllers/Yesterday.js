/*global Ext: false DFST: false*/
Ext.define('DFST.controller.Yesterday', {
    extend: 'Ext.app.Controller',

    stores: ['Yesterday'],

    models: ['Yesterday'],

    views: ['yesterday.Grid'],

    refs: [
        { ref: 'yesterdayGrid', selector: 'yesterdaygrid' }
        ],

    init: function() {
        alert('zulu');
        // Set up service URLs
        var host = 'https://localhost:44301';    //local
        if (location.hostname.indexOf('azurewebsites') > 0) {
            host = 'http://dfstapi.cloudapp.net';  //live azure
        }
//        host = 'http://localhost:81';       //local azure dev fabric 
        var yesterdayStore = this.getYesterdayStore();
        yesterdayStore.proxy.url = host + '/api/yesterday/';
    }
});


