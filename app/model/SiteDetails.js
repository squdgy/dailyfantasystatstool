/*global Ext: false */
/* Contains details that differ between sites that we need to use in the UI, such as available positions */
Ext.define('DFST.model.SiteDetails', {
    extend: 'Ext.data.Model',

    requires: ['DFST.model.RosterPosition', 'DFST.model.Draftgroup'],
    
    fields: [ // default values assume fanduel MLB
        { name: 'name', type: 'string', defaultValue: 'site' },
        { name: 'siteId', type: 'int', defaultValue: 2 },
        { name: 'dfsGameId', type: 'int', defaultValue: 2 },
        { name: 'cap', type: 'int', defaultValue: 60000 }
    ],
    hasMany  : [
        {model: 'DFST.model.RosterPosition', name: 'positions', associationKey: 'pos',  getterName: 'getPositions'},
        {model: 'DFST.model.Draftgroup', name: 'draftgroups', associationKey: 'dgs',  getterName: 'getDraftgroups'}
    ]
});
