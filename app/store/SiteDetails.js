/*global Ext: false */
/*
Copyright (c) 2012-2018 DraftAid.com
*/
Ext.define('DFST.store.SiteDetails', {
    extend: 'Ext.data.Store',
    
    requires: ['Ext.data.reader.Json'],

    model: 'DFST.model.SiteDetails',

    autoLoad: true,
    remoteSort: false,
    remoteFilter: false,
    proxy: {
        type: 'rest',
        headers: {'Accept': 'application/json'},
        url: 'app/data/sitedetails.json', //test data, url overridden in controller
		reader: {
			type: 'json'
		}
	}
});

