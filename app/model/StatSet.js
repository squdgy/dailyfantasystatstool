/*global Ext: false */
/*

Copyright (c) 2012-2014 Maura Wilder

*/
Ext.define('DFST.model.StatSet', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'int', defaultValue: 0 },
        { name: 'gameId', type: 'int', defaultValue: 0 },
        { name: 'team', type: 'string' },
        { name: 'opp', type: 'string' }, //opponent
        { name: 'isHome', type: 'boolean', defaultValue: true },
        { name: 'name', type: 'string' },
        { name: 'lname', type: 'string', defaultValue: '' },
        { name: 'fname', type: 'string', defaultValue: '' },
        { name: 'pos', type: 'string', defaultValue: '' },
        { name: 'ng', type: 'int', defaultValue: 0 },        //number of games played
        
        //nba: 
        { name: 'odr', type: 'int', defaultValue: 0 },        //opponent defensive efficiency

        //hitter stats
        { name: 'x1b', type: 'int', defaultValue: 0 },   //singles
        { name: 'x2b', type: 'int', defaultValue: 0 },   //doubles
        { name: 'x3b', type: 'int', defaultValue: 0 },   //triples
        { name: 'hr', type: 'int', defaultValue: 0 },    //home runs
        { name: 'r', type: 'int', defaultValue: 0 },     //runs scored
        { name: 'rbi', type: 'int', defaultValue: 0 },   //runs batted in
        { name: 'bb', type: 'int', defaultValue: 0 },    //walks
        { name: 'sb', type: 'int', defaultValue: 0 },    //stolen bases
        { name: 'hbp', type: 'int', defaultValue: 0 },   //hit by pitch
        { name: 'o', type: 'int', defaultValue: 0 },     //(calculated as at bats - hits)
        
        //pitcher stats
        { name: 'w', type: 'int', defaultValue: 0 },     //wins
        { name: 'aw', type: 'float', defaultValue: 0.0 },    //average wins
        { name: 'er', type: 'int', defaultValue: 0 },    //earned runs
        { name: 'aer', type: 'float', defaultValue: 0.0 },    //average earned runs/game
        { name: 'so', type: 'int', defaultValue: 0 },    //strike outs
        { name: 'aso', type: 'float', defaultValue: 0.0 },//average strike outs
        { name: 'ip', type: 'float', defaultValue: 0.0 }, //innings pitched
        { name: 'aip', type: 'float', defaultValue: 0.0 }, //avg. innings pitched
        
        //derived stats
        { name: 'afp', type: 'float', defaultValue: 0.0},   //average fantasy points per game (computed by draftaid)
        { name: 'afp5', type: 'float', defaultValue: 0.0},  //average fantasy points per game over last 5
        { name: 'cpp5', type: 'float', defaultValue: 0.0},  //cost per point over last 5 games
        
        //site stats
        { name: 'sal', type: 'float', defaultValue: 0.0},  //salary at site
        { name: 'cpp', type: 'float', defaultValue: 0.0},  //cost per point
        { name: 'spos', type: 'string', defaultValue: '' },//position (as site reports it)
        { name: 'inj', type: 'boolean', defaultValue: false},  //whether player is injured?
        { name: 'injd', type: 'string', defaultValue: ''},  //injury description
        { name: 'pp', type: 'boolean', defaultValue: false},  //whether player is probable starter?
        { name: 'pd', type: 'string', defaultValue: ''},  //probable starter description if there is one
        
        { name: 'border', type: 'int', defaultValue: 0},  //batting order if known, else 0
        { name: 'projp', type: 'float', defaultValue: 0.0 }, //projected fantasy points
        { name: 'cpprojp', type: 'float', defaultValue: 0.0 }, //cost per projected fantasy points
        { name: 'dep', type: 'int', defaultValue: 0 },  //depth chart value
        
        // baseball specific
        { name: 'bats', type: 'int', defaultValue: 0},  //handedness
        { name: 'throws', type: 'int', defaultValue: 0}, //handedness
        { name: 'opp_throws', type: 'int', defaultValue: 0}, //opponent pitcher handedness
        
        // baseball season stats, vs. pitching hand of opposing team's pitcher
        { name: 'ph_ba', type: 'float', defaultValue: 0.0},
        { name: 'ph_obp', type: 'float', defaultValue: 0.0},
        { name: 'ph_slg', type: 'float', defaultValue: 0.0},
        { name: 'ph_ops', type: 'float', defaultValue: 0.0},
        { name: 'ph_woba', type: 'float', defaultValue: 0.0},
        { name: 'tla', type: 'boolean', defaultValue: false},  //team lineup ready?

        { name: 'rpel' } // array of roster position ids that player is eligible for
    ]
    
});
