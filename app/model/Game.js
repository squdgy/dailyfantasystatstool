/*global Ext: false */
/* Describes one game */
Ext.define('DFST.model.Game', {
    extend: 'Ext.data.Model',
    requires: [
        'DFST.model.Weather',
        'DFST.model.Venue'
    ],
    
    fields: [ // default values assume from fanduel
        { name: 'gid', type: 'string', defaultValue: '' },
        { name: 'gtime', type: 'string', defaultValue: '' },
        { name: 'home', type: 'string', defaultValue: '' },
        { name: 'away', type: 'string', defaultValue: '' },
        { name: 'hpid', type: 'int', defaultValue: 0 },
        { name: 'hpname', type: 'string', defaultValue: '' },
        { name: 'hlin', type: 'bool', defaultValue: false },
        { name: 'apid', type: 'int', defaultValue: 0 },
        { name: 'apname', type: 'string', defaultValue: '' },
        { name: 'alin', type: 'bool', defaultValue: false }
    ],
    idProperty: 'gid',
    hasOne : {model: 'DFST.model.Venue', name: 'venue', associationKey: 'venue', getterName: 'getVenue', setterName: 'setVenue'},
    hasMany  : {model: 'DFST.model.Weather', name: 'weather', associationKey: 'vw', getterName: 'getWeather'}
    
});
