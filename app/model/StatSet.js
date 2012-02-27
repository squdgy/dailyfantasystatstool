/*

Copyright (c) 2012 Maura Wilder

*/
Ext.define('FV.model.StatSet', {
    extend: 'Ext.data.Model',
    
    fields: [
        'team', 'name', {
            name: 'points',
            type: 'integer'
        }
    ]
});
