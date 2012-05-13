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
				width: 150,
                renderer: this.formatName
			}, {
                text: 'Team',
				dataIndex: 'team',
                width: 50,
				renderer: this.formatTeam
    		}, {
                text: 'OPP',
				dataIndex: 'opp',
                width: 60,
                renderer: this.formatOpponent,
    		}, {
                text: 'Pos',
				dataIndex: 'spos',
                width: 40
			},{
                text: 'G',
				dataIndex: 'ng',
                width: 40
			},{
                text: '1B',
                dataIndex: 'x1b',
                width: 40,
                hidden: true
            }, {
                text: '2B',
                dataIndex: 'x2b',
                width: 40,
                hidden: true
            },{
                text: '3B',
                dataIndex: 'x3b',
                width: 40,
                hidden: true
            },{
                text: 'HR',
				dataIndex: 'hr',
                width: 40,
                hidden: true
			},{
                text: 'R',
                dataIndex: 'r',
                width: 40,
                hidden: true
            },{
                text: 'RBI',
                dataIndex: 'rbi',
                width: 40,
                hidden: true
            },{
                text: 'BB',
                dataIndex: 'bb',
                width: 40,
                hidden: true
            },{
                text: 'SB',
                dataIndex: 'sb',
                width: 40,
                hidden: true
            },{
                text: 'HBP',
                dataIndex: 'hbp',
                width: 40,
                hidden: true
            },{
                text: 'OUT',
                dataIndex: 'o',
                width: 40,
                hidden: true
           },{
                text: 'W',
                dataIndex: 'w',
                width: 40,
                hidden: true
            },{
                text: 'W/G',
                dataIndex: 'aw',
                width: 40,
                hidden: true,
                renderer: Ext.util.Format.numberRenderer('0.00')
            },{
                text: 'ER',
                dataIndex: 'er',
                width: 40,
                hidden: true
            },{
                text: 'ER/G',
                dataIndex: 'aer',
                width: 40,
                hidden: true,
                renderer: Ext.util.Format.numberRenderer('0.00')
            },{
                text: 'SO',
                dataIndex: 'so',
                width: 40,
                hidden: true
            },{
                text: 'SO/G',
                dataIndex: 'aso',
                width: 40,
                hidden: true,
                renderer: Ext.util.Format.numberRenderer('0.00')                
            },{
                text: 'IP',
                dataIndex: 'ip',
                width: 40,
                hidden: true
            },{
                text: 'IP/G',
                dataIndex: 'aip',
                width: 40,
                hidden: true
            },{
                text: 'Avg Pts',
                dataIndex: 'afp',
                width: 60,
                renderer: Ext.util.Format.numberRenderer('0.00')
            },{
                text: '$',
                dataIndex: 'sal',
                width: 60
            },{
                text: '$/Pt',
                dataIndex: 'cpp',
                width: 60,
                renderer: this.costPerPointRenderer
            }
            ]
		});

		this.callParent(arguments);
	},

    /**
     * Cost Per Point renderer
     * @private
     */
    costPerPointRenderer: function(value, p, record) {
        if (value === 999999) {
            return "&infin;";
        } else {
            return Ext.util.Format.number(value, '0');
        }
    },
    
    /**
     * Name renderer
     * @private
     */
	formatName: function(value, p, record) {
        var isInjured = record.data.inj;
        if (isInjured) {
            return value + "<img src='images/16px-Injury_icon_2.svg.png' />";
        } else {
            return value;
        }
	},
    
	/**
     * Team renderer
     * @private
     */
	formatTeam: function(value, p, record) {
		return Ext.String.format('<span class="team">{0}</span>', value.toUpperCase());
	},
    /**
     * TODO: Used in 2 grids - refactor!!
     * Opponent renderer
     * @private
     */
	formatOpponent: function(value, p, record) {
        var isHome = record.data.isHome;
        return isHome ? record.data.opp : '@' + record.data.opp;
	}
    
});

