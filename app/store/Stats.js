/*global Ext: false, DFST: false */
/*
Copyright (c) 2012-2015 Maura Wilder
*/
Ext.define('DFST.store.Stats', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Json'],

    model: 'DFST.model.StatSet',

    autoLoad: false,
    pageSize: 20,
    sorters: [{
        property : 'sal',
        direction: 'DESC'
    }],
    proxy: {
		type: 'ajax',
        url: 'app/data/stats.json', //test data, url overridden in controller
		reader: {
			type: 'json',
            rootProperty: 'players',
            totalProperty: 'total'            
		},
	},
    remoteSort: true,
    remoteFilter: true
});

