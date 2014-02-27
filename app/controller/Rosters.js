/*global Ext: false DFST: false html2canvas: false*/
Ext.define('DFST.controller.Rosters', {
    extend: 'Ext.app.Controller',

    stores: ['SiteDetails', 'Roster'],
    models: ['SiteDetails', 'RosterPosition', 'RosterSlot'],
    views:  ['statset.Grid', 'rosterbuilder.Panel'],
    
    refs: [
        {ref: 'siteInfo', selector: '#siteinfo'},
        {ref: 'siteGrid', selector: 'rosterbuilder grid'},
        {ref: 'screenShotButton', selector: 'rosterbuilder button#screenshot'},
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
            },
            'rosterbuilder button#screenshot': {
                click: this.screenShot
            }
        });
    },

    screenShot: function() {
        var rosterBuilder = this.getSiteGrid();
        html2canvas(rosterBuilder.getEl().dom, {
            onrendered: function(canvas) {
                var dataURL = canvas.toDataURL();
                
                Ext.create('Ext.window.Window', {
                    title: 'Your Lineup as an Image',
                    height: canvas.height + 100,
                    width: canvas.width + 50,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        padding: 5  
                    },
                    items: [{
                        xtype: 'panel',
                        html: '<img title="lineup" src="' + dataURL +'">'
                    }, {
                        xtype: 'button',
                        text: 'Download',
                        listeners: {
                            click: function(){
                                var link = document.createElement("a");
                                link.setAttribute("href", dataURL);
                                link.setAttribute("download", "lineup.png");
                                link.click();
                            }
                        }
                    }]
                }).show();                
            }
        });    
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
            nrecs = store.count(),
            i, rec;
        
        // first check if the player is already in the roster
        // if so, select only that spot
        var pid = playerRec.get('id');
        var existingRec = store.findRecord('pid', pid);
        if (existingRec) { 
            possibleSlots.push(existingRec);
        } else {
            for (i=0; i<nrecs; i++) {
                rec = store.getAt(i);
                if (Ext.Array.contains(playerRec.get('rpel'), rec.get('rpid'))) {
                    possibleSlots.push(rec);
                }
            }
        }

        rgrid.view.selModel.select(possibleSlots, false, true);
    }
});