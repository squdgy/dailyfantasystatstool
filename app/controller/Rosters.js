/*global Ext: false DFST: false*/
Ext.define('DFST.controller.Rosters', {
    extend: 'Ext.app.Controller',

    stores: ['SiteDetails', 'Roster'],
    models: ['SiteDetails', 'RosterPosition', 'RosterSlot'],
    views:  ['statset.Grid'],
    
    refs: [
        {ref: 'siteInfo', selector: '#siteinfo'},
        {ref: 'siteGrid', selector: '.rosterbuilder grid'}
    ],
    
    init: function() {
        // listens for changes to the site filter to change roster positions
        this.getSiteDetailsStore().on('load', this.changeRosterDefinition, this);
        
        // listens for edits to the roster store in order to update summary info
        this.getRosterStore().on('update', this.changeRoster, this);
        
        // listens to selection changes on the stats grid, in order to change highlighting
        this.control({
            'statsetgrid': {
                selectionchange: this.changeSelections
        }});
    },

    changeRosterDefinition: function(store, records, successful, eOpts ) {
        var site = records[0];
        var positions = site.getAssociatedData().positions;
        var npos = positions.length;
        var rStore = this.getRosterStore();
        rStore.removeAll();
        var numSlots = 0;        
        for (var i=0; i<npos; i++) {
            var pos = positions[i];
            // fill rosterStore with empty spots
            for (var j=0; j<pos.count; j++) {
                rStore.add(Ext.create('DFST.model.RosterSlot', {rpos: pos.name, rpid: pos.id}));
                numSlots++;
            }
        }
        var cap = site.get('cap');
        var fmtcap = Ext.util.Format.currency(cap, '$', -1);
        var perplayer = Ext.util.Format.currency(cap/numSlots, '$', -1);
        this.getSiteInfo().update({
            cap: fmtcap,
            remaining: fmtcap,
            perplayer: perplayer
        });
        this.getSiteGrid().setTitle(site.get('name') + ' - ' + fmtcap + ' - ' + DFST.AppSettings.sport.toUpperCase());
        this.salaryCap = cap; // save for later use
    },
    
    /*
        When a roster changes update the summary information
    */
    changeRoster: function( store, record, operation, modifiedFieldNames, eOpts ) {
        if (operation !== Ext.data.Model.COMMIT) return;
        
        var numSlots = store.count();
        var usedcap = 0;
        var slotsrem = 0;
        for (var i=0; i < numSlots; i++) {
            var sal = store.getAt(i).get('salary');
            if (sal > 0) {
                usedcap += sal;
            } else {
                slotsrem++;
            }
        }
        var cap = this.salaryCap;
        var rem = cap - usedcap;
        var fmtcap = Ext.util.Format.currency(cap, '$', -1);
        var fmtrem = Ext.util.Format.currency(rem, '$', -1);
        var pp = slotsrem === 0 ? 0 : (cap - usedcap)/slotsrem;
        var fmtpp = Ext.util.Format.currency(pp, '$', -1);
     
        var highlightTpl = new Ext.Template('<span style="color:red;font-weight:bold;">{0}</span>');
        var fmthtml = rem >= 0 ? fmtrem : highlightTpl.apply([fmtrem]);
        var pphtml = rem >= 0 ? fmtpp : highlightTpl.apply([fmtpp]);
        this.getSiteInfo().update({
            cap: fmtcap,
            remaining: fmthtml,
            perplayer: pphtml
        });
    },
    
    /*
    * select (highlights) rows in roster grid where a selected player may be placed
    */
    changeSelections: function(grid, recs) {
        if (!recs || recs.length === 0) return;
        
        var possibleSlots = [],
            playerRec = recs[0],
            rgrid = Ext.getCmp('rostergrid'),
            store = rgrid.store,
            nrecs = store.count();
            
        for (var i=0; i<nrecs; i++) {
            var rec = store.getAt(i);
            if (Ext.Array.contains(playerRec.get('rpel'), rec.get('rpid'))) {
                possibleSlots.push(rec);
            }
        }
        rgrid.view.selModel.select(possibleSlots, false, true);
    }
});