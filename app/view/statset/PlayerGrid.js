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
				dataIndex: 'date',
                renderer: Ext.util.Format.dateRenderer('m-d-Y')
			},{
        		text: 'Opp.',
				dataIndex: 'opp'
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
	}

});

