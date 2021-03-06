/*global Ext: false, DFST: false */
/*
Copyright (c) 2012-2020 DraftAid.com
*/
Ext.define('DFST.store.Stats', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Json'],

    model: 'DFST.model.StatSet',

    autoLoad: false,
    remoteSort: true,
    remoteFilter: true,
    pageSize: 1000,
    sorters: [{
        property : 'sal',
        direction: 'DESC'
    }],
    proxy: {
		type: 'rest',
        headers: {'Accept': 'application/json'},
        url: 'app/data/stats.json', //test data, url overridden in controller
		reader: {
			type: 'json',
            rootProperty: 'players',
            totalProperty: 'total'            
		},
	},
    listeners: {
        beforeload: function(store, operation, options){
            if (store.filters.length == 0) {
                console.log('no filters set - draftgroupId filter is required')
                return false; // need site, slate etc.
            }
        }
    }	
});

