Ext.define('DFST.view.statset.Grid', {
    extend: 'Ext.grid.Panel',
	alias: 'widget.statsetgrid',

	cls: 'statset-grid',
	disabled: false,

    requires: ['Ext.toolbar.Toolbar'],
    
    border: false,
    
	initComponent: function() {
		Ext.apply(this, {
		    store: 'Stats',

			columns: [{
				text: 'Name',
				dataIndex: 'name',
				width: 100
			}, {
    			text: 'Team',
				dataIndex: 'team',
//				flex: 1,
				renderer: this.formatTeam
			},{
                text: '1B',
                dataIndex: '1b'
            }, {
                text: '2B',
                dataIndex: '2b'
            },{
                text: '3B',
                dataIndex: '3b'
            },{
    			text: 'HR',
				dataIndex: 'hr'
			},{
                text: 'R',
                dataIndex: 'r'
            },{
                text: 'RBI',
                dataIndex: 'rbi'
            },{
                text: 'BB',
                dataIndex: 'bb'
            },{
                text: 'SB',
                dataIndex: 'sb'
            },{
                text: 'HBP',
                dataIndex: 'hbp'
            },{
                text: 'OUT',
                dataIndex: 'out'
            },{
                text: 'W',
                dataIndex: 'w'
            },{
                text: 'ER',
                dataIndex: 'er'
            },{
                text: 'SO',
                dataIndex: 'so'
            },{
                text: 'IP',
                dataIndex: 'ip'
            }]
		});

		this.callParent(arguments);
	},

	/**
	 * Team renderer
	 * @private
	 */
	formatTeam: function(value, p, record) {
		return Ext.String.format('<span class="team">{0}</span>', value);
	}

});

