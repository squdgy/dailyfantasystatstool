/*

Copyright (c) 2012 Maura Wilder

*/
Ext.define('DFST.model.PlayerStatSet', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'date', type: 'date' },
        { name: 'opp', type: 'string' },
        
        //hitter stats
        { name: '1b', type: 'float', defaultValue: 0.0 },    //singles
        { name: '2b', type: 'float', defaultValue: 0.0 },    //doubles
        { name: '3b', type: 'intr', defaultValue: 0.0 },     //triples
        { name: 'hr', type: 'float', defaultValue: 0.0 },    //home runs
        { name: 'r', type: 'float', defaultValue: 0.0 },     //runs scored
        { name: 'rbi', type: 'float', defaultValue: 0.0 },   //runs batted in
        { name: 'bb', type: 'float', defaultValue: 0.0 },    //walks
        { name: 'sb', type: 'float', defaultValue: 0.0 },    //stolen bases
        { name: 'hbp', type: 'float', defaultValue: 0.0 },   //hit by pitch
        { name: 'out', type: 'float', defaultValue: 0.0 },   //(calculated as at bats - hits)
        
        //pitcher stats
        { name: 'w', type: 'float', defaultValue: 0.0 },     //wins
        { name: 'er', type: 'float', defaultValue: 0.0 },    //earned runs
        { name: 'so', type: 'float', defaultValue: 0.0 },    //strike outs
        { name: 'ip', type: 'float', defaultValue: 0.0 }     //innings pitched
    ]
});
