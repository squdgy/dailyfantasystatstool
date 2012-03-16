Ext.define('DFST.controller.Stats', {
    extend: 'Ext.app.Controller',

    stores: ['Stats'],

    models: ['StatSet'],

    views: ['statset.Grid', 'statset.Preview'],

    refs: [{
        ref: 'feedShow',
        selector: 'feedshow'
    }, {
        ref: 'viewer',
    	selector: 'viewer'
    }, {
    	ref: 'statsetPreview',
    	selector: 'statsetpreview'
    }, {
        ref: 'statsetTab',
        xtype: 'statsetpreview',
        closable: true,
        forceCreate: true,
        selector: 'statsetpreview'
    }],

    init: function() {
        this.control({
            'statsetgrid': {
                selectionchange: this.previewStatSet
            },
            'statsetgrid > tableview': {
                itemdblclick: this.loadStatSet,
                refresh: this.selectStatSet
            },
            'statsetpreview button[action=viewintab]': {
                click: this.viewStatSet
            },
            'statsetpreview button[action=gotopost]': {
                click: this.openStatSet
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
     * Loads the given statset into the preview panel
     * @param {DFST.model.StatSet} statset The statset to load
     */
    previewStatSet: function(grid, statsets) {
        var statset = statsets[0],
            statsetPreview = this.getStatsetPreview();

        if (statset && statsetPreview) {
            statsetPreview.statset = statset;
    		statsetPreview.update(statset.data);
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

