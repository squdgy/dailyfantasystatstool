/*global Ext: false */
/*
Copyright (c) 2012-2013 Maura Wilder
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
            rootProperty: 'players',
            totalProperty: 'total'            
		},
        remoteSort: true,
        remoteFilter: true
	}
});

