/*global Ext: false */
/*

Copyright (c) 2012-2018 DraftAid.com

*/
Ext.define('GamesProxy', {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.restgames',
    host: null,
    buildUrl: function(request) {
        if (!request) {
            return this.url;
        }
        var filter = request.getParams().filter;
        var filters = JSON.parse(filter);
        if (!filters) {
            return this.url;
        }
        for (var i=0; i<filters.length; i++) {
            if (filters[i].property === 'draftgroupId') {
                return Ext.String.format('{0}/api/draftgroups/{1}/games/', this.host, filters[i].value);
            }
        }
        return this.url;
    }
});

Ext.define('DFST.store.Games', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Json'],

    model: 'DFST.model.Game',

    autoLoad: false,
    remoteFilter: true,
    proxy: {
		type: 'restgames',
        headers: {'Accept': 'application/json'},
        url: 'app/data/games.json', //test data, url overridden in controller
		reader: {
			type: 'json',
            rootProperty: 'games',
            totalProperty: 'total'            
		}
	},
    listeners: {
        beforeload: function(store, operation, options){
            if (store.filters.length == 0) 
            {
                console.log('no sport');
                return false; // need site, date etc.
            }
            
            console.log('about to load games');
        }
    }	
});
