/*global Ext: false */
/* 

Copyright (c) 2012-2018 DraftAid.com

*/
Ext.define('DFST.store.PlayerStatsMemory', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Json', 'Ext.data.proxy.Memory'],
    
    model: 'DFST.model.PlayerStatSet',

    autoLoad: false,
    pageSize: 200,
    sorters: [{
        property : 'gd',
        direction: 'DESC'
    }],
    remoteSort: true,
    remoteFilter: false,
    proxy: {
        type: 'memory',
        enablePaging: true
    }
});

