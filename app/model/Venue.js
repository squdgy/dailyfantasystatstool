/*global Ext: false */
/* Describes details about a game venue */
Ext.define('DFST.model.Venue', {
    extend: 'Ext.data.Model',
    
    fields: [ 
        { name: 'nm', type: 'string', defaultValue: '' }
    ]
});
