/* Contains details that differ between sites that we need to use in the UI, such as available positions */
Ext.define('DFST.model.SiteDetails', {
    extend: 'Ext.data.Model',
    
    fields: [ // default values assume from fanduel
        { name: 'pos' }, // array of positions from site
        { name: 'salmin', type: 'int', defaultValue: 0 },
        { name: 'salmax', type: 'int', defaultValue: 10000 },
        { name: 'salstep', type: 'int', defaultValue: 500 },
        { name: 'afpmin', type: 'int', defaultValue: 0 },
        { name: 'afpmax', type: 'int', defaultValue: 20 },
        { name: 'afpstep', type: 'int', defaultValue: 1 },
        { name: 'cppmin', type: 'int', defaultValue: 0 },
        { name: 'cppmax', type: 'int', defaultValue: 1500 },
        { name: 'cppstep', type: 'int', defaultValue: 50 },
        { name: 'siteId', type: 'int', defaultValue: 2 },
        { name: 'dfsGameId', type: 'int', defaultValue: 2 } // default to Fanduel salary cap 2013 - change this
    ]
});
