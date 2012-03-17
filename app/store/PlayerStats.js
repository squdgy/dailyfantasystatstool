/*

Copyright (c) 2012 Maura Wilder

*/
Ext.define('DFST.store.PlayerStats', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Xml'],

    model: 'DFST.model.PlayerStatSet',

    autoLoad: true,
	proxy: {
		type: 'ajax',
		url: 'app/data/playerstats.json',
		reader: {
			type: 'json'
		}
	}
});

