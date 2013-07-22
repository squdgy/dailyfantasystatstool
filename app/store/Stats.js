/*global Ext: false, DFST: false */
/*
Copyright (c) 2012-2013 Maura Wilder
*/
Ext.define('DFST.store.Stats', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Json'],

    model: 'DFST.model.StatSet',

    autoLoad: false,
    pageSize: 20,
    sorters: [{
        property : 'afp',
        direction: 'DESC'
    }],
    proxy: {
		type: 'ajax',
        url: 'app/data/stats.json', //test data, url overridden in controller
		reader: {
			type: 'json',
            root: 'players',
            totalProperty: 'total'            
		},
        encodeSorters: function(sorters) {
            // ASP.Net WEB API can't handle the json-ized sort url param?
             var length   = sorters.length,
                 sortStrs = [],
                 sorter, i;
    
             for (i = 0; i < length; i++) {
                 sorter = sorters[i];
    
                 sortStrs[i] = sorter.property + '#' + sorter.direction;
             }

            return sortStrs.join(",");
         },
        encodeFilters: function(filters) {
            // ASP.Net WEB API can't handle the json-ized sort url param?
             var length   = filters.length,
                 str = [],
                 filter, i;
    
             for (i = 0; i < length; i++) {
                 filter = filters[i];
    
                 str[i] = filter.property + '#' + filter.value;
             }
             // add sport filter to all requests
             str[i] = "sport" + '#' + DFST.AppSettings.sport;

            return str.join(",");
         }         
         
	},
    remoteSort: true,
    remoteFilter: true
});

