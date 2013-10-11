/*global Ext: false */
/*

Copyright (c) 2012-2013 Maura Wilder

*/
Ext.define('DFST.store.Games', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Json'],

    model: 'DFST.model.Game',

    autoLoad: false,
    proxy: {
		type: 'ajax',
        headers: {'Accept': 'application/json'},
        url: 'app/data/games.json', //test data, url overridden in controller
		reader: {
			type: 'json',
            root: 'games',
            totalProperty: 'total'            
		}
	},
    remoteFilter: true
});
