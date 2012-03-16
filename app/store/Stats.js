/*

Copyright (c) 2012 Maura Wilder

*/
Ext.define('DFST.store.Stats', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Xml'],

    model: 'DFST.model.StatSet',

    autoLoad: true,
	proxy: {
		type: 'ajax',
		url: 'app/data/stats.json',
		reader: {
			type: 'json'
		}
	},

sortInfo: {
		property: 'points',
		direction: 'DESC'
	}
});

