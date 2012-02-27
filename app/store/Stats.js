/*

Copyright (c) 2012 Maura Wilder

*/
Ext.define('FV.store.Stats', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Xml'],

    model: 'FV.model.StatSet',

	proxy: {
		type: 'ajax',
		url: 'app/data/stats.json',
		reader: {
			type: 'json',
			record: 'item'
		}
	},

	sortInfo: {
		property: 'points',
		direction: 'DESC'
	}
});

