/*global Ext: false, DFST: false */
Ext.define('DFST.AppSettings', {
    singleton: true,

    appCopyRight: '&copy;DraftAid.com 2012-2018',
    
    sport: 'mlb',   // app supports one at a time: mlb, nba, nfl, nhl, nas
    siteId: 1,      // default to DK
    getSite: function() {
        switch (DFST.AppSettings.siteId) {
            case 1:
                return 'draftkings';
            case 2:
                return 'fanduel';
            case 6:
                return 'yahoo';
            case 7:
                return 'fantasydraft';
            default:
                return '';
        }
    },
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
    version: '4.4'
});  