/*global Ext: false */
/*
Copyright (c) 2015 Maura Wilder
*/
Ext.define('DFST.model.Yesterday', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'gd', type: 'date' },   //gamedate
        { name: 'opp', type: 'string', defaultValue: '' }
    ]
});
