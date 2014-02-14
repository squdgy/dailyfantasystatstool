/*global Ext: false DFST: false*/
Ext.define('DFST.controller.Rosters', {
    extend: 'Ext.app.Controller',

    stores: ['SiteDetails', 'Roster'],
    models: ['SiteDetails', 'RosterPosition', 'RosterSlot'],

    refs: [
        {ref: 'siteInfo', selector: '#siteinfo'}
    ],
    
    init: function() {
        var sdStore = this.getSiteDetailsStore();
        sdStore.on('load', this.changeRosterDefinition, this);
        var rsStore = this.getRosterStore();
        rsStore.on('update', this.changeRoster, this);
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
        
        this.getSiteInfo().update({
            cap: Ext.util.Format.currency(cap, '$', -1),
            remaining: Ext.util.Format.currency(cap - usedcap, '$', -1),
            perplayer: Ext.util.Format.currency((cap - usedcap)/slotsrem, '$', -1)
        });
    }
});