/*global Ext: false, DFST: false */
/*
Copyright (c) 2012-2018 DraftAid.com
*/
Ext.define('DFST.store.Draftgroups', {
    extend: 'Ext.data.Store',

    model: 'DFST.model.Draftgroup',
    autoLoad: false,
    proxy: {
        type: 'memory',
        reader: 'json',
        model: 'DFST.model.Draftgroup'
    },
});
