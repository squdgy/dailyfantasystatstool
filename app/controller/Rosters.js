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
    
    /* internal variables */
    _dfsGameId: null,
    _date: null,
    
    init: function() {
        this.listen({
            component: {
                'statsetgrid': {
                    selectionchange: this.highlightPossibleSlots
                },
                'statsetgrid > tableview': {
                    itemdblclick: this.addToRoster
                },
                'rosterbuilder button#screenshot': {
                    click: this.screenShot
                }
            },
            controller: {
                '*': {
                    appDateChanged: this.changeDate,
                    appScoringChanged: this.changeScoring
                }
            },
            store: {
                '#Roster' : {
                    beforesync : this.changeRoster
                }  
            }
        });
    },
    
    changeDate: function(newDate) {
        this._date = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
        this.changeRosterDefinition();
    },

    changeScoring: function(dfsGameId) {
        this._dfsGameId = dfsGameId;
        this.changeRosterDefinition();
    },
    
    changeRosterDefinition: function() {
        var siteRec = this.getSiteDetailsStore().findRecord('dfsGameId', this._dfsGameId);
        var date = this._date;
        if (date === null || siteRec === null) return;
        
        var me = this;
        var positions = siteRec.getAssociatedData().positions;
        var cap = siteRec.get('cap');

        // load roster from cache if there is one,
        var npos = positions.length;
        var rStore = this.getRosterStore();
        rStore.load(function(records, operation, success) {
            // only show players from the dfs game and date we care about
            rStore.filterBy(function(rec, id) {
                return rec.get('dfsGameId') === me._dfsGameId &&
                    rec.get('dt').getTime() === me._date.getTime();
            });
            
            // if store is empty, nothing was in cache
            var numSlots = 0;
            if (rStore.count() === 0) {
                var dateUtc = new Date(me._date.getTime() + me._date.getTimezoneOffset()*60000);
                for (var i=0; i<npos; i++) {
                    var pos = positions[i];
                    // fill rosterStore with empty spots
                    for (var j=0; j<pos.count; j++) {
                        rStore.add(Ext.create('DFST.model.RosterSlot', {
                            dfsGameId: me._dfsGameId, 
                            dt: dateUtc,
                            rpos: pos.name, 
                            rpid: pos.id
                        }));
                        numSlots++;
                    }
                }
            }

            var fmtcap = Ext.util.Format.currency(cap, '$', -1);
            var perplayer = Ext.util.Format.currency(cap/numSlots, '$', -1);
            me.getSiteInfo().update({
                cap: fmtcap,
                remaining: fmtcap,
                perplayer: perplayer
            });
            var sportString = DFST.AppSettings.sport.toUpperCase();
            var dateString = me._date.toDateString();
            me.getSiteGrid().setTitle(siteRec.get('name') + ' - ' + fmtcap + ' - ' + sportString + ' - ' + dateString);
            me.salaryCap = cap; // save for later use
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

    /*
        When a roster changes update the summary information
    */
    changeRoster: function( options ) {
        var store = this.getRosterStore();
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
    Add player to first eligible, open roster spot, if any
    */
    addToRoster: function(view, playerRec, item, index, e, eOpts ) {
        var store = Ext.getCmp('rostergrid').store,
            nrecs = store.count(),
            i, rec;

        // first check if the player is already in the roster; if so, return
        var pid = playerRec.get('id');
        if (store.findRecord('pid', pid)) { 
            return;
        } else {
            for (i=0; i<nrecs; i++) {
                rec = store.getAt(i);
                if (rec.get('pid') > 0) { //slot filled
                    continue;   
                }
                if (Ext.Array.contains(playerRec.get('rpel'), rec.get('rpid'))) {
                    //found empty slot
                    rec.set('name', playerRec.get('fname') + ' ' + playerRec.get('lname'));
                    rec.set('pid', pid);
                    rec.set('fppg', playerRec.get('afp'));
                    rec.set('salary', playerRec.get('sal'));
                    store.sync();
                    return;
                }
            }
        }
    },
    
    
    /*
    * select (highlights) rows in roster grid where a selected player may be placed
    */
    highlightPossibleSlots: function(grid, recs) {
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