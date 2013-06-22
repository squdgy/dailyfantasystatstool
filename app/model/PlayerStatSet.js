/*

Copyright (c) 2012 Maura Wilder


*/
Ext.define('DFST.model.PlayerStatSet', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'gd', type: 'date' },   //gamedate
        { name: 'opp', type: 'string', defaultValue: '' },
        { name: 'isHome', type: 'boolean', defaultValue: true },
        { name: 'pos', type: 'string', defaultValue: '' },
        
        //hitter stats
        { name: 'ab', type: 'int', defaultValue: 0 },    //at bats
        { name: 'h', type: 'int', defaultValue: 0 },    //hits
        { name: 'x1b', type: 'int', defaultValue: 0 },    //singles
        { name: 'x2b', type: 'int', defaultValue: 0 },    //doubles
        { name: 'x3b', type: 'int', defaultValue: 0 },     //triples
        { name: 'hr', type: 'int', defaultValue: 0 },    //home runs
        { name: 'r', type: 'int', defaultValue: 0 },     //runs scored
        { name: 'rbi', type: 'int', defaultValue: 0 },   //runs batted in
        { name: 'bb', type: 'int', defaultValue: 0 },    //walks
        { name: 'bso', type: 'int', defaultValue: 0 },    //strike out (H)
        { name: 'hidp', type: 'int', defaultValue: 0 },    //ground into dp
        { name: 'sb', type: 'int', defaultValue: 0 },    //stolen bases
        { name: 'cs', type: 'int', defaultValue: 0 },    //caught stealing
        { name: 'hbp', type: 'int', defaultValue: 0 },   //hit by pitch
        { name: 'sac', type: 'int', defaultValue: 0 },    //sacrifices       
        { name: 'o', type: 'int', defaultValue: 0 },   //(calculated as at bats - hits)
        
        //pitcher stats
        { name: 'w', type: 'int', defaultValue: 0 },     //wins
        { name: 'er', type: 'int', defaultValue: 0 },    //earned runs
        { name: 'so', type: 'int', defaultValue: 0 },    //strike outs
        { name: 'ip', type: 'float', defaultValue: 0.0 },     //innings pitched
        { name: 'ha', type: 'int', defaultValue: 0 },     //hits against
        { name: 'hb', type: 'int', defaultValue: 0 },     //hits batsman
        { name: 'bba', type: 'int', defaultValue: 0 },     //walks allowed
        { name: 'l', type: 'int', defaultValue: 0 },     //loss
        
/*
        //nba stats
        { name: 'p', type: 'int', defaultValue: 0 },   //points
        { name: 'a', type: 'int', defaultValue: 0 },   //assists
        { name: 'rb', type: 'int', defaultValue: 0 },   //rebounds
        { name: 'b', type: 'int', defaultValue: 0 },    //blocks
        { name: 's', type: 'int', defaultValue: 0 },    //steals
        { name: 'to', type: 'int', defaultValue: 0 },   //turn overs
        { name: 'fgm', type: 'int', defaultValue: 0 },  //field goals made
        { name: 'fga', type: 'int', defaultValue: 0 },  //field goals att.
        { name: 'ftm', type: 'int', defaultValue: 0 },  //free throws made
        { name: 'fta', type: 'int', defaultValue: 0 },  //free throws attempted
        { name: 'tpm', type: 'int', defaultValue: 0 },  //free throws made
        { name: 'tpa', type: 'int', defaultValue: 0 },  //free throws attempted
        { name: 'm', type: 'int', defaultValue: 0 },    //free throws attempted
        { name: 'start', type: 'int', defaultValue: 0 },  //free throws attempted
*/        
        //derived stats
        { name: 'fp', type: 'float', defaultValue: 0.0}  //fantasy points per game
    ]
});
