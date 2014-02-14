/*global Ext: false */
/* Describes details about a player in a roster slot */
Ext.define('DFST.model.RosterSlot', {
    extend: 'Ext.data.Model',
    
    fields: [ 
        { name: 'rpid', type: 'int', defaultValue: 0 },
        { name: 'rpslot', type: 'int', defaultValue: 0 },
        { name: 'rpos', type: 'string', defaultValue: '' },
        { name: 'pid', type: 'int', defaultValue: 0 },
        { name: 'name', type: 'string', defaultValue: '' },
        { name: 'fppg', type: 'decimal', defaultValue: 0.0 },
        { name: 'salary', type: 'int', defaultValue: 0 }
    ]
});
