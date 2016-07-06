/*global Ext: false, DFST: false */
/*
Copyright (c) 2012-2016 Maura Wilder
*/
Ext.define('DFST.store.Lineup', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Json'],

    model: 'DFST.model.RosterSlot',

    autoLoad: false,
    remoteSort: false,
    remoteFilter: true,
    proxy: {
		type: 'rest',
        headers: {'Accept': 'application/json'},
        limitParam: '',
        pageParam: '',
        startParam: '',
        url: 'app/data/lineup.json', //test data, url overridden in controller
		reader: {
			type: 'json',
            rootProperty: 'list',
            totalProperty: 'total'
		},
	},
    listeners: {
        beforeload: function(store, operation, options){
            if (store.filters.length == 0) return false; // need site, date etc.
        }
    }	
});

