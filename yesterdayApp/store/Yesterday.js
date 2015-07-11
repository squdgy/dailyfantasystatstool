/*global Ext: false */
/* 

Copyright (c) 2015 Maura Wilder

*/
Ext.define('DFST.store.Yesterday', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Json'],
    
    model: 'DFST.model.Yesterday',

    autoLoad: false,
    pageSize: 1000,
    sorters: [{
        property : 'gd',
        direction: 'DESC'
    }],
    remoteSort: false,
    remoteFilter: false,
	proxy: {
		type: 'rest',
        headers: {'Accept': 'application/json'},
		url: 'app/data/yesterday.json', //local data, overridden in controller
		reader: {
            type: 'json',
            rootProperty: 'stats',
            totalProperty: 'total'            
		},
		noCache: false
	}
});

