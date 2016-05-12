/*global Ext: false */
/* 
Copyright (c) 2016 Maura Wilder
*/
Ext.define('yesterdayApp.store.Yesterday', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Json'],
    
    model: 'yesterdayApp.model.PlayerFantasyPoints',

    autoLoad: false,
    pageSize: 100,
    sorters: [
        { property : 'FantasyPoints', direction: 'DESC'},
        { property : 'HomeRuns', direction: 'DESC'},
    ],
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

