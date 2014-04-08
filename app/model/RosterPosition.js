/*global Ext: false */
/* Describes details about a site's roster position */
Ext.define('DFST.model.RosterPosition', {
    extend: 'Ext.data.Model',
    
    fields: [ 
        { name: 'id', type: 'int', defaultValue: 0 },
        { name: 'name', type: 'string', defaultValue: '' },
        { name: 'count', type: 'int', defaultValue: 1 },
        { name: 'sort', type: 'int', defaultValue: 0 }
    ]
});
