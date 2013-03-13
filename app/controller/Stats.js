Ext.define('DFST.controller.Stats', {
    extend: 'Ext.app.Controller',

    stores: ['Stats', 'PlayerStats'],

    models: ['StatSet', 'PlayerStatSet'],

    views: ['statset.Grid', 'statset.PlayerGrid', 'drilldown.Details', 'drilldown.DetailInfo'],

    refs: [{
    	ref: 'drilldowndetails',
    	selector: 'drilldowndetails'
    }, {
        ref: 'drilldowninfo',
    	selector: 'drilldowninfo'
    }, {
        ref: 'drilldownnextopp',
        selector: 'drilldowndetails checkbox#nextopp'
    }
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
                selectionchange: this.drillDown
            },
            'statsetgrid > tableview': {
                itemdblclick: this.loadStatSet,
                refresh: this.selectStatSet
            },
            'drilldowninfo checkbox#nextopp':{
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
            view.getSelectionModel().select(first);
        }
    },

    /**
     * Loads the given statset into the drilldown view
     * @param {DFST.model.StatSet} statset The statset to load
     */
    drillDown: function(grid, statsets) {
        var statset = statsets[0],
            detailsInfoView = this.getDrilldowninfo(),
            detailsView = this.getDrilldowndetails(),
            store;
            
        this.playerId = statset.data.id;
        this.siteId = this.getStatsStore().filters.get("scoring").value;
        this.gameId = statset.data.gameId;
        
        if (statset && detailsView) {
            this.loadStatSetData();
            detailsInfoView.statset = statset;
            detailsInfoView.update(statset.data);
            detailsView.setTitle('Game Details: ' + statset.data.name);
            detailsView.show();
        }
    }});

