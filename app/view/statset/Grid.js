Ext.define('FV.view.statset.Grid', {
    extend: 'Ext.grid.Panel',
	alias: 'widget.statsetgrid',

	cls: 'feed-grid',
	disabled: true,

    requires: ['Ext.ux.PreviewPlugin', 'Ext.toolbar.Toolbar'],
    
    border: false,
    
	initComponent: function() {
		Ext.apply(this, {
		    store: 'Stats',

			viewConfig: {
				plugins: [{
					pluginId: 'preview',
					ptype: 'preview',
					bodyField: 'description',
					previewExpanded: true
				}]
			},

			columns: [{
				text: 'Team',
				dataIndex: 'team',
				flex: 1,
				renderer: this.formatTeam
			}, {
				text: 'Name',
				dataIndex: 'name',
				hidden: true,
				width: 200
			}, {
				text: 'Points',
				dataIndex: 'points'
			}],
			dockedItems:[{
				xtype: 'toolbar',
				dock: 'top',
				items: [{
					text: 'Open All',
					action: 'openall'
				}]
			}]
		});

		this.callParent(arguments);
	},

	/**
	 * Team renderer
	 * @private
	 */
	formatTitle: function(value, p, record) {
		return Ext.String.format('<div class="topic"><b>{0}</b><span class="author">{1}</span></div>', value, record.get('team') || "Unknown");
	}

});

