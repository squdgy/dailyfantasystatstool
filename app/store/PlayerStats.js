/*global Ext: false */
/* 

Copyright (c) 2012-2015 Maura Wilder

*/
Ext.define('DFST.store.PlayerStats', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Json'],
    
    model: 'DFST.model.PlayerStatSet',

    autoLoad: false,
    pageSize: 5,
    sorters: [{
        property : 'gd',
        direction: 'DESC'
    }],
    remoteSort: true,
    remoteFilter: true,
	proxy: {
		type: 'rest',
        headers: {'Accept': 'application/json'},
		url: 'app/data/playerstats.json', //local data, overridden in controller
		reader: {
            type: 'json',
            rootProperty: 'stats',
            totalProperty: 'total'            
		},
		noCache: false
	}
});

