Ext.define('DFST.view.statset.PlayerGrid', {
    extend: 'Ext.grid.Panel',
	alias: 'widget.statsetplayergrid',

	cls: 'player-grid',
	disabled: false,

    requires: ['Ext.toolbar.Toolbar'],
    
    border: false,

    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'PlayerStats',
        displayInfo: true
    }],

	initComponent: function() {
		Ext.apply(this, {
		    store: 'PlayerStats',

			columns: {
                defaults: {
                    align: 'right',
                    style: 'text-align:center',
                    width: 40
                },
                items:
                [{
                    text: 'Date',
                    dataIndex: 'gd',
                    renderer: Ext.util.Format.dateRenderer('m-d'),
                    width: 60
    			},{
                    text: 'Opp.',
                    dataIndex: 'opp',
                    renderer: this.formatOpponent,
                    width: 60
                },{
                    text: '1B',
                    dataIndex: 'x1b'
                }, {
                    text: '2B',
                    dataIndex: 'x2b'
                },{
                    text: '3B',
                    dataIndex: 'x3b'
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
                    dataIndex: 'o'
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
                    dataIndex: 'ip',
                    renderer: Ext.util.Format.numberRenderer('0.0')
                },{
                    text: 'FP',
                    dataIndex: 'fp',
                    width: 60,
                    renderer: Ext.util.Format.numberRenderer('0.00')
                }]
            }
		});

		this.callParent(arguments);
	},
    
    /**
	 * Opponent renderer
	 * @private
	 */
	formatOpponent: function(value, p, record) {
        var isHome = record.data.isHome;
        return (isHome ? record.data.opp : '@' + record.data.opp).toUpperCase();
	}

});

