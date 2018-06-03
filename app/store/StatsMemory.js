/*global Ext: false, DFST: false */
/*
Copyright (c) 2012-2018 DraftAid.com
*/
Ext.define('DFST.store.StatsMemory', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Json', 'Ext.data.proxy.Memory'],

    model: 'DFST.model.StatSet',

    autoLoad: false,
    remoteSort: true,
    remoteFilter: true,
    pageSize: 20,
    sorters: [{
        property : 'sal',
        direction: 'DESC'
    }],
    proxy: {
		type: 'memory',
		enablePaging: true
	}	
});

