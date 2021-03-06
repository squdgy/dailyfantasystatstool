/*global Ext: false DFST: false*/
Ext.define('DFST.controller.Stats', {
    extend: 'Ext.app.Controller',

    stores: ['Stats', 'PlayerStats', 'PlayerStatsMemory', 'Games', 'Lineup'],

    models: ['StatSet', 'PlayerStatSet', 'Game'],

    views: ['statset.Grid', 'statset.PlayerGrid', 
    'drilldown.Details', 'drilldown.DetailInfo',
    'weather.Display', 'game.Info'],

    refs: [
        { ref: 'playerGrid', selector: 'statsetplayergrid' },
        { ref: 'drilldowndetails',  selector: 'drilldowndetails'},
        { ref: 'drilldowninfo', selector: 'drilldowninfo' },
        { ref: 'drilldownnextopp', selector: 'statsetplayergrid checkbox#nextopp'},
        { ref: 'gamedetails', selector: 'gamedetails' }
        ],

    init: function() {
        // Set up service URLs
        var host = 'https://localhost:44392';    //local
        if (window.location.hostname.indexOf('windows') >= 0) {
            host = 'https://draftaidapi.azurewebsites.net';  //live azure
        } else if (window.location.hostname.indexOf('draftaid.com') >= 0) {
            host = 'http://api.draftaid.com';  //live azure
        }
        var statsStore = this.getStatsStore();
        var playerStatsStore = this.getPlayerStatsStore();
        var playerStatsStoreMemory = this.getPlayerStatsMemoryStore();
        var lineupStore = this.getLineupStore();
        statsStore.proxy.url = host + '/api/players/';
        playerStatsStore.proxy.url = host + '/api/playerstats/';
        lineupStore.proxy.url = host + '/api/lineup/';
        playerStatsStore.on('beforeload', function(){
            if (this.filters.length == 0) return false; // don't load if no player selected
        });
        playerStatsStore.on('load', function(store, records, success, eOpts) { // also load, in memory store
            if (success) {
                this.getPlayerGrid().query('pagingtoolbar')[0].moveFirst();
                playerStatsStoreMemory.getProxy().setData(records);
                playerStatsStoreMemory.load();
            }
        }, this);

        this.control({
            'statsetgrid': {
                selectionchange: this.onPlayerChanged
            },
            'statsetgrid > tableview': {
                refresh: this.selectStatSet
            },
            'statsetplayergrid checkbox#nextopp':{
                change: this.loadStatSetData
            }
        });
    },
    
    loadStatSetData: function() {
        var nextopp = this.getDrilldownnextopp();
        var limit = nextopp ? nextopp.getValue() : false;
        var store = this.getPlayerStatsStore();
        store.filter([
            {id:'id', property: 'id', value: this.playerId.toString()},
            {id:'siteId', property: 'siteId', value: this.siteId.toString()},
            {id:'nextopp', property: 'nextopp', value: (limit ? this.gameId : limit).toString()},
        ]);
    },
    
    selectStatSet: function(view) {
        var first = this.getStatsStore().getAt(0);
        var selModel = view.getSelectionModel();
        var selection = selModel.getSelection();
        if (first && (selection.length == 0 || selection[0].id !== first.id)) {
            selModel.deselectAll();
            selModel.select(first);
        }
    },

    onPlayerChanged: function(grid, statsets) {
        if (DFST.AppSettings[DFST.AppSettings.sport].showGameLog) {
            this.drillDown(grid, statsets); 
        }
        if (DFST.AppSettings[DFST.AppSettings.sport].showGameDetails) {
            this.showGameDetail(grid, statsets);
        }
    },
    
    /**
     * Loads the given statset into the drilldown view
     * @param {DFST.model.StatSet} statset The statset to load
     */
    drillDown: function(grid, statsets) {
        var statset = statsets[0],
            detailsInfoView = this.getDrilldowninfo(),
            detailsView = this.getDrilldowndetails();

        if (statset && detailsView) {
            this.siteId = DFST.AppSettings.siteId;
            this.playerId = statset.data.id;
            this.gameId = statset.data.gameId;

            var pos = statset.data.spos;
            var pgrid = this.getPlayerGrid();
            pgrid.reconfigure(null, pgrid.getCols(DFST.AppSettings.sport, pos));
            this.loadStatSetData();
            detailsInfoView.statset = statset;
            detailsInfoView.update(statset.data);
           
            var gameText = Ext.String.capitalize(DFST.AppSettings[DFST.AppSettings.sport].gameText);
            var format = '{0} Log for {1} {2}, {3} {4}';
            var noTeamFormat = '{0} Log for {1} {2}';
            if (DFST.AppSettings[DFST.AppSettings.sport].hasTeams) {
                detailsView.setTitle(Ext.String.format(format, gameText, statset.get('fname'), statset.get('lname'),
                    statset.get('spos'), statset.get('team')));           
            } else {
                detailsView.setTitle(Ext.String.format(noTeamFormat, gameText, statset.get('fname'), statset.get('lname')));         
            }
            detailsView.show();
        }
    },
    
    /**
     * Load game data into the Game Details view
     * @param {DFST.model.StatSet} statset The statset to load
     */
    showGameDetail: function(grid, statsets) {        
        var statset = statsets[0],
            gameView = this.getGamedetails(),
            gamesStore = this.getGamesStore();

        if (!DFST.AppSettings[DFST.AppSettings.sport].showGameDetails) {
            gameView.hide();
            return;
        }
        if (statset && gameView) {
            var gameId = statset.data.gameId;
            var game = gamesStore.findRecord('gid', gameId);
            if (game) {
                // weather display, if any
                var hourViews = Ext.ComponentQuery.query('weatherhour');
                var weather = game.getAssociatedData().weather;
                if (weather) {
                    var wi = weather.length;
                    for (var i=0; i < wi; i++) {
                        var hourView = hourViews[i];
                        if (hourView) {
                            hourView.update(weather[i]);
                        }
                    }
                }
                
                var homeTeam = game.get('home').toUpperCase();
                var awayTeam = game.get('away').toUpperCase();
                var name = game.get('gname');
                var venue = game.getAssociatedData().venue;
                var venueName = (venue !== undefined) ? venue.nm : '';
                var parkfactor = (venue !== undefined) ? venue.pf : 0;
                var gameTime = Ext.Date.parse(game.get('gtime')+"Z","c");
                var fmtdGameTime = Ext.Date.format(gameTime, 'M j, g:i a');
                
                // game info
                var gameInfo = Ext.ComponentQuery.query('gameinfo')[0];
                if (gameInfo) {
                    var gi = {
                        home: homeTeam,
                        homePitcher: game.get('hpname'),
                        hpthrows: game.get('hthrows'),
                        away: awayTeam,
                        awayPitcher: game.get('apname'),
                        apthrows: game.get('athrows'),
                        venue: venueName,
                        parkfactor: parkfactor,
                        gameTime: fmtdGameTime,
                        name: name
                    };
                    gameInfo.update(gi);
                    gameInfo.show();
                }

                // betting display
                var bettingDisplay = Ext.ComponentQuery.query('betdisplay')[0];
                var betting = game.getAssociatedData().bet;
                if (betting === undefined) {
                    bettingDisplay.hide();
                } else {
                    betting.home = homeTeam;
                    betting.away = awayTeam;
                    bettingDisplay.update(betting);
                    bettingDisplay.show();
                }
                
                // set game details title
                var title = awayTeam + ' @ ' + homeTeam + ' ' + fmtdGameTime;
                if (!DFST.AppSettings[DFST.AppSettings.sport].hasTeams) {
                    title = Ext.String.capitalize(DFST.AppSettings[DFST.AppSettings.sport].gameText) + ' data for ' + name;
                }
                if (venue !== undefined) title += ' at ' + venue.nm;
                gameView.setTitle(title);
                
                gameView.show();
            }
        }
    }    
    });

