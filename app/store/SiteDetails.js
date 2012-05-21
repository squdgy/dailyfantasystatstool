/*

Copyright (c) 2012 Maura Wilder

*/
Ext.define('DFST.store.SiteDetails', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Json'],

    model: 'DFST.model.SiteDetails',

    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'app/data/sitedetails.json', //test data, url overridden in controller
		reader: {
			type: 'json',
            root: 'players',
            totalProperty: 'total'            
		},
        remoteSort: true,
        remoteFilter: true
	}
});

