/*global Ext: false, DFST: false */
Ext.define('DFST.view.rosterbuilder.Panel', {
    extend: 'Ext.panel.Panel',
	alias: 'widget.rosterbuilder',
	
	cls: 'rosterbuilder',
	autoScroll: true,
	border: false,
    title: 'Create a Lineup',
    collapsible: true,
    collapsed: true,
	animCollapse: true,
	// state bug: when stateful a collapsed panel will result in the grid not
	// being sized correctly. Need to fix that before re-enabling state here
    //stateful: true,
    //stateId: 'rosterbuilder',
    layout: 'anchor',    

	initComponent: function() {
        var me = this;

        var grid = {
            xtype: 'grid',
            id: 'rostergrid',
            store: 'Roster',
            //bodyCls: 'watermark',
            multiSelect: true,
            title: '-',
            stateful: false,
            stateId: 'rosterbuilder',
            titleAlign: 'center',
            showCopyright: false,/*
            features: [{
                 ftype: 'summary'
            }],*/
            columns: [
                { text: 'Pos', dataIndex: 'rpos', hideable: false, sortable: false, width: 34 },
                { text: 'Name', dataIndex: 'name', hideable: false, sortable: false, width: 125, summaryType: 'count', summaryRenderer: this.copyRightRenderer},
                { text: 'Team', dataIndex: 'team', hideable: false, sortable: false, width: 38 },
                { text: 'FPPG', dataIndex: 'fppg', xtype: 'numbercolumn', align: 'right', sortable: false, hideable: false, width: 42, format:'0.00', summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0.00')},
                { text: 'Salary', dataIndex: 'salary', xtype: 'numbercolumn', align: 'right', sortable: false, hideable: false, width: 70, format: '$0,000', summaryType: 'sum', summaryRenderer: function(value, p, record) {
                    if (value === 0) return '$0'; return Ext.util.Format.currency(value, '$', -1); }},
                { text: '', xtype: 'actioncolumn', id:'delete', sortable: false, hideable: false, width: 22, items: [{
                    icon: 'images/delete.gif',
                    tooltip: 'Remove player',
                    isDisabled: function(view, rowIndex, colIndex, item, record) {// Returns true if 'editable' is false (, null, or undefined)
                        return !record.get('pid');
                    },
                    handler: function(grid, rowIndex, colIndex) {
                        var store = grid.getStore(),
                            rec = store.getAt(rowIndex);
                        me.fireEvent('removefromroster', store, rec);
                    }}] 
                }
            ],
            forceFit: true,
            viewConfig: {
                getRowClass: function(record) {
                    var pid = record.get('pid');
                    if (pid > 0) {
                        return 'roster-slot-filled';
                    }
                    return 'roster-slot-empty';
                },
                plugins: {
                    ptype: 'dfstgridviewdragdrop',
                    enableDrag: false,
                    dropGroup: 'ddplayer',
                    onNodeOver: function(target, dd, e, data ) {
                        var prec = data.records[0];
                        var rpel = prec.get('rpel');
                        var sal = prec.get('sal');
                        var droprpid = this.view.getRecord(target).get('rpid');
                        if (Ext.Array.contains(rpel, droprpid) && sal > 0) {
                            return Ext.dd.DropZone.prototype.dropAllowed;
                        }
                        return Ext.dd.DropZone.prototype.dropNotAllowed;
                    },
                    onNodeDrop: function(target, dd, e, data ) {
                        var dragrec = data.records[0];
                        var store = this.view.store;
                        var playerId = dragrec.get('id');
                        var sal = dragrec.get('sal');
                        
                        if (sal === 0) { return false; } // no salary
                        
                        // make sure player not already in roster
                        var existingRec = store.findRecord('pid', playerId);
                        if (existingRec) { return false; }

                        var droprec = this.view.getRecord(target);
                        if (Ext.Array.contains(dragrec.get('rpel'), droprec.get('rpid'))) {
                            this.view.selModel.deselectAll();
                            var pname = dragrec.get('fname') + ' ' + dragrec.get('lname');
                            if (DFST.AppSettings.sport === 'mlb') {
                                var prop = dragrec.get('spos') === 'P' ? 'throws' : 'bats';
                                var propVal = dragrec.get(prop);
                                var val = 'S';
                                if (propVal === 1) {
                                    val = 'L';
                                } else if (propVal === 2) {
                                    val = 'R';
                                }
                                pname += ' (' + val + ')';
                            }
                            
                            droprec.set('name', pname);
                            droprec.set('team', dragrec.get('team'));
                            droprec.set('pid', playerId);
                            droprec.set('fppg', dragrec.get('afp'));
                            droprec.set('salary', dragrec.get('sal'));
                            this.view.store.sync();
                            return true;
                        }
                        return false;
                    }
                }//TODO: should probably have listeners instead of passing funcs to plugin
            }
        };
        var summary = {
            xtype: 'panel',
            id: 'siteinfo',
            tpl: [
                '<div class="siteinfo">',
                '<table>',
                '<tr><td>Remaining Cap:</td><td>{remaining}</td></tr>',
                '<tr><td>Total Cap:</td><td>{cap}</td></tr>',
                '<tr><td>$/Player:</td><td>{perplayer}</td></tr>',
                '</table>',
                '</div>'
            ]
        };
        var watermark = {
            xtype: 'panel',
            id: 'watermark',
            hidden: true,
            border: false,
            componentCls: 'watermark',
            html: '<div style="position:absolute; height:100px; width:100px;background-color:red;">See me?</div>'
        };
        var screenshotArea = {
            xtype: 'panel',
            id: 'ssarea',
            items: [grid, watermark]
        };
		Ext.apply(this, {
            items: [ screenshotArea, summary, 
            {
                xtype: 'button',
                id: 'clear',
                cls: 'ros-btn',
                text: 'Clear'
            }, {
                xtype: 'button',
                id: 'fill',
                cls: 'ros-btn',
                hidden: true,
                text: 'Fill'
            }, {
                xtype: 'button',
                id: 'screenshot',
                cls: 'ros-btn screenshot-btn',
                text: 'Take Screenshot'
            }]
		});

		this.callParent(arguments);
	},
	
	copyRightRenderer: function(){
        if (!this.showCopyright) {
            return '';
        }
        return '<span id="roster-copyright" style="font-weight:bold;">' + DFST.AppSettings.appCopyRight + '</span>';
	} 
});
