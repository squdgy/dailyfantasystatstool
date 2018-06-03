/*global Ext: false */
/* 
Copyright (c) 2012-2018 DraftAid.com
*/
Ext.define('yesterdayApp.store.Yesterday', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Json'],
    
    model: 'yesterdayApp.model.PlayerFantasyPoints',

    autoLoad: false,
    pageSize: 100,
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

