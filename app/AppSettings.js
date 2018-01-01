/*global Ext: false */
Ext.define('DFST.AppSettings', {
    singleton: true,
    
    appCopyRight: '&copy;DraftAid.com 2012-2018',
    
    sport: 'nfl',   // app supports one at a time: mlb, nba, nfl, nhl, nas
    siteId: 1,      // default to FD
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
    nas: {
        gameCnt: 36
    },
    version: '4.01'
});  