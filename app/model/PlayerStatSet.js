/*global Ext: false */
/*

Copyright (c) 2012-2014 Maura Wilder


*/
Ext.define('DFST.model.PlayerStatSet', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'gd', type: 'date' },   //gamedate
        { name: 'opp', type: 'string', defaultValue: '' },
        { name: 'isHome', type: 'boolean', defaultValue: true },
        { name: 'pos', type: 'string', defaultValue: '' },

        // stats vary by sport
        { name: 'si1', type: 'float', defaultValue: 0.0 },
        { name: 'si2', type: 'float', defaultValue: 0.0 },
        { name: 'si3', type: 'float', defaultValue: 0.0 },
        { name: 'si4', type: 'float', defaultValue: 0.0 },
        { name: 'si5', type: 'float', defaultValue: 0.0 },
        { name: 'si6', type: 'float', defaultValue: 0.0 },
        { name: 'si7', type: 'float', defaultValue: 0.0 },
        { name: 'si8', type: 'float', defaultValue: 0.0 },
        { name: 'si9', type: 'float', defaultValue: 0.0 },
        { name: 'si10', type: 'float', defaultValue: 0.0 },
        { name: 'si11', type: 'float', defaultValue: 0.0 },
        { name: 'si12', type: 'float', defaultValue: 0.0 },
        { name: 'si13', type: 'float', defaultValue: 0.0 },
        { name: 'si14', type: 'float', defaultValue: 0.0 },
        { name: 'si15', type: 'float', defaultValue: 0.0 },
        { name: 'si16', type: 'float', defaultValue: 0.0 },
        { name: 'si17', type: 'float', defaultValue: 0.0 },
        { name: 'si18', type: 'float', defaultValue: 0.0 },
        { name: 'si19', type: 'float', defaultValue: 0.0 },
        { name: 'si20', type: 'float', defaultValue: 0.0 },
        { name: 'si21', type: 'float', defaultValue: 0.0 },
        { name: 'si22', type: 'float', defaultValue: 0.0 },
        { name: 'si23', type: 'float', defaultValue: 0.0 },
        { name: 'si24', type: 'float', defaultValue: 0.0 },
        { name: 'si25', type: 'float', defaultValue: 0.0 },
        { name: 'si26', type: 'float', defaultValue: 0.0 },
        { name: 'si27', type: 'float', defaultValue: 0.0 },
        { name: 'si28', type: 'float', defaultValue: 0.0 },
        { name: 'si29', type: 'float', defaultValue: 0.0 },
        { name: 'si30', type: 'float', defaultValue: 0.0 },
        { name: 'si31', type: 'float', defaultValue: 0.0 },
        { name: 'si32', type: 'float', defaultValue: 0.0 },
        { name: 'si33', type: 'float', defaultValue: 0.0 },
        { name: 'si34', type: 'float', defaultValue: 0.0 },
        { name: 'si35', type: 'float', defaultValue: 0.0 },
        { name: 'si36', type: 'float', defaultValue: 0.0 },
        { name: 'si37', type: 'float', defaultValue: 0.0 },
        { name: 'si38', type: 'float', defaultValue: 0.0 },
        { name: 'si39', type: 'float', defaultValue: 0.0 },
        { name: 'si40', type: 'float', defaultValue: 0.0 },
        { name: 'si41', type: 'float', defaultValue: 0.0 },
        { name: 'si42', type: 'float', defaultValue: 0.0 },
        { name: 'si43', type: 'float', defaultValue: 0.0 },
        { name: 'si44', type: 'float', defaultValue: 0.0 },
        { name: 'si45', type: 'float', defaultValue: 0.0 },
        { name: 'si46', type: 'float', defaultValue: 0.0 },
        { name: 'si47', type: 'float', defaultValue: 0.0 },
        { name: 'si48', type: 'float', defaultValue: 0.0 },
/*
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
*/        
        //derived stats
        { name: 'fp', type: 'float', defaultValue: 0.0}  //fantasy points per game
    ]
});
