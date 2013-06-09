/* Describes one game */
Ext.define('DFST.model.Game', {
    extend: 'Ext.data.Model',
    
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
    ]
});
