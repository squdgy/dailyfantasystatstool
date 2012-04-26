Ext.define('DFST.view.statset.PlayerGrid', {
    extend: 'Ext.grid.Panel',
	alias: 'widget.statsetplayergrid',

	cls: 'player-grid',
	disabled: false,

    requires: ['Ext.toolbar.Toolbar'],
    
    border: false,
    
	initComponent: function() {
		Ext.apply(this, {
		    store: 'PlayerStats',

			columns: [{
                text: 'Date',
				dataIndex: 'gd',
                renderer: Ext.util.Format.dateRenderer('m-d'),
                width: 120
			},{
                text: 'Opp.',
				dataIndex: 'opp',
                renderer: this.formatOpponent,
                width: 120
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
                text: 'W',
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
                text: 'FP',
                dataIndex: 'fp',
                width: 60
            }]
		});

		this.callParent(arguments);
	},
    
    /**
	 * Team renderer
	 * @private
	 */
	formatOpponent: function(value, p, record) {
        var isHome = record.data.isHome;
        return isHome ? record.data.opp : '@' + record.data.opp;
	}

});

