/*global Ext: false, DFST: false */
Ext.define('DFST.AppSettings', {
    singleton: true,

    appCopyRight: '&copy;DraftAid.com 2012-2018',
    
    sport: 'mlb',   // app supports one at a time: mlb, nba, nfl, nhl, nas, golf
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
        hasExtraPositionFilters: true,
        hasTeams: true,
        showGameDetails: true,
        showGameLog: true,
        showInjuries: true,
        gameText: 'game',
        gameCnt: 162
    },
    nba: {
        hasExtraPositionFilters: false,
        hasTeams: true,
        showGameDetails: false,
        showGameLog: true,
        showInjuries: true,
        gameText: 'game',
        gameCnt: 82
    },
    nfl: {
        hasExtraPositionFilters: false,
        hasTeams: true,
        showGameDetails: true,
        showGameLog: true,
        showInjuries: true,
        gameText: 'game',
        gameCnt: 16
    },
    nhl: {
        hasExtraPositionFilters: true,
        hasTeams: true,
        showGameDetails: true,
        showGameLog: true,
        showInjuries: true,
        gameText: 'game',
        gameCnt: 82
    },
    nas: {
        hasExtraPositionFilters: false,
        hasTeams: false,
        showGameDetails: true,
        showGameLog: true,
        showInjuries: false,
        gameText: 'race',
        gameCnt: 36
    },
    golf: {
        hasExtraPositionFilters: false,
        hasTeams: false,
        showGameDetails: false,
        showGameLog: false,
        showInjuries: false,
        gameText: 'tournament',
        gameCnt: 52 // made up
    },
    version: '4.7.20180614'
});  