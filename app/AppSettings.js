/*global Ext: false */
Ext.define('DFST.AppSettings', {
    singleton: true,
    
    appCopyRight: '&copy; DraftAid.com',
    
    sport: 'nfl',   // app supports one at a time: mlb, nba, nfl, nhl
    siteId: 1,      // default to DK
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
    version: '2.5'
});  