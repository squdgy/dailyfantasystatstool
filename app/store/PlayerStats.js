/*

Copyright (c) 2012 Maura Wilder

*/
Ext.define('DFST.store.PlayerStats', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Xml'],

    model: 'DFST.model.PlayerStatSet',

    autoLoad: false,
	proxy: {
		type: 'ajax',
//		url: 'app/data/playerstats.json', //hard-coded version
        url: 'http://localhost:49533/api/playerstats/',
		reader: {
            type: 'json',
            root: 'stats',
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

            return str.join(",");
         }         
	},
    remoteSort: true,
    remoteFilter: true
});

