/*global Ext: false */
/* Describes one draftgroup */
Ext.define('DFST.model.Draftgroup', {
    extend: 'Ext.data.Model',
    requires: [
        'DFST.model.Game'
    ],
    
    fields: [
        { name: 'dgid', type: 'int', defaultValue: 0 },
        { name: 'name', type: 'string', defaultValue: '' },
        { name: 'startTime', type: 'date' }
    ],
    idProperty: 'dgid',
    hasMany  : {model: 'DFST.model.Game', name: 'games', associationKey: 'games', getterName: 'getGames'}
});
