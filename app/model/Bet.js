/*global Ext: false */
/* Describes point spreads, totals and vegas betting lines */
Ext.define('DFST.model.Bet', {
    extend: 'Ext.data.Model',
    
    fields: [ 
        { name: 'pts', type: 'float', defaultValue: 0.0 },
        { name: 'sh', type: 'float', defaultValue: 0.0 },
        { name: 'sa', type: 'float', defaultValue: 0.0 },
        { name: 'mh', type: 'int', defaultValue: 0 },
        { name: 'ma', type: 'int', defaultValue: 0 }
    ]
});
