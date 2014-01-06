/*global Ext: false */
Ext.define('DFST.AppSettings', {
    singleton: true,
    
    sport: 'nfl', // application supports one sport at a time: mlb, nba, nfl
    mlb: {
        gameCnt: 162
    },
    nba: {
        gameCnt: 82
    },
    nfl: {
        gameCnt: 16
    },
    nhl: {
        gameCnt: 82
    },
    version: '1.1.1'
});  