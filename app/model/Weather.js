/*global Ext: false */
/* Describes time frame hour of weather for one game */
Ext.define('DFST.model.Weather', {
    extend: 'Ext.data.Model',
    
    fields: [ 
        { name: 'ti', type: 'string', defaultValue: '' },
        { name: 'hu', type: 'float', defaultValue: 0.0 },
        { name: 'pi', type: 'float', defaultValue: 0.0 },
        { name: 'pp', type: 'float', defaultValue: 0.0 },
        { name: 'su', type: 'string', defaultValue: '' },
        { name: 'te', type: 'float', defaultValue: 0.0 },
        { name: 'ws', type: 'float', defaultValue: 0.0 }
    ]
});
