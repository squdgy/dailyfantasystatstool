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
    }],

    init: function() {
        // Set up service URLs
        var host = 'http://localhost:49533';    //local
        if (location.hostname.indexOf('cloudapp.net') > 0) {
            host = 'http://dfst.cloudapp.net';  //live azure
        }
//        host = 'http://localhost:81';       //local azure dev fabric 
        var statsStore = this.getStatsStore();
        var playerStatsStore = this.getPlayerStatsStore();
        statsStore.proxy.url = host + '/api/players/';
        playerStatsStore.proxy.url = host + '/api/playerstats/';

        //TODO: Server side, we need to filter by another table
        var today = new Date();
        statsStore.filter([{id: "gameDate", property: "gameDate", 
            value: (new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)).toJSON()}]);
        this.control({
            'statsetgrid': {
                selectionchange: this.drillDown
            },
            'statsetgrid > tableview': {
                itemdblclick: this.loadStatSet,
                refresh: this.selectStatSet
            }
        });
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

        if (statset && detailsView) {
            store = this.getPlayerStatsStore();
            store.filter([{id:'id', property: 'id', value: statset.data.id}]);
            detailsInfoView.statset = statset;
            detailsInfoView.update(statset.data);
            detailsView.setTitle('Game Details: ' + statset.data.name);
            detailsView.show();
        }
    },

    openStatSet: function(btn) {
        window.open(btn.up('statsetpreview').statset.get('link'));
    },

    viewStatSet: function(btn) {
        this.loadStatSet(null, btn.up('statsetpreview').statset);
    },

    /**
     * Loads the given statset into a new tab
     * @param {DFST.model.StatSet} statset The statset to load into a new tab
     */
    loadStatSet: function(view, statset, preventAdd) {
        var viewer = this.getViewer(),
            title = statset.get('title'),
            statsetId = statset.id;
            
        var tab = viewer.down('[statset=' + statset + ']');
        if (!tab) {
            tab = this.getStatSetTab();
            tab.down('button[action=viewintab]').destroy();
        }

        tab.setTitle(title);
        tab.statset = statset;
        tab.statsetId = statsetId;
        tab.update(statset.data);

        if (preventAdd !== true) {
            viewer.add(tab);
            viewer.setActiveTab(tab);            
        }
        
        return tab;
    }
});

