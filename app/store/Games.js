/*global Ext: false */
/*

Copyright (c) 2012-2015 Maura Wilder

*/
Ext.define('DFST.store.Games', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Json'],

    model: 'DFST.model.Game',

    autoLoad: false,
    remoteFilter: true,
    proxy: {
		type: 'rest',
        headers: {'Accept': 'application/json'},
        url: 'app/data/games.json', //test data, url overridden in controller
		reader: {
			type: 'json',
            rootProperty: 'games',
            totalProperty: 'total'            
		}
	},
    listeners: {
        beforeload: function(store, operation, options){
            if (store.filters.length == 0) 
            {
                console.log('no sport');
                return false; // need site, date etc.
            }
            
            console.log('about to load games');
        }
    }	
});
