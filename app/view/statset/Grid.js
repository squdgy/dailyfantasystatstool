Ext.define('DFST.view.statset.Grid', {
    extend: 'Ext.grid.Panel',
	alias: 'widget.statsetgrid',

	cls: 'statset-grid',
	disabled: false,

    requires: ['Ext.toolbar.Toolbar'],
    
    border: false,
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
	    store: 'Stats',
        displayInfo: true
    }],
    
	initComponent: function() {
		Ext.apply(this, {
		    store: 'Stats',

			columns: [{
				text: 'Name',
				dataIndex: 'name',
				width: 150
			}, {
                text: 'Team',
				dataIndex: 'team',
                width: 50,
				renderer: this.formatTeam
    		}, {
                text: 'Pos',
				dataIndex: 'pos',
                width: 40
			},{
                text: 'G',
				dataIndex: 'ng',
                width: 40
			},{
                text: '1B',
                dataIndex: 'x1b',
                width: 40
            }, {
                text: '2B',
                dataIndex: 'x2b',
                width: 40
            },{
                text: '3B',
                dataIndex: 'x3b',
                width: 40
            },{
                text: 'HR',
				dataIndex: 'hr',
                width: 40
			},{
                text: 'R',
                dataIndex: 'r',
                width: 40
            },{
                text: 'RBI',
                dataIndex: 'rbi',
                width: 40
            },{
                text: 'BB',
                dataIndex: 'bb',
                width: 40
            },{
                text: 'SB',
                dataIndex: 'sb',
                width: 40
            },{
                text: 'HBP',
                dataIndex: 'hbp',
                width: 40
            },{
                text: 'OUT',
                dataIndex: 'o',
                width: 40
            },{
                text: 'BB',
                dataIndex: 'w',
                width: 40
            },{
                text: 'ER',
                dataIndex: 'er',
                width: 40
            },{
                text: 'SO',
                dataIndex: 'so',
                width: 40
            },{
                text: 'IP',
                dataIndex: 'ip',
                width: 40
            },{
                text: 'AFP',
                dataIndex: 'afp',
                width: 60,
                renderer: Ext.util.Format.numberRenderer('0.00')
            }]
		});

		this.callParent(arguments);
	},

	/**
	 * Team renderer
	 * @private
	 */
	formatTeam: function(value, p, record) {
		return Ext.String.format('<span class="team">{0}</span>', value.toUpperCase());
	}
});

