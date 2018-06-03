/*global Ext: false DFST: false html2canvas: false*/
Ext.define('DFST.controller.Rosters', {
    extend: 'Ext.app.Controller',

    stores: ['SiteDetails', 'Roster', 'Lineup', 'Stats'],
    models: ['SiteDetails', 'RosterPosition', 'RosterSlot'],
    views:  ['statset.Grid', 'rosterbuilder.Panel'],
    
    refs: [
        {ref: 'siteInfo', selector: '#siteinfo'},
        {ref: 'siteScreenShotArea', selector: '#ssarea'},
        {ref: 'rosterGrid', selector: 'rosterbuilder grid'},
        {ref: 'screenShotButton', selector: 'rosterbuilder button#screenshot'},
        {ref: 'deleteButtons', selector: 'rosterbuilder actioncolumn[id=delete]'},
        {ref: 'watermark', selector: 'rosterbuilder #watermark'}
    ],
    
    /* internal variables */
    _draftgroupId: null,
    
    init: function() {
        this.listen({
            
            component: {
                'statsetgrid': {
                    selectionchange: this.highlightPossibleSlots
                },
                'statsetgrid > tableview': {
                    itemdblclick: this.addToRoster
                },
                'rosterbuilder': {
                    removefromroster: this.removeFromRoster
                },
                'rosterbuilder button#screenshot': {
                    click: this.screenShot
                },
                'rosterbuilder button#clear': {
                    click: this.clearRoster
                },
                'rosterbuilder button#fill': {
                    click: this.fillLineup
                }
            },
            controller: {
                '*': {
                    appDraftgroupChanged: this.changeDraftgroup
                }
            },
            store: {
                '#Roster' : {
                    beforesync : this.updateSummary
                },
                '#Lineup' : {
                    beforeLoad : this.beforeLineupLoad,
                    exception : this.clearRosterMask,
                    load : this.fillRosterFromLineup
                }
            }
        });
    },
    
    onLaunch: function() {
        // clear rosters saved before yesterday
        var store = this.getRosterStore();
        store.load();
        var delTime = new Date().getTime() - (1000 * 60 * 60 * 24 * 2);
        var nrecs = store.count();
        var didRemove = false;
        for (var i = nrecs; i > 0; i--) {
            var rec = store.getAt(i-1);
            var dt = rec.get('dt');
            if (dt !== null && dt.getTime() < delTime) {
                didRemove = true;
                store.removeAt(i-1);
            }
        }
        if (didRemove) { store.sync(); }
    },
    
    changeDraftgroup: function(draftgroupId) {
        this._draftgroupId = draftgroupId;
        this.changeRosterDefinition();
    },
    
    changeRosterDefinition: function() {
        var me = this;
        var siteRec = this.getSiteDetailsStore().findRecord('siteId', DFST.AppSettings.siteId);
        var draftgroupId = this._draftgroupId;
        if (draftgroupId === null || siteRec === null) return;
        
        // load roster from cache if there is one,
        var rStore = this.getRosterStore();

        // only show slots from the dg we care about
        rStore.filterBy(function(rec, id) {
            return rec.get('draftgroupId') === me._draftgroupId;
        });

        // get details of slots, rules etc.
        var draftgroup = siteRec.getAssociatedData().draftgroups.filter(function(dg){return dg.dgid === me._draftgroupId;})[0];
        var positions = draftgroup.rules.pos;
        var cap = draftgroup.rules.cap;
        var npos = positions.length;
        
        // if store is empty, nothing was in cache
        var numSlots = 0;
        if (rStore.count() === 0) {
            for (var i=0; i<npos; i++) {
                // fill rosterStore with empty spots
                var pos = positions[i];
                rStore.add(Ext.create('DFST.model.RosterSlot', {
                    draftgroupId: draftgroup.dgid,
                    rpos: pos.details.name, 
                    rpid: pos.rpId
                }));
                numSlots++;
            }
            rStore.sync();
        }
        // if > 0, but less than npos, something went wrong
        if (numSlots > 0 && numSlots < rStore.count()) {
            if (console.log) { console.log('problem deserializing roster'); }
        }

        var fmtcap = Ext.util.Format.currency(cap, '$', -1);
        var perplayer = Ext.util.Format.currency(cap/numSlots, '$', -1);
        var siteInfo = me.getSiteInfo();
        if (siteInfo) {
            siteInfo.update({
                cap: fmtcap,
                remaining: fmtcap,
                perplayer: perplayer
            });
        }
        var sportString = DFST.AppSettings.sport.toUpperCase();
        var dgString = draftgroup.rules.description + ' (' + draftgroup.dgid + ')';
        var grid = me.getRosterGrid();
        if (grid) {
            grid.setTitle(siteRec.get('name') + ' - ' + fmtcap + ' - ' + sportString + ' - ' + dgString);
            grid.getView().getSelectionModel().clearSelections();
        }
        me.salaryCap = cap; // save for later use
        
        this.updateSummary();
    },
    
    screenShot: function() {
        var watermark = this.getWatermark();
        var rgrid = Ext.getCmp('rostergrid');
        var selModel = rgrid.getView().getSelectionModel();
        var selections = selModel.getSelection();
        var deleteButtons = this.getDeleteButtons();
        
        var ssArea = this.getSiteScreenShotArea();
        // clear some things for screenshot
        rgrid.showCopyright = true;
        deleteButtons.hide();
        selModel.deselectAll();
        watermark.show();

        html2canvas(ssArea.getEl().dom, {scale: 1}).then(function(canvas) {
                //restore stuff cleared for screenshot
                rgrid.showCopyright = false;
                watermark.hide();
                selModel.select(selections, false, true);
                deleteButtons.show();
                
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
                        height: canvas.height + 12,
                        width: canvas.width + 12,
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
                    }/*, {
                        xtype: 'button',
                        text: 'Upload',
                        listeners: {
                            click: function(){
                                var b64src = dataURL.replace(/.*,/, '');
                                Ext.Ajax.request({
                                   url: 'https://lineupbragproxy.azurewebsites.net/',
                                   method: 'post',
                                   params: { base64Image : b64src }
                                });                                
                            }
                        }
                    }*/]
                }).show();                
            });    
    },

    /* When a roster changes update the summary information  */
    updateSummary: function( options ) {
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
        var siteInfo = this.getSiteInfo();
        if (siteInfo) {
            siteInfo.update({
                cap: fmtcap,
                remaining: fmthtml,
                perplayer: pphtml
            });
        }
    },
   
    /* Add player to first eligible, open roster spot, if any */
    addToRoster: function(view, playerRec, item, index, e, eOpts ) {
        var store = Ext.getCmp('rostergrid').store,
            nrecs = store.count(),
            i, rec;

        // no salary?, return
        if (playerRec.get('sal') === 0) {
            return;
        }
        // if the player is already in the roster; if so, return
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
                    var pname = playerRec.get('fname') + ' ' + playerRec.get('lname');
                    if (DFST.AppSettings.sport === 'mlb') {
                        var prop = playerRec.get('spos') === 'P' ? 'throws' : 'bats';
                        var propVal = playerRec.get(prop);
                        var val = 'S';
                        if (propVal === 1) {
                            val = 'L';
                        } else if (propVal === 2) {
                            val = 'R';
                        }
                        pname += ' (' + val + ')';
                    }
                    rec.set('name', pname);
                    rec.set('team', playerRec.get('team'));
                    rec.set('pid', pid);
                    rec.set('fppg', playerRec.get('afp'));
                    rec.set('salary', playerRec.get('sal'));
                    store.sync();
                    return;
                }
            }
        }
    },
    
    removeFromRoster: function(store, rec){
        rec.set('name', null);
        rec.set('team', null);
        rec.set('pid', null);
        rec.set('fppg', null);
        rec.set('salary', null);
        store.sync();
    },

    clearRoster: function(){
        var store = this.getRosterStore();
        var nrecs = store.count();
        for (var i=0; i<nrecs; i++) {
            var rec = store.getAt(i);
            rec.set('name', null);
            rec.set('team', null);
            rec.set('pid', null);
            rec.set('fppg', null);
            rec.set('salary', null);
        }
        store.sync();
    },
    
    fillLineup: function(){
        var lineupStore = this.getLineupStore();
        var statsStore = this.getStatsStore();
        var filters = statsStore.filters.getRange();
        lineupStore.filter(filters);
    },
    
    fillRosterFromLineup: function(lineupStore, records, wasSuccessful, options){
        this.clearRosterMask();
        var nrecs = lineupStore.count();
        if (nrecs == 0) {
             Ext.Msg.alert('Lineup Fill', 'Unable to fill roster. Things to try: manually fill more of the slots; narrow down the player list by using some of the filters; pick cheaper players.');
        }
        var rosterStore = this.getRosterStore();
        var rec, playerRec;
        
        for (var i=0; i<nrecs; i++) {
            rec = rosterStore.getAt(i);
            playerRec = lineupStore.getAt(i);
            
            if (rec == null || playerRec == null) continue;
            rec.set('name', playerRec.get('name'));
            rec.set('team', playerRec.get('team'));
            rec.set('pid', playerRec.get('pid'));
            rec.set('fppg', playerRec.get('fppg'));
            rec.set('salary', playerRec.get('salary'));
        }
        rosterStore.sync();
        return;
    },
    
    beforeLineupLoad: function() {
        this.getRosterGrid().setLoading('********');
        var lineupStore = this.getLineupStore();
        var rosterStore = this.getRosterStore();
        var prefilled = [];
        var nrecs = rosterStore.count();
        for (var i=0; i<nrecs; i++) {
            var rec = rosterStore.getAt(i);
            if (rec.get('pid')){
                prefilled.push({
                    pid : rec.get('pid'),
                    rpos: rec.get('rpos')
                });
            }
        }
        lineupStore.proxy.extraParams.prefilled = Ext.JSON.encode(prefilled);
    },
    
    clearRosterMask: function() {
        this.getRosterGrid().setLoading(false);
    },
    
    /* selects (highlights) rows in roster grid where a selected player may be placed  */
    highlightPossibleSlots: function(grid, recs) {
        if (!recs || recs.length === 0) return;
        
        var possibleSlots = [],
            playerRec = recs[0],
            rgrid = Ext.getCmp('rostergrid'),
            i, rec;
        
        if (rgrid == null) return;
        var store = rgrid.store, nrecs = store.count();
        
        // check if the player is already in the roster
        // if so, select only that spot
        var pid = playerRec.get('id');
        var existingRec = store.findRecord('pid', pid);
        if (existingRec) { 
            possibleSlots.push(existingRec);
        } else if (playerRec.get('sal') === 0) { // no salary
            // do nothing
        } else {
            for (i=0; i<nrecs; i++) {
                rec = store.getAt(i);
                if (Ext.Array.contains(playerRec.get('rpel'), rec.get('rpid'))) {
                    possibleSlots.push(rec);
                }
            }
        }

        rgrid.getView().getSelectionModel().select(possibleSlots, false, true);
    }
});