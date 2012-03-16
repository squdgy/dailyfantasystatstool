/*

Copyright (c) 2012 Maura Wilder

*/
Ext.define('DFST.model.StatSet', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'team', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'points', type: 'integer' },
        { name: 'assists', type: 'integer' },
    ]
});
