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

	initComponent: function() {
		Ext.apply(this, {
            items: [{
                xtype: 'grid',
                id: 'rostergrid',
                store: 'Roster',
                multiSelect: true,
                title: '-',
                titleAlign: 'center',
                features: [{
                    ftype: 'summary'
                }],                
                columns: [
                    { text: 'Pos', dataIndex: 'rpos', hideable: false, sortable: false, width: 40 },
                    { text: 'Name', dataIndex: 'name', hideable: false, sortable: false, width: 150 },
                    { text: 'FPPG', dataIndex: 'fppg', sortable: false, hideable: false, width: 60, renderer: this.fppgRenderer, summaryType: 'sum', summaryRenderer: this.fppgRenderer },
                    { text: 'Salary', dataIndex: 'salary', sortable: false, hideable: false, width: 70, renderer: this.salaryRenderer, summaryType: 'sum' },
                    { text: '', xtype: 'actioncolumn', sortable: false, hideable: false, width: 30,
                        items: [{
                            icon: 'images/delete.gif',
                            tooltip: 'Remove player',
                            isDisabled: function(view, rowIndex, colIndex, item, record) {                                // Returns true if 'editable' is false (, null, or undefined)
                                return !record.get('pid');
                            },
                            handler: function(grid, rowIndex, colIndex) {
                                var store = grid.getStore(),
                                    rec = store.getAt(rowIndex);
                                rec.set('name', null);
                                rec.set('pid', null);
                                rec.set('fppg', null);
                                rec.set('salary', null);
                                store.commitChanges();
                            }
                        }]
                }],
                forceFit: true,
                viewConfig: {
                    plugins: {
                        ptype: 'dfstgridviewdragdrop',
                        enableDrag: false,
                        dropGroup: 'ddplayer',
                        onNodeOver: function(target, dd, e, data ) {
                            var rpel = data.records[0].get('rpel');
                            var droprpid = this.view.getRecord(target).get('rpid');
                            if (Ext.Array.contains(rpel, droprpid)) {
                                return Ext.dd.DropZone.prototype.dropAllowed;
                            }
                            return Ext.dd.DropZone.prototype.dropNotAllowed;
                        },
                        onNodeDrop: function(target, dd, e, data ) {
                            var dragrec = data.records[0];
                            var store = this.view.store;
                            var playerId = dragrec.get('id');
                            
                            // make sure player not already in roster
                            var existingRec = store.findRecord('pid', playerId);
                            if (existingRec) { return false; }

                            var droprec = this.view.getRecord(target);
                            if (Ext.Array.contains(dragrec.get('rpel'), droprec.get('rpid'))) {
                                this.view.selModel.deselectAll();
                                droprec.set('name', dragrec.get('fname') + ' ' + dragrec.get('lname'));
                                droprec.set('pid', playerId);
                                droprec.set('fppg', dragrec.get('afp'));
                                droprec.set('salary', dragrec.get('sal'));
                                this.view.store.commitChanges();
                                return true;
                            }
                            return false;
                        }
                    }//TODO: should probably have listeners instead of passing funcs to plugin
                }
            }, {
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
            }]
		});

		this.callParent(arguments);
	},

    /**
     * Salary renderer
     * @private
     */
    salaryRenderer: function(value, p, record) {
        if (value === 0)
            return '';
        return Ext.util.Format.currency(value, '$', -1); 
    },

    /**
     * FPPG renderer
     * @private
     */
    fppgRenderer: function(value, p, record) {
        if (value === 0)
            return '';
        return Ext.util.Format.number(value, '123,456.78');
    }
});
