/*global Ext: false DFST: false*/
Ext.define('DFST.controller.Stats', {
    extend: 'Ext.app.Controller',

    stores: ['Stats', 'PlayerStats', 'Games'],

    models: ['StatSet', 'PlayerStatSet', 'Game'],

    views: ['statset.Grid', 'statset.PlayerGrid', 
    'drilldown.Details', 'drilldown.DetailInfo',
    'weather.Display'],

    refs: [
        { ref: 'playerGrid', selector: 'statsetplayergrid' },
        { ref: 'drilldowndetails',  selector: 'drilldowndetails'},
        { ref: 'drilldowninfo', selector: 'drilldowninfo' },
        { ref: 'drilldownnextopp', selector: 'statsetplayergrid checkbox#nextopp'},
        { ref: 'gamedetails', selector: 'gamedetails' }
        ],

    init: function() {
        // Set up service URLs
        var host = 'http://localhost:49533';    //local
        if (location.hostname.indexOf('azurewebsites') > 0) {
            host = 'http://dfstapi.cloudapp.net';  //live azure
        }
//        host = 'http://localhost:81';       //local azure dev fabric 
        var statsStore = this.getStatsStore();
        var playerStatsStore = this.getPlayerStatsStore();
        statsStore.proxy.url = host + '/api/players/';
        playerStatsStore.proxy.url = host + '/api/playerstats/';

        this.control({
            'statsetgrid': {
                selectionchange: this.onPlayerChanged
            },
            'statsetgrid > tableview': {
                itemdblclick: this.loadStatSet,
                refresh: this.selectStatSet
            },
            'statsetplayergrid checkbox#nextopp':{
                change: this.loadStatSetData
            }
        });
    },
    
    loadStatSetData: function() {
        var limit = this.getDrilldownnextopp().getValue();
        var store = this.getPlayerStatsStore();
        store.filter([
            {id:'id', property: 'id', value: this.playerId},
            {id:'scoring', property: 'scoring', value: this.siteId},
            {id:'nextopp', property: 'nextopp', value: limit ? this.gameId : limit},
        ]);
    },
    
    selectStatSet: function(view) {
        var first = this.getStatsStore().getAt(0);
        if (first) {
            view.getSelectionModel().deselectAll();
            view.getSelectionModel().select(first);
        }
    },

    onPlayerChanged: function(grid, statsets) {
        this.drillDown(grid, statsets); 
        this.showGameDetail(grid, statsets);
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
            this.playerId = statset.data.id;
            this.siteId = this.getStatsStore().filters.get("scoring").value;
            this.gameId = statset.data.gameId;

            var pos = statset.data.spos;
            var pgrid = this.getPlayerGrid();
            if (DFST.AppSettings.sport === 'mlb') {
                if (pos == 'P')
                    pgrid.reconfigure(null, pgrid.mlbpCols);
                else 
                    pgrid.reconfigure(null, pgrid.mlbhCols);
            } else {
                pgrid.reconfigure(null, pgrid.getCols(DFST.AppSettings.sport, pos));
            }
            this.loadStatSetData();
            detailsInfoView.statset = statset;
            detailsInfoView.update(statset.data);
            detailsView.setTitle('Game Log for ' + statset.data.fname +
            ' ' + statset.data.lname);
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

        if (statset && gameView) {
            var gameId = statset.data.gameId;
            var game = gamesStore.findRecord('gid', gameId);
            if (game) {
                // weather display, if any
                var hourViews = Ext.ComponentQuery.query('weatherhour');
                var weather = game.getAssociatedData().weather;
                var wi = weather.length;
                for (var i=0; i < wi; i++) {
                    var hourView = hourViews[i];
                    if (hourView) {
                        hourView.update(weather[i]);
                        var hour = new Date(weather[i].ti);
                        hour = Ext.Date.add(hour, Ext.Date.MINUTE, hour.getTimezoneOffset());
                        hourView.setTitle(Ext.Date.format(hour, 'g:i a'));
                    }
                }
                
                var homeTeam = game.get('home').toUpperCase();
                var awayTeam = game.get('away').toUpperCase();
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
                var venue = game.getAssociatedData().venue;
                var gameTime = new Date(game.get('gtime'));
                gameTime = Ext.Date.add(gameTime, Ext.Date.MINUTE, gameTime.getTimezoneOffset());
                var title = 'Game data for ' + awayTeam + ' @ ' + 
                    homeTeam + ' ' + Ext.Date.format(gameTime, 'm-d g:i a');
                if (venue !== undefined) title += ' ' + venue.name;
                gameView.setTitle(title);
                
                gameView.show();
            }
        }
    }    
    });

