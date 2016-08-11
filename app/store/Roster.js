/*global Ext: false, DFST: false */
/*
Copyright (c) 2012-2016 DraftAid.com
*/
Ext.define('DFST.store.Roster', {
    extend: 'Ext.data.Store',

    model: 'DFST.model.RosterSlot',

    autoLoad: false,
    
    proxy : { 
        type : 'localstorage', 
        id : 'rosterstore'
    }
});

