/*global Ext: false */
/*

Copyright (c) 2012 Maura Wilder

*/
Ext.define('DFST.model.PlayerStatSet', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'gd', type: 'date' },   //gamedate
        { name: 'opp', type: 'string', defaultValue: '' },
        { name: 'isHome', type: 'boolean', defaultValue: true },
        
        //hitter stats
        { name: 'x1b', type: 'int', defaultValue: 0 },    //singles
        { name: 'x2b', type: 'int', defaultValue: 0 },    //doubles
        { name: 'x3b', type: 'int', defaultValue: 0 },     //triples
        { name: 'hr', type: 'int', defaultValue: 0 },    //home runs
        { name: 'r', type: 'int', defaultValue: 0 },     //runs scored
        { name: 'rbi', type: 'int', defaultValue: 0 },   //runs batted in
        { name: 'bb', type: 'int', defaultValue: 0 },    //walks
        { name: 'sb', type: 'int', defaultValue: 0 },    //stolen bases
        { name: 'hbp', type: 'int', defaultValue: 0 },   //hit by pitch
        { name: 'o', type: 'int', defaultValue: 0 },   //(calculated as at bats - hits)
        
        //pitcher stats
        { name: 'w', type: 'int', defaultValue: 0 },     //wins
        { name: 'er', type: 'int', defaultValue: 0 },    //earned runs
        { name: 'so', type: 'int', defaultValue: 0 },    //strike outs
        { name: 'ip', type: 'float', defaultValue: 0.0 },     //innings pitched

        //derived stats
        { name: 'fp', type: 'float', defaultValue: 0.0}  //fantasy points per game
    ]
});
