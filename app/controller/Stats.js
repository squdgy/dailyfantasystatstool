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
            detailsView = this.getDrilldowninfo();

        if (statset && detailsView) {
            detailsView.statset = statset;
    		detailsView.update(statset.data);
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

